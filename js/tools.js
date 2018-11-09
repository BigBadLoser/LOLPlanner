function showTrees(){
  $(".tree").toggle();
}

function assetFill(assetID){
  $("#assets").html("");
  var t = "tileOptions." + assetID;
  var n = "tileOptions" + assetID;
  $.each(eval(t), walker);

      function walker(key, value) {
          //$("#assets").append('<img src="'+ eval(t + "." + key + ".src") + '"id="' + t + "." + key + '" width="'+ tile_size * 1.5 +'">');
          $("#assets").append('<img src="'+ eval(t + "." + key + ".src") + '" id="' + key +'" onClick="setActive(' + t + "." + key + '), test(&quot;#' + key + '&quot;)" width="'+ tile_size * 1.5 +'">');

      }
}

function test(id){
  $("*").removeClass("activeTile");
  $(id).addClass("activeTile");
}
