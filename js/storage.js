$(document).ready(function(){
  if (typeof(Storage) != "undefined") {
    // background image
    var background_image = localStorage.getItem("background");
    if(background_image != "undefined"){
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
    }
    $('#speeddial').append(it);
    $('#speeddial').append('<hr/><center><h3><u>Apps</u></h3></center>');
    it2 = '';
    chrome.management.getAll(function (apps_and_extensions){
      for (var i = 0, c = 0; i < apps_and_extensions.length; i++) {
        if(/app/.test(apps_and_extensions[i].type)){
          c++;
          if (c % 12 === 0)
          {
            if (c > 0){
              it2+='</div>'
            }
            it2+='<div class="row">';
          }
          it2+='<div class="'+style+'"><a href="'+apps_and_extensions[i].appLaunchUrl+'"   id="'+apps_and_extensions[i].name+'" class="thumbnail" title="'+apps_and_extensions[i].name+'"><img src="'+apps_and_extensions[i].icons[0].url+'"/></a></div>';
        }
      }
      $('#speeddial').append(it2);
    });


  }
});
