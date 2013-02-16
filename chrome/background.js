var nrItems = 0;
//var storage = chrome.storage.local;

function onClickHandler(data, tab) {
  if (data.menuItemId == 'clipxadd') {
  		var id = parseInt(new Date().getTime());
  		var item = {};
      item.id = id;
  		if (typeof(data.mediaType) != "undefined"){
  			switch (data.mediaType){
  				case "image" : {
  					item.type = "image";
  					item.src  = data.srcUrl;
  				}; break;
  				case "video" : {
  					item.type = "video";
  					item.src  = data.srcUrl;
  				}; break;
  				case "audio" : {
  					item.type = "audio";
  					item.src  = data.srcUrl;
  				}; break;
  			}
  		}
  		else if (typeof(data.linkUrl) != "undefined"){
  			item.type = "link";
  			item.src  = data.linkUrl;
  		}
  		else if (typeof(data.selectionText) != "undefined"){
			item.type = "text";
  			item.src  = data.pageUrl;
  			item.textVal = data.selectionText;
  		}
 	 	if(typeof(item.type) != "undefined"){
 	 		nrItems++;
 	 		chrome.browserAction.setBadgeText({'text' : nrItems.toString()});  
      chrome.tabs.captureVisibleTab(null,{"format":"png"}, function(imgUrl) {
        item.thumbnail = imgUrl;
        window.localStorage.setItem(id,JSON.stringify(item));
      });  
 	 	}
  }
};

function onClickedIconHandler(){
	nrItems = 0;
	chrome.browserAction.setBadgeText({'text' : ''});
  chrome.tabs.create({url : 'background.html'});
}

chrome.browserAction.setIcon({'path' : 'icons/icon16.png'},function(){});
chrome.contextMenus.create({'id' : 'clipxadd', 'title' : 'ClipxIT!', 'contexts': ['all']});
chrome.contextMenus.onClicked.addListener(onClickHandler);
chrome.browserAction.onClicked.addListener(onClickedIconHandler);

