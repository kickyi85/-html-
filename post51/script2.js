var ua = navigator.userAgent; //UA取得
var device = 'pc';
if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0) && (ua.indexOf('Mobile') > 0) || ua.indexOf('Windows Phone') > 0) {
  device = 'smt';
}else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
  device = 'tab';
}

$(function(){
  if( device == 'pc' ){
    $('.telClick').on('click',function(){
      return false;
    });    
  }  
});