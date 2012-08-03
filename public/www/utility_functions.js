        $(document).bind("mobileinit", function(){
          $.mobile.defaultPageTransition="none";
		  //$.mobile.ajaxEnabled = false;
          //alert("No page transition");
        }); 



function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.lastIndexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = unescape(hash[1]);
    }
    return vars;
}

function replaceAll(containingText, textToReplace, replacementText ){    	
	var replacePattern = new RegExp(textToReplace, 'g')
	return containingText.replace(replacePattern, replacementText);
	
}

function decodeSpacesIn(encodedText){
    return replaceAll(encodedText, '%20', ' ');
}


