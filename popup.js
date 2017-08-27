

var currUrl;
var t = 1;
var i= 1;

chrome.tabs.query({active: true,lastFocusedWindow: true}, function(tabs) {
		   var tab = tabs[0];
		   currUrl = tab.url;
});

function removeUrl(url){
	chrome.storage.local.get('urlList' ,function(items){
		for(var i = 0; i<items.urlList.length;i++){
			var ret =items.urlList[i];
			if(ret.currUrl == url){
				items.urlList.splice(i,1);
				chrome.storage.local.set({ urlList: items.urlList }, function () {
				if (chrome.runtime.lastError) {
                alert('ERROR: ' + chrome.runtime.lastError.message);
				}
            });
			}
		}
	});
}


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
	
	var remove = document.createElement("button");
	var buttonParent = document.getElementById("l" + t);
	remove.id = "r"+t;
	remove.className = "removeButtons";
	remove.onclick = function () {
    this.parentElement.parentElement.removeChild(buttonParent);
		removeUrl(url);
	};
	buttonParent.appendChild(remove);
	
	var icon = document.createElement("i");
	var iconParent = document.getElementById("r"+t);
	icon.className="fa fa-trash";
	icon.id= "i"+t;
	iconParent.appendChild(icon);
	t = t+1;
	return false;
 }
 function loadChanges(){
	chrome.storage.local.get('urlList',function(items){
		for(var i = 0; i<items.urlList.length;i++){
			var ret =items.urlList[i];
			youtubeMain(ret.currUrl);
	    }
	});
	return false;
}

 $(document).ready(function(){
	loadChanges();
    $("#addtolist").click(function(){
		chrome.storage.local.get({ urlList: []},function (items){
				items.urlList.push({currUrl});
				chrome.storage.local.set({ urlList: items.urlList }, function () {
				if (chrome.runtime.lastError) {
                alert('ERROR: ' + chrome.runtime.lastError.message);
				}
            });
		});
		youtubeMain(currUrl);
    });
	 $('body').on('click', 'a', function(){
     chrome.tabs.update({url: $(this).attr('href')});
     return false;
   });
});


