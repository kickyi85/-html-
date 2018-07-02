let intItemPath = 'tab/tab1.html';                   // ロード時に読み込むコンテンツの初期値
let intItemTab = '[data-tab="'+ intItemPath +'"]';   // ロード時にtabItemSelectClassを付与するtabItemClass要素の初期値

const tabItemClass = 'glossarytab-item';             // タブ要素のクラス名
const tabItemSelectClass = 'glossarytab-selected';   // タブ選択時にタブ要素に付与されるクラス名
const tabContentsId = 'glossaryContents';            // 読み込みコンテンツを表示する要素のid名

$(function(){
  pageLoad();
  tabClick();
});

// ロード時に発火する関数
function pageLoad(){
  //urlパラメータを'&'区切りで配列を生成
  const urlParameters = location.search.slice(1).split('&');
  
  //
  if( urlParameters != "" ){
    parameterArray = new Array;
    for( i in urlParameters ){
      let y = urlParameters[i].split('=');
      parameterArray[y[0]] = y[1];
    }
    if( parameterArray["tab"] != undefined && parameterArray["tab"] < $('.'+tabItemClass).length ){
      let intItemPath = $('.'+tabItemClass).eq(parameterArray["tab"]).attr("data-tab");
      let intItemTab = '[data-tab="'+ intItemPath +'"]';
      tabLoad(intItemPath,intItemTab);
    }else{
      let intItemTab = '[data-tab="'+ intItemPath +'"]';
      tabLoad(intItemPath,intItemTab);
    }
  }else{
    let intItemTab = '[data-tab="'+ intItemPath +'"]';
    tabLoad(intItemPath,intItemTab);
  }
}

// ロード時に読み込むコンテンツと、タブにtabItemSelectClassを付与する関数
function tabLoad(intItemPath,intItemTab){
  $('.'+tabItemClass+intItemTab).addClass(tabItemSelectClass);
  $.ajax(intItemPath,{
    type: 'get',
    dataType: 'html'
  }).done(function(data){
    $('#'+tabContentsId).append('<div id="'+tabContentsId+'-current">'+data+'</div>');
  });
}

// タブをクリックしたときに発火する関数
function tabClick(){
  $('.'+tabItemClass).on('click',function(){
    let contentsPath = $(this).attr('data-tab');    
    $('.'+tabItemClass+'.'+tabItemSelectClass).removeClass(tabItemSelectClass);
    $(this).addClass(tabItemSelectClass);    
    $.ajax(contentsPath,{
      type: 'get',
      dataType: 'html'
    }).done(function(data){
      $.when(
        $('#'+tabContentsId+'-current').slideUp(),
        $('#'+tabContentsId).append('<div id="'+tabContentsId+'-next">'+data+'</div>')
      ).done(function(){
        $.when(
          $('#'+tabContentsId+'-next').slideDown(),
        ).done(function(){
          $('#'+tabContentsId+'-current').remove();
          $('#'+tabContentsId+'-next').attr('id',''+tabContentsId+'-current');
        });
      });
    });
  });
}