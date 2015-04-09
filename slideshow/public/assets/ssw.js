// JavaScript Document

function SlideShow_Jump(slidenum) {
    SlideShow_CurrentSlide = slidenum;
    SlideShow_ToggleSlideSet();
    return false;
}
function SlideShow_Previous() {
    SlideShow_CurrentSlide--;
    if (SlideShow_CurrentSlide == 0) SlideShow_CurrentSlide = SlideShow_MaxSlides;
    SlideShow_ToggleSlideSet();
    return false;
}
function SlideShow_Next() {
    SlideShow_CurrentSlide++;
    if (SlideShow_CurrentSlide > SlideShow_MaxSlides) SlideShow_CurrentSlide = 1;
    SlideShow_ToggleSlideSet();
    return false;
}
function SlideShow_TogglePlay() {
    var oThis = document.getElementById("ssw_toggle_control");
    SlideShow_Playing = !SlideShow_Playing;
    if (!SlideShow_Playing) {
        oThis.src = oThis.src.replace("stop", "play");
        clearTimeout(SlideShow_Timer);
    } else {
        oThis.src = oThis.src.replace("play", "stop");
        SlideShow_Next();
    }    
    return false;
}
function SlideShow_ToggleSlideSet() {
    clearTimeout(SlideShow_Timer);  
    var oThis, i;
    for (i = 1; i <= SlideShow_MaxSlides; i++) {
        oThis = document.getElementById("ssw_icon_" + i);
        oThis.className = (i == SlideShow_CurrentSlide) ? "ssw_icon_active" : "ssw_icon_inactive";
        oThis = document.getElementById("ssw_descript_" + i);
		  if  (i == SlideShow_CurrentSlide)
	   {$(oThis).fadeIn( 1500);}
	   else {$(oThis).fadeOut( 1500);}
      //  oThis.style.display = (i == SlideShow_CurrentSlide) ? "block" : "none";
        oThis = document.getElementById("ssw_slide_" + i);
       if  (i == SlideShow_CurrentSlide)
	   {$(oThis).fadeIn( 1500);}
	   else {$(oThis).fadeOut( 1500);}
	  //  oThis.style.display = (i == SlideShow_CurrentSlide) ? "block" : "none";
		
    }
    if (SlideShow_Playing) SlideShow_Timer = setTimeout(SlideShow_Next, SlideShow_DisplaySeconds * 1000);
}
