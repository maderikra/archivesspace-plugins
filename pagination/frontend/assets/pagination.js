//staff side pagination
var params = window.location.search;
var lastpage = '';
var curpage = '';

//when on the staff side, must determine which controller we're on (on public side, all browsing is done on the search controller)
var cururl = window.location.href;
var urlparts = cururl.split("/");
var controller = urlparts[3];


$(document).ready(fixpage);
function fixpage() {	
	
//parse the URL to grab the search parameters we are using, but remove the page number (we will be using this base URL to make the pagination links)
params = params.split("&");
for( var i = 0; i < params.length; i++ ) {
if (params[i].indexOf("page") > -1)
		{params.splice(i, 1);}
}
//strip off question mark
while(params[0].charAt(0) === '?')
  {params[0] = params[0].substr(1);}
params = "&" + params.join("&");


//find out how many pages there are, look for a "last" link if it exists
if ($(".pagination-centered ul li a:contains('Last')").length > 0) {
var lastpageurl = $(".pagination-centered ul li a:contains('Last')").attr("href");
var lastpageparts = (lastpageurl.split("="))[1];
lastpage = (lastpageparts.split("&"))[0];
}
//otherwise, get it from the second to last link (the last link is the forward button, although it is disabled when on the last page, it always exists in the DOM)
else { 
lastpage = $(".pagination ul li:nth-last-child(2)").text();
	}

//find current page and saves as integer so we can do maths on it
curpage = parseInt($(".pagination-centered ul li.active a").html());
var nexpage = curpage + 1;
var prevpage = curpage - 1;
//check to see if the controller has paramters in it already
if (controller.indexOf("?") > -1) {
	if (controller.indexOf("page") > -1) {
			var prevurl = controller.replace(/page=([0-9])*/g,"page=" + prevpage);
			var nexurl = controller.replace(/page=([0-9])*/g,"page=" + nexpage);
			}
	else 
    	{
		var prevurl = "/" + controller + "&page=" + prevpage;
		var nexurl = "/" + controller + "&page=" + nexpage;

		}

	}



else if (controller.indexOf("?") == -1) {
var prevurl = "/" + controller + "?page=" + prevpage + params;
var nexurl = "/" + controller + "?page=" + nexpage + params;
}



//clear default pages
$(".pagination-centered").empty();
//add new page scroll to top and bottom
$(".pagination-centered").append("<ul class='newpages pagination pagination-sm'></ul>");
$("#tabledSearchResults").before("<div class='pagination-centered'><ul class='newpages pagination pagination-centered'></ul></div>");
//only add reverse arrow if we're not on page 1
if (curpage != 1){
$(".newpages").append("<li><a style='margin-top:5px;' href='" + prevurl + "'>&#171;</a></li>");
}
//add the page scroll box
$(".newpages").append("<LI style='display:inline;font-size:0.9em;float:left;line-height:25px;height:25px;padding: 2px 10px;'>Page <input onKeyUp='enterform(event)' id='wantpage' style='width:30px;height:2.0em;margin-top:5px;' maxlength='10' type='text' value='" +  curpage + "'> of " +  lastpage + "</li>");

//only add the forward arrow if we're not on the last page
if (curpage != lastpage){
	$(".newpages").append("<li><a style='margin-top:5px;border-width: 1px 1px 1px 1px;' href='" + nexurl + "'>&#187;</a></li>");
}

//make error div
$(".pagination").after("<div class='pagerr' style='color:#ffffcc;padding:5px;background-color:ccc;display:none;margin:0 0 0 16%;position:absolute;-moz-border-radius: 5px;border-radius: 5px;background-color:rgba(153,0,0,0.8);'></div>");

//sends form when clicking outside input box
$("#wantpage").blur(function () {
	gotopage();
		});


}
//run gotopage function if the enter key is pressed while inside the form
function enterform(event){
	 if(event.keyCode == 13) {
gotopage();
}
}

function gotopage(){
var newpage = ($('#wantpage').val());
lastpage = parseInt(lastpage);
//first make sure there's something in the box; if not, stick the current page back in there and end the function
if (newpage == ''){$('#wantpage').val(curpage);$('#wantpage').blur();return false;}
//if the value is the same as the current page, do nothing
if (newpage == curpage){return false;}

//make sure the string has digits only
var numpattern = /^[0-9]+$/;
if (numpattern.test(newpage)) {
	//make sure the entered number is not too big or too small
	if (newpage > lastpage) {var errtype = "toobig"; errfunc(errtype);return false;}
	else if (newpage < 1) {var errtype = "tootiny"; errfunc(errtype);return false;}
	

	//if it's all good, send it on
	else {
		//make the new url
		
			//check the format of the URL to parse it properly
				if (controller.indexOf("?") > -1) {
					if (controller.indexOf("page") > -1) {
							var newurl = controller.replace(/page=([0-9])*/g,"page=" + newpage);
							}
					else 
						{
						var newurl = "/" + controller + "&page=" + newpage;
				
						}
				
					}
				
				
				
				if (controller.indexOf("?") == -1) {
				var newurl = "/" + controller + "?page=" + newpage + params;
				}
				
						
			//go to new url
		window.location.href = newurl;}
	}
	
//if it doesn't match the regex for digits only, run error function
else {var errtype = "notanum"; errfunc(errtype);return false;}
}


function errfunc(errtype){
	if (errtype == "toobig") {var errmess = "Page number must be less than " + lastpage;}
	if (errtype == "tootiny") {var errmess = "Page number must be greater than zero";}
	if (errtype == "notanum") {var errmess = "Please enter whole numbers only";}
 $('.pagerr').html(errmess);
 $('.pagerr').fadeIn(500);
	
	}
