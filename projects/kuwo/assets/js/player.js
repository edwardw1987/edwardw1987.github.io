/*
* @Author: edward
* @Date:   2016-08-25 20:36:49
* @Last Modified by:   edward
* @Last Modified time: 2016-08-31 21:30:52
*/

'use strict';
$(function(){
        /*获取播放器*/
        function getPlayer(id) {
            return $(id);
        }
        var $player = getPlayer("#player"),
            /*歌曲列表*/
            $songListFrame = $(".song-list-frame");
        /*设置音频资源并播放*/
        function playAudio(data, rid) {
            $player.attr({
                "src": data.aacurl,

            }).data("rid",rid).get(0).play();
        }
        /*停止播放器*/
        function pausePlayer() {
           $player.get(0).pause();
        }
        /*获取音频资源*/
        function getMuiseByRid(rid, callBack) {
            $.ajax({
                url: "/api/km/getMuiseByRid",
                data: {
                    rid:rid
                },
                // async: false,
                type: "post"
            }).done(callBack);
        }
        /*更新专辑封面*/
        function updatePic(data){
            var newSrc = data.artist_pic240,
                $pic   = $('#pic_div img'),
                parts  = newSrc.split('/'),
                last   = parts.length - 1,
                picSrc = $pic.attr('src');
            if (!picSrc || picSrc.indexOf(parts[last]) < 0){
                console.log('diff');
                $pic.attr('src', newSrc).css('height',150);
            }
        }
        /*播放歌曲完整过程*/
        function playMuiseByRid(rid){
            function theCallBack(data){
                /*ajax回调*/
                playAudio(data, rid);
                // updatePic(data);
            }
            if (rid != $player.data("rid")) {
                getMuiseByRid(rid, theCallBack);
            } else {
                $player.get(0).play();
            }
        }
        /*播放下一首歌曲*/
        function playNextSong(){
            var $lastPlay = $('.last-play'),
                $nextPlay = $lastPlay.removeClass('last-play').next();
             /*判断是否有未播放的歌曲*/
            if ($nextPlay.length == 0) {
                return;
            } else {
                $nextPlay.addClass('last-play')
                    .find(".play-btn")
                    .children('span').addClass("fa-pause btn-active");
                playMuiseByRid($nextPlay.attr('data-rid'));
            }
        }
        /*初始化播放按钮样式*/
        function initPlayBtnClass() {
            $(".play-btn span").removeClass("fa-pause btn-active");
        }
        /*播放器事件*/
        $player.get(0).onended = function (e) {
            initPlayBtnClass();
            playNextSong();
        }

        /*获取rid*/
        function getRid($btn) {
            return $btn.closest(".list-group-item").attr("data-rid");
        }
        /*判断是否为关闭操作(当前播放按钮与用户按下是否为同一个)*/
        function isStopAction($btn) {
            return getRid($(".fa-pause")) == getRid($btn);
        }
        /*切换按钮样式*/
        function togglePlayBtnClass($btn){
            if (isStopAction($btn)) {
                $btn
                    .find("span").removeClass("fa-pause btn-active")
                    .closest(".list-group-item").removeClass("last-play");
            } else {
                $btn
                    .find("span").addClass("fa-pause btn-active")
                    .closest(".list-group-item").addClass("last-play")
                    .siblings().removeClass("last-play")
                    .find("span").removeClass("fa-pause btn-active");
            }
        }

        /*播放歌曲按钮事件*/
        $songListFrame.on("click", ".play-btn", function (e) {
            var $btn = $(this),
                rid = getRid($btn);
            pausePlayer();
            !isStopAction($btn) && playMuiseByRid(rid);
            /*注意顺序*/
            togglePlayBtnClass($btn);
        });
        /*下载按钮点击事件*/
        $songListFrame.on("click", ".download-btn", function (e) {
            var $btn = $(this),
                rid = getRid($btn);
            getMuiseByRid(rid, function (data){
                $btn.attr({
                    download: data.mp3url,
                    href: data.mp3url,
                });
            });

        });
        /*专辑封面按钮点击事件*/
        $(".arrow").on({
            click: function(e){
                var $this = $(this),
                    $pausedBtn = $(".fa-pause");
                if ($this.hasClass('arrow-left')) {
                    console.log('left');
                } else {
                    console.log('right');

                }

            }
        });

    });    