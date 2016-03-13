function prepare_html(bookmarks) {
  if (localStorage.getItem("show_bookmarks") === null)
  {
    localStorage.setItem("show_bookmarks", "true");
  }
  show_bookmarks = localStorage.getItem("show_bookmarks");
  if (show_bookmarks === 'true'){
    var it3 = '';
    it3 += '<hr></hr><center><h3><u>Bookmarks</u></h3></center>';
    for (var i = 0, c = 0; i < bookmarks.length; i++) {
      if(c % 6 === 0)
      {
        if(c > 0){
          it3+='</div><div class="col-lg-12">';
        }
        it3+='<div class="row"><div class="col-lg-12">';
      }
      if (bookmarks[i].url != null && (bookmarks[i].url.substring(0,4) == "http")) {
        c++;
        url = new URL(bookmarks[i].url);
        it3+='<div class="col-xs-6 col-sm-3 col-md-2 col-lg-2"><a href="'+bookmarks[i].url+'" id="'+bookmarks[i].title+'" class="thumbnail" title="'+bookmarks[i].title+'"><table><tr><td class="td"><object width="32" height="32" data="'+url.origin+'/favicon.ico'+'"><img width="35" height="35" src = "images/default.png"/></object></td><td class="td">'+bookmarks[i].title+'</td></tr></table></a></div>';
      }
    }
    var parser = new DOMParser();
    var doc = parser.parseFromString(it3, "text/html");
    document.getElementById('bookmarks').appendChild(doc.firstChild);
  }
}
self.port.emit("get_bookmarks");
self.port.on("bookmarks", prepare_html);
