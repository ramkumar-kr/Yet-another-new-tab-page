$(document).ready(function(){
  if (typeof(Storage) != "undefined") {
    // background image
    if (localStorage.getItem("background") === null)
    {
      localStorage.setItem("background", 'images/backgrounds/background.jpg');
    }
    var background_image = localStorage.getItem("background");
    $(document.body).css('background-image', 'url("'+ background_image+'")');

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
    var it = '';
    for (var i = 0; i < d.length; i++) {
      if(i%12 === 0)
      {
        if(i > 0){
          it+='</div>';
        }
        it+='<div class="row">';
      }
      it+='<div class="'+style+'"><a href="'+d[i].url+'" id="'+d[i].name+'" class="thumbnail" title="'+d[i].name+'"><img src="'+d[i].image+'"/></a></div>';
      console.log(d[i].name);
    }
    $('#speeddial').append(it);
  }





/*
  chrome.storage.sync.get( function(items) {
    if (!chrome.runtime.error) {
      var d = items.data;
      var background_image = items.background;
      console.log(background_image);
      $(document.body).css('background-image', 'url("'+ background_image+'")');
      var name = items.name;
      var style = items.style;
      console.log(name);
      $('#user_name').append(name);
      console.log(style);
      var it = '';
      for (var i = 0; i < d.length; i++) {
        if(i%12 === 0)
        {
          if(i > 0){
            it+='</div>';
          }
          it+='<div class="row">';
        }
        it+='<div class="'+style+'"><a href="'+d[i].url+'" id="'+d[i].name+'" class="thumbnail" title="'+d[i].name+'"><img src="'+d[i].image+'"/></a></div>';
        console.log(d[i].name);
      }
      $('#speeddial').append(it);
    }
  });
*/
});
