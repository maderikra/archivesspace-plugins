//resources load their content dynamically, so we need to wait until it's finished before adding our JS
if ((/resources/.test(window.location.pathname)) && (/edit/.test(window.location.pathname) === false)){
 $(document).ajaxComplete(addPrint);}

//but accession aren't, so the JS can be added immediately
if (/accessions/.test(window.location.pathname)){
 $(document).ready(addPrint);}


function addPrint() {
//checks to make sure a print friendly link hasn't already been added
if($("#printerbox").length == 0) {
//adds ID to the section we want to print
$( ".record-pane" ).attr( "id", "print_content" );
//adds print link
$( "#archivesSpaceSidebar").prepend( '<div id="printerbox" style=\"text-align:center\"><img src=\"/assets/printer_icon.png\"><a href=\"#\" onclick=\"window.open(\'/assets/print.html\')\">Print Friendly</a><$
        }}
