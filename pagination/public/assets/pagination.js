var lastpage = '';
var curpage = '';



$(document).ready(fixpage);


function fixpage() {	


//only run if pagination exists
if ($(".pagination")[0]){


//get search url from existing page links, and find out how many pages there are, look for a next link if it exists
if ($(".pagination li a:contains('Next')").length > 0) {
var lastpageurl = $(".pagination li").last().prev().find('a').attr('href');


var pageposition = lastpageurl.indexOf("page=");
searchurl = lastpageurl.substring(0,pageposition);


var urllen = lastpageurl.length;
var res = lastpageurl.substring(pageposition+5, urllen); 
//find first non numeric character (to see where page number ends)
var endnum = res.match(/\D/);
if (endnum) {var lastchar = endnum[0];
var wheretoend = res.indexOf(lastchar);

if(wheretoend) {
lastpage = res.substring(0,wheretoend);
}
else{
lastpage = res;
}
}

else {
	lastpage = res;
}


}
//otherwise, get it from the last link that's not active (i.e. not the current LI, which won't have a href)
else { 
lastpage = $(".pagination li:last a").text();
var lastpageurl = $(".pagination li:not(.active):last a").attr("href");
searchurl = lastpageurl.substring(0,lastpageurl.indexOf("page="));
	}

//find current page and saves as integer so we can do maths on it
curpage = parseInt($(".pagination li.active a").html());

var nexpage = curpage + 1;
  var prevpage = curpage - 1;

//clear default pages
//have to use tag selector because ArchivesSpace has invalid HTML (it uses the same ID twice on a page)
$('div[id="paging"]').empty();
//add new page scroll to top and bottom
$('div[id="paging"]:eq(0)').append("<ul class='newpages1 pager'></ul>");
$('div[id="paging"]:eq(1)').append("<ul class='newpages2 pager'></ul>");
//only add reverse arrow if we're not on page 1
if (curpage != 1){
$(".newpages1").append("<li><a style='margin-top:5px;' href='" + searchurl + "page=" + prevpage + "'>&#171;</a></li>");
$(".newpages2").append("<li><a style='margin-top:5px;' href='" + searchurl + "page=" + prevpage + "'>&#171;</a></li>");
}
//add the page scroll box
$(".newpages1").append("<LI>Page <input onKeyUp='enterform(event,this)' id='wantpage1' style='width:25px' maxlength='10' type='text' value='" +  curpage + "'> of " +  lastpage + "</li>");
$(".newpages2").append("<LI>Page <input onKeyUp='enterform(event,this)' id='wantpage2' style='width:25px' maxlength='10' type='text' value='" +  curpage + "'> of " +  lastpage + "</li>");


//only add the forward arrow if we're not on the last page
if (curpage != lastpage){
	$(".newpages1").append("<li><a style='margin-top:5px;border-width: 1px 1px 1px 1px;' href='" + searchurl + "page=" + nexpage + "'>&#187;</a></li>");
        $(".newpages2").append("<li><a style='margin-top:5px;border-width: 1px 1px 1px 1px;' href='" + searchurl + "page=" + nexpage + "'>&#187;</a></li>");


}

//make error div
$('div[id="paging"]').after("<div class='pagerr' style='z-index:1;color:#ffffcc;padding:5px;background-color:ccc;display:none;margin:0 0 0 16%;position:absolute;-moz-border-radius: 5px;border-radius: 5px;background-color:rgba(153,0,0);'></div>");

//sends form when clicking outside input box
$("#wantpage1").blur(function () {
	gotopage(this);
		});
$("#wantpage2").blur(function () {
        gotopage(this);
                });



}
}

//run gotopage function if the enter key is pressed while inside the form
function enterform(event,elem){
	 if(event.keyCode == 13) {
gotopage(elem);
}
}

function gotopage(elem){
var newpage = ($(elem).val());
lastpage = parseInt(lastpage);
//first make sure there's something in the box; if not, stick the current page back in there and end the function
if (newpage == ''){$(elem).val(curpage);$(elem).blur();return false;}
//if the value is the same as the current page, do nothing
if (newpage == curpage){return false;}
//make sure the string has digits only
var numpattern = /^[0-9]+$/;
if (numpattern.test(newpage)) {
	//make sure the entered number is not too big or too small
	if (newpage > lastpage) {var errtype = "toobig"; errfunc(errtype);return false;}
	else if (newpage < 1) {var errtype = "tootiny"; errfunc(errtype);return false;}
	
	//if it's all good, send it on, but remove any leading zeroes, which break ArchivesSpace
	else {window.location.href = searchurl + 'page=' + parseInt(newpage, 10);}
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
