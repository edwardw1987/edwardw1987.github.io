$(function(){
    var config = {
        prevBtnSelector: ".btn-prev",
        nextBtnSelector: ".btn-next",
        imageSlot: {
            selector: ".slot", // default => `.img-slot`             
        },
        buttonSlot:{
            selector: ".btn-slot",
            btnActiveClass: "banner-bottom-active",
            btnCommonClass: "banner-bottom",
            showNum: true,
        },
        direction: "bottom"
    } 
    $("#bottom").BigCornSlider(config);
})