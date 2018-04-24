$(function(){
    //        垂直移动v 水平移动h
    $(".banner").BigCornSlider({
        imageSlot: {
            selector: ".slot", // default => `.img-slot`             
            images: [
                "assets/img/lunch_1.jpg",
                "assets/img/lunch_2.jpg",
                "assets/img/slider/1.jpg",
                "assets/img/slider/2.jpg",
                "assets/img/slider/3.jpg",
                "assets/img/slider/4.jpg",
                "assets/img/slider/5.jpg",
            ]
        },
        buttonSlot: {
            selector: ".btn-slot", //default value
            btnActiveClass: "highlight",
        },
             // defaults
        direction: "v",
    });
})