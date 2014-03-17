//adds unique class to the list items we want to sort, with sequential numbers for each separate UL (so they'll get sorted separately)
//since there are no div IDs (grumble), it assumes the list items we want to sort will always be children of an h5 heading
function addclasses () {

//left hand facets
	$("h5").next("ul").each(function( index ) {
	$(this).attr("id", "sortdateUL" + index);   
	$('#sortdateUL' + index).find('li').addClass('sortdateLI' + index);  
	 });

//subjects and agents in resource records (only on public side)
$("#linked_agents").find("li").addClass("sortagents");
$("#subjects").find("li").addClass("sortsubjects");

}

//apparently ArchivesSpace is loading its own jquery on the public site below the footer, so it will overwrite this custom function unless we define our own jquery library for this script 
$myjq = $.noConflict();

//sort function, don't ask me how it works, i just copied it from somewhere
//this function shouldn't ever need to be edited
$myjq.fn.sortElements = (function(){ 
    var sort = [].sort;
    return function(comparator, getSortable) {
        getSortable = getSortable || function(){return this;};
        var placements = this.map(function(){
            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,
                // Since the element itself will change position, we have
                // to have some way of storing its original position in
                // the DOM. The easiest way is to have a 'flag' node:
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );
            return function() {
                if (parentNode === this) {
                    throw new Error(
                        "You can't sort elements if any one is a descendant of another."
                    );
                }
                // Insert before flag:
                parentNode.insertBefore(this, nextSibling);
                // Remove flag:
                parentNode.removeChild(nextSibling);
            };
        });
        return sort.call(this, comparator).each(function(i){
            placements[i].call(getSortable.call(this));
        });
    };
})();


//function to sort list items with specified class (which was added earlier)
function rewriteList () {
//first checks to see how many separate lists there are
var numberofwindows = $('ul[id^=sortdateUL]').length;
//runs a loop to rewrite the list for each menu in turn 
//if you only want to sort a single menu, remove the FOR loop and replace ('li.sortLI' + i) with ('li.<insert class here>') for whichever one you want to sort
//i think the sort order can be reversed by switching the > to <, but i haven't tried it
for (var i=0;i<numberofwindows;i++)
{
$myjq('li.sortdateLI' + i).sortElements(function(a, b){
    return $(a).text() > $(b).text() ? 1 : -1;
});

}

//sort the agents list in a resource record (only on public side)
$myjq('li.sortagents').sortElements(function(a, b){
    return $(a).text() > $(b).text() ? 1 : -1;
});

//sort the subjects list in a resource record (only on public side)
$myjq('li.sortsubjects').sortElements(function(a, b){
    return $(a).text() > $(b).text() ? 1 : -1;
});
}




$myjq(document).ready(addclasses);
$myjq(window).load(rewriteList);
$ = $myjq.noConflict();

