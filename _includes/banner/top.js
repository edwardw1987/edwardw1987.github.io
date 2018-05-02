$(function(){

  var config = {
      prevBtnSelector: ".btn-prev",
      nextBtnSelector: ".btn-next",
      imageSlot: {
          selector: ".slot", // default => `.img-slot`             
      },
      buttonSlot:{
          selector: ".btn-slot",
          btnActiveClass: "banner-top-active",
          btnCommonClass: "banner-top",
          showNum: true,
      },
      direction: "top"
  } 
    $("#top").BigCornSlider(config);
})
