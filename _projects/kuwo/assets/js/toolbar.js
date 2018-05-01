/**
 * Created by edward on 16-9-1.
 */
$(function(){
    var kuwo = {
        host_url: "http://search.kuwo.cn/",
        abslist: null,
        searchMusic(sourceKey){
            var self = kuwo;
            var searchSourceKey = sourceKey,
                searchMusicPage = 0,
                searchMusicRn = 12
            ;
            var url = this.host_url+"r.s?all="+encodeURIComponent(sourceKey)+"&ft=music&newsearch=1&itemset=web_2013&client=kt&cluster=0&pn="+searchMusicPage+"&rn="+searchMusicRn+"&rformat=json&callback=kuwo.searchMusicResult&encoding=utf8";
            
            searchMusicLoad = false;
            $.getScript(url);
        },
        searchMusicResult(data){
            alert(data);
            console.log(jsondata)
            // jsondata
            var self = kuwo;
            self.abslist = jsondata;
            
            // var rid = self.abslist[0]["MUSICRID"];
            var rid = self.abslist.abslist[0]["MUSICRID"];
            // return;
            $.ajax({
                type: "get",
                data: {rid: rid},
                url: "http://localhost/kuwoapi.php"
            }).then(function(data){
                if (data.success){
                    console.log(rid);
                    console.log(data.result.aacdl)
                    $("#player").attr({
                        src: data.result.aacdl})
                    .data("rid", rid).get(0).play();
                    return;
                }
                alert("error");
            })
        },
    }
    /*搜索歌曲*/
    var $songListFrame = $(".song-list-frame");
    var isSearching = false;
    /*加载中。。。*/
    function animateLoadingStart() {
        $("#error-msg").hide();
        $("#kwd").val("");
        $(".wait-for").show();
    }
    function animateLoadingEnd(callback) {
        $(".wait-for").hide();
        if (callback) callback();
    }
    /*自动高亮当前播放歌曲*/
    function highlightPlayingSong() {
        for (var i = 0,
                 $item = $(".song-list-item"),
                 lg = $item.length;
             i < lg; i++ ){
            var $i = $($item[i]),
                $player = $("#player");
            if ($player.data("rid") == $i.data("rid") && !$player.get(0).paused) {
                $i
                    .prependTo("#song-list")
                    // .insertAfter("#song-list li:eq(2)")
                    .addClass("last-play")
                    .find(".play-btn span").addClass("fa-pause btn-active");
                console.log("found!")
                break
            }
        }
    }
    function searchMusic() {
        // if (isSearching) return;
        isSearching = true;
        animateLoadingStart();
        kuwo.searchMusic($("#kwd").val())
        return;
        $songListFrame.load(songListSrc, null, function () {
            animateLoadingEnd(function () {
                highlightPlayingSong()
                $songListFrame.find(".song-list-item").fadeOut(0).fadeIn();
                isSearching = false;
            });
        })
    }
    /*搜索按钮事件*/
    var $searchBar = $(".search-bar"),
        $btnItems = $("#btn-items"),
        $btnGo = $("#btn-go");
    function doSearch(fn, signal) {
        if (!signal) {
            $searchBar.fadeToggle(200);
            $btnGo.find("span").toggleClass("fa-rotate-90 btn-active");
        }
        if (fn) fn();
    }
    /*输入框值改变*/
    $("#kwd").on("keypress", function (e) {
        if (e.keyCode == 13){
            e.preventDefault();
            if ($("#kwd").val() == "") {
                doSearch();
                return;
            }
            doSearch(searchMusic);
        }


    })
    /*toolbar*/
    var isToggling = false;
    function toggleToolBar() {
        if (isToggling) return;
        isToggling = true;
        var perItemHeight = 46,
            height = $btnItems.height();
        console.log(height);
        $("#btn-bars")
            .children("span").toggleClass("fa-bars fa-close");
        $btnItems.css("height",
            height == perItemHeight ?
            $btnItems.find(".btn").length * perItemHeight : perItemHeight);
        setTimeout(function(){
            isToggling = false;
            $(this).blur();
        }, 300);
    }
    $("#btn-bars").on({
        click: function(){
          toggleToolBar()
        }
    })
    /*分页按钮*/
    $songListFrame.on("click", ".pager li", function (e) {
        if (isSearching) return;
        isSearching = true;
        var $li = $(this),
            path = $li.data("path");

        if (path == undefined) return;
        animateLoadingStart();
        setTimeout(function () {
            isSearching = false;
        },1000);
        $songListFrame.load("/spa/song/list" + path, null, function () {
            animateLoadingEnd(function () {
                highlightPlayingSong();
                $songListFrame.find(".song-list-item").fadeOut(0).fadeIn();
                isSearching = false;
            });
        });
    })
});
