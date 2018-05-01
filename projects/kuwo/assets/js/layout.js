/*
* @Author: edward
* @Date:   2016-09-11 19:24:20
* @Last Modified by:   edward
* @Last Modified time: 2018-04-29 23:59:28
*/

'use strict';
$(function(){
    var img = new Image(),
        bgimgSrc = "assets/img/bg-aoa-0" + (parseInt(Math.random()*3) + 1) + ".jpg"
    ;
    img.src = bgimgSrc;
    function layout (){
        var img_w = this.width,
            img_h = this.height,
            $win = $(window),
            win_w = $win.width(),
            win_h = $win.height(),
            img_ratio = img_w/img_h,
            win_ratio = win_w/win_h,
            initial = 100
        ;
        // console.log(win_w)
        // console.log(img_ratio)
        // console.log(win_h)

        while ((win_w * initial / img_ratio / 100) < win_h) {
            initial += 1;

        }   
        // adjust resizing background-image size
        $(".song-list-frame").css({
            height: win_h,
            backgroundImage: 'url(' + bgimgSrc + ')',
            backgroundSize: initial + "%"
        })
        $(".wait-for").css({
            lineHeight: win_h + 'px'
        })
    }
    img.onload = layout;
});