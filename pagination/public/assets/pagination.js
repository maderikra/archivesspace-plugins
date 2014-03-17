//public side pagination
var params = window.location.search;
var lastpage = '';
var curpage = '';

//runs main function on document ready
$(document).ready(fixpage);
function fixpage() {	

	
//parse the URL to grab the search parameters being used, but remove the page number (we will be using this base URL to make the pagination links)
params = params.split("&");
for( var i = 0; i < params.length; i++ ) {
if (params[i].indexOf("page") > -1)
		{params.splice(i, 1);}
}
//strip off question mark
while(params[0].charAt(0) === '?')
  {params[0] = params[0].substr(1);}
params = "&" + params.join("&");

//find out how many pages there are by looking for a "last" link if it exists
if ($(".pagination ul li a:contains('Last')").length > 0) {
	var lastpageurl = $(".pagination ul li a:contains('Last')").attr("href");
	var lastpageparts = (lastpageurl.split("="))[1];
	lastpage = (lastpageparts.split("&"))[0];
	}
//if there is no "last" link, the last page will be in the second to last link (the last link is the forward button, although it is disabled when on the last page, it always exists in the DOM)
else { 
	lastpage = $(".pagination ul li:nth-last-child(2)").text();
	}

//find current page and saves as integer so we can do maths on it
curpage = parseInt($(".pagination ul li.active a").html());
var nexpage = curpage + 1;
var prevpage = curpage - 1;

//remove default pagination
$(".pagination").empty();
//add new page scroll to top and bottom
$(".pagination-small").append("<ul class='newpages'></ul>");
$(".results-list").before("<div class='pagination pagination-small pagination-centered'><ul class='newpages'></ul></div>");
//add reverse arrow if we're not on page 1
if (curpage != 1){
	$(".newpages").append("<li><a style='margin-top:5px;' href='/search?page=" + prevpage + params + "'>&#171;</a></li>");
	}
//add the page scroll box
$(".newpages").append("<LI style='display:inline;font-size:0.9em;float:left;line-height:25px;height:25px;padding: 2px 10px;'>Page <input onKeyUp='enterform(event)' id='wantpage' style='width:25px;height:1.0em;margin-top:5px;' maxlength='10' type='text' value='" +  curpage + "'> of " +  lastpage + "</li>");

//add the forward arrow if we're not on the last page
if (curpage != lastpage){
	$(".newpages").append("<li><a style='margin-top:5px;border-width: 1px 1px 1px 1px;' href='/search?page=" + nexpage + params + "'>&#187;</a></li>");
	}

//make div for error message
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

//function to go to user-entered page
function gotopage(){
	//page the user wants to go to
	var newpage = ($('#wantpage').val());
	//last page (highest possible page value)
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
		else {window.location.href = 'http://archivesspace.vmi.edu:8081/search?page=' + newpage + params;}
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
