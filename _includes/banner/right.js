
$(function(){
    var config = {
        direction: "right",
        prevBtnSelector: ".btn-prev",
        nextBtnSelector: ".btn-next",
        imageSlot: {
            selector: ".slot", // default => `.img-slot`             
        },
        buttonSlot:{
            selector: ".btn-slot",
            btnActiveClass: "banner-right-active",
            btnCommonClass: "banner-right"
        }
    } 
    $("#right").BigCornSlider(config);
})
