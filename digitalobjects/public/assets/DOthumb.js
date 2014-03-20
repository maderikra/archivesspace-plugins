//insert hostname of your contentDM site here (e.g. "cdm15821.contentdm.oclc.org" or your alias)
var cdmsite  = "";
//if you want to only insert thumbnails for a specific CDM collection, insert the collection IDs here separated by a comma (e.g., "p15821coll3,p15821coll7")
//to enable for all CDM collections, leave empty
var cdmcoll = "";

$(document).ready(insertthumb);
var digobj = '';	
function insertthumb() {
//make sure we're on a digital objects page
if (window.location.href.indexOf("digital_objects") > -1) {
	
		//get URL of digital object
		digobj = $("#file_versions").find("a").html();

		//check to see if it's a contentDM record
		if ((cdmsite != "") && (digobj.indexOf(cdmsite) > -1)) {
	
			//parse contentDM URL to get collection ID and record ID
			var urlparts = digobj.split("/");
			var collID = urlparts[6];
			var recID = urlparts[8];
	     	//if we're on the right collection and there's a valud record ID, insert a thumbnail 
			if (((cdmcoll.indexOf(collID) > -1) || (cdmcoll == "")) && (typeof recID !== "undefined")) {
			
				//set thumbnail URL
				var thumbURL = "http://" + cdmsite + "/utils/getthumbnail/collection/" + collID + "/id/" + recID;
				//wraps a new div around the summary headers, so we can stick the thumbnail inside next to it
				$("#summary").wrap("<div id='headerdiv'></div>"); 
				//inserts thumbnail inside iframe; also adds an a tag with a big span to make the thumbnail link to the record
				$("#summary").before("<div id='thumbdiv' style='float:left;width:175px;'><a href='" + digobj + "'><span style='position:absolute;width:175px;height:140px;z-index: 1;'></span></a><iframe height='140' frameborder='0' src='" + thumbURL + "'></iframe></div>");
				//wraps new div around summary to make it float next to thumbnail
				$("#summary").wrap("<div id='summdiv' style='float:left;width:70%;'></div>");
				} 
		}
	
		//check to see if it's an archive.org record
		else if (digobj.indexOf("archive.org") > -1) {
	
			//parse digital object URL to get ark ID
	         	var urlparts = digobj.split("/");
			var arkID = urlparts[4];
			//call the archive.org API to get the metedata for the record; callback function is above (jsonfunc)
			 $.ajax({
                    url: "https://archive.org/details/" + arkID,
                    dataType: 'jsonp',
					data: "&output=json&callback=jsonfunc"
                });
			} 
			
		//otherwise, do nothing
		else {return false;}
}
}

//function to parse archive.org JSON metadata to get thumbnail URL (called during jsonp callback)
function jsonfunc(dataWeGotViaJsonp){
//pulls the path to the thumbnail out of the JSON response
var archivethumb = dataWeGotViaJsonp.misc.image;
//wraps a new div around the summary headers, so we can stick the thumbnail inside next to it
$("#summary").wrap("<div id='headerdiv'></div>");
//inserts thumbnail inside iframe; also adds an a tag with a big span to make the thumbnail link to the record
$("#summary").before("<div id='thumbdiv' style='float:left;width:125px;'><a href='" + digobj + "'><span style='position:absolute;width:125px;height:175px;z-index: 1;'></span></a><iframe width='125' height='175' frameborder='0' src='" + archivethumb + "'></iframe></div>");
//wraps new div around summary to make it float next to thumbnail
$("#summary").wrap("<div id='summdiv' style='float:left;width:70%;'></div>");
			}


