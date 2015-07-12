$(document).ready(function(){
	//get data in checkbox form
	if (localStorage.getItem("tiles") === null)
    {
      var e =[];
      localStorage.setItem("tiles", JSON.stringify(e));
    }
    var tiles = localStorage.getItem("tiles");
    var d = JSON.parse(tiles);
		var it = '';
		for (var i = 0; i < d.length; i++)
    {
			it += '<tr><td><input name="'+d[i].name+'" type="checkbox" class="Checkbox" id ="'+i+'"/></td>';
			it += '<td>'+d[i].name+'</td><td>'+d[i].url+'</td><td>'+d[i].image+'</td></tr>';
    }
    $('#table').html(it);
  $('#layout').on('submit',function(data){
    var str = $("input[name=layout_options]:checked").val();
    localStorage.setItem("style",str);
  });

  $('#edit_name').on('submit',function(data){
    var str = $("#user_name").val();
    console.log(str);
		localStorage.setItem("user_name",str);
  });

  $('#background').on('submit',function(data){
    var str = $("#image_url").val();
    localStorage.setItem("background",str);
  });

  $('#add').on('submit',function(data){
    var url1 = $('#url').val();
    var name1 = $('#name').val();
    var image1 = 'images/'+$('#image').val();
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

});