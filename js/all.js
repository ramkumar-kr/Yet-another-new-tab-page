$(document).ready(function(){
  displayBackground();
  prepareLayout();
  addHeaderFooterClickHandlers();
  showBookmarks = getValue('show_bookmarks', true);
  showApps = getValue('show_apps', true);
  if (showBookmarks == 'true'){
    chrome.bookmarks.getSubTree('1', function(bookmarks){
      var output = display_tree(bookmarks);
      $('#dial_bookmarks').append(output);
      addToggleListeners('.panel-title');
    });
  }
  if(showApps == 'true'){
    displayApps();
  }
});

function prepareLayout(){
  var defaultLayout = JSON.stringify({
    app: '12', bookmarks: '12'
  });
  var layoutPreferences = JSON.parse(getValue('layoutPreferences', defaultLayout));
  $('#dial_apps').addClass(`col-md-${layoutPreferences.app}`);
  $('#dial_bookmarks').addClass(`col-md-${layoutPreferences.bookmarks}`);
}

function addHeaderFooterClickHandlers(){
  $('.chrome_url').on('click', function(){
    chrome.tabs.update({ url: this.href });
  });
}
function displayBackground(){
  url = getValue('background', 'https://source.unsplash.com/category/nature/800x600');
  try{
    u = new URL(url);
  }
	catch(Exception){
    url = localStorage.setItem('background', 'https://source.unsplash.com/category/nature/800x600');
  }
  $(document.body).css('background-image', 'url("'+ url +'")');
}

function getValue(key, default_value=null){
  item = localStorage.getItem(key);
  if (item == null || item == ''){
    localStorage.setItem(key, default_value);
    item = default_value;
  }
  return item;
}


function displayApps(){
  chrome.management.getAll(function(apps){
    var output = `<div class='panel panel-default'><div id='apps' class='panel-title app-panel'>Apps</div> <ul class='panel-list' id='apps'>`;
    for(var i = 0; i < apps.length; ++i){
      output += showApp(apps[i]);
    }
    output += '</ul></div>';
   $('#dial_apps').append(output);
   addAppOpenEventHandlers();
   addToggleListeners('.app-panel');
  });
}

function addAppOpenEventHandlers(){
 $('.app').on('click', function(){
   chrome.management.launchApp(this.id); 
 });
}

function showApp(app){
  if(app.isApp && app.enabled){
    return `
			<li class='leaf' ><a href='#' id='${app.id}' class='btn btn-default app'>
         <img width=32px height=32px src = ${getAppIcon(app.icons, 32)}/>
         &nbsp;${app.shortName}</a>
			</li>
    `;
  }
  else{
    return '';
  }
}

function getAppIcon(icons, minimumSize){ 
  return $.grep(icons, function(i){
    return (i.size >= minimumSize);
  })[0].url;;
}

function display_tree(bookmarks) {
  var output = '';
  var subtrees = [];
  for (var i=0; i < bookmarks.length; i++) {
    if (bookmarks[i].children) {
        subtrees.push(bookmarks[i]);
      }
      else {
        output += listItem(bookmarks[i]);
      }
  }
  for(var i = 0; i < subtrees.length; i++){
     output += displayPanel(subtrees[i]);
  }
  return output;
}


function faviconUrl(url){
  return 'chrome://favicon/'+ url;
}

function listItem(bookmark){
  url = new URL(bookmark.url);
  if(/^http/.test(url)){
    return `
    <li class='leaf'>
      <a class='btn btn-default' href=' ${bookmark.url}'>
        <img align=left width=16px height=16px src='${faviconUrl(bookmark.url)}'/>
        &nbsp;${bookmark.title}
      </a>
    </li>`;
  }
  else{
    return '';
  }
}

function displayPanel(bookmark){
  return `<div class='panel panel-default'><div id=${bookmark.id} class='panel-title'>${bookmark.title}</div><ul class='list-unstyled panel-list' id=${bookmark.id}>${display_tree(bookmark.children)}</ul></div>`;
}

function addToggleListeners(className){
  $(className).on('click', function(){
   id = '#' + this.id + '.panel-list';
   $(this).toggleClass("panel-title panel-title-inverse");
   $(id).toggle(); 
});
}
