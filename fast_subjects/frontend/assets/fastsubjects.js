$(document).ready(insertfast);


function insertfast() {


//first check to see if we have data to be parsed in the URL; if not, stop here


var urlstring = window.location.search.substring(1);

if (urlstring.length > 0) {

var marcstring = urlstring.split("=")[1];


//check to make sure there is a value (it could be empty if someone clicks "add to archivesspace" when the box is empty)
if (marcstring.length > 0) {



//cleanup encoding as it comes over from the fast API
marcstring = decodeURIComponent(marcstring);


//strip of leading equal sign
marcstring = marcstring.substring(1,marcstring.length);

console.log(marcstring);

//change plus signs to spaces
marcstring = marcstring.replace(/\+/g, ' ');




//get 6xx field
var sixhundred = marcstring.substring(0,3);

console.log(sixhundred);

//get indicators
var firstindicator =  marcstring.substring(5,6);
var secondindicator = marcstring.substring(6,7);

console.log(firstindicator);
console.log(secondindicator);

//get position of $fast to find where the subject terms end
var fastpos =  marcstring.indexOf("$2fast"); 


//get fast number
var fastID = marcstring.substring((marcstring.indexOf("$0") + 2), marcstring.length);

//insert into form
$("#subject_authority_id_").val(fastID);

//set subject source as fast
$("#subject_source_ option[value='local']").removeAttr("selected");
$("#subject_source_ option[value='fast']").attr("selected", "selected");



//get all subject terms
var subjectterms = marcstring.substring(8,fastpos);

//get rid of URL encoded characters
subjectterms = decodeURI(subjectterms);

console.log(subjectterms);


//split at dollar sign to get all subfields
var subfields =  subjectterms.split("$"); 


console.log(subfields);

//count total subfields
var numberfields = subfields.length;



//create as many subfields boxes as there are subfields (start at 1 instead of 0, because the first box already exists)
for (i = 1; i < subfields.length; i++) {


//makes subfields as needed by copying the existing section (clunky, but I can't figure out how else to do this)
$( "#subject_terms__0_" ).clone().attr('id', 'subject_terms__' + i + '_').insertAfter( "#subject_terms__" + (i-1) + "_" );

//find and replace things
$('#subject_terms__' + i + '_ #subject_terms__0__term_').attr('id', 'subject_terms__' + i + '__term_');
$("#subject_terms__" + i + "_ label[for='subject_terms__0__term_']").attr("for", "subject_terms__" + i + "__term_");
$("#subject_terms__" + i + "_ label[for='subject_terms__0__term_type_']").attr("for", "subject_terms__" + i + "__term_type_");
$('#subject_terms__' + i + '_ #subject_terms__0__term_type_').attr('id', 'subject_terms__' + i + '__term_type_');
$("#subject_terms__" + i + "_ input[name='subject[terms][0][term]']").attr("name", "subject[terms][" + i + "][term]");
$("#subject_terms__" + i + "_ select[name='subject[terms][0][term_type]']").attr("name", "subject[terms][" + i + "][term_type]");
$('#subject_terms__' + i + '_ #subject_terms__0__vocabulary_').attr('id', 'subject_terms__' + i + '__vocabulary_');
$("#subject_terms__" + i + "_ input[name='subject[terms][0][vocabulary]']").attr("name", "subject[terms][" + i + "][vocabulary]");



}



//insert the stuff

//first, set top level subject type based on 6xx field
if (sixhundred == '651') {
$("#subject_terms__0__term_type_ option[value='topical']").removeAttr("selected");
$("#subject_terms__0__term_type_ option[value='geographic']").attr("selected","selected");

}

for (i = 0; i < subfields.length; i++) {

//insert value into top level subject
$("#subject_terms__" + i + "__term_" ).val(subfields[i].substring(1,subfields[i].length));


//get subfield code
var subfieldcode = subfields[i].substring(0,1);

//change topical option if necessary
if (subfieldcode == 'z'){
$("#subject_terms__" + i + "__term_type_ option[value='topical']").removeAttr("selected");
$("#subject_terms__" + i + "__term_type_ option[value='geographic']").attr("selected","selected");
}

if (subfieldcode == 'y'){
$("#subject_terms__" + i + "__term_type_ option[value='topical']").removeAttr("selected");
$("#subject_terms__" + i + "__term_type_ option[value='temporal']").attr("selected","selected");
}

if (subfieldcode == 'v'){
$("#subject_terms__" + i + "__term_type_ option[value='topical']").removeAttr("selected");
$("#subject_terms__" + i + "__term_type_ option[value='genre_form']").attr("selected","selected");
}




}

}

}

}
