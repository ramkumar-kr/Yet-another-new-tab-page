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

    // Bookmarks
    if (localStorage.getItem("show_bookmarks") === null)
    {
      localStorage.setItem("show_bookmarks", true);
    }
    var show_bookmarks = localStorage.getItem("show_bookmarks");

    if (show_bookmarks === 'true') {
      var it3 = '<div class="row"><ul class="list-group">';
      chrome.bookmarks.getChildren("1", function(bookmarks){
        $('#speeddial').append('<br/><hr/><center><h3><u>Bookmarks</u></h3></center>');
        for (var i = 0; i < bookmarks.length; i++) {
          if (bookmarks[i].url != null && bookmarks[i].url.substring(0,4) == "http") {
            url = new URL(bookmarks[i].url);
            it3+='<div class="col-xs-6 col-sm-4 col-md-2 col-lg-2"><a href="'+bookmarks[i].url+'" id="'+bookmarks[i].title+'" class="thumbnail" title="'+bookmarks[i].title+'"><table><tr><td class="td"><object width="32" height="32" data="'+url.origin+'/favicon.ico'+'"><img width="35" height="35" src = "images/default.png"/></object></td><td class="td">'+bookmarks[i].title+'</td></tr></table></a></div>';
          }
        }
        it3+="</div>";
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
      var it2 = '<div class="row">';
      chrome.management.getAll(function (apps_and_extensions){
        console.log(apps_and_extensions);
        $('#speeddial').append('<br/><hr/><center><h3><u>Apps</u></h3></center>');
        for (var i = 0, c = 0; i < apps_and_extensions.length; i++) {
          if(/app/.test(apps_and_extensions[i].type)){
            image_128_url = '';
            for (var img in apps_and_extensions[i].icons) {
              if(apps_and_extensions[i].icons[img].size == 128){
                image_128_url = apps_and_extensions[i].icons[img].url
              }
            }
            it2+='<div class="col-xs-6 col-sm-4 col-md-2 col-lg-2"><a href="" id= "app_'+apps_and_extensions[i].id+'" class="thumbnail" data="'+apps_and_extensions[i].id+'" title="'+apps_and_extensions[i].name+'"><img src="'+image_128_url+'"/></a></div>';

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
