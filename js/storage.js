$(document).ready(function(){
  if (typeof(Storage) != "undefined") {
    // background image
    var background_image = localStorage.getItem("background");
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
    var it = '';
    if (d.length > 0){
      it += '<div class="alert alert-warning"><b><i>Tiles are going away in the next version. Please move your tiles to bookmarks. For more details please refer to the version change log</b></i></div>'
    }
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

    // Bookmarks
    if (localStorage.getItem("show_bookmarks") === null)
    {
      localStorage.setItem("show_bookmarks", true);
    }
    var show_bookmarks = localStorage.getItem("show_bookmarks");

    if (show_bookmarks === 'true') {
      var it3 = '';
      chrome.bookmarks.getChildren("1", function(bookmarks){
        $('#speeddial').append('<center><h3><u>Bookmarks</u></h3></center>');
        for (var i = 0, c = 0; i < bookmarks.length; i++) {
          if(c % 6 === 0)
          {
            if(c > 0){
              it3+='</div><div class="col-lg-12">';
            }
            it3+='<div class="row"><div class="col-lg-12">';
          }
          if (bookmarks[i].url != null && (bookmarks[i].url.substring(0,4) == "http" || bookmarks[i].url.substring(0,6) == "chrome")) {
            c++;
            url = new URL(bookmarks[i].url);
            it3+='<div class="col-xs-6 col-sm-3 col-md-2 col-lg-2"><a href="'+bookmarks[i].url+'" id="'+bookmarks[i].title+'" class="thumbnail" title="'+bookmarks[i].title+'"><table><tr><td class="td"><img width=32px height=32px src="chrome://favicon/'+bookmarks[i].url+'"></td><td class="td">'+bookmarks[i].title+'</td></tr></table></a></div>';
          }
        }
        // it3+="</div></ul>";
        $('#speeddial').append(it3 + "</div>");
      });
    }


    // Apps
    if (localStorage.getItem("show_apps") === null)
    {
      localStorage.setItem("show_apps", true);
    }
    var show_apps = localStorage.getItem("show_apps");

    if (show_apps === 'true') {
      var it2 = '';
      chrome.management.getAll(function (apps_and_extensions){
        console.log(apps_and_extensions);
        $('#speeddial').append('<hr/><center><h3><u>Apps</u></h3></center>');
        for (var i = 0, c = 0; i < apps_and_extensions.length; i++) {
          if(c % 6 === 0)
          {
            if(c > 0){
              it2+='</div><div class="col-lg-12">';
            }
            it2+='<div class="row"><div class="col-lg-12">';
          }
          if(/app/.test(apps_and_extensions[i].type)){
            c++;
            image_url = '';
            for (var img in apps_and_extensions[i].icons) {
              if(apps_and_extensions[i].icons[img].size >= 32){
                image_url = apps_and_extensions[i].icons[img].url
              }
            }
            it2+='<div class="col-xs-6 col-sm-3 col-md-2 col-lg-2"><a href="" id= "app_'+apps_and_extensions[i].id+'" class="thumbnail" title="'+apps_and_extensions[i].name+'"><table><tr><td class="td"><img width="32" height="32" src = "'+image_url+'"/></td><td class="td">'+apps_and_extensions[i].name+'</td></tr></table></a></div>';

          }
        }
        $('#speeddial').append(it2+"</div>");
      });
    }
  }
});
$(document).on('click', "[id^=app_]", function () {
  console.log("-------------");
  console.log(this);
  chrome.management.launchApp(this.id.split("_")[1]);
  window.close();
});
