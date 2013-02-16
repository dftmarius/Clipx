!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

var storage = window.localStorage;
var storageObj;
function loadStorage(){
	storageObj = {};
	for (var key in storage){
			var obj = JSON.parse(storage[key]);

			if(storageObj[obj.type] == undefined){
				storageObj[obj.type] = [];
			}
			storageObj[obj.type].push(obj);
	};
};

function drawDiv(id,type,url,data,text){
	var share_text;
	if(type != "text"){
		text = "";
		share_text = url;
	}
	else{
		share_text = text+' '+url;
	}
	if(type == "image"){
		data = url;
	}
	$('.span9').append('<div class="row-fluid myodds">' + 
			'<a id='+id+' href="#" ><i class="icon-remove pull-right"></i> &nbsp;</a>'+
			'<img class="thumbnail pull-left " src='+data+' width=30% height=10%/>'+
			'<p class="caption share">'+url+'</p>'+
			'<p class="caption share">'+text+'</p>'+
			'<div class="share">'+
			  '<g:plus class="gplus" action="share" annotation="bubble"></g:plus>'+
			  '</div>'+
			  '<div class="share">'+
              '<iframe src="http://www.facebook.com/plugins/like.php?href='+url+
              '&amp;send=true&amp;layout=button_count&amp;width=100&amp;show_faces=true&amp;font&amp;colorscheme=light&amp;action=like&amp;height=20" scrolling="no" frameborder="0" '+
              'style="border:none; overflow:hidden; width:auto; height:20px;" allowTransparency="true"></iframe>'+
              '</div>'+
              '<div class="share">'+
              '<iframe allowtransparency="true" frameborder="0" scrolling="no" src="https://platform.twitter.com/widgets/tweet_button.1360878550.html#_=1360950009198&amp;count=horizontal&amp;id=twitter-widget-2&amp;lang=en&amp;original_referer=clipx&amp;size=m&amp;text='+share_text+'&amp;url=clipx" class="twitter-share-button twitter-count-horizontal" style="width: 125px; height: 20px;" title="Twitter Tweet Button" data-twttr-rendered="true"></iframe>'+
             '</div>'+
		'</div>');
	
	$('.gplus').each(function(index,elem){
		gapi.plusone.render(elem,{
		href : url,
		size : 'medium',
		width: 'auto'
	});
	})
	document.getElementById(id).addEventListener('click', function(e) {
    	e.toElement.parentNode.parentNode.remove();
    	storage.removeItem(id);
    	loadStorage();
	});
}

function drawType(obj){
	$('.span9').empty();
	if(obj != undefined){

		for(var item in obj){
			if(obj[item] != undefined){
				drawDiv(obj[item].id,obj[item].type,obj[item].src,obj[item].thumbnail,obj[item].textVal);
			}
		}
	}
}
loadStorage();


$(function(){
	function resetHighlight($a){
		var $li = $a.parent();
		$li.parent().children().each(function(index,elem){
			$(elem).removeClass("active");
		});
		$li.addClass("active");
	}
	$('#clipx-image').click(function(){
		resetHighlight($(this));
		drawType(storageObj.image);
	});
	$('#clipx-text').click(function(){
		resetHighlight($(this));
		drawType(storageObj.text);
	});
	$('#clipx-video').click(function(){
		resetHighlight($(this));
		drawType(storageObj.video);
	});
	$('#clipx-audio').click(function(){
		resetHighlight($(this));
		drawType(storageObj.audio);
	});
	$('#clipx-link').click(function(){
		resetHighlight($(this));
		drawType(storageObj.link);
	});
	
})

