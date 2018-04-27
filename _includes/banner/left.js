$(function(){
    //default direction toward the `left`
    var config = {
        prevBtnSelector: ".btn-prev",
        nextBtnSelector: ".btn-next",
        imageSlot: {
            selector: ".slot", // default => `.img-slot`             
            images: []
        },
        buttonSlot:{
            selector: ".btn-slot",
            btnActiveClass: "banner-left-active",
            btnCommonClass: "banner-left"
        }
    } 
    $("#left").BigCornSlider(config);
});