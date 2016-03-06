$(document).ready(function(){
  if (typeof(Storage) != "undefined") {
    // background image
    var background_image = localStorage.getItem("image");
    if(background_image != "undefined"){
      if(/^images/.test(background_image))
      {
        background_image = "https://yet-another-new-tab-page.appspot.com/" + background_image;
      }
      $(document.body).css('background-image', 'url("'+ background_image+'")');
    }

    //styles
    if (localStorage.getItem("style") === null)
    {
      localStorage.setItem("style", 'col-lg-1 col-md-1 col-sm-3 col-xs-4');
    }
    var style = localStorage.getItem("style");

    // name
    if (localStorage.getItem("user_name") === null)
    {
      localStorage.setItem("user_name", "Batman");
    }
    var user_name = localStorage.getItem("user_name");
    $('#user_name').append(user_name);

    // tiles
    if (localStorage.getItem("tiles") === null)
    {
      var e =[];
      localStorage.setItem("tiles", JSON.stringify(e));
    }
    var tiles = localStorage.getItem("tiles");
    var d = JSON.parse(tiles);
    if(d.length === 0){
      localStorage.setItem("popup_shown", "yes");
      $("#dialog_start").show();
    }
    var it = '';
    for (var i = 0; i < d.length; i++) {
      if(i%12 === 0)
      {
        if(i > 0){
          it+='</div>';
        }
        it+='<div class="row">';
      }
      d[i].image = "https://yet-another-new-tab-page.appspot.com/"+d[i].image;
      it+='<div class="'+style+'"><a href="'+d[i].url+'" id="'+d[i].name+'" class="thumbnail" title="'+d[i].name+'"><object width="100%" height="100%" data="'+d[i].image+'"><img width="100%" height="100%" src = "images/default.png"/></object></a></div>';
    }
    $('#speeddial').append(it);
  }
});
