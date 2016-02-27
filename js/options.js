$(document).ready(function(){
	if (localStorage.getItem("tiles") === null)
    {
      var e =[];
      localStorage.setItem("tiles", JSON.stringify(e));
    }
    var tiles = localStorage.getItem("tiles");
		var name = localStorage.getItem("user_name");
		var style = localStorage.getItem("style");
		var background = localStorage.getItem("background");
		if (background === "undefined")
		{
			background="";
		}
    var d = JSON.parse(tiles);
		var it = '';
		for (var i = 0; i < d.length; i++)
    {
			it += '<tr><td><input name="'+d[i].name+'" type="checkbox" class="Checkbox" id ="'+i+'"/></td>';
			it += '<td>'+d[i].name+'</td><td>'+d[i].url+'</td><td>'+d[i].image+'</td></tr>';
    }
    $('#table').html(it);
		$('#user_name').val(name);
		$('#image_path').val(background);
		$(":radio[name='layout_options'][value='"+style+"']").attr('checked', 'checked');
		$('#apps').attr('checked', (localStorage.getItem("show_apps")=== 'true'));
		$('#bookmarks').attr('checked', (localStorage.getItem("show_bookmarks") === 'true'));

$('#layoutbtn').on('click',function(data){
  var str = $(":radio[name=layout_options]:checked").val();
  localStorage.setItem("style",str);
});

$('#edit_name').on('submit',function(data){
  var str = $("#user_name").val();
  console.log(str);
	localStorage.setItem("user_name",str);
});

$('#background').on('submit',function(data){
  var str = $("#image_path").val();
  localStorage.setItem("background",str);
});

$('#add').on('submit',function(data){
  var url1 = $('#url').val();
  var name1 = $('#name').val();
  var image1 = $('#image').val();
	if (image1 == null )
	{
		image1 = "images/default.png";
	}
  //obtain data from storage
  var tiles = localStorage.getItem('tiles');
  var d = JSON.parse(tiles);
  d.push( { url : url1 , name : name1, image : image1 });
  localStorage.setItem('tiles',JSON.stringify(d));
});

$('#del').on('submit',function(data){
  var x = $('input[type=checkbox]:checked').serializeArray();
  console.log(x.length);
  if (localStorage.getItem("tiles") === null)
    {
      var e =[];
      localStorage.setItem("tiles", JSON.stringify(e));
    }
    var tiles = localStorage.getItem("tiles");
    var d = JSON.parse(tiles);
    var newd = [];
    var it = '';
    var j = 0;
      //console.log(removed[0].name);
    for (var i = 0; i < d.length; i++) {
      console.log(j);
      if(x[j]){
        console.log(x[j]);
        if(x[j].name === d[i].name)
        {
          j++;
          continue;
        }
        else
        {
          newd.push(d[i]);
        }
      }
      else
      {
        newd.push(d[i]);
      }
    }
    localStorage.setItem("tiles", JSON.stringify(newd));
});
$('#export').on('click', function(data){
	var tiles = localStorage.getItem("tiles");
	var name = localStorage.getItem("user_name");
	var style = localStorage.getItem("style");
	var background = localStorage.getItem("background");
	var data1 = {"name" : name, "tiles" : tiles, "style" : style, "background" : background};
	console.log(data);
	chrome.tabs.create({url: "data:text/json;base64,"+btoa(JSON.stringify(data1))},function(d){});
});

$('#import').on('submit', function(data){
	var str = $("#items").val();
	try
	{
	  items = JSON.parse(str);
		localStorage.setItem("user_name", items["name"]);
		localStorage.setItem("style", items["style"]);
		localStorage.setItem("background", items["background"]);
		localStorage.setItem("tiles", items["tiles"]);
	}
	catch (e)
	{
		alert("Import Unsuccessful");
	}
});

$('#apps').on('click', function(){
	localStorage.setItem('show_apps', this.checked);
	console.log(this);
	console.log(this.checked);
});

$('#bookmarks').on('click', function(){
	localStorage.setItem('show_bookmarks', this.checked);
});
});
