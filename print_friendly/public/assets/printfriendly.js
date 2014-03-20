$(document).ready(function () {
//adds IDs to the section we want to print
$( ".title-pane .row-fluid .span9" ).attr( "id", "print_title" );
$( ".content-pane .row-fluid .span9" ).attr( "id", "print_content" );


          //adds print link if it doesn't already exist
          if ($("#printlink").length == 0){
           $( ".title-pane .row-fluid .span3").append( '<br /><div id=\"printlink\" style=\"text-align:center\"><img src=\"/assets/printer_icon.png\"><a href=\"#\" onclick=\"window.open(\'/assets/print.html$
          }



        });
