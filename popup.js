

var currUrl;
chrome.tabs.query({active: true,lastFocusedWindow: true}, function(tabs) {
		   var tab = tabs[0];
		   currUrl = tab.url;
});
var t = 1;
var i= 1;
 function youtubeMain(url){
	videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
	thumbnail = "https://img.youtube.com/vi/" + videoid[1] + "/hqdefault.jpg";
	
	
	
	var item = document.createElement('div');
	var itemParent = document.getElementById("list");
	item.id = "l" + t;
	item.className = "tile";
	item.text = "Click Here";
	itemParent.appendChild(item);
	
	var linkItem = document.createElement('a');
	var linkParent = document.getElementById("l" + t);
	linkItem.href = url;
	linkItem.id  = "til" +t;
	linkParent.appendChild(linkItem);
	
	
	var image = document.createElement("img");
	var imageParent = document.getElementById("til" + t);
	image.id = "Id";
	image.className = "playlist";
	image.src = thumbnail;
	imageParent.appendChild(image);
	t = t+1;
 }
 
 $(document).ready(function(){
    $("#addtolist").click(function(){
		   youtubeMain(currUrl);
    });
	 $('body').on('click', 'a', function(){
     chrome.tabs.update({url: $(this).attr('href')});
     return false;
   });
});


