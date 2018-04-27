$(function(){
    var config = {
        prevBtnSelector: ".btn-prev",
        nextBtnSelector: ".btn-next",
        imageSlot: {
            selector: ".slot", // default => `.img-slot`             
            images: [
                "http://i2.bvimg.com/642349/284476fd0da91d0a.jpg",
                "http://i2.bvimg.com/642349/bf5d16434897b6d1.jpg",
                "http://i2.bvimg.com/642349/e4afe4ff4b43bcf1.jpg",
                "http://i2.bvimg.com/642349/e7f50c4a86c84aa9.jpg",
                "http://i2.bvimg.com/642349/fa31a3708ba844a9.jpg",
            ]
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