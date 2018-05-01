//http://player.kuwo.cn/gu/getAlbumInfo?flag=**测试接口
function tttt(f){
    var par = 'flag='+f;
    jQuery.ajax(
        {
            url:'http://player.kuwo.cn/webmusic/gu/getAlbumInfo',
            type: 'get',
            data:par,
            success: function (resp) {
                alert("resp:"+resp)
        }
        }); 
}
var reqTime=0;
var isBangLoaded = false;
function testBangLoad(){
    if(!isBangLoaded){//未完成
        //alert("未完成，需要重新请求");
        getWebBang();
    }else{//完成
        //alert("一共请求次数"+reqTime);
        isBangLoaded = true;
    }
}
function getWebBang(){
    reqTime++;
    if(!isBangLoaded){//未完成
        var par = 'pn=1&pr=10';
        jQuery.ajax(
        {
                    url:'http://player.kuwo.cn/webmusic/gu/getwebplayerbang',
                    type: 'get',
                    data:par,
                    success: function (resp) {
                        eval(resp);
                        currBang_con = kw_newbang.list;
                        re_bangList(0);
                        currBang_con = kw_hotbang.list;
                        re_bangList(1);
                        currBang_con = kw_rihanbang.list;
                        re_bangList(2);
                        currBang_con = kw_oumeibang.list;
                        re_bangList(3);
                        NewMusicListAllPlay = kw_newbang.list;
                        HotMusicListAllPlay = kw_hotbang.list;
                        RihanMusicListAllPlay = kw_rihanbang.list;
                        OumeiMusicListAllPlay = kw_oumeibang.list;
                    },
                    error:function(resp){
                        /*if(reqTime>3){
                            getWebBangData(0);
                        }
                        reqTime++;*/
                        getWebBang();
                    }
        }); 
        var nextReqTime = reqTime*1000+3000;
        if(!isBangLoaded){//未完成
            if(nextReqTime<10000){
                setTimeout(function(){
                    testBangLoad();
                },nextReqTime);
            }
        }
    }else{//完成
        
    }

}
var currBang_con = "";
var bangType = "newsong";
function re_bangList(type){
    //alert("re_bangList("+type+")");
    if(type==0){
        //alert(0);
        bangType = "newsong";
        //alert("01");
        //currBang_con = kw_newbang.list;
        //alert("02");
        //NewMusicListAllPlay = kw_newbang.list;
        //alert("03");
    }else if(type==1){
        //alert(1);
        bangType = "hotsong";
        //currBang_con = kw_hotbang.list;
        
    }else if(type==2){
        //alert(2);
        bangType = "rihansong";
        //currBang_con = kw_rihanbang.list;
        
    }else if(type==3){
        //alert(3);
        bangType = "oumeisong";
        //currBang_con = kw_oumeibang.list;
    }
    var htmlArray = [];
    var currBangLen = currBang_con.length < 8 ? currBang_con.length:8;
    for(var i=0; i<currBangLen;i++){
        var s = currBang_con[i];
        var mrid=s.rid;
        var idx = i + 1;
        idx = idx < 10 ? "0"+idx : idx;
        var rand = getTimeParam2();
        var htmlchildarray = [];
        var xia = 0;
        htmlchildarray[xia++] = '<ul';
        htmlchildarray[xia++] = ' id="music';
        htmlchildarray[xia++] = mrid+rand;
        htmlchildarray[xia++] = '" title="';
        htmlchildarray[xia++] = '双击播放';
        htmlchildarray[xia++] = '" onmouseout="overoutColorByRanId(\'music'+mrid+rand+'\',\'nobg\');" onmouseover="overoutColorByRanId(\'music'+mrid+rand+'\',\'havebg\');" class=""';
        htmlchildarray[xia++] = '>';
        htmlchildarray[xia++] = '<li class="num1">';
        htmlchildarray[xia++] = idx+'.';
        htmlchildarray[xia++] = '</li>';
        htmlchildarray[xia++] = '<li class="song">';
        htmlchildarray[xia++] = '<a href="javascript:wb_playSong(\''+mrid+'\',\''+reQuot(returnSpecialChar(s.name))+'\',\''+reQuot(returnSpecialChar(s.art))+'\');" title="播放歌曲：'+s.name+'">';
        htmlchildarray[xia++] = s.name;
        htmlchildarray[xia++] = '</a></li>';
        htmlchildarray[xia++] = '<li class="songer"><a href="javascript:someArtist(\''+s.artid+'\')" title="查看歌手：'+s.art+'">';
        htmlchildarray[xia++] = s.art;
        htmlchildarray[xia++] = '</a></li>';
        htmlchildarray[xia++] = '<li class="listicon">';
        htmlchildarray[xia++] = '<a hidefocus="true" href="javascript:share(\'music'+mrid+rand+'\',\''+reQuot(returnSpecialChar(s.name))+'\',\''+mrid+'\',\''+type+'\');" class="icon_fx" title="分享歌曲">'; 
        htmlchildarray[xia++] = '</a>';
        htmlchildarray[xia++] = '<a hidefocus="true" href="javascript:wb_playSong(\''+mrid+'\',\''+reQuot(returnSpecialChar(s.name))+'\',\''+reQuot(returnSpecialChar(s.art))+'\');" class="icon_play" title="播放歌曲">';
        htmlchildarray[xia++] = '</a>';
        htmlchildarray[xia++] = '<a hidefocus="true" href="javascript:ksingtan(1)" class="icon_kg" title="K歌">';
        htmlchildarray[xia++] = '</a>';
        htmlchildarray[xia++] = '</li>';
        htmlchildarray[xia++] = '</ul>';
        htmlArray[i] = htmlchildarray.join(''); 
    }
    var bigString = "";
    bigString = htmlArray.join('');
    //alert(bigString);
    $("#"+bangType).html(bigString);
    if(type==3){
        isBangLoaded = true;
    }
    bigString = "";
}




function getWebBangData(f){
    var par = 'syId='+f+'&pn=1&pr=8';
    jQuery.ajax(
    {
                url:'http://player.kuwo.cn/webmusic/gu/getwebplaybang',
                type: 'get',
                data:par,
                success: function (resp) {
                    //alert("resp:"+resp);
        //$("#song"+f).find("p").html(resp);
                    eval("bangLst"+f+" = "+resp);
                    if(f==0){
                        re_bangList0();
                    }else if(f==1){
                        re_bangList1();
                    }else if(f==2){
                        re_bangList2();
                    }else if(f==3){
                        re_bangList3();
                    }
                }
    }); 
}
var currBangCon0;
function re_bangList0(){
    currBangCon0 = bangLst0.list;
    var htmlArray = [];
    for(var i=0; i<8;i++){
        var s = currBangCon0[i];
        var mrid=s.rid;
        var idx = i + 1;
        idx = idx < 10 ? "0"+idx : idx;
        var htmlchildarray = [];
        var xia = 0;
        htmlchildarray[xia++] = '<ul';
        htmlchildarray[xia++] = ' id="music';
        htmlchildarray[xia++] = mrid;
        htmlchildarray[xia++] = '" title="';
        htmlchildarray[xia++] = '双击播放';
        htmlchildarray[xia++] = '" onmouseout="overoutColor(this,\'nobg\');" onmouseover="overoutColor(this,\'havebg\');" class=""';
        htmlchildarray[xia++] = '>';
        htmlchildarray[xia++] = '<li class="num1">';
        htmlchildarray[xia++] = idx+'.';
        htmlchildarray[xia++] = '</li>';
        htmlchildarray[xia++] = '<li class="song">';
        htmlchildarray[xia++] = '<a href="javascript:wb_playSong(\''+mrid+'\',\''+s.name+'\',\''+s.art+'\');" title="播放歌曲：'+s.name+'">';
        htmlchildarray[xia++] = s.name;
        htmlchildarray[xia++] = '</a></li>';
        htmlchildarray[xia++] = '<li class="songer"><a href="javascript:someArtist(\''+s.artid+'\')" title="查看歌手：'+s.art+'">';
        htmlchildarray[xia++] = s.art;
        htmlchildarray[xia++] = '</a></li>';
        htmlchildarray[xia++] = '<li class="listicon">';
        htmlchildarray[xia++] = '<a hidefocus="true" href="javascript:sharemusic(\''+s.name+'\',\''+mrid+'\',event);" class="icon_fx" title="分享歌曲">'; 
        htmlchildarray[xia++] = '</a>';
        htmlchildarray[xia++] = '<a hidefocus="true" href="javascript:wb_playSong(\''+mrid+'\',\''+s.name+'\',\''+s.art+'\');" class="icon_play" title="播放歌曲">';
        htmlchildarray[xia++] = '</a>';
        htmlchildarray[xia++] = '</li>';
        htmlchildarray[xia++] = '</ul>';
        htmlArray[i] = htmlchildarray.join(''); 
    }
    var bigString0 = "";
    bigString0 = htmlArray.join('');
    //alert(bigString);
    $("#newsong").html(bigString0);
    bigString0 = "";
    getWebBangData(1);
}
var currBangCon1;
function re_bangList1(){
    currBangCon1 = bangLst1.list;
    var htmlArray = [];
    for(var i=0; i<8;i++){
        var s = currBangCon1[i];
        var mrid=s.rid;
        var idx = i + 1;
        idx = idx < 10 ? "0"+idx : idx;
        var htmlchildarray = [];
        var xia = 0;
        htmlchildarray[xia++] = '<ul';
        htmlchildarray[xia++] = ' id="music';
        htmlchildarray[xia++] = mrid;
        htmlchildarray[xia++] = '" title="';
        htmlchildarray[xia++] = '双击播放';
        htmlchildarray[xia++] = '" onmouseout="overoutColor(this,\'nobg\');" onmouseover="overoutColor(this,\'havebg\');" class=""';
        htmlchildarray[xia++] = '>';
        htmlchildarray[xia++] = '<li class="num1">';
        htmlchildarray[xia++] = idx+'.';
        htmlchildarray[xia++] = '</li>';
        htmlchildarray[xia++] = '<li class="song">';
        htmlchildarray[xia++] = '<a href="javascript:wb_playSong(\''+mrid+'\',\''+s.name+'\',\''+s.art+'\');" title="播放歌曲：'+s.name+'">';
        htmlchildarray[xia++] = s.name;
        htmlchildarray[xia++] = '</a></li>';
        htmlchildarray[xia++] = '<li class="songer"><a href="javascript:someArtist(\''+s.artid+'\')" title="查看歌手：'+s.art+'">';
        htmlchildarray[xia++] = s.art;
        htmlchildarray[xia++] = '</a></li>';
        htmlchildarray[xia++] = '<li class="listicon">';
        htmlchildarray[xia++] = '<a hidefocus="true" href="javascript:sharemusic(\''+s.name+'\',\''+mrid+'\',event);" class="icon_fx" title="分享歌曲">'; 
        htmlchildarray[xia++] = '</a>';
        htmlchildarray[xia++] = '<a hidefocus="true" href="javascript:wb_playSong(\''+mrid+'\',\''+s.name+'\',\''+s.art+'\');" class="icon_play" title="播放歌曲">';
        htmlchildarray[xia++] = '</a>';
        htmlchildarray[xia++] = '</li>';
        htmlchildarray[xia++] = '</ul>';
        htmlArray[i] = htmlchildarray.join(''); 
    }
    var bigString1 = "";
    bigString1 = htmlArray.join('');
    //alert(bigString);
    $("#hotsong").html(bigString1);
    bigString1 = "";
    getWebBangData(2);
}
var currBangCon2;
function re_bangList2(){
    currBangCon2 = bangLst2.list;
    var htmlArray = [];
    for(var i=0; i<8;i++){
        var s = currBangCon2[i];
        var mrid=s.rid;
        var idx = i + 1;
        idx = idx < 10 ? "0"+idx : idx;
        var htmlchildarray = [];
        var xia = 0;
        htmlchildarray[xia++] = '<ul';
        htmlchildarray[xia++] = ' id="music';
        htmlchildarray[xia++] = mrid;
        htmlchildarray[xia++] = '" title="';
        htmlchildarray[xia++] = '双击播放';
        htmlchildarray[xia++] = '" onmouseout="overoutColor(this,\'nobg\');" onmouseover="overoutColor(this,\'havebg\');" class=""';
        htmlchildarray[xia++] = '>';
        htmlchildarray[xia++] = '<li class="num1">';
        htmlchildarray[xia++] = idx+'.';
        htmlchildarray[xia++] = '</li>';
        htmlchildarray[xia++] = '<li class="song">';
        htmlchildarray[xia++] = '<a href="javascript:wb_playSong(\''+mrid+'\',\''+s.name+'\',\''+s.art+'\');" title="播放歌曲：'+s.name+'">';
        htmlchildarray[xia++] = s.name;
        htmlchildarray[xia++] = '</a></li>';
        htmlchildarray[xia++] = '<li class="songer"><a href="javascript:someArtist(\''+s.artid+'\')" title="查看歌手：'+s.art+'">';
        htmlchildarray[xia++] = s.art;
        htmlchildarray[xia++] = '</a></li>';
        htmlchildarray[xia++] = '<li class="listicon">';
        htmlchildarray[xia++] = '<a hidefocus="true" href="javascript:sharemusic(\''+s.name+'\',\''+mrid+'\',event);" class="icon_fx" title="分享歌曲">'; 
        htmlchildarray[xia++] = '</a>';
        htmlchildarray[xia++] = '<a hidefocus="true" href="javascript:wb_playSong(\''+mrid+'\',\''+s.name+'\',\''+s.art+'\');" class="icon_play" title="播放歌曲">';
        htmlchildarray[xia++] = '</a>';
        htmlchildarray[xia++] = '</li>';
        htmlchildarray[xia++] = '</ul>';
        htmlArray[i] = htmlchildarray.join(''); 
    }
    var bigString2 = "";
    bigString2 = htmlArray.join('');
    //alert(bigString);
    $("#oumeisong").html(bigString2);
    bigString2 = "";
    getWebBangData(3);
}
var currBangCon3;
function re_bangList3(){
    currBangCon3 = bangLst3.list;
    var htmlArray = [];
    for(var i=0; i<8;i++){
        var s = currBangCon3[i];
        var mrid=s.rid;
        var idx = i + 1;
        idx = idx < 10 ? "0"+idx : idx;
        var htmlchildarray = [];
        var xia = 0;
        htmlchildarray[xia++] = '<ul';
        htmlchildarray[xia++] = ' id="music';
        htmlchildarray[xia++] = mrid;
        htmlchildarray[xia++] = '" title="';
        htmlchildarray[xia++] = '双击播放';
        htmlchildarray[xia++] = '" onmouseout="overoutColor(this,\'nobg\');" onmouseover="overoutColor(this,\'havebg\');" class=""';
        htmlchildarray[xia++] = '>';
        htmlchildarray[xia++] = '<li class="num1">';
        htmlchildarray[xia++] = idx+'.';
        htmlchildarray[xia++] = '</li>';
        htmlchildarray[xia++] = '<li class="song">';
        htmlchildarray[xia++] = '<a href="javascript:wb_playSong(\''+mrid+'\',\''+s.name+'\',\''+s.art+'\');" title="播放歌曲：'+s.name+'">';
        htmlchildarray[xia++] = s.name;
        htmlchildarray[xia++] = '</a></li>';
        htmlchildarray[xia++] = '<li class="songer"><a href="javascript:someArtist(\''+s.artid+'\')" title="查看歌手：'+s.art+'">';
        htmlchildarray[xia++] = s.art;
        htmlchildarray[xia++] = '</a></li>';
        htmlchildarray[xia++] = '<li class="listicon">';
        htmlchildarray[xia++] = '<a hidefocus="true" href="javascript:sharemusic(\''+s.name+'\',\''+mrid+'\',event);" class="icon_fx" title="分享歌曲">'; 
        htmlchildarray[xia++] = '</a>';
        htmlchildarray[xia++] = '<a hidefocus="true" href="javascript:wb_playSong(\''+mrid+'\',\''+s.name+'\',\''+s.art+'\');" class="icon_play" title="播放歌曲">';
        htmlchildarray[xia++] = '</a>';
        htmlchildarray[xia++] = '</li>';
        htmlchildarray[xia++] = '</ul>';
        htmlArray[i] = htmlchildarray.join(''); 
    }
    var bigString3 = "";
    bigString3 = htmlArray.join('');
    //alert(bigString);
    $("#rihansong").html(bigString3);
    bigString3 = "";
}
var subnavObj;
var lrcObj;
var phbObj;
var artistObj;
var artListObj;
var albumObj;
var gedanObj;
var searchObj;
var tagChildContainerObj;
var xcObj;
var centerLoadingObj;

var songerAreaObj;
var bangListAllPlay;
var gedanListAllPlay;
var artmusicListAllPlay;
var searchmusicListAllPlay;
var albummusicListAllPlay;

//默认图片 默认路径
var host_url = "http://search.kuwo.cn/";
var artist_default_img = "http://image.kuwo.cn/webplayer2013/img/kuwo.jpg";
var artist_prefix = "http://img4.kwcdn.kuwo.cn:81/star/starheads/";
var album_default_img = "http://image.kuwo.cn/webplayer2013/img/kuwo.jpg";
var album_prefix = "http://img1.kwcdn.kuwo.cn:81/star/albumcover/";
var mv_default_img = "http://image.kuwo.cn/webplayer2013/img/MV2.jpg";
var mv_prefix = "http://img1.kwcdn.kuwo.cn:81/wmvpic/";
var default_img = "http://image.kuwo.cn/webplayer2013/img/kuwo.jpg";
var isJump=false;
var currentTagId = -1;
var currentSource = 99;

var NewMusicListAllPlay;
var HotMusicListAllPlay;
var OumeiMusicListAllPlay;
var RihanMusicListAllPlay;

var isIE6 = $.browser.msie && $.browser.version=="6.0" == true;
var isIE = !!(window.attachEvent && !window.opera);

var default_img = "http://image.kuwo.cn/webplayer2013/img/kuwo.jpg";

$(function(){
    //将jquery对象获取并存起来
    subnavObj = $("#s_nav");
    lrcObj = $("#lrc_con");
    phbObj = $("#phb_con");
    artistObj = $("#artist_con");
    artListObj = $("#artist_list");
    albumObj = $("#album_con");
    gedanObj = $("#gedan_con");
    searchObj = $("#search_con");
    tagChildContainerObj = $("#tagChildContainer");
    xcObj = $("#xiuchang");
    centerLoadingObj = $("#quku_page_load");    
    //双击单曲条播放歌曲
    $(".dclick>ul").live("dblclick",function(){
        var boSAtring = $(this).find(".song a").attr("href").substring(11);
        eval(boSAtring);
    });//
    $(".jiu_biglist>ul").live("dblclick",function(){
        var boSAtring = $(this).find(".song a").attr("href").substring(11);
        eval(boSAtring);
    });
    $(".side_left1_con>ul").live("dblclick",function(){
        var boSAtring = $(this).find(".iSongName a").attr("href").substring(11);
        eval(boSAtring);
        $(this).trigger("click");
    });
});
//换肤
function change(){
    $(".s_top").attr("style","background:url('http://image.kuwo.cn/webplayer2013/img/bgp/lanse.jpg') repeat scroll 0 0 transparent;");
    $(".player").attr("style","background:url('http://image.kuwo.cn/webplayer2013/img/bgp/lanse.jpg') repeat scroll 0 0 transparent;");
}
//关闭con_right中的未隐藏部分(今日推荐，搜索初始页，秀场使用)
function closeClear(){
    $("#lrc_left").hide();
    lrcObj.hide();
    artListObj.hide();
    tagChildContainerObj.hide();
    phbObj.hide();
    artistObj.hide();
    albumObj.hide();
    gedanObj.hide();
    searchObj.hide();
}
function OnOff(TagName){
    var obj = document.getElementById(TagName);
    if(obj.style.display==""||obj.style.display=="block"){
        $("#"+TagName+"").hide();
    }else{
        $("#"+TagName+"").show();
    }
}
//点击页面后 弹出框隐藏
$(document).ready(function() {
    $("body").click(function() {
                        $("#tanId").hide();
                        $("#moreoption").hide();
                        $("#fsId").hide();
                        $("#sharedqId").hide();
                    });
        }); 
function setPosition(obj){
    var tanObj  = $("#"+obj);
    var tanwidth = document.documentElement.clientWidth;
    var tanheight = document.documentElement.clientHeight;
    var leftwith = (tanwidth-310)/2;
    //var topheight = (tanheight-180)/2;
    tanObj.css("left",leftwith+"px");
    //tanObj.css("top",topheight+"px");
}
//播放相关
//播放模式type = loop|single|order|random 
//顺序循环|单曲循环|顺序|随机
function setPlayOrder(type) {
    $("#singleId").removeClass();
    $("#orderId").removeClass();
    $("#loopId").removeClass();
    $("#randomId").removeClass();
    WebPlayer.setPlayType(type);
    $("#" + type + "Id").addClass("jiu_tannow");
    $("#shuxuId").removeClass();
    if (type == "single") {
        $("#shuxuId").addClass("danxun");
        $("#mosiname").html("单曲循环");
    } else if (type == "order") {
        $("#shuxuId").addClass("shunxu");
        $("#mosiname").html("顺序播放");
        WebPlayer.setPlayType("loop");
    } else if (type == "loop") {
        $("#shuxuId").addClass("xunhuan");
        $("#mosiname").html("循环播放");
    } else if (type == "random") {
        $("#shuxuId").addClass("suiji");
        $("#mosiname").html("随机播放");
    }
}
/*  拼接html并将它显示出来     */
function drawUls(htm_new) { 
    if(htm_new==null||""==htm_new){
        return;
    }
    var htmlNow = htm_new.join("");
    var olditem = $("#side_left1_con_pl");
    if(olditem.length>0){
        // 先播放列表有内容
        var htm_old = olditem.html();
        olditem.html(htm_old+htmlNow);
    }else{
        // 原播放列表没有内容
        var playLbObj = $("#playlbId1");
        var head =  '<div style="height:328px;" class="side_left1_con" id = "side_left1_con_pl">';
        var htmTail = '</div>';
        playLbObj.html(head+htmlNow+htmTail);
    }
}
/* 优化“全部播放”化界面方法     */
function addBangList(list,flag){
    var htm = [];
    if (list != null) {
        swapLbTab(1);
        var len = list.length;
        for (var i = 0; i < len; i++) {
            var s = list[i];
            var rid = "" ;
            var name = "";
            var art = "";
            // 1：为 排行榜 分类结果歌曲 专辑结果 等歌曲的全部添加   2： 歌手下歌曲   3：搜索结果 全部添加
            if(flag==1){
                rid = "MUSIC_"+s.id;
                name = s.name;
                art = s.artist;
            }else if(flag==2){//addSongnoplay("MUSIC_"+s.musicrid, s.name, s.artist);
                rid = "MUSIC_"+s.musicrid;
                name = s.name;
                art = s.artist;
            }else if(flag==3){  //addSongnoplay(s.MUSICRID, s.SONGNAME, s.ARTIST);  
                rid = s.MUSICRID;
                name = s.SONGNAME;
                art = s.ARTIST;
            }else if(flag==4){
                rid = s.rid;
                name = s.name;
                art = s.art;
            }else if(flag==5){
                rid = s.rid;
                name = s.name;
                art = s.art;
            }
            if (!checkcfrid(rid)) {
                var retOk = WebPlayer.addMusic(rid);
                if (retOk) {
                    htm[htm.length] = '<ul class="itemUl" style="" id="pl'+rid+'"  onmouseout="overoutColor(this,\'itemUl\');SetBlackText(this);" onmouseover="overoutColor(this,\'itemUl itemUl_def\');SetWhiteText(this);">';
                    htm[htm.length] = '<li class="iSongName"><a style="" href="javascript:playSong(\''+ rid+ '\');" title="播放歌曲:'+name.replace(new RegExp("\"", "gm"), "&quot;")+'">'+name.replace(new RegExp("\"", "gm"), "&quot;")+'</a></li>';
                    htm[htm.length] = '<li class="iSonger"><a style="" href="javascript:c_search_link(\''+art.replace(new RegExp("\"", "gm"), "&quot;")+'\');" title="搜索歌手:'+art.replace(new RegExp("\"", "gm"), "&quot;")+'">'+art.replace(new RegExp("\"", "gm"), "&quot;")+'</a></li>';
                    //htm[htm.length] = '<li><a class="more_icon" href="javascript:more_option(\''+rid+'\',\'pl'+rid+'\');" title="更多"></a></li>';
                    htm[htm.length] = '<li><a class="more_icon" href="javascript:downMusicBox()" title="下载" target="_blank"></a></li>';
                    htm[htm.length] = '<li><a class="lj_icon" href="javascript:delPlSong(\''+ rid + '\');" title="删除歌曲"></a></li>';
                    htm[htm.length] = '</ul>';
                    m_add_song({
                                'name' : name,
                                'art' : art,
                                'rid' : rid,
                                'dur' : '1'
                            });
                }
            }
        }
        if(htm!=""){
            //fadeInImage();
        }
    }
    return htm;
}
/* 首页酷我热歌榜全部添加并播放  
function playAllHotBang(){
    if (HotMusicListAllPlay!=null) {        
        var f_rid = HotMusicListAllPlay[0].rid; 
        var htm_new = addBangList(HotMusicListAllPlay,1);
        drawUls(htm_new);   
        playSong("MUSIC_"+f_rid);// 并播放第一首
    }
}
 首页酷我新歌榜全部添加并播放  
function playAllNewBang(){
    if (NewMusicListAllPlay!=null) {        
        var f_rid = NewMusicListAllPlay[0].rid; 
        var htm_new = addBangList(NewMusicListAllPlay,1);
        drawUls(htm_new);   
        playSong("MUSIC_"+f_rid);// 并播放第一首
    }
}
 首页酷我欧美榜全部添加并播放  
function playAllOumeiBang(){
    if (NewMusicListAllPlay!=null) {        
        var f_rid = OumeiMusicListAllPlay[0].rid;   
        var htm_new = addBangList(OumeiMusicListAllPlay,1);
        drawUls(htm_new);   
        playSong("MUSIC_"+f_rid);// 并播放第一首
    }
}
 首页酷我日韩榜单全部添加并播放  
function playAllRihanBang(){
    if (NewMusicListAllPlay!=null) {        
        var f_rid = RihanMusicListAllPlay[0].rid;   
        var htm_new = addBangList(RihanMusicListAllPlay,1);
        drawUls(htm_new);   
        playSong("MUSIC_"+f_rid);// 并播放第一首
    }
}*/
/* 首页酷我热歌榜全部添加并播放  */
function playAllHotBang(){
    if (HotMusicListAllPlay!=null) {        
        var f_rid = HotMusicListAllPlay[0].rid; 
        var htm_new = addBangList(HotMusicListAllPlay,5);
        drawUls(htm_new);   
        playSong(f_rid);// 并播放第一首
    }
}
/* 首页酷我新歌榜全部添加并播放  */
function playAllNewBang(){
    if (NewMusicListAllPlay!=null) {        
        var f_rid = NewMusicListAllPlay[0].rid; 
        var htm_new = addBangList(NewMusicListAllPlay,5);
        drawUls(htm_new);   
        playSong(f_rid);// 并播放第一首
    }
}
/* 首页酷我欧美榜全部添加并播放  */
function playAllOumeiBang(){
    if (OumeiMusicListAllPlay!=null) {      
        var f_rid = OumeiMusicListAllPlay[0].rid;   
        var htm_new = addBangList(OumeiMusicListAllPlay,5);
        drawUls(htm_new);   
        playSong(f_rid);// 并播放第一首
    }
}
/* 首页酷我日韩榜单全部添加并播放  */
function playAllRihanBang(){
    if (RihanMusicListAllPlay!=null) {      
        var f_rid = RihanMusicListAllPlay[0].rid;   
        var htm_new = addBangList(RihanMusicListAllPlay,5);
        drawUls(htm_new);   
        playSong(f_rid);// 并播放第一首
    }
}
/* 排行榜全部添加并播放  */
function playAllBangData(){
    if (bangListAllPlay!=null) {
        //alert(1);
        var f_rid = bangListAllPlay[0].id;  
        var htm_new = addBangList(bangListAllPlay,1);
        //alert(3);
        drawUls(htm_new);
        //alert(4);
        playSong("MUSIC_"+f_rid);// 并播放第一首
    }
}
//分类结果歌曲全部添加并播放
function playAllphpartData(){
    if (gedanListAllPlay!=null) {   
        var f_rid = gedanListAllPlay[0].id; 
        var htm_new = addBangList(gedanListAllPlay,1);
        drawUls(htm_new);
        playSong("MUSIC_"+f_rid);// 并播放第一首
    }
}
// 1：为 排行榜 分类结果歌曲 专辑结果 等歌曲的全部添加   2： 歌手下歌曲   3：搜索结果 全部添加
//歌手下歌曲全部添加并播放
function playAllartData(){
    if (artmusicListAllPlay!= null && artmusicListAllPlay!= "") {       
        var f_rid = artmusicListAllPlay[0].musicrid;    
        var htm_new = addBangList(artmusicListAllPlay,2);
        drawUls(htm_new);       
        playSong("MUSIC_"+f_rid);// 并播放第一首
    }
}
//搜索结果全部添加并播放 歌手下歌曲全部 搜索结果全部添加
function playAllScData(){
    if (searchmusicListAllPlay != null && searchmusicListAllPlay != "") {       
        var f_rid = searchmusicListAllPlay[0].MUSICRID;
        var htm_new = addBangList(searchmusicListAllPlay,3);
        drawUls(htm_new);       
        playSong(f_rid);// 并播放第一首
    }
}
//专辑结果全部添加并播放  排行榜 分类结果歌曲 专辑结果
function playAllAlbumData(){
    if (albummusicListAllPlay != null && albummusicListAllPlay != "") {     
        var f_rid = albummusicListAllPlay[0].id;
        var htm_new = addBangList(albummusicListAllPlay,1);
        drawUls(htm_new);
        playSong("MUSIC_"+f_rid);// 并播放第一首
    }
}
//内容页面播歌入口 
function wb_playSong(rid, name, art) {
    addSong(rid,name,art);
    playSong(rid);
}
//歌曲播放的方法
function playSong(rid) {
    var retOk = WebPlayer.playMusic(rid, true);
      if(retOk){ try{ 
          //swapTab(1,true);
          var n=getindexbyrid(rid);
     setPlayListScroll("side_left1_con_pl",n); swapLbTab(1);  }catch(e){} }
     
}
function getindexbyrid(rid) {
    if (playlist != null) {
        for (i = 0, len = playlist.length; i < len; i++) {
            var s = playlist[i];
            if (s.rid == rid) {
                return i+1;
            }
        }
    }
    return 0;
}
function scindexbyrid(rid) {
    if (collList != null) {
        for (var i = 0; i < collList.length; i++) {
            var s = collList[i];
            if (s.rid == rid) {
                return i+1;
            }
        }
    }
    return 0;
}
function setPlayListScroll(block, pos) {
    var curplayheight = pos *30;
    if (curplayheight >= 30) {      
        var outA = document.getElementById(block); 
        outA.scrollTop = curplayheight - 30;
        outA.onscroll=readScrollTop;
        var span_scrollTop = document.getElementById("scrollTopValue"); 
        function readScrollTop() 
        {span_scrollTop.innerHTML=outA.scrollTop; 
        } 
        readScrollTop();    
    } else {
        var outA = document.getElementById(block); 
        outA.scrollTop = curplayheight;
        outA.onscroll=readScrollTop;
        var span_scrollTop = document.getElementById("scrollTopValue"); 
        function readScrollTop() 
        {span_scrollTop.innerHTML=outA.scrollTop; 
        } 
        readScrollTop();    
    }
}
function wb_play(){
    if(wbarr){
        var len=wbarr.length;
        var f_rid=wbarr[0].rid;
        for(var i=0;i<len;i++){
            var s = wbarr[i];
            var retOk=WebPlayer.addMusic(s.rid);
        }
        playSong(f_rid);
    }
}
function playscSong(rid) {
    var retOk = WebPlayer.playFav(rid, false);
    if (retOk) {
        swapTab(1,true);
        var n = scindexbyrid(rid);
        setPlayListScroll("side_left1_con_sc", n);
    }
}
function addSong(rid, name, art) {
    if (!checkcfrid(rid)) {
        var retOk = WebPlayer.addMusic(rid);
        if (retOk) {
            createUl(rid, name, art);
            m_add_song({
                        'name' : name,
                        'art' : art,
                        'rid' : rid,
                        'dur' : '1'
                    });
        }   
        $("#lb_tips").find("span").html("已将歌曲添加至“播放列表”中");
        $("#lb_tips").fadeToggle(200);
        $("#lb_tips").fadeToggle(2000);
        //fadeInImage();
    } else {
        $("#lb_tips").find("span").html("歌曲已经存在于播放列表中");
        $("#lb_tips").fadeToggle(200);
        $("#lb_tips").fadeToggle(2000);
    }
}
var lastMoreNode = '';
function more_option(rid,id){
    lastMoreNode = "moreoption";
    $("#moreoption").remove();
    var parentId = 0;   
    var htm = [];   
    htm[htm.length] = '<div id="moreoption" class="othetan" style="width:90px;display:block;right:0px;"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="tan1"></td><td class="tan2"></td><td class="tan3"></td></tr><tr><td class="tan4"></td><td><div class="l_content"><ul class="jiu_tanlist1">';
    htm[htm.length] = '<li><a id="lb_sc" href="javascript:collectMusic(\''+rid+'\');" onmouseout="overoutColorById(\'lb_sc\',\'fav_icon\');" onmouseover="overoutColorById(\'lb_sc\',\'fav_icon_h\');" class="fav_icon">收藏</a></li>';
    htm[htm.length] = '<li><a id="lb_down" href="javascript:webdownSong(\''+rid+'\',\'\',\'\',\'\');" onmouseout="overoutColorById(\'lb_down\',\'down_icon\');" onmouseover="overoutColorById(\'lb_down\',\'down_icon_h\');" class="down_icon">下载</a></li>';
    htm[htm.length] = '</ul></div></td><td class="tan5"></td></tr><tr><td class="tan6"></td><td class="tan7"></td><td class="tan8"></td></tr></table></div>';
    var htmlMore = htm.join("");
    $("#playlbId1").after(htmlMore);
    var selecter_left = $("#"+id).offset().top;
    $("#moreoption").css("top",(selecter_left-30)+"px");
}
/*
var outscrolltop=document.body.scrollTop==0?document.documentElement.scrollTop:document.body.scrollTop;
var showdiv = document.getElementById("dqshare");
var yy = document.getElementById("bangdiv").scrollTop;
var e  = event ? event : window.event;
setdata(name,id);
showdiv.style.left = "207px";
showdiv.style.top = (e.clientY-126+outscrolltop+yy)+"px";
showdiv.style.display = "block";
document.getElementById("fsId").style.display="none";
*/
function createUl(rid, name, art) {
    //alert("createUl");
    var playLbObj = $("#playlbId1");
    var htm = [];   
    var head =  '<div class="side_left1_con" id="side_left1_con_pl" style="height:328px;">';
    var num = playlist.length + 1;
    if (num < 10) {
        num = "0" + num;
    }
    if (playlist == null || playlist.length == 0) {// onmouseout="overoutColor(this,\'#ffffff\');
        //alert("为空");
        htm[htm.length] = '<ul class="itemUl" id="pl'+rid+'" n='+num+'  onmouseout="overoutColor(this,\'itemUl\');SetBlackText(this);" onmouseover="overoutColor(this,\'itemUl itemUl_def\');SetWhiteText(this);">';
                htm[htm.length] = '<li class="iSongName"><a style="" href="javascript:playSong(\''+ rid+ '\');"  title="播放歌曲:'+name.replace(new RegExp("\"", "gm"), "&quot;")+'">'+name.replace(new RegExp("\"", "gm"), "&quot;")+'</a></li>';
                htm[htm.length] = '<li class="iSonger"><a style="" href="javascript:c_search_link(\''+art.replace(new RegExp("\"", "gm"), "&quot;")+'\');"  title="搜索歌手:'+art.replace(new RegExp("\"", "gm"), "&quot;")+'">'+art.replace(new RegExp("\"", "gm"), "&quot;")+'</a></li>';
                htm[htm.length] = '<li><a class="more_icon" href="javascript:downMusicBox()" title="下载" target="_blank" title="下载"></a></li>';
                //htm[htm.length] = '<li><a class="more_icon" href="javascript:more_option(\''+rid+'\',\'pl'+rid+'\');" title="更多"></a></li>';
                htm[htm.length] = '<li><a class="lj_icon" href="javascript:delPlSong(\''+ rid + '\');" title="删除歌曲"></a></li>';
            htm[htm.length] = '</ul>';
        htm[htm.length] = '</div>';
        htm[htm.length] = '<div class="bot">';
        htm[htm.length] = '<p><a href="javascript:delAllSong();" class="graybtn"><var class="lj_icon_def"></var><span>删除全部</span></a>';
        htm[htm.length] = '</p>';
        htm[htm.length] = '</div>';
        var htmlA = htm.join("");
        //alert("原来为空:"+head+htmlA);
        playLbObj.html(head+htmlA);
    } else {
        //alert("不为空");
        //htm[htm.length] = '<ul class="liebiao" id="pl'+rid+'" n='+num+'  onmouseout="hoverOut(this);" onmouseover="hoverIn(this);">';
        htm[htm.length] = '<ul class="itemUl" id="pl'+rid+'" n='+num+'  onmouseout="overoutColor(this,\'itemUl\');SetBlackText(this);" onmouseover="overoutColor(this,\'itemUl itemUl_def\');SetWhiteText(this);">';    
            htm[htm.length] = '<li class="iSongName"><a style="" href="javascript:playSong(\''+ rid+ '\');"  title="播放歌曲:'+name.replace(new RegExp("\"", "gm"), "&quot;")+'">'+name.replace(new RegExp("\"", "gm"), "&quot;")+'</a></li>';
            htm[htm.length] = '<li class="iSonger"><a style="" href="javascript:c_search_link(\''+art.replace(new RegExp("\"", "gm"), "&quot;")+'\');"  title="搜索歌手:'+art.replace(new RegExp("\"", "gm"), "&quot;")+'">'+art.replace(new RegExp("\"", "gm"), "&quot;")+'</a></li>';
            //htm[htm.length] = '<li><a class="more_icon" href="javascript:more_option(\''+rid+'\',\'pl'+rid+'\');" title="更多"></a></li>';
            htm[htm.length] = '<li><a class="more_icon" href="javascript:downMusicBox()" title="下载" target="_blank"></a></li>';
            htm[htm.length] = '<li><a class="lj_icon" href="javascript:delPlSong(\''+ rid + '\');" title="删除歌曲"></a></li>';
        htm[htm.length] = '</ul>';
        var htm_Now = $("#side_left1_con_pl").html();
        var htmlA = htm.join("");
        var htmTail = '</div><div class="bot"><p><a href="javascript:delAllSong();" class="graybtn"><var class="lj_icon_def"></var><span>删除全部</span></a></p></div>';
        //alert("原来不为空:"+head+htm_Now+htmlA+htmTail);
        playLbObj.html(head+htm_Now+htmlA+htmTail);
    }
}
function m_add_song(song) {
    playlist[playlist.length] = song;
}
function delAllSong() {
    var retOk = WebPlayer.delAllMusic();
    if (retOk) {
        $("#side_left1_con_pl").html("");
        playlist = [];
    }
}
function delAllScSong() {
    var scUI = $("#side_left1_con_sc").html();
    if(scUI==null||scUI==""){
        alert("您的收藏列表不存在任何歌曲!");
    }else{
    if(window.confirm('你确定删除全部收藏歌曲吗？ 该操作不可恢复!!!')){
        var retOk = WebPlayer.delAllFav();
        if (retOk) {
            $("#side_left1_con_sc").html("");
            addCookie('KW_COL_MUSIC','',86400*365,'/','kuwo.cn');
        }
        get_collect_rid_list();
        var trid;
        for(var p=0;p<collRidList.length;p++){
            trid=collRidList.split(",")[p];
            //setTimeout(function(){
            //  delCollectMusic(trid);
            //},30);//每隔30ms删除一个。
            delCollectMusic(trid);
        }
     }
    }
}
function delPlSong(rid) {
    //alert("delPlSong");
    var retOk = WebPlayer.delMusic(rid);
    if (retOk) {
        delUl("pl"+rid);
        delPListByrid(rid);
        var currPlMusic  = WebPlayer.curMusic;
        if(currPlMusic){
            var n=scindexbyrid(currPlMusic.rid);
            setPlayListScroll("side_left1_con_pl",n);
        }   
    }
}
function delScSong(rid) {
    var retOk = WebPlayer.delFav(rid);
    if (retOk) {
        delUl("sc"+rid);
        delCollectMusic(rid);
        likeNo();
    }
}
function delAllLocalCollMusic(){
    var collArr=getColMusicInCookie();
    var j=0;
    var allisStr="";
    for(var i=0;i<collArr.length;i++){
        //if(collArr[i]!=rid){
            var idStr = collArr[i].replace("MUSIC_",'');
            if(j>0){
                allisStr+=",";
            }
            allisStr+=idStr;
            j++;
        //}
    }
    saveColMusicInCookie(allisStr);
    //v_ref_colllist();
}
//删除收藏id
var del_rid="";
function delCollectMusic(rid){
    // 登录情况下
    if (getCookie("userid") != "") {
        var url = "/mlog/rw/CollectMusic?id=" + rid.split('_')[1] + '&uid='
                + getCookie("userid") + "&" + getTimeParam();
        jQuery.ajax({
                    url : url,
                    type : 'post',//用post可以执行删除权限
                    success : function(transport) {
                        if (collList != null) {
                            var t_pos = 0;
                            for (var i = 0; i < collList.length; i++) {
                                var s = collList[i];
                                if (rid == s.rid) {
                                    t_pos = i;
                                    break;
                                }
                            }
                            if (rid != WebPlayer.curMusic.rid) {
                                del_rid = rid;
                            } else {
                                if (collList.length - 1 > t_pos) {
                                    del_rid = collList[t_pos + 1].rid;
                                } else {
                                    del_rid = collList[0].rid;
                                }
                            }
                        }
                        parseDelResponse(transport);
                    }
                });     
    }else{
        //alert(0);
        //showLogin();
        if(collList != null){
            var t_pos=0;
            for(var i = 0; i < collList.length; i++){
                var s = collList[i];
                if(rid==s.rid){
                    t_pos=i;
                    break;
                }
            }
            var temp_rid="";
            if(WebPlayer.curMusic){
                temp_rid=WebPlayer.curMusic.rid;
            }
            if(rid!=temp_rid){
                del_rid=rid;
            }else{
                if(collList.length-1>t_pos){
                    del_rid=collList[t_pos+1].rid;
                }else{
                    del_rid=collList[0].rid;
                }
                if(collList.length==1){
                    del_rid="";
                }
            }
        }
        delLocalCollMusic(rid);
    }
}
function parseDelResponse(respTxt) {
    if (respTxt != null && respTxt != '') {
        var retStat = parseInt(respTxt.substring(0,1));
        var retInf = respTxt.substring(2);
        if (retStat == 1) {
            get_collect_list();
        } else {
            //没收藏，不提示~~             
        }
    } else {
        if(retInf=='err_system') {
            alert('系统错误，请稍后重试');
        } else if(retInf=='err_notLogin') {
            alert('你没有登录，请登录后再收藏歌曲');
        } else if (retInf == 'err_notHost') {
            var info = '你不是收藏的主人，因此不能取消收藏<br />'
            alert(info);
        } else {
        //目前先不提示~~
        }
    }   
    
}
/* 删除cookie 中的 id */
function delLocalCollMusic(rid){
    //alert(2);
    var collArr=getColMusicInCookie();
    var j=0;
    var allisStr="";
    for(var i=0;i<collArr.length;i++){
        if(collArr[i]!=rid){
            var idStr = collArr[i].replace("MUSIC_",'');
            if(j>0){
                allisStr+=",";
            }
            allisStr+=idStr;
            j++;
        }
    }
    saveColMusicInCookie(allisStr);
    v_ref_colllist();
}
function delUl(rid) {
    //alert("delUl");
    var delename = "#" + rid+"";
    $(delename).remove();
}
function delPListByrid(rid) {
    if (playlist != null) {
        for (i = 0, len = playlist.length; i < len; i++) {
            var s = playlist[i];
            if (s.rid == rid) {
                playlist = delarr(i, playlist);
                return;
            }
        }
    }
}
function delarr(n, plst) {
    if (n < 0) // 如果n<0，则不进行任何操作。
        return plst;
    else
        return plst.slice(0, n).concat(plst.slice(n + 1, plst.length));
}
function arrtoStr(arr) {
    var t_str = "";
    var arr_len = arr.length;
    /*if(arr_len == 0){
        $("#bflbtp").hide();
    }*/
    for (var i = 0; i < arr_len; i++) {
        if (i > 0) {
            t_str += ",";
        }
        t_str += arr[i].rid;
    }
    c_init_play_list(t_str);
}
function c_init_play_list(rids) {
    //alert("初始化的ids："+rids);
    var par = 'ids=' + rids;
    jQuery.ajax({
                url:'http://player.kuwo.cn/webmusic/webmusic2011/getSongByRids.jsp', 
                type : 'post',
                data : par,
                success : function(resp) {
                    eval(resp);
                    //alert(resp);
                    v_ref_playlist();
                }
            });
}
//播放列表初始化操作
function v_ref_playlist() {
    var htm = [];
    if (playlist != null) {
        for (var i = 0; i < playlist.length; i++) {
            var s = playlist[i];
            htm[htm.length] = '<ul class="itemUl" style="" id="pl'+s.rid+'"  onmouseout="overoutColor(this,\'itemUl\');SetBlackText(this);" onmouseover="overoutColor(this,\'itemUl itemUl_def\');SetWhiteText(this);">';
            htm[htm.length] = '<li class="iSongName"><a style="" href="javascript:playSong(\''+ s.rid+ '\');" title="播放歌曲:'+s.name.replace(new RegExp("\"", "gm"), "&quot;")+'">'+s.name.replace(new RegExp("\"", "gm"), "&quot;")+'</a></li>';
            htm[htm.length] = '<li class="iSonger"><a style="" href="javascript:c_search_link(\''+s.art.replace(new RegExp("\"", "gm"), "&quot;")+'\');" title="搜索歌手:'+s.art.replace(new RegExp("\"", "gm"), "&quot;")+'">'+s.art.replace(new RegExp("\"", "gm"), "&quot;")+'</a></li>';
            //htm[htm.length] = '<li><a class="more_icon" href="javascript:more_option(\''+s.rid+'\',\'pl'+s.rid+'\');" title="更多"></a></li>';
            htm[htm.length] = '<li><a class="more_icon" href="javascript:downMusicBox()" title="下载" target="_blank"></a></li>';
            htm[htm.length] = '<li><a class="lj_icon" href="javascript:delPlSong(\''+ s.rid + '\');" title="删除歌曲"></a></li>';
            htm[htm.length] = '</ul>';
        }
        $("#playlbId1").find(".side_left1_con").html(htm.join(""));
    }
    try {
        selectPsong(WebPlayer.curMusic.rid);
    } catch (e) {
    }
}
function checkcfrid(rid) {
    var playlist2 = WebPlayer.getPlayList();
    //alert(playlist2.length);
    if (playlist2 != null) {
        for (i = 0, len = playlist2.length; i < len; i++) {
            var s = playlist2[i];
            if (s.rid == rid) {
                return true;
            }
        }
    }
    return false;
}
function getTimeParam(){
    var number = Math.random(); 
    number = number * 1000000000;
    number = Math.ceil(number);
    return 't=' + number;
}
function getTimeParam2(){
    var number =  Math.ceil(Math.random()*1000000000)+'';
    return number;
}
//获取收藏列表
function get_collect_list(){
    jQuery.ajax({
        url:'http://player.kuwo.cn/webmusic/webmusic2011/getCollect.jsp?'+getTimeParam(),
        type:'get',
        success:function(resp){
            eval(resp);
            //alert("get_collect_list():"+resp);
            v_ref_colllist();
        }
    }
    );
}
var collRidList="";
//获取收藏rid列表
function get_collect_rid_list(){
    //alert("collList:"+collList);
    var colLen = collList.length;
    var srid;
    for(var k=0;k<colLen;k++){
            srid = collList[k].rid;
            if(srid!=null&&srid!=""){
                if(k!=colLen-1){
                    collRidList += srid+",";
                }else{
                    collRidList += srid;
                }
            }   
    }
    //alert("collRidList:"+collRidList);
}
//输出 收藏 列表
var scfirstRid="";
function v_ref_colllist(){
    //alert(532);
    if(getCookie("userid")!=""){
        var htm =[];
        var rids=[];
        if(collList != null){
            for(i = 0; i < collList.length; i++){
                var s = collList[i];
                if(i==0){
                    scfirstRid=s.rid;
                }
                var num = i + 1;
                if(num < 10){
                    num = "0" + num;
                }
                htm[htm.length] = '<ul class="itemUl" id="sc'+s.rid+'" onmouseout="overoutColor(this,\'itemUl\');SetBlackText(this);" onmouseover="overoutColor(this,\'itemUl itemUl_def\');SetWhiteText(this);">';
                htm[htm.length] = '<li class="iSongName"><a style="" href="javascript:playscSong(\''+ s.rid+ '\');" title="播放歌曲:'+s.name.replace(new RegExp("\"", "gm"), "&quot;")+'">'+s.name.replace(new RegExp("\"", "gm"), "&quot;")+'</a></li>';
                htm[htm.length] = '<li class="iSonger"><a style="" href="javascript:c_search_link(\''+s.art.replace(new RegExp("\"", "gm"), "&quot;")+'\');"  title="搜索歌手:'+s.art.replace(new RegExp("\"", "gm"), "&quot;")+'">'+s.art+'</a></li>';
                htm[htm.length] = '<li><a class="more_icon" href="javascript:webdownSong(\''+s.rid+'\',\''+s.name+'\',\''+s.art+'\',\''+s.album+'\');" title="下载"></a></li>';
                htm[htm.length] = '<li><a class="lj_icon" href="javascript:delScSong(\''+ s.rid + '\');" title="删除"></a></li>';
                htm[htm.length] = '</ul>';
                if(i>0){
                    rids[rids.length]=",";
                }
                rids[rids.length]=s.rid;
            }
        }
        WebPlayer.delAllFav();
        WebPlayer.setFavList(rids.join(""));
        $("#scCanId").find(".side_left1_con").html(htm.join(""));
        var lstType=WebPlayer.listType;
        if(lstType=="favList"){
            if(del_rid!=""){
                //playscSong(del_rid);
                del_rid="";
            }else{
                if(WebPlayer.curMusic){
                    //selectPsong(WebPlayer.curMusic.rid);
                }
            }
            selectPsong(WebPlayer.curMusic.rid);
        }
        setuserInfo();
    }else{
        var rids=getColMusicInCookie();
        var par = 'ids=' + rids;
        jQuery.ajax({
            url:'http://player.kuwo.cn/webmusic/webmusic2011/getSongCommByRids.jsp',
            type:'get',
            data:par,
            success:function(resp){
                eval("collList="+resp);
                var rids=[];
                var htm = [];
                if(collList != null){
                    for(var i = 0; i < collList.length; i++){
                        var s = collList[i];
                        if(i==0){
                            scfirstRid=s.rid;
                        }
                        htm[htm.length] = '<ul class="itemUl" id="sc'+s.rid+'" onmouseout="overoutColor(this,\'itemUl\');SetBlackText(this);" onmouseover="overoutColor(this,\'itemUl itemUl_def\');SetWhiteText(this);">';
                        htm[htm.length] = '<li class="iSongName"><a style="color:#000;" href="javascript:playscSong(\''+ s.rid+ '\');" title="播放歌曲:'+s.name.replace(new RegExp("\"", "gm"), "&quot;")+'">'+s.name.replace(new RegExp("\"", "gm"), "&quot;")+'</a></li>';
                        htm[htm.length] = '<li class="iSonger"><a style="color:#000;" href="javascript:c_search_link(\''+s.art.replace(new RegExp("\"", "gm"), "&quot;")+'\');"  title="搜索歌手:'+s.art.replace(new RegExp("\"", "gm"), "&quot;")+'">'+s.art+'</a></li>';
                        htm[htm.length] = '<li><a class="more_icon" href="javascript:webdownSong(\''+s.rid+'\',\''+s.name+'\',\''+s.art+'\',\''+s.album+'\');" title="下载"></a></li>';
                        htm[htm.length] = '<li><a class="lj_icon" href="javascript:delScSong(\''+ s.rid + '\');" title="删除"></a></li>';
                        htm[htm.length] = '</ul>';
                        if(i>0){
                            rids[rids.length]=",";
                        }
                        rids[rids.length]=s.rid;
                    }
                }
                WebPlayer.delAllFav();
                WebPlayer.setFavList(rids.join(""));
                $("#scCanId").find(".side_left1_con").html(htm.join(""));
                var lstType=WebPlayer.listType;
                if(lstType=="favList"){
                    if(del_rid!=""){
                        //playscSong(del_rid);
                        del_rid="";
                    }else{
                        if(WebPlayer.curMusic){
                            //selectPsong(WebPlayer.curMusic.rid);
                        }
                    }
                    selectPsong(WebPlayer.curMusic.rid);
                }
                setuserInfo();
            }
        });
    }
}
var lastIndex="";
function selectPsong(rid){
    if(rid==null || rid==""){
        return;
    }
    var lstType=WebPlayer.listType;
    if(lstType=="playList"){
        var item1 = $("#pl"+rid);
        if(item1){
            item1.attr("class","itemUl itemUl_act");    
            item1.find(".iSongName").find("a").attr("style","color:#ffffff;");
            item1.find(".iSonger").find("a").attr("style","color:#ffffff;");
            item1.attr("style","color:#fff;background:#46B4E6");
        }
        try{
            var n=getindexbyrid(rid);
            setPlayListScroll("side_left1_con_pl",n);
        }catch(e){}
    }else if("favList"==lstType){
        var item1 = $("#sc"+rid);
        if(item1){
            item1.attr("class","itemUl itemUl_act");    
            item1.find(".iSongName").find("a").attr("style","color:#ffffff;");
            item1.find(".iSonger").find("a").attr("style","color:#ffffff;");
            item1.attr("style","color:#fff;background:#46B4E6");
        }
        try{
            var n=scindexbyrid(rid);
            setPlayListScroll("side_left1_con_sc",n);
        }catch(e){}
    }
}
//分享
// 分享:设置的分享数据，添加的歌曲信息
function setTitleText(title,pic){
    window.document.title=title+" 在线试听  MP3下载-酷我音乐网页版 最新最全的在线正版音乐播放器";
    if(pic==null || pic==""){
        pic="http://image.kuwo.cn/mini/common/kuwozi.jpg";
    }
    try{
        var objarr = getElementsByName("div","boxshare");
        var objlrcarr = getElementsByName("div","lrcshare");
        var bdObj = objarr[0];
        var bdlrcObj = objlrcarr[0];
        var arr=title.split("-");
        bdObj.setAttribute("data","{'text':'听到这首《"+arr[0]+"》，就无法淡定了……一定要转给大家一起听一听！(分享自@酷我音乐)。点击收听：','comment':' ','pic':'"+pic+"','url':'http://player.kuwo.cn/MUSIC/"+WebPlayer.curMusic.rid+"'}");
        bdlrcObj.setAttribute("data","{'text':'听到这首《"+arr[0]+"》，就无法淡定了……一定要转给大家一起听一听！(分享自@酷我音乐)。点击收听：','comment':' ','pic':'"+pic+"','url':'http://player.kuwo.cn/MUSIC/"+WebPlayer.curMusic.rid+"'}");
    }catch(e){}     
}
/* 兼容   */
function getElementsByName(tag, name){
    var returns = document.getElementsByName(name);
    if(returns.length > 0) return returns;
    returns = new Array();
    var e = document.getElementsByTagName(tag);
    for(var i = 0; i < e.length; i++){
        if(e[i].getAttribute("name") == name){
            returns[returns.length] = e[i];
        }
    }
    return returns;
}
function share(obj,name,id,pos){
    //var copyNode = $("#sharedqId").clone(true);
    var copyNode = $("#sharedqId");//dqshare
    if(pos=="normal"){
        copyNode.css("right","50px");
    }else if(pos==0||pos==3){
        copyNode.css("right","370px");
    }else if(pos==1||pos==2){
        copyNode.css("right","30px");
    }
    try{
        var objdqarr = getElementsByName("div","dqshare");
        var bddqObj = objdqarr[0];
        bddqObj.setAttribute("data","{'text':'听到这首《"+name+"》，就无法淡定了……一定要转给大家一起听一听！(分享自@酷我音乐)。点击收听：','comment':'酷我音乐，中国最新最全的正版音乐在线网站，首首歌曲都给您不一样的听觉盛宴，让您沉浸在音乐的海洋中欲罢不能','pic':'http://image.kuwo.cn/mini/common/kuwozi.jpg','url':'http://player.kuwo.cn/MUSIC/"+id+"'}");
        }catch(e){}     
    $("#"+obj).before(copyNode);
    $("#sharedqId").show();
}
function sharemusic(name,id,event) {
    alert(1);
    var outscrolltop=document.body.scrollTop==0?document.documentElement.scrollTop:document.body.scrollTop;
    alert(2);
    var showdiv = document.getElementById("dqshare");
    alert(3);
    var yy = document.getElementById("bangdiv").scrollTop;
    alert(4);
    var e  = event ? event : window.event;
    alert(1);
    setdata(name,id);
    showdiv.style.left = "207px";
    showdiv.style.top = (e.clientY-126+outscrolltop+yy)+"px";
    showdiv.style.display = "block";
    //document.getElementById("fsId").style.display="none";
}
function sharemusic2(name,id,event) {
    var outscrolltop=document.body.scrollTop==0?document.documentElement.scrollTop:document.body.scrollTop;
    var showdiv = document.getElementById("dqshare2");
    var yy = document.getElementById("sreachdiv").scrollTop;
    
    var e  = event ? event : window.event;
    setdata(name,id);
    showdiv.style.left = "207px";
    showdiv.style.top = (e.clientY-126+outscrolltop+yy)+"px";
    showdiv.style.display = "block";
    document.getElementById("fsId").style.display="none";
}
function setdata(name, id) {
    var dateobjarr = getElementsByName("div", "dqsharedate");
    var dateobj = dateobjarr[0];
    if (dateobjarr.length > 1) {
        var dateobj2 = dateobjarr[1];
        
        dateobj2
                .setAttribute(
                        'data',
                        "{'text':'听到这首《"+name+"》，就无法淡定了……一定要转给大家一起听一听！(分享自@酷我音乐)。点击收听：','comment':'','pic':'http://image.kuwo.cn/mini/common/kuwozi.jpg','url':'http://player.kuwo.cn/MUSIC/"
                                + id + "'}");
    }
    dateobj
            .setAttribute(
                    'data',
                    "{'text':'听到这首《"+name+"》，就无法淡定了……一定要转给大家一起听一听！(分享自@酷我音乐)。点击收听：','comment':'','pic':'http://image.kuwo.cn/mini/common/kuwozi.jpg','url':'http://player.kuwo.cn/MUSIC/"
                            + id + "'}");
}


var downrid="";
function webdownSong(rid,name,art,album){
    downrid=rid;
    if(getCookie("mbox")==""){
        var v_left=(document.body.clientWidth-300)/2;
        setPosition("down_tan");
        $("#down_tan").show();  
    }else{
        if(rid==''){
            $("#outPlayFrame").attr("src","http://play.kuwo.cn/ds/test/" + WebPlayer.curMusic.rid);
            //$('outPlayFrame').src="http://play.kuwo.cn/ds/test/" + WebPlayer.curMusic.rid;
        }else{
            $("#outPlayFrame").attr("src","http://play.kuwo.cn/ds/test/" + rid);
            //$('outPlayFrame').src="http://play.kuwo.cn/ds/test/" + rid;
        }
    }
}
function downCurrSong(){
    if(getCookie("mbox")==""){
        var v_left=(document.body.clientWidth-300)/2;
        setPosition("down_tan");
        $("#down_tan").show();  
    }else{
        try{
            $("#outPlayFrame").attr("src","http://play.kuwo.cn/ds/test/" + WebPlayer.curMusic.rid);
            //$('outPlayFrame').src="http://play.kuwo.cn/ds/test/" + WebPlayer.curMusic.rid;
        }catch(e){}
    }
}
function installed(){
    addCookie("mbox", "MUSIC_2.0.0.0", 0, '/', 'kuwo.cn');
    webdownSong(downrid);
    $("#down_tan").hide();
}
/*    点击收藏后的查看   */
/*$(document).ready(function() {
            $("#scbtnid").click(function() {
                changeScstate();
                //scDqMusic();
                    });
            
        });*/
//判断该歌曲是否在收藏列表
function isIncludeSC() {
    var flag = false;
    var collList = WebPlayer.getFavList();
    for (var i = 0; i < collList.length; i++) {
        var s = collList[i];
        if (c_rid == s.rid) {
            flag = true;
            break;
        }
    }
    return flag;
}

/*  根据当期那收藏按钮的 状态 来确定当前歌曲的 是否在收藏列表中  */
function changeScstate() {
    //alert(1);
    var classname = $("#scbtnid").attr("class");
    if(classname!=null&&classname.indexOf("play_shou")>-1){
        scDqMusic();    
    }else if(classname!=null&&classname.indexOf("fav")>-1){
        delScSong(c_rid);
        $("#lb_tips").find("span").html("已经取消收藏该歌曲");
        $("#lb_tips").fadeToggle(200);
        $("#lb_tips").fadeToggle(2000);
    }
}
function likeYes(){
    $("#scbtnid").attr("class","fav");
    //$("#scbtnid").removeClass("play_shou");
    //$("#scbtnid").addClass("fav");
    $("#scbtnid").attr("title","取消收藏");

}
function likeNo() {
    $("#scbtnid").attr("class","play_shou");
    //$("#scbtnid").removeClass("fav");
    //$("#scbtnid").addClass("play_shou");
    $("#scbtnid").attr("title", "收藏");
}
//播放条上收藏入口方法
function scDqMusic(){
    if(currPlayMusicid!=""){
        likeYes();
        collectMusic(WebPlayer.curMusic.rid);   // 添加收藏夹
    }else{
        alert("没有歌曲在播放");
    }
}
//播放列表上收藏入口方法
function collectMusic(rid){
    if(getCookie("userid")!=""){
        var colid = rid.split("_")[1];
        var url="/webmusic/st/CollectMusic?id=" + colid + "&" + getTimeParam();
        jQuery.ajax({
            url:url,
            method: 'get', //此处应该用post吧
            success: function(transport) {
                //alert("ajax执行了：："+transport);
                parseCheckResponse(transport); // 根据返回值判断给出提示
        }
        });
    }else{
        addColMusicInCookie(rid);  // 添加缓存
        v_ref_colllist();  //重新获取收藏列表
    }
}
function parseCheckResponse(respTxt){
    if (respTxt != null && respTxt != '') {
        var retStat = parseInt(respTxt.substring(0,1));
        var retInf = respTxt.substring(2);
        if (retStat == 1) {
            //alert("成功");
            get_collect_list();
            $("#lb_tips").find("span").html("已将歌曲添加至“我的收藏”中");
            $("#lb_tips").fadeToggle(200);
            $("#lb_tips").fadeToggle(2000);
        } else {
            if(retInf=='err_system') {
                $("#lb_tips").find("span").html("系统错误，请稍后重试");
            } else if(retInf=='err_notLogin') {
                $("#lb_tips").find("span").html("你没有登录，请登录后再收藏歌曲");
            } else if (retInf == 'err_collected') {
                $("#lb_tips").find("span").html("歌曲已经存在于收藏列表中");
            } else if (retInf == 'err_upperLimit') {
                $("#lb_tips").find("span").html("你收藏的歌曲已达上限，不能添加新的收藏");
            } else {
            //目前先不提示~~
            }
        }
    }
}
//添加歌曲到cookie
function addColMusicInCookie(ids){
    if(ids==null||ids.length<4){
        $("#lb_tips").find("span").html("收藏失败");
        return;
    }
    var MAX_COUNT=100;
    var ret = {};
    var colStr = getCookie('KW_COL_MUSIC');
    var allColStr = ',' + colStr + ',';
    var coledSize = 0;
    if(colStr!=''){
        var coledIds = colStr.split(',');
        coledSize = coledIds.length;
    }
    if(coledSize>=MAX_COUNT){
        $("#lb_tips").find("span").html("收藏数已达100首上限，建议登录");
        return;
    }
    var colChanged = false;
    var anyExist = false;
    var idArray = ids.split(',');
    for(var i=0,len=idArray.length;i<len;i++){
        var idStr = idArray[i].replace(/MUSIC_/ig,'');
        if(idStr.length>4&&!isNaN(idStr)){
            if(allColStr.indexOf(',' + idStr + ',')<0){
                if(coledSize>=MAX_COUNT){
                    saveColMusicInCookie(colStr);
                    $("#lb_tips").find("span").html("收藏数已达100首上限，建议登录");
                    return;
                }
                if(colStr.length!=0){
                    colStr += ',' + idStr;
                }else{
                    colStr = idStr;
                }
                allColStr = ',' + colStr + ',';
                coledSize ++;
                colChanged = true;
            }else{
                anyExist = true;
            }
        }
    }
    if(colChanged){
        saveColMusicInCookie(colStr);
        if(anyExist){
            //fadeInImage();
            $("#lb_tips").find("span").html("歌曲已经存在于收藏列表中");
            $("#lb_tips").fadeToggle(200);
            $("#lb_tips").fadeToggle(2000);
            //alert('已成功收藏到网页播放器中，部分歌曲已存在于您的收藏列表中');
            return;
        }else{
            //fadeInImage();
            $("#lb_tips").find("span").html("已将歌曲添加至“我的收藏”中");
            $("#lb_tips").fadeToggle(200);
            $("#lb_tips").fadeToggle(2000);
            //alert('已成功收藏到网页播放器中。');
            return;
        }
    }
    if(!colChanged && anyExist){
        //alert('收藏失败，歌曲已经存在于收藏列表中。');
        $("#lb_tips").find("span").html("歌曲已经存在于收藏列表中");
        $("#lb_tips").fadeToggle(200);
        $("#lb_tips").fadeToggle(2000);
        return;
    }
    //alert('收藏失败，系统错误。');
    return;
}
//~~~~~~~~~~~~~~~~~~~~~有关cookie的设置 begin~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/// 从cookie中获取当前的歌曲
function getColMusicInCookie(){
    var colStr = getCookie('KW_COL_MUSIC');
    var rids = [];
    if(colStr!=''){
        var ids = colStr.split(',');
        for(var i=0,len=ids.length;i<len;i++){
            rids.push('MUSIC_' + ids[i]);
        }
    }
    return rids;
}
//保存歌曲到cookie
function saveColMusicInCookie(idStr){
    addCookie('KW_COL_MUSIC',idStr,86400*365,'/','kuwo.cn');
}
//jsp页面的回调函数  用来获取歌手和专辑信息，这是获取歌手信息的
var dtflagUrl="http://player.kuwo.cn/webmusic/sj/dtflagdate";
var c_rid="";
var c_art="";
var c_name="";
var olditem="";
var oidDtID="" ;
var currmusicitem = "";
var currPlayMusicid ;
function getArtAlbum(){
    if(!WebPlayer || !WebPlayer.curMusic){
        return;
    }
    if(WebPlayer.curMusic.rid==""){
        return;
    }
    var currmusicitem = "";
    currPlayMusicid = WebPlayer.curMusic.rid;
    jQuery.getScript("http://search.kuwo.cn/r.s?RID="+currPlayMusicid+"&rformat=json&callback=checkMusicPay");
    if(WebPlayer.curMusic.rid!=null){
        var lstType=WebPlayer.listType;
        if (lstType == "playList") {
            currmusicitem = "#pl"+WebPlayer.curMusic.rid;
        }else{
            currmusicitem = "#sc"+WebPlayer.curMusic.rid;
        }
        //alert(currmusicitem);
        if(olditem!=null&&""!=olditem){
            delselectItem(olditem);
        }
        selectedItem(currmusicitem);                    
        olditem = currmusicitem;
    }
    var par="flag=6&rid="+WebPlayer.curMusic.rid;
    jQuery.ajax({
            url:dtflagUrl,
            type:'get',
            data:par,
            success:function(resp){
                var arr=resp.split('#');
                var artarr=arr[0].split(',');
                var text_title = "当前播放歌曲： "+artarr[3]+" -- "+artarr[0];
                $("#currPlName").html(text_title);
                $("#currPlName").attr("title",text_title);
                var strPic = "";
                strPic = artarr[1];
                if (strPic != null && strPic.indexOf("starheads/240/") > 0) {
                    strPic = strPic.replace("starheads/240/", "starheads/120/");
                } else if (strPic != null && strPic.indexOf("starheads/55/") > 0) {
                    strPic = strPic.replace("starheads/55/", "starheads/120/");
                } else if (strPic != null && strPic.indexOf("starheads/70/") > 0) {
                    strPic = strPic.replace("starheads/70/", "starheads/120/");
                } else if (strPic != null && strPic.indexOf("starheads/180/") > 0) {
                    strPic = strPic.replace("starheads/180/", "starheads/120/");
                }else{
                    strPic = "http://image.kuwo.cn/webplayer2013/img/sharelogo.png";
                }
                var htm = [];           
                htm[htm.length]='<div class="qu_listfa">';
                htm[htm.length]='<p class="int">歌手：</p>';
                htm[htm.length]='<div class="qu_list">';
                if(artarr[1]==""){
                    htm[htm.length]='<a href="'+artarr[2]+'" target="_blank" hidefocus class="pic100" title="查看歌手：'+artarr[0]+'"><img src="http://image.kuwo.cn/comm/art-70.gif" alt="'+artarr[0]+'" onerror="this.src=\'http://image.kuwo.cn/comm/art-70.gif\'" width="100" height="100"/></a>';
                }else{
                    $("#artist_Image").attr("src",artarr[1]);
                    if(artarr[3]!=""&&artarr[0]!=""){       
                        $("#artist_Image").attr("alt",artarr[3]+" "+artarr[0]);
                    }
                    //内链接形式
                    //$("#artist_href").attr("href",artarr[2]);
                    htm[htm.length]='<a href="'+artarr[2]+'" target="_blank" hidefocus class="pic100"  title="查看歌手：'+artarr[0]+'"><img src="'+strPic+'" alt="'+artarr[0]+'" onerror="this.src=\'http://image.kuwo.cn/comm/art-70.gif\'" width="100" height="100"/></a>';
                }
                htm[htm.length]='</div>';
                htm[htm.length]='<p class="qu_name"><a href="'+artarr[2]+'" target="_blank" title="'+artarr[0]+'">'+artarr[0]+'</a></p>';
                htm[htm.length]='</div>';
                if(arr[1]!=""){
                    var albarr=arr[1].split(',');
                    htm[htm.length]='<div class="qu_listfa">';
                    htm[htm.length]='<p class="int">相关专辑：</p>';
                    htm[htm.length]=' <div class="qu_list">';
                    if(albarr[2]==""){
                        htm[htm.length]='<a href="http://www.kuwo.cn/album/'+albarr[0]+'/" target="_blank" hidefocus class="pic100"  title="查看专辑：'+albarr[1]+'"><img src="http://image.kuwo.cn/comm/album-70.jpg" alt="'+albarr[1]+'"  onerror=\'http://image.kuwo.cn/comm/album-70.jpg\' width="100" height="100" /></a>';
                    }else{
                        htm[htm.length]='<a href="http://www.kuwo.cn/album/'+albarr[0]+'/" target="_blank" hidefocus class="pic100"  title="查看专辑：'+albarr[1]+'"><img src="'+albarr[2]+'" alt="'+albarr[1]+'"  onerror=\'http://image.kuwo.cn/comm/album-70.jpg\' width="100" height="100" /></a>';
                    }
                    htm[htm.length]='</div>';
                    htm[htm.length]='<p class="qu_name"><a href="http://www.kuwo.cn/album/'+albarr[0]+'/" target="_blank" title="'+albarr[1]+'">'+albarr[1]+'</a></p>';
                    htm[htm.length]='</div>';
                }
                
                $("#lrc_left").html(htm.join(""));
                c_rid=WebPlayer.curMusic.rid;
                c_art=artarr[0];
                c_name=artarr[3];
                
                var curr_tip = c_name+"-"+c_art;
                $("#wp_text").html(curr_tip);
                try{
                    if (strPic != null && strPic.indexOf("starheads/240/") > 0) {
                        strPic = strPic.replace("starheads/240/", "starheads/180/");
                    } else if (strPic != null && strPic.indexOf("starheads/55/") > 0) {
                        strPic = strPic.replace("starheads/55/", "starheads/180/");
                    } else if (strPic != null && strPic.indexOf("starheads/70/") > 0) {
                        strPic = strPic.replace("starheads/70/", "starheads/180/");
                    } else if (strPic != null && strPic.indexOf("starheads/120/") > 0) {
                        strPic = strPic.replace("starheads/120/", "starheads/180/");
                    }
                    setTitleText(artarr[3]+"-"+artarr[0],strPic);
                }catch(e){}
                var flag = isIncludeSC();   
                if(flag){
                    $("#scbtnid").removeClass("play_shou");
                    $("#scbtnid").addClass("fav");
                }else{
                    $("#scbtnid").removeClass("fav");
                    $("#scbtnid").addClass("play_shou");
                }   
            }
        }
    );
}

/**
 * 判断歌曲是否为付费歌曲
 */
function checkMusicPay(jsonData){
    try{
        if(jsonData.abslist[0].PAY != '0'){
            setTimeout(function(){
                KW_DqPlayer.pause();
            },3000);
            $("#wp_playBtn").click(function(){
                getArtAlbum();
            });
            KW_DqPlayer.pause();
            //alert("该歌曲为付费歌曲,请下载客户端。")
            showPayDialog();
        }else{
            WebPlayer.curMusic.false  = true;
        }
    }catch(e){
        
    }
}
//播放列表————收藏列表：切换
function swapLbTab(flag){
    if(flag==1){//播放列表
        $("#playTabId").attr("class","rig_nav_def");
        $("#scTabId").attr("class","rig_nav_nodef");
        
        $("#scCanId").hide();
        $("#playlbId1").fadeIn(50);
        
    }else if(flag==2){
        $("#playTabId").attr("class","rig_nav_nodef");
        $("#scTabId").attr("class","rig_nav_def");
        
        $("#playlbId1").hide();
        $("#scCanId").fadeIn(50);
    }
}

var isTreeLoaded = false;
var initQukuTime = 0;
var initQukuLimited = 30;
function testTreeLoad(flag,tag){
    if(!isTreeSuccessloaded){
        if(initQukuTime>initQukuLimited&&initQukuTime<100){
            initQukuTime = 0;
            initQukuLimited = initQukuLimited +10;//每次请求后将距离下次的请求间隔增加1秒
            initQuKuTree();
            testTreeLoad(flag,tag);
        }else if(initQukuTime>100){
            //如请求超过8次，则放弃
            isTreeLoaded = true;
            swapTab(flag,tag);
        }else{
            setTimeout(function(){
                testTreeLoad(flag,tag);
            },100);//每隔100ms监听一次。
        }
        initQukuTime++;
    }else{
        isTreeLoaded = true;
        swapTab(flag,tag);
    }
}
var lastNav = "nav_2";
var bangTime = 0;
//导航切换，歌词、推荐。电台、排行榜、歌手、分类、搜索、秀场
function swapTab(flag,tag){
    if(!isTreeLoaded){
        testTreeLoad(flag,tag);
    }else{
        bangTime++;
        if("#nav_"+flag!=lastNav){
            $("#"+lastNav).attr("class","");
            $("#nav_"+flag).attr("class","jiu_rightnow");
            lastNav = "nav_"+flag;
        }
        if(flag==2){//今日推荐
            closeClear();
            xcObj.hide();
            $("#search_con1").hide();
            
            $("#left_index").hide();
            $("#right_con").hide();
            $("#indexpage").show();
            
        }else if(flag==1){//歌词
            closeClear();
            $("#indexpage").hide();
            $("#left_index").show();
            $("#right_con").show();
            //$("#lrc_con").show();
            allHide(6);
            xcObj.hide();
            $("#search_con1").hide();
            lrcObj.show();
            $("#lrc_left").show();
            $("#dt_left").hide();
            $("#phb_left").hide();
            $("#artist_left").hide();
            $("#cate_left").hide();
            $("#search_left").hide();
        }else if(flag==3){//电台
            $("#indexpage").hide();
            $("#left_index").show();
            $("#right_con").show();
            xcObj.hide();
            $("#search_con1").hide();
            $("#lrc_left").hide();
            $("#phb_left").hide();
            $("#artist_left").hide();
            $("#cate_left").hide();
            $("#search_left").hide();
            $("#dt_left").show();
            toDiantai();
            //oneCategory(1,8);
        }else if(flag==4){//排行榜
            $("#indexpage").hide();
            $("#left_index").show();
            $("#right_con").show();
            xcObj.hide();
            $("#search_con1").hide();
            $("#lrc_left").hide();
            $("#dt_left").hide();
            $("#artist_left").hide();
            $("#cate_left").hide();
            $("#search_left").hide();
            $("#phb_left").show();
            if(tag){
            commonClick('1','17','酷我新歌榜',25);
            }
        }else if(flag==5){//歌手
            $("#indexpage").hide();
            $("#left_index").show();
            $("#right_con").show();
            xcObj.hide();
            $("#search_con1").hide();
            $("#lrc_left").hide();
            $("#dt_left").hide();
            $("#cate_left").hide();
            $("#phb_left").hide();
            $("#search_left").hide();
            $("#artist_left").show();
            if(tag){
            commonClick('3','0','热门歌手',5409);
            }
        }else if(flag==6){//分类
            $("#indexpage").hide();
            $("#left_index").show();
            $("#right_con").show();
            xcObj.hide();
            $("#search_con1").hide();
            $("#phb_left").hide();
            $("#lrc_left").hide();
            $("#dt_left").hide();
            $("#artist_left").hide();
            $("#search_left").hide();
            $("#cate_left").show();
            if(tag){
            commonClick('5','','网络',27);
            }
        }else if(flag==7){//搜索
            closeClear();
            $("#indexpage").hide();
            xcObj.hide();
            allHide(-3);
            $("#phb_left").hide();
            $("#lrc_left").hide();
            $("#dt_left").hide();
            $("#artist_left").hide();
            $("#cate_left").hide();
            if(isFirstSearch){
                $("#left_index").hide();
                $("#right_con").hide();
                $("#search_left").hide();
                $("#search_con1").show();
            }else{
                $("#search_con1").hide();
                $("#left_index").show();
                $("#right_con").show();
                searchObj.show();
                $("#search_left").show();
            }
        }else if(flag==8){//秀场
            closeClear();
            $("#search_con1").hide();
            $("#indexpage").hide();
            $("#left_index").hide();
            $("#right_con").hide();
            xcObj.show();
            $("#phb_left").hide();
            $("#lrc_left").hide();
            $("#dt_left").hide();
            $("#artist_left").hide();
            $("#cate_left").hide();
            $("#search_left").hide();
            xiuchang();
        }
    }

}
//定义一个全局的tree对象 取本地或者网络上的曲库结构tree
var tree;
//定义一个全局索引集合  里面放的是source和sourceid对应的在tree中的索引
var treeindex={};
var phbIndex = "";
var artistIndex = "";
var cateIndex = "";
var bangtreeId = 1;
var artisttreeId = 3;
var catetreeId = 4;
var isTreeSuccessloaded = false;
function initQuKuTree(){
    //alert("initqukutree");
    var d = new Date();
    var r = d.getYear()+d.getMonth()+d.getDate()+d.getHours()+parseInt((d.getMinutes()/20));
    r = ''+d.getYear()+d.getMonth()+d.getDate()+r;
    //var url = "http://qukudata.kuwo.cn/q.k?op=query&cont=tree&node=1&level=3&maxchd=30&fmt=json&kset=default&src=mbox&callback=createQuKuTreeLocal&time="+r;
    var url = "http://qukudata.kuwo.cn/q.k?op=query&cont=tree&node=1&level=3&maxchd=50&fmt=json&kset=default&src=mbox&callback=createQuKuTreeLocal";
    $.getScript(url);
}
function createQuKuTreeLocal(jsondata){
    //alert("createQuKuTreeLocal");
    var data2l = jsondata;
    jsondata = null;
    if(typeof(data2l)=="undefined"||data2l==null||obj2Str(data2l)=="{}"||obj2Str(data2l)==""){
        return;
    }
    tree = data2l;
    var treeLen = tree.child.length;
    for(var i=0;i<treeLen;i++){
        var tpid = tree.child[i].id;
        if(tpid == 2){
            bangtreeId = i;
            getLeftString(tree,i);
            //暂时隐藏
            //swapBang(1);
        }
        if(tpid == 4){
            artisttreeId = i;
            getLeftString(tree,i);
        }
        if(tpid == 5){
            catetreeId = i;
            //暂时开启getHotCate
            getHotCate(tree);
            getLeftString(tree,i);
        }
    }
    isTreeSuccessloaded = true;
    loadQuKuIndex(tree);
    isQuKuLoaded = true;
    data2l = null;
    //swapBang(1);
/*  var iframe = document.getElementsByName("iframepage");
    setTimeout(function(){
        iframe.onload=swapHot(1);
        swapBang(1);
    },00);*/
}
//加载曲库tree里面对应的索引
function loadQuKuIndex(obj){
    var keySize = 0;
    for(var name in treeindex){
        keySize++;
    }
    if(keySize == 0){
        pushIndexObject(obj.child,"0");
    }
}
//专门往treeindex中写入每一个节点对应的索引
var indexFlag = true;
function pushIndexObject(obj,idx){
    for(var i = 0,j=obj.length;i<j;i++){
        var key = obj[i].id;
        if(key==""){
            key = "kuwo";
        }
        var index;
        index = idx+"_"+i;
        treeindex[key] = index;
        if(obj[i].child.length>0){
            pushIndexObject(obj[i].child,index);
        }
    }
    //alert("ok");
}
function getHotCate(tree){
        //alert("进入getNodeChild函数");
        var data = tree.child[catetreeId];
        var Size = data.child.length;
        if(typeof(data)=="undefined"||obj2Str(data)==""||obj2Str(data)=="{}"||Size==0){
            return;
        }
        var childOO = data.child;
        var childOOSize = childOO.length;
        var categoryString = "";
        var htmlArray = [];
        //alert(childOOSize);
        if(childOOSize>5){
            //childOOSize = 5;
        }
        var htmlTime = 0;
        if(childOOSize>0){
            
            for(var i=0;i<childOOSize;i++){
                if(htmlTime<5){
                var someObj = childOO[i];
                var info = someObj.info;
                if(info=="" || !info){
                    info = "";
                }
                var click = "";
                var source = someObj.source;
                if(source>17){
                    //i--;
                    continue;
                }
                if(info=="0首歌曲"){
                    //i--;
                    continue;
                }
                if(info==""&&(source==4||source==8||source==12||source==13||source==14)){
                    info = "10首歌曲";
                }
                //var jiaobiao = getJiaoBiao(source);
                //alert(jiaobiao);
                var sourceid = someObj.sourceid;
                var name = someObj.name;
                name = encodeString(name);
                var id = someObj.id;

                var pic = someObj.pic;
                if(pic==""){
                    pic = default_img;
                }else{
                    pic = changeImgDomain(pic);
                }
                //alert("pic="+pic);
                var clickarray = [];
                var clicki = 0;
                clickarray[clicki++] = "commonClick('";
                clickarray[clicki++] = source;
                clickarray[clicki++] = "','";
                clickarray[clicki++] = sourceid;
                clickarray[clicki++] = "','";
                clickarray[clicki++] = name;
                clickarray[clicki++] = "',";
                clickarray[clicki++] = id;
                clickarray[clicki++] = ")";
                click = clickarray.join('');
                clickarray = null;
                var htmlchildarray = [];
                var xia = 0;
                var disname = someObj.disname;
                disname = returnSpecialChar(disname);
                var tips = someObj.tips;
                var haslike = false;
                if(source==1||source==2||source==4||source==6||source==8||source==12||source==13||source==14){
                    haslike = true;
                }
            /*  
            <div class="qu_listfa">
                <div class="qu_list">
                    <a href="#" hidefocus class="qu_pho"><img src="http://image.kuwo.cn/webplayer2013/img/pic150.jpg" width="100" height="100" /><span class="qq_opa"></span><em></em></a>
                </div>
                <p class="qu_name"><a href="#">中文儿歌</a></p>
                <p class="qu_dec">更新于<em>2012-10-30</em></p>
            </div>
                */
                htmlchildarray[xia++] = '<div class="qu_listfa" rel="category"><div class="qu_list"><a';
                htmlchildarray[xia++] = ' href="javascript:';
                htmlchildarray[xia++] = click;
                htmlchildarray[xia++] = '" hidefocus="true" class="qu_pho" title="';
                htmlchildarray[xia++] = disname;
                if(i<(childOOSize-1)){
                    htmlchildarray[xia++] = '"><div class="img_loading"><img width="100" height="100" alt="'+disname+'" onload="imgOnload(this)" onerror="imgOnError(this)" src="http://image.kuwo.cn/webplayer2013/img/loading1.gif" data-src="';
                }else{
                    htmlchildarray[xia++] = '"><div class="img_loading"><img width="100" height="100" alt="'+disname+'" data-islast="';
                    htmlchildarray[xia++] = new Date().getTime();
                    htmlchildarray[xia++] = '" onload="imgOnload(this)" onerror="imgOnError(this)" src="http://image.kuwo.cn/webplayer2013/img/loading1.gif" data-src="';
                }
                htmlchildarray[xia++] = pic;
                htmlchildarray[xia++] = '" /></div>';
                //htmlchildarray[xia++] = jiaobiao;
                //alert(2);
                var isnew = someObj.isnew;
                if(typeof(isnew)!="undefined"&&isnew==1){
                    htmlchildarray[xia++] = '<span class="newtitle"></span>';
                }
                htmlchildarray[xia++] = '<span class="qq_opa"></span>';     
                if(source==1||source==2||source==4||source==7||source==8||source==9||source==10||source==12||source==13||source==14){
                    htmlchildarray[xia++] = '<p class="em" ';
                    htmlchildarray[xia++] = getEmClickString(source,sourceid,id);           
                    htmlchildarray[xia++] = '><em></em></p></a>';
                }else{      
                    htmlchildarray[xia++] = '</a>';                 
                }                       
                htmlchildarray[xia++] = '</div><p class="qu_name"><a';
                htmlchildarray[xia++] = ' class="clickLog" href="javascript:';
                htmlchildarray[xia++] = click;
                htmlchildarray[xia++] = '" hidefocus="true" title="';
                htmlchildarray[xia++] = disname;
                htmlchildarray[xia++] = '">';
                htmlchildarray[xia++] = disname;
                htmlchildarray[xia++] = '</a></p>';
                    //隐藏分类描述

                htmlchildarray[xia++] = '<p class="qu_dec"><a';
                htmlchildarray[xia++] = '<em>'+info+'</em>';
                htmlchildarray[xia++] = '</a></p>';
            
                htmlchildarray[xia++] = '</div>';
                htmlArray[i] = htmlchildarray.join('');
                htmlchildarray = null;
                htmlTime++;
                }else{
                    break;
                }
            }
        }
        categoryString = htmlArray.join('');
        htmlArray = null;
        $("#hotCate").html(categoryString);
        data = null;
        //暂时隐藏
        //swapBang(3);
}
var newsource;
var newsourceid;
var newname;
var newid;

var hotsource;
var hotsourceid;
var hotname;
var hotid;

var oumeisource;
var oumeisourceid;
var oumeiname;
var oumeiid;

var rihansource;
var rihansourceid;
var rihanname;
var rihanid;
//根据tree创建左侧列表（phb、artist、cate）
function getLeftString(tree,index){
    var SomeObj = null;
    var idType = '';
    //alert(2);
    if(index == bangtreeId){
        SomeObj = $("#phb_left");
        idType = "bang";
    }else if(index == artisttreeId){
        SomeObj = $("#artist_left");
        idType = "art";
    }else if(index == catetreeId){
        SomeObj = $("#cate_left");
        idType = "fen";
    }
    //alert(catetreeId);
    var Size = tree.child[index].child.length;
    //生成排行榜显示部分列表代码
    var htmlString = "";
    var htmlType = [];
    var htmlString = "";
    var bi = 0; 
    var s;
    var pic = "http://image.kuwo.cn/webplayer2013/img/pic30.jpg";
    var htmlKuwoString = "";
    var htmlNoKuwoString = "";
    var htmlKuwo = [];
    var htmlNoKuwo = [];
    for(var i=0;i<Size;i++){
        s = tree.child[index].child[i];
        var source = s.source;      //     1
        var sourceid = s.sourceid;  //    17
        if(index == catetreeId){
            sourceid = s.id;
        }
        if(source > 28){
            continue;
        }
        var name = s.name;          //  酷我新歌榜
        var id = s.id;              //    23
        var disname = s.disname;    // 酷我新歌榜
        pic = s.pic;
        //alert(3);
    //排行榜左侧样式
    if(index == bangtreeId&&disname.indexOf("酷我")>-1){
        disname=disname.substring(2);
        htmlKuwo[bi++] = '<a id="'+idType+'Id'+sourceid+'" class="titleNom" title="';
        htmlKuwo[bi++] = disname;
        htmlKuwo[bi++] = '" hidefocus="true" href="javascript:commonClick(\''+source+'\',\''+sourceid+'\',\''+disname+'\','+id+')" >';
        htmlKuwo[bi++] = disname;
        htmlKuwo[bi++] = '</a>';
    }else if(index == bangtreeId&&disname.indexOf("酷我")==-1){
        htmlNoKuwo[bi++] = '<a id="'+idType+'Id'+sourceid+'" class="titleNom" title="';
        htmlNoKuwo[bi++] = disname;
        htmlNoKuwo[bi++] = '" hidefocus="true" href="javascript:commonClick(\''+source+'\',\''+sourceid+'\',\''+disname+'\','+id+')" >';
        htmlNoKuwo[bi++] = '<img src="'+pic+'" alt="'+disname+'" width="22" height="22" />';
        htmlNoKuwo[bi++] = disname;
        htmlNoKuwo[bi++] = '</a>';
    }else{
        htmlType[bi++] = '<a id="'+idType+'Id'+sourceid+'" class="titleNom" title="';
        htmlType[bi++] = disname;
        htmlType[bi++] = '" hidefocus="true" href="javascript:commonClick(\''+source+'\',\''+sourceid+'\',\''+disname+'\','+id+')" >';
        /*if(index == bangtreeId||true){
            htmlType[bi++] = '<img src="'+pic+'" width="22" height="22" />';
        }*/
        htmlType[bi++] = disname;
        htmlType[bi++] = '</a>';
    }
  }
    htmlString = htmlType.join('');
    htmlKuwoString = htmlKuwo.join('');
    htmlNoKuwoString = htmlNoKuwo.join('');
    phbIndex = htmlString;
    if(index == bangtreeId){
        SomeObj.hide();
        SomeObj.html('<p class="ph_tit">酷我榜</p><p class="ph_fl">'+htmlKuwoString+'</p><p class="ph_tit">全球榜</p>'+htmlNoKuwoString);
        SomeObj.show();
    }else{
        SomeObj.html(htmlString);
    }
    
}
var timeSj = 0;
var corrBang = "new";
var Bid = 1;
//首页切换热门
function swapBang(flag){
    //alert("swapBang");
    timeSj++;
    if(flag==1){
        corrBang = "new";
        BangSong(newsource,newsourceid,newname,newid);//酷我新歌榜
    }else if(flag==2){
        corrBang = "hot";
        BangSong(hotsource,hotsourceid,hotname,hotid);//酷我热歌榜
    }else if(flag==3){
        corrBang = "oumei"; 
        BangSong(oumeisource,oumeisourceid,oumeiname,oumeiid);//酷我欧美榜
    }else if(flag==4){  
        corrBang = "rihan"; 
        BangSong(rihansource,rihansourceid,rihanname,rihanid);//酷我日韩榜
    }
}
function BangSong(source,sourceid,name,id){
    //alert("BangSong");
    //stopHttpRequest();
    var url = "http://kbangserver.kuwo.cn/ksong.s?from=pc&fmt=json&type=bang&data=content&id="+sourceid+"&callback=loadBangSong&pn=0&rn=9";
    setTimeout(function(){
        $.getScript(url);
    },50);
}
var f = true;
function loadBangSong(jsondata){
    //alert("loadBangSong");
    //加载热门歌单信息
        var data4 = jsondata;
        jsondata = null;
        if(typeof(data4)=="undefined"||obj2Str(data4)==""||data4==null||typeof(data4.name)=="undefined"){
            //刷新提示
            return;
        }
        var musicList = data4.musiclist;
        data4= null;
        var musicSize = musicList.length;
        var bigStr1 = musicBigString(0,8,false,musicList,false,1);
        if(bigStr1==""){
            return;
        }
        $("#"+corrBang+"song").html(bigStr1);
        if(corrBang == "new"){
            NewMusicListAllPlay = musicList;
        }else if(corrBang == "hot"){
            HotMusicListAllPlay = musicList;
        }else if(corrBang == "oumei"){
            OumeiMusicListAllPlay = musicList;
        }else if(corrBang == "rihan"){
            RihanMusicListAllPlay = musicList;
        }
        bigStr1 = null;
        data4 = null;
        //开始加载首页
        Bid ++;
        if(Bid<3){
            swapBang(Bid);
        }else if(f&&Bid==3){
            getHotCate(tree);
            f=false;
        }else if(Bid>2&&Bid<5){
            swapBang(Bid);
        }
}
function checkLeftStuts(){
    if(currcatesourceid == 79 || currcatesourceid == 17250 || currcatesourceid == 13){
        //保持分类左侧选中状态
        if(lastBang != null){
            lastBang.attr("class","titleNom");
        }
        try{
            $("#fenId"+currcatesourceid).attr("class","paih_now");
            lastBang=$("#fenId"+currcatesourceid);
        }catch(e){}
    }
}
var lastBang=null;
var currCateName="";
var currCateString="";
var currCateName1="";
var currCateString1="";
var currCateName2="";
var currCateString2="";
var currcatesourceid;
//通过点击跳转事件方法
function commonClick(source,sourceid,name,id,pic){ 
    //source 是数字 对应
    //-1 直接跳到曲库首页
    //-2 oneCategory点击
    //-3 search
    //-4 歌手专辑
    //-5 歌手MV
    //-6 相似歌手
    //-7 歌手信息
    //0 推荐首页
    //1 banglist 排行榜分类
    //2 bang 排行榜榜单
    //3 artistlist 歌手分类
    //4 artist 歌手
    //5 tag 普通标签
    //6 mvlist MV标签
    //7 mv MV
    //8 pl 普通歌单
    //9 diantai 电台
    //10 fm FM调频
    //11 game 某个游戏
    //12 tagpl 代表歌单
    //13 album 专辑
    //14 mvpl MV歌单
    //16 游戏合集
    //17 打开网页
    //alert("commonclick");
    var sourceNum = parseInt(source,10);
    switch(sourceNum){
        case 20:xiuchang();
        case 1: someBang(source,sourceid,id,name);
                //swapTab(4,flase);
                if(lastBang!= null){
                    lastBang.attr("class","titleNom");
                }
                try{
                    $("#bangId"+sourceid).attr("class","paih_now");
                    lastBang=$("#bangId"+sourceid);
                }catch(e){}
                break;
        case 2: someBang(source,sourceid,id,name);break;
        case 3: areaArtistList(sourceid,name,id);
                if(lastBang != null){
                    lastBang.attr("class","titleNom");
                }
                try{
                    $("#artId"+sourceid).attr("class","paih_now");
                    lastBang=$("#artId"+sourceid);
                }catch(e){}
                break;
        case 4: someArtist(sourceid);
            if(lastBang != null){
                lastBang.attr("class","titleNom");
            }
            try{
                $("#artId0").attr("class","paih_now");
                lastBang=$("#artId0");
            }catch(e){}
            break;
        case 5: currCateName = name;
                currCateString = "commonClick(\'"+source+"\',\'"+sourceid+"\',\'"+name+"\',"+id+")";
                if(sourceid == 79 || sourceid == 17250){    
                    currcatesourceid = sourceid;
                    currCateName1 = name;
                    currCateString1 = "commonClick(\'"+source+"\',\'"+sourceid+"\',\'"+name+"\',"+id+")";
                }
                checkLeftStuts();
                someCategory(source,sourceid,id);
                if(lastBang != null){
                    lastBang.attr("class","titleNom");
                }
                try{
                    $("#fenId"+id).attr("class","paih_now");
                    lastBang=$("#fenId"+id);
                }catch(e){}
                break;
        case 6: someCategory(source,sourceid,id);break;
        case 16: someCategory(source,sourceid,id);break;
        case 13: 
            checkLeftStuts();
            albumPageNum = 0;
            someAlbum(sourceid);break;
        case 8:  gedanPageNum=0;someGeDan(source,sourceid,id);break;
        case 12: gedanPageNum=0;someGeDan(source,sourceid,id);break;
        case 14: gedanPageNum=0;someGeDan(source,sourceid,id);break;
        case 9: //swapTab(1,true);
                someDianTai(sourceid,pic);break;
        case 10: someTiaoPin(sourceid);break;
        case -1: qukuhtml();break;
        case -2: 
            if(id==8){
                oneCategory(name,id,false);
            }else{
                oneCategory(name,sourceid);
            }
            break;
        case -3: searchFunction(sourceid,id);break;
        case -4: artistAlbumList(sourceid);break;
        case -5: artistMVList(sourceid);break;
        case -6: loadArtistSimilar(sourceid);break;
        case -7: artistInformation(sourceid);break;
        case 17: openURL(sourceid);break;
        case 25: openURL(sourceid);break;
    }
}
function openURL(nodeobj){
    window.open(nodeobj);
}
//停止所有http请求
function stopHttpRequest(){
    if(isIE) {
        //document.execCommand("stop");
    }else{
        //window.stop();
    }
}
//所有的显示块隐藏通用方法
function allHide(flag){
    currentBread = "";
    centerLoadingObj.hide();
    //shit
    var currentFlag = currentSource;
    switch(currentFlag){
        case 0:
            rightObj.hide();
            $(".right_top").hide();
            if(!Focus.isDestroy){
                Focus.pause();
            }
            break;
        case 1:
            phbObj.hide();
            //phbObj.find(".jiu_biglist").hide(); 
            //alert(1);
            // phbObj.find(".musicbang .con_rightlist,.albumbang,.artistbang,.mvbang .mvall").html("");
            break;
        case 3:
            artListObj.hide();
            //categoryObj.eq(1).hide();
            // $("#areaArtistContainer .qu_listfa").remove();
            break;
        case 4:
            artistObj.hide();
            // artistObj.find(".artistmusic .con_rightlist,#artistAlbumContainer,#artistMVContainer,.artistsimilar").html("");
            break;
        case 5:
            tagChildContainerObj.hide();
            // tagChildContainerObj.html("");
            break;
        case 6:
            lrcObj.hide();
            break;
        case 7:
            xcObj.hide();
            break;
        case 8:
            gedanObj.hide();
            break;
        case 13:
            albumObj.hide();
            break;
        case -2:
            tagChildContainerObj.hide();
            break;
        case -3:
            searchObj.hide();
            break;
        case -4:
            artistObj.hide();
            break;
        case -5:
            artistObj.hide();
            break;
        case -6:
            artistObj.hide();
            break;
        default: //webLog("allhide:error"+currentFlag);
    }
    currentSource = flag;
    if(isIE){
        //CollectGarbage();
    }
}
function someDianTai(sourceid,pic){
    //alert("sourceid:"+sourceid);
    var params = sourceid.split(",");
    var pic1 = "http://img1.kwcdn.kuwo.cn:81/star/tags"+params[2];
    var pic2 = "http://img1.kwcdn.kuwo.cn:81/star/tags"+params[3];
    //alert(sourceid.split(",")[0],params[1],pic,params[8]);
    if(currPlayingDtId.indexOf(sourceid.split(",")[0])>-1){
        //alert("小提示：播放器正在为您播放该电台！！");
        return false;
    }
    getDtDataById(sourceid.split(",")[0],params[1],pic,params[8]);
}
var dtflagUrl="http://player.kuwo.cn/webmusic/sj/dtflagdate";
var gold_fid="";
var offset=1;
var currPlDt;
var lastPlDt;
var currPlRecDt
var lastPlRecDt;
var currPlayingDtId ="";
//var isFirstDtPlay = false;
function getDtDataById(fid,name,pic,sts,flag){
    if(gold_fid!=fid){
        offset=1;
    }
    gold_fid=fid;
    var dtsj=WebPlayer.getDiantaiList();
    var t_dt=fid+","+name+","+pic+","+sts;
    //alert("t_dt:"+t_dt);
    var index=-1;
    for(var i=0,len=dtsj.length;i<len;i++){
        if(dtsj[i].indexOf(fid)>-1){
            index=i;
            break;
        }
    }
    var goldStr="";
    
    if(index>-1){
        for(var i = index; i >0; i--){
            dtsj[i] = dtsj[i-1];
        }
        dtsj[0]=t_dt;
        var len=dtsj.length;
        for(var i=0;i<len;i++){
            if(i>0){
                goldStr+="#";
            }
            goldStr+=dtsj[i];
        }
        //alert("goldStr:"+goldStr);
        WebPlayer.setDiantaiList(goldStr);
    }else{
        var len=dtsj.length;
        if(len>9){
            len=9;
        }
        for(var i=0;i<len;i++){
            if(i>0){
                goldStr+="#";
            }
            goldStr+=dtsj[i];
        }
        if(goldStr==""){
            goldStr=t_dt;
        }else{
            goldStr=t_dt+"#"+goldStr;
        }
    //  alert("22"+goldStr);
        WebPlayer.setDiantaiList(goldStr);
    }   
    var uid=getCookie("userid");
    var login=0;
    if(uid==""){
        uid="1234";
    }
    if(uid!=""){
        login=1;
    }
    var par = 'flag=7&uid='+uid+"&login="+login+"&fid="+fid+"&offset="+offset;
//  alert("ajxa准备执行了");
        jQuery.ajax({
            url : dtflagUrl,
            type : 'get',
            data : par,
            success : function(resp) {
                $("#recdt").show();
                //alert(resp);
                offset=offset+5;
                var rarr=resp.split("#");
                var goldRids="";
                for(var i=0,len=rarr.length;i<len;i++){
                    var carr=rarr[i].split(",");
                    if(i>0){
                        goldRids+=",";
                    }
                    goldRids+="MUSIC_"+carr[0];
                }
                //alert(fid+"   "+goldRids);
                WebPlayer.playDiantai(fid, goldRids);
                try{
                    currplayingDtId_one = "alldt_"+fid;
                    currplayingDtId_two = "recdt_"+fid;
                    currPlayingDtId = "alldt_"+fid+"recdt_"+fid;
                    currPlDt = $("#alldt_"+fid);
                    currPlRecDt = $("#recdt_"+fid);
                    currPlDt.attr("class","qu_pho1 clickLog");
                    currPlDt.find("span").attr("class","playing_diantai");
                    currPlDt.find("span").html("正在播放 ...");
                    currPlRecDt.attr("class","qu_pho1 clickLog");
                    currPlRecDt.find("span").attr("class","playing_diantai");
                    currPlRecDt.find("span").html("正在播放 ...");
                    if(lastPlDt!=null&&lastPlDt!=""&&typeof(lastPlDt)!="undefined"){
                        lastPlDt.attr("class","qu_pho clickLog");
                        lastPlDt.find("span").attr("class","qq_opa");
                        lastPlDt.find("span").html("");
                    }
                    if(currPlRecDt!=null&&currPlRecDt!=""&&typeof(currPlRecDt)!="undefined"){
                        currPlRecDt.attr("class","qu_pho clickLog");
                        currPlRecDt.find("span").attr("class","qq_opa");
                        currPlRecDt.find("span").html("");
                    }
                    lastPlDt = currPlDt;
                    lastPlRecDt = currPlRecDt;
                    //更新最近听过电台列表顺序
                    if(currdttype == 1){
                        RecentDtHTML(true);
                    }
                    //isFirstDtPlay = true;
                }catch(e){}
            }
        });
    if(flag=="1"){
        try{
            //swapLbTab(3);
            }catch(e){}
    }else{
        try{
            //swapLbTab(3);
            }catch(e){}
    }
}

//取得自己的私人电台，并播放
function dtcallback(fid){
    if(gold_fid!=fid){
        offset=1;
    }
    gold_fid=fid;
    var uid=getCookie("userid");
    var login=0;
    if(uid==""){
        uid="1234";
    }
    if(uid!=""){
        login=1;
    }
    var par = 'flag=7&uid='+uid+"&login="+login+"&fid="+fid+"&offset="+offset;  
    jQuery.ajax(
        {
            url:dtflagUrl,
            type:'get',
            data:par,
            success:function(resp){
                offset=offset+5;
                var rarr=resp.split("#");
                var goldRids="";
                for(var i=0,len=rarr.length;i<len;i++){
                    var carr=rarr[i].split(",");
                    if(i>0){
                        goldRids+=",";
                    }
                    goldRids+="MUSIC_"+carr[0];
                }
                WebPlayer.playDiantai(fid, goldRids);
            }
        }
    );
}

function toDiantai(){
    $("#recdt").hide();
    RecentDtHTML(true);
}
var currdttype = 1;
function swapDt(flag){
    if(flag == 1){
        //开启最近听界面
        $("#alldt").attr("class","");
        $("#recdt").attr("class","paih_now");
        currdttype = 1;
        RecentDtHTML(true);
    }else if(flag == 2){
        //关闭最近听界面
        $("#recdt").attr("class","");
        $("#alldt").attr("class","paih_now");
        currdttype = 2;
        oneCategory(1,8);
    }
}
//书写电台列表
var dtlen = 0;
function RecentDtHTML(flag){
    stopHttpRequest();
    if(flag){
        allHide(-2);    
        tagChildContainerObj.find("#cateArea").html("");
        tagChildContainerObj.show();
    }else{
        return false;
    }
    centerLoadingStart();
    var dtsj=WebPlayer.getDiantaiList();
    dtlen = (dtsj.length>8)? 8 :dtsj.length;
    if(dtlen == 0){
        swapDt(2);
        return false;
    }else{
        $("#recdt").show();
        $("#alldt").attr("class","");
        $("#recdt").attr("class","paih_now");
    }
    var lstType=WebPlayer.listType;
    var htmlArray = [];
    for(var i=0;i<dtlen;i++){
        var carr=dtsj[i].split(",");
        var click = "";
        var source = 9;
        //alert("dtsj[i]:"+dtsj[i]);
        var sourceid = dtsj[i].substring(0,dtsj[i].indexOf(","+carr[3]))+" , , , , , ,"+carr[3]+", ,";
        //alert(sourceid);
        var name = carr[1];
        name = returnSpecialChar(name);
        name = encodeString(name);
        var id = carr[0];
        var pic = carr[2];
        if(pic==""){
            pic = default_img;
        }else{
            pic = changeImgDomain(pic);
        }
        //alert(0);
        var clickarray = [];
        var clicki = 0;
        clickarray[clicki++] = "commonClick('";
        clickarray[clicki++] = source;
        clickarray[clicki++] = "','";
        clickarray[clicki++] = sourceid;
        clickarray[clicki++] = "','";
        clickarray[clicki++] = name;
        clickarray[clicki++] = "',";
        clickarray[clicki++] = id;
        if(source == 9){
            clickarray[clicki++] = ",'";
            clickarray[clicki++] = pic+"'";
        }
        clickarray[clicki++] = ")";
        click = clickarray.join('');
        clickarray = null;
        var disname = returnSpecialChar(name);
        //alert(1);
        var htmlchildarray = [];
        var xia = 0;
        htmlchildarray[xia++] = '<div class="qu_listfa" rel="tagchild"><div class="qu_list"><a data-tips="';
        htmlchildarray[xia++] = '"';    
        htmlchildarray[xia++] = '" href="javascript:';  
        htmlchildarray[xia++] = click;
        //alert("sourceid:"+sourceid);
        var d1 = sourceid.split(",")[0];
        var dt_typeid1 = "recdt_"+d1;
        htmlchildarray[xia++] = '" hidefocus="true" class="qu_pho clickLog" id='+dt_typeid1+' title="';
        htmlchildarray[xia++] = carr[1];
        if(i<(dtlen-1)){
            htmlchildarray[xia++] = '"><div class="img_loading"><img width="100" height="100" alt="'+carr[1]+'" onload="imgOnload(this)" onerror="imgOnError(this)" src="http://image.kuwo.cn/webplayer2013/img/loading1.gif" data-src="';
        }else{
            htmlchildarray[xia++] = '"><div class="img_loading"><img width="100" height="100" alt="'+carr[1]+'" data-islast="';
            htmlchildarray[xia++] = new Date().getTime();
            htmlchildarray[xia++] = '" onload="imgOnload(this)" onerror="imgOnError(this)" src="http://image.kuwo.cn/webplayer2013/img/loading1.gif" data-src="';
        }
        ////alert(2);
        htmlchildarray[xia++] = pic;
        htmlchildarray[xia++] = '" /></div>';
        htmlchildarray[xia++] = '<span class="qq_opa"></span>'; 
        htmlchildarray[xia++] = '<p class="em" ';
        htmlchildarray[xia++] = getEmClickString(source,sourceid,id,pic);   
        htmlchildarray[xia++] = '><em></em></p></a>';                   
        //click = "getDtDataById('-6007','酷我新歌电台','http://img1.kwcdn.kuwo.cn:81/star/tags/201203/1331101283313.jpg','338')";
        htmlchildarray[xia++] = '</div><p class="qu_name"><a';
        htmlchildarray[xia++] = ' class="clickLog" href="javascript:';  
        htmlchildarray[xia++] = click;
        htmlchildarray[xia++] = '" hidefocus="true" title="';
        htmlchildarray[xia++] = carr[1];
        //alert(3);
        htmlchildarray[xia++] = '">';
        htmlchildarray[xia++] = carr[1];
        htmlchildarray[xia++] = '</a></p>';
        htmlchildarray[xia++] = '</div>';
        htmlArray[i+1] = htmlchildarray.join('');
        htmlchildarray = null;      
    }
    rencentDtString = htmlArray.join('');
    if(dtlen == 0){
        rencentDtString = '<div class="qu_listfa" rel="tagchild"><div class="qu_list"><a data-tips=""" href="javascript:void(0);" hidefocus="true" class="qu_pho clickLog" title="你还没有收听过任何电台哦，欢迎去全部电台中选择收听"><div class="img_loading"><img width="100" height="100" onload="imgOnload(this)" onerror="imgOnError(this)" src="http://image.kuwo.cn/webplayer2013/img/loading1.gif" data-src="http://img4.kwcdn.kuwo.cn:81/star/upload/9/9/1369293859209_.jpg" /></div><span class="qq_opa"></span><p class="em" onclick="" title="快去选择你喜欢的电台吧"><em></em></p></a></div><p class="qu_name"><a class="clickLog" href="javascript:void(0);" hidefocus="true" title="暂无电台">未收听过任何电台</a></p></div><div class="qu_listfa" rel="tagchild">';
    }
    //alert(rencentDtString);
    htmlArray = null;
    if(tagChildContainerObj.find("#cateArea").find(".qu_listfa").size()>0){
        tagChildContainerObj.find("#cateArea").find(".qu_listfa").remove();
    }   
    var preDiv = '<div class="songer_listcon">';
    var bacDiv = '</div>';
    centerLoadingEnd();
    tagChildContainerObj.find("#cateArea").html(preDiv+rencentDtString+bacDiv);
    data = null;
    try{
        currPlRecDt = $("#"+currplayingDtId_two);
        currPlRecDt.attr("class","qu_pho1 clickLog");
        currPlRecDt.find("span").attr("class","playing_diantai");
        currPlRecDt.find("span").html("正在播放 ...");
        if(lastPlRecDt!=null&&lastPlRecDt!=""&&typeof(lastPlRecDt)!="undefined"){
            lastPlRecDt.attr("class","qu_pho clickLog");
            lastPlRecDt.find("span").attr("class","qq_opa");
            lastPlRecDt.find("span").html("");
        }
        lastPlRecDt = currPlRecDt;
    }catch(e){}
}
var curTindex = 0
var curTid = 0
var currentTagId = -1;
//通用 通过点击一级分类相关链接进入到子列表页面
function oneCategory(index,id,flag){
    stopHttpRequest();
    allHide(-2);    
    tagChildContainerObj.find("#cateArea").html("");
    tagChildContainerObj.show();
    centerLoadingStart();
    curTindex = index;
    curTid = id;
    var catindex = treeindex[id];
    if(typeof(catindex)!="undefined"){
        categoryIndex = catindex;
    }
    loadCategory(index,id);
}
var currArtTag = 1;
var currArtTag2 = 4;
//加载15个大分类下的子列表（1、8）
function loadCategory(index,id){
    currArtTag = index;
    currArtTag2 = id;
    //去掉左侧选中状态
    //lastBang.attr("class","s");
/*  if(currArtTag == 1&&currArtTag2 == 4){
        lastBang = $("#artIdall");
        lastBang.attr("class","titleNow");
    }*/
    var categoryString = "";
    tagChildPage = 0;
    tagChildTotal = -1;
    tagId = id;
    currentTagId = id;
    tagIndex = index;
    tagchildsame = "";
    loadTagChildData();
}
//分类下子列表瀑布流
var tagChildPage = 0;
var tagChildRn = 500;
var tagChildTotal = -1;
var tagId = -1;
var tagIndex = -1;
function loadTagChildData(){
    //alert("进入loadTagChildData函数");
    var currTotal = tagChildTotal;
    var currRn = tagChildRn;
    var currPage = tagChildPage;

    var url = "http://qukudata.kuwo.cn/q.k?op=query&cont=ninfo&node="+tagId+"&pn="+currPage+"&rn="+currRn+"&fmt=json&src=mbox&callback=showTagChild";
    $.getScript(url);
}
var tagchildsame = "";
var currDtPlayingId = "";
function showTagChild(jsondata){
    //alert("返回的电台数据jsondata为："+jsondata);

    var data = jsondata;
    if(typeof(data)=="undefined"||data.total==0||obj2Str(data)=="{}"||obj2Str(data)==""){
        tagChildPage++;
        return;
    }
    if(tagId!=data.node){
        return;
    }
    if(currentTagId!=data.node){
        return;
    }
    tagChildTotal = data.total;
    var childOO = data.child;
    var childOOSize = childOO.length;
    var categoryString = "";
    var htmlArray = [];
    //alert(tagId);
    if(childOOSize>0){
        if(tagId==16&&tagChildPage==0){
            htmlArray[0] = '<div id="delay_load_game_2013_4" rel="tagchild"></div>';
        }else{
            htmlArray[0] = '';
        }
        for(var i=0;i<childOOSize;i++){
            var someObj = childOO[i];
            var info = someObj.info;
            if(info=="" || !info){
                info = "";
            }
            var click = "";
            var source = someObj.source;
            if(source==2){
                continue;
            }
            if(source>17){
                continue;
            }
            if(info=="0首歌曲"){
                continue;
            }
            if(info==""&&(source==4||source==8||source==12||source==13||source==14)){
                info = "10首歌曲";
            }
            var jiaobiao = getJiaoBiao(source);
            var sourceid = someObj.sourceid;
            if(sourceid==""){
                sourceid = 0;
            }
            var issame = "";
            if(source==7 || source==8 || source==12 || source==14){
                issame = ''+sourceid;
            }else{
                issame = ''+source+someObj.id;
            }
            if(tagchildsame.indexOf(issame)>-1){
                continue;
            }
            tagchildsame += (issame+"|");
            var name = someObj.name;
            name = returnSpecialChar(name);
            name = encodeString(name);
            var id = someObj.id;
            var pic = someObj.pic;
            //alert(pic);
            if(pic==""){
                pic = default_img;
            }else{
                pic = changeImgDomain(pic);
            }
            
            var clickarray = [];
            var clicki = 0;
            clickarray[clicki++] = "commonClick('";
            clickarray[clicki++] = source;
            clickarray[clicki++] = "','";
            clickarray[clicki++] = sourceid;
            clickarray[clicki++] = "','";
            clickarray[clicki++] = name;
            clickarray[clicki++] = "',";
            clickarray[clicki++] = id;
            if(source == 9){
                clickarray[clicki++] = ",'";
                clickarray[clicki++] = pic+"'";
            }
            clickarray[clicki++] = ")";
            click = clickarray.join('');
            clickarray = null;
            var disname = someObj.disname;  
            disname = returnSpecialChar(disname);
            var htmlchildarray = [];
            var xia = 0;    
            htmlchildarray[xia++] = '<div class="qu_listfa" rel="tagchild"><div class="qu_list"><a data-tips="';
            htmlchildarray[xia++] = '"';    
            htmlchildarray[xia++] = '" href="javascript:';  
            htmlchildarray[xia++] = click;
            if(curTindex == 1&&curTid == 8){
                var d1 = sourceid.split(",")[0];
                //if(d1.indexOf("-")>-1){d1=d1.substring(1);}
                var dt_typeid = "alldt_"+d1;
                /*if(dt_typeid==currPlayingDtId){
                    
                }*/
                htmlchildarray[xia++] = '" hidefocus="true" id='+dt_typeid+' class="qu_pho clickLog" title="';
            }else{
                htmlchildarray[xia++] = '" hidefocus="true" class="qu_pho clickLog" title="';
            }
            htmlchildarray[xia++] = disname;
            if(i<(childOOSize-1)){
                htmlchildarray[xia++] = '"><div class="img_loading"><img width="100" height="100" alt="'+disname+'" onload="imgOnload(this)" onerror="imgOnError(this)" src="http://image.kuwo.cn/webplayer2013/img/loading1.gif" data-src="';
            }else{
                htmlchildarray[xia++] = '"><div class="img_loading"><img width="100" height="100" alt="'+disname+'" data-islast="';
                htmlchildarray[xia++] = new Date().getTime();
                htmlchildarray[xia++] = '" onload="imgOnload(this)" onerror="imgOnError(this)" src="http://image.kuwo.cn/webplayer2013/img/loading1.gif" data-src="';
            }
            htmlchildarray[xia++] = pic;
            htmlchildarray[xia++] = '" /></div>';
            if(source != 9){
                htmlchildarray[xia++] = jiaobiao;
            }
            var isnew = someObj.isnew;
            if(typeof(isnew)!="undefined"&&isnew==1){
                htmlchildarray[xia++] = '<span class="newtitle"></span>';
            }
            htmlchildarray[xia++] = '<span class="qq_opa"></span>'; 
            if(source==1||source==2||source==4||source==7||source==8||source==9||source==10||source==12||source==13||source==14){
                htmlchildarray[xia++] = '<p class="em" ';
                htmlchildarray[xia++] = getEmClickString(source,sourceid,id,pic);   
                htmlchildarray[xia++] = '><em></em></p></a>';           
            }else{              
                htmlchildarray[xia++] = '</a>';
            }           
            //click = "getDtDataById('-6007','酷我新歌电台','http://img1.kwcdn.kuwo.cn:81/star/tags/201203/1331101283313.jpg','338')";
            htmlchildarray[xia++] = '</div><p class="qu_name"><a';
            htmlchildarray[xia++] = ' class="clickLog" href="javascript:';  
            htmlchildarray[xia++] = click;
            htmlchildarray[xia++] = '" hidefocus="true" title="';
            htmlchildarray[xia++] = disname;
            htmlchildarray[xia++] = '">';
            htmlchildarray[xia++] = disname;
            htmlchildarray[xia++] = '</a></p>';
            if(curTindex == 1&&curTid == 8){
                htmlchildarray[xia++] = '<p class="qu_dec"><a';
                htmlchildarray[xia++] = ' class="clickLog" style="text-decoration:none;"';
                htmlchildarray[xia++] = ' hidefocus="true" title="';
                htmlchildarray[xia++] = info;
                htmlchildarray[xia++] = '">';
                var info1 = "大家都爱听";
                if(source == 1){
                    info1 = info.substring(info.length-10,info.length);
                }else{
                    info1 = info;
                }
                htmlchildarray[xia++] = info1;
                htmlchildarray[xia++] = '</a></p>';
            }
            htmlchildarray[xia++] = '</div>';
            htmlArray[i+1] = htmlchildarray.join('');
            htmlchildarray = null;      
            
        }
    }
    categoryString = htmlArray.join('');
    //alert(categoryString);
    htmlArray = null;

    if(tagId!=data.node){
        return;
    }
    if(currentTagId!=data.node){
        return;
    }
    if(tagChildPage==0&&tagChildContainerObj.find("#cateArea").find(".qu_listfa").size()>0){
        tagChildContainerObj.find("#cateArea").find(".qu_listfa").remove();
    }   

    var preDiv = '<div class="songer_listcon">';
    var bacDiv = '</div>';
    centerLoadingEnd();
    tagChildContainerObj.find("#cateArea").html(preDiv+categoryString+bacDiv);
    tagChildPage++;
    childOO = null;
    data = null;
    if(curTindex == 1&&curTid == 8){
        try{
            currPlDt = $("#"+currplayingDtId_one);
            currPlDt.attr("class","qu_pho1 clickLog");
            currPlDt.find("span").attr("class","playing_diantai");
            currPlDt.find("span").html("正在播放 ...");
            if(lastPlDt!=null&&lastPlDt!=""&&typeof(lastPlDt)!="undefined"){
                lastPlDt.attr("class","qu_pho clickLog");
                lastPlDt.find("span").attr("class","qq_opa");
                lastPlDt.find("span").html("");
            }
            lastPlDt = currPlDt;
        }catch(e){}
    }
}

var phbid = -1;
var phbname = "";
//生成排行榜
function someBang(source,sourceid,id,index){
    stopHttpRequest();
    if(sourceid==0){
        return;
    }
    allHide(1);
    swapTab(4,false);
    phbObj.find(".jiu_playlist .jiu_biglist").html("");
    phbObj.show();
    centerLoadingStart();
    if(source==1){
        //setBread("phb",source,sourceid,id);   
    }
    var tindex = treeindex[id];
    if(typeof(sourceid)!="undefined"){
        if(typeof(tindex)=="undefined"){
            var bangname = bangNAME;
            var haschange = true;
            if(haschange){
                //phbObj.find(".jiu_nav .jiu_navleft span").html(bangname);
            }
            var phbObj1 = phbObj.find(".jiu_nav");
            //saveBread(phbObj1);
        }else{
            var indexArray = tindex.split("_");
            if(indexArray.length<2){
                return;
            }
            var bangchildobj = tree.child[indexArray[1]].child[indexArray[2]];
            var bangname = bangchildobj.disname;
            phbObj.find(".phbtit li span").html(bangname);
            var phbObj1 = phbObj.find(".jiu_nav");
            //saveBread(phbObj1);
        }
        phbname = bangname;
    }
    var url = "http://kbangserver.kuwo.cn/ksong.s?from=pc&fmt=json&type=bang&data=content&id="+sourceid+"&callback=loadChildBangList&pn=0&rn=100";
    phbid = sourceid;
    setTimeout(function(){
        $.getScript(url);
    },25);
}
//加载右侧榜单
function loadChildBangList(jsondata){
    var data = jsondata;
    //var picB = "http://image.kuwo.cn/webplayer2013/img/loading.gif";
    if(typeof(data)=="undefined" || data==null||obj2Str(data)=="{}"||obj2Str(data)==""){
        centerLoadingEnd();
        return;
    }
    phbname = data.name;
    var type = data.type;
    phbObj.find(".jiu_playlist").css("overflow","hidden");
    if(type=="music"){
        //XX单曲榜
        var bangList = data.musiclist;
        bangListAllPlay = bangList;
        var bangSize = bangList.length;
        if(phbid!=-1){
            for(var i=0;i<bangSize;i++){
                bangList[i].phbid = phbid;
            }
        }
        //picB = data.pic;
        //phbObj.find(".phbtit li span").html("<img src="+picB+" width='45' height='45'/>"+phbname);
        var bigStr = musicBigString(1,1,true,bangList,true);
        phbObj.find(".jiu_nav .jiu_navleft span").html("共"+bangSize+"首歌曲");
        phbObj.find(".jiu_playlist .jiu_biglist").show();
        phbObj.find(".jiu_biglist").html(bigStr);   
        centerLoadingEnd();
    }
    bigStr = null;
    bangList = null;
    data = null;
    var endtime = new Date().getTime();
}


//取区域歌手列表

function ziMu(obj){
    var zimuobj = $(obj);
    zimuobj.addClass("on").siblings().removeClass("on");
    var zimuhtml =  zimuobj.html();
    if(zimuhtml=="全部热门"||zimuhtml=="热门歌手"){
        areaOrder = "hot";
        zimu = "no";
    }else{
        zimu = zimuhtml.toLowerCase();
    }
    if(areaListId==-1){
        return;
    }
    zimuindex = zimuobj.index();
    artistList(areaListId);
    zimuobj = null;
}
//取区域歌手列表
var areaListId = -1;
var areaName ="";
var areaOrder = "hot";
var zimu = "no";
var areaListTotal = 0;
var zimuindex = 0;
var lastArtZimu;
function areaArtistList(id,name,index){
    stopHttpRequest();
    zimuindex = 0;
    if(name=="热门歌手"){
        $("#hotart").html("全部热门");
    }else{
        $("#hotart").html("热门歌手");
    }
    areaOrder = "hot";  
    zimu = "no";
    $("#hotart").addClass("on").siblings().removeClass("on");
    artistList(id);
}
function artistList(id){
    allHide(3);
    artListObj.find("#songerArea .songer_listcon").html("");
    areaListId = id;
    currentTagId = id;
    artListObj.show();
    centerLoadingStart();
    areaArtistPage = 0;
    areaListTotal = 0;
    areaName = encodeString(name);
    loadAreaArtist();
}
var areaArtistRn=20;
var areaArtistPage=0;
//加载区域歌手列表
function loadAreaArtist(){
    //alert("loadAreaArtist");
    $("#artlistIndex").hide();
    var currTotal = areaListTotal;
    var currRn = areaArtistRn;
    var currPage = areaArtistPage;
    var currZimu = zimu;
    if(currZimu=="#"){
        currZimu = "%23";
    }
    var url = "";
    if(currZimu=="no"){
        url = "http://artistlistinfo.kuwo.cn/mb.slist?stype=artistlist&category="+areaListId+"&order="+areaOrder+"&pn="+currPage+"&rn="+currRn+"&callback=showAreaArtistList";
    }else{
        url = "http://artistlistinfo.kuwo.cn/mb.slist?stype=artistlist&category="+areaListId+"&order="+areaOrder+"&pn="+currPage+"&rn="+currRn+"&callback=showAreaArtistList&prefix="+currZimu;
    }
    setTimeout(function(){
        $.getScript(url);
    },25);
}
var artlistpageTotal=1;
//显示加载的区域歌手列表数据
function showAreaArtistList(jsondata){
    var starttime = new Date().getTime();
    var data = jsondata;
    if(typeof(data)=="undefined"||data==null||obj2Str(data)==""||data.total==0||obj2Str(data)=="{}"){
        //areaArtistPage++;
        return;
    }
    var cateid = data.category;
    if(typeof(cateid)!="undefined" && cateid!=areaListId){
        return;
    }
    if(currentTagId!=data.category){
        return;
    }
    if(data.pn==0&&$("#areaArtistContainer .qu_listfa").size()>0){
        return;
    }
    var artistListObj = data.artistlist;
    var artistsSize = artistListObj.length;
    areaListTotal = data.total;
    //歌手列表页数
    artlistpageTotal = Math.ceil(areaListTotal/areaArtistRn);
    var bigStr = "";
    var htmlArray = [];
    //alert("artistsSize="+artistsSize);
    for(var i = 0; i < artistsSize; i ++){
        var someObj = artistListObj[i];
        var pic = someObj.pic;
        var name = someObj.name;
        name = returnSpecialChar(name);
        var artistid = someObj.id;
        var musicNum = someObj.music_num;
        if(musicNum==0){
            continue;
        }
        var info = musicNum+"首歌曲";
        if(pic == ""){
            pic = artist_default_img;
        }else{
            pic = getArtistPrefix(pic)+pic;
            pic = pic.replace("starheads/55","starheads/100");
        }
        var listen = someObj.listen;
        if(typeof(listen)=="undefined"||listen==""||listen==0){
            listen = parseInt(100000*Math.random(),10);
        }
        var like = someObj.like;
        if(typeof(like)=="undefined"||like==""||like==0){
            like = parseInt(10000*Math.random(),10);
        }                       

        var htmlchildarray = [];
        var xia = 0;
        htmlchildarray[xia++] = '<div class="qu_listfa" rel="areaartistwf"><div class="qu_list"><a';
        htmlchildarray[xia++] = ' class="qu_pho" hidefocus="true" href="javascript:someArtist(';
        htmlchildarray[xia++] = artistid;
        htmlchildarray[xia++] = ')" title="';
        htmlchildarray[xia++] = name;
        if(i<(artistsSize-1)){
            htmlchildarray[xia++] = '"><img width="100" height="100" alt="'+name+'" onload="imgOnload(this)" onerror="imgOnError(this)" src="http://image.kuwo.cn/webplayer2013/img/loading1.gif" data-src="';
        }else{
            htmlchildarray[xia++] = '"><img width="100" height="100" alt="'+name+'" data-islast="';
            htmlchildarray[xia++] = new Date().getTime();
            htmlchildarray[xia++] = '" onload="imgOnload(this)" onerror="imgOnError(this)" src="http://image.kuwo.cn/webplayer2013/img/loading1.gif" data-src="';
        }
        htmlchildarray[xia++] = pic;
        htmlchildarray[xia++] = '" /><span class="qq_opa"></span><p class="em" ';
        htmlchildarray[xia++] = getEmClickString(4,artistid);
        htmlchildarray[xia++] = '><em></em></p></a>';
        htmlchildarray[xia++] = '</div><p class="qu_name"><a';
        htmlchildarray[xia++] = ' hidefocus="true" href="javascript:someArtist(';
        htmlchildarray[xia++] = artistid;
        htmlchildarray[xia++] = ')" title="';
        htmlchildarray[xia++] = name;
        htmlchildarray[xia++] = '">';
        htmlchildarray[xia++] = name;
        htmlchildarray[xia++] = '</a></p>';
        //隐藏歌曲数量
/*      htmlchildarray[xia++] = '<p class="qu_dec">';
        htmlchildarray[xia++] = '<em>'+info+'</em>';
        htmlchildarray[xia++] = '</a></p>';*/
        htmlchildarray[xia++] = '</div>';
        htmlArray[i] = htmlchildarray.join('');
        htmlchildarray = null;
    }
    //alert(6);
    bigStr = htmlArray.join('');
    htmlArray = null;
    //var jqObj = jQuery(bigStr);
    //checkLoading(areaArtistPage);
    if(typeof(cateid)!="undefined" && cateid!=areaListId){
        return;
    }
    if(currentTagId!=data.category){
        return;
    }
    //alert(7);
    if(data.pn==0&&$("#areaArtistContainer .qu_listfa").size()>0){
        return;
    }
    //areaArtistPage++;
    var forDiv = "<div class='songer_listcon'>";
    var lasDiv = "</div>";
    centerLoadingEnd();
    //artListObj.find("#songerArea").html(forDiv+bigStr+lasDiv);
    if(areaArtistPage==0&&artlistpageTotal<6){
        for(var i=0;i<artlistpageTotal;i++){
            $("#songlist_"+(i+1)).html(i+1);
            $("#songlist_"+(i+1)).show();
                $("#songlist_"+(i+1)).attr("href","javascript:jumpToPage("+i+",1);");
                if(i!=0){
                    $("#songlist"+(i+1)).attr("class","");
                    }else{
                    $("#songlist_"+(i+1)).attr("class","ge_anwo");
                    }
        }
        for(var j=artlistpageTotal;j<5;j++){
            $("#songlist_"+(j+1)).hide();
        }
    }else if(areaArtistPage==0&&artlistpageTotal>5){
        for(var i=0;i<5;i++){
            $("#songlist_"+(i+1)).html(i+1);
            $("#songlist_"+(i+1)).show();
                $("#songlist_"+(i+1)).attr("href","javascript:jumpToPage("+i+",1);");
                if(i!=0){
                    $("#songlist"+(i+1)).attr("class","");
                    }else{
                    $("#songlist_"+(i+1)).attr("class","ge_anwo");
                    }
        }
    }
    $("#artlistIndex").show();
    artListObj.find("#songerArea .songer_listcon").html(bigStr);
    artistListObj = null;
    data = null;
}
var currentArtistId = -1;
var musicPageNum = 0;
var musicRn = 10;
var musicTotal = -1;
var artistMusicLoad = false;
var artistId = 0;
var artistName = "";
var albumPage = 0;
var albumRn = 20;
var albumTotal = -1;

var currentPageNum = 0;
var currentPageType = 2;
/**
 * 一共有6种类型的分页，分别为：
 * 0--歌手歌曲列表分页；
 * 1--歌手列表分页
 * 2--某一分类（如中国风）的第一层列表分页
 * 3--歌单下歌曲列表分页
 * 4--专辑下歌曲列表分页
 * 5--分类下二级（如评书-百家讲坛-易中天讲三国的同级分页）
 * 6--搜索结果分页
 * 7--电台数量少不需要（X）
 */

function goToPage(pnum,ptype){
    if(ptype==0){//歌手下歌曲
        musicPageNum = pnum;
        artistToMusic(currentArtistId);
    }else if(ptype==1){//歌手列表
        
    }
}
//通过歌手id来获取某个歌手内容页
function someArtist(sourceid){
    stopHttpRequest();
    swapTab(5,false);
    currentArtistId = sourceid;
    musicPageNum = 0;
    artistId = 0;
    allHide(4);
    

    var currObj = artistObj;
    currObj.find(".jiu_playlist").css("overflow","hidden");
    
    currObj.hide();
    artistObj.find(".jiu_playlist .jiu_biglist").html("");
    currObj.find(".sub_nav").html("");
    var bread = "";
    bread = '<a href="javascript:oneCategory(1,4)"  hidefocus="true">歌手</a>&nbsp;&gt;&nbsp;<span id="region_category"></span>&nbsp;&gt;&nbsp;<span id="artNameId"></span>';
    currObj.find(".sub_nav").html(bread);
    //artistRight.hide();
    currObj.show();
    centerLoadingStart();
    setTimeout(function(){
        artistInfo(sourceid);
        artistToMusic(sourceid);
    },25);
}
//获取歌手信息（1.歌手图像；2歌手所属类别）
function artistInfo(sourceid){
    if(sourceid==0){
        return;
    }
    var url = host_url+"r.s?stype=artistinfo&artistid="+sourceid+"&callback=loadArtistInfo";
    $.getScript(url);
}
//加载歌手信息数据
function loadArtistInfo(jsondata){
    //alert("loadArtistInfo");
    var data = jsondata;
    if(typeof(data)=="undefined" || data==null || obj2Str(data)=="{}"||obj2Str(data)==""){
        return;
    }
    //currentConClass = "artist_con";
    var artist = data.name;
    artistName = artist;
    var regionid = data.region_category;
    //alert(data);
    if(typeof(regionid)!="undefined"&&regionid!==""&&!isNaN(regionid)){
        var regionarray = ["热门歌手","华语男歌手","华语女歌手","华语组合","日韩男歌手","日韩女歌手","日韩组合","欧美男歌手","欧美女歌手","欧美组合","其他"];
        $("#region_category").html('<a href="javascript:twoCategory(3,'+regionid+',0,0)" hidefocus="true">'+regionarray[regionid]+'</a>').show();
    }else{
        $("#region_category").html("").hide();
    }
    
    var currObj = artistObj;
    /*var span1 = currObj.find(".sub_nav").find("span");
    if(span1.html()==""){
        span1.html(returnSpecialChar(artistName));
    }
    saveBread(currObj);
    */
    var picUrl = data.pic;
    if(picUrl == ""){
        picUrl = artist_default_img;
    }else{
        picUrl = getArtistPrefix(picUrl)+picUrl;
        picUrl = picUrl.replace("starheads/55","starheads/100");
    }
    currObj.find(".pro .modpho img").attr("src",picUrl);  
    currObj.find(".pro .modpho img").attr("alt",returnSpecialChar(artistName)); 
    currObj.find(".pro .pro_m p a").html(returnSpecialChar(artistName));  
    //官网内部链
    currObj.find(".pro .modpho").attr("href","http://www.kuwo.cn/mingxing/"+returnSpecialChar(artistName));
    currObj.find(".pro .pro_m p a").attr("href","http://www.kuwo.cn/mingxing/"+returnSpecialChar(artistName));
    //页内切换
    //currObj.find(".pro .modpho").attr("href","javascript:someArtist("+artistId+")");
    //currObj.find(".pro .pro_m p a").attr("href","javascript:someArtist("+artistId+")");
    data = null;
}
var corrArtSourceid;
function artistToMusic(sourceid){
    artistId = sourceid;
    if(artistId==0){
        return;
    }
    var url = host_url+"r.s?stype=artist2music&artistid="+sourceid+"&pn="+musicPageNum+"&rn="+musicRn+"&callback=loadArtistMusic";
    $.getScript(url);
}
var artmusicpageTotal = 1;
var aName = "";
//加载歌手单曲
function loadArtistMusic(jsondata){
    $("#artmusicIndex").hide();
    var starttime = new Date().getTime();
    var data = jsondata;
    if(typeof(data)=="undefined" || data==null||obj2Str(data)=="{}"||obj2Str(data)==""){
        //checkLoading(musicPageNum);
        //alert(2);
        return;
    }
    //当前页码+类型
    currentPageNum = musicPageNum;
    currentPageType = 0;
    var musicList = data.musiclist;
    artmusicListAllPlay = musicList;
    var pSize = artmusicListAllPlay.length;
    var musicSize = data.total;
    //alert(3);
    musicTotal = musicSize;
    var littlesize = musicSize;
    if(littlesize>5){
        littlesize = 5;
    }
    var artistName = "";
    littlesize = pSize>5?5:pSize;
    for(var i = 0;i < littlesize;i++){
        var someobj = musicList[i];
        var artist = someobj.artist;
        if(artist.indexOf("&")==-1){
            artistName = artist;
        }
    }
    //  alert(4);
    if(artistName==""&&musicList[0].artist.indexOf("&")>-1){
        artistName = musicList[0].artist.split("&")[0];
    }
    var currObj = artistObj;
    aName = artistName;
    var span1 = currObj.find(".sub_nav").find("#artNameId");
    if(span1.html()==""){
        span1.html(returnSpecialChar(aName));
    }
    $("#songTotal").html("共"+musicSize+"首");  
        //总页数
    artmusicpageTotal = Math.ceil(musicSize/musicRn);
    
    //alert("artmusicpageTotal="+artmusicpageTotal);
    saveBread(currObj);
    var bigStr = musicBigString(1,1,true,musicList,false,musicPageNum*musicRn);
    currObj.find(".jiu_playlist .jiu_biglist ul").remove();
    if(musicPageNum==0&&artmusicpageTotal<6){
        for(var i=0;i<artmusicpageTotal;i++){
            $("#songcon_"+(i+1)).html(i+1);
            $("#songcon_"+(i+1)).show();
            $("#songcon_"+(i+1)).attr("href","javascript:jumpToPage("+i+",0);");
                if(i!=0){
                $("#songcon_"+(i+1)).attr("class","");
                }else{
                $("#songcon_"+(i+1)).attr("class","ge_anwo");
                }
        }
        for(var j=artmusicpageTotal;j<5;j++){
            $("#songcon_"+(j+1)).hide();
        }
    }else if(musicPageNum==0&&artmusicpageTotal>5){
        for(var i=0;i<5;i++){
            $("#songcon_"+(i+1)).html(i+1);
            $("#songcon_"+(i+1)).show();
            $("#songcon_"+(i+1)).attr("href","javascript:jumpToPage("+i+",0);");
            if(i!=0){
                $("#songcon_"+(i+1)).attr("class","");
            }else{
                $("#songcon_"+(i+1)).attr("class","ge_anwo");
            }
        }
    }
    $("#artmusicIndex").show();
    centerLoadingEnd();
    currObj.find(".jiu_playlist .jiu_biglist").html(bigStr);
    //开始设置页码和类型
    //setPageIndex(currentPageNum,currentPageType);
    bigStr = null;
    musicList = null;
    data = null;
}
function artMusicPg(pNum){
    if(pNum=='first'){
        musicPageNum = 0;
        artistToMusic(currentArtistId);
    }else if(pNum=='last'){
        musicPageNum = musicPageNum>0?musicPageNum-1:0;
        artistToMusic(currentArtistId);
    }else if(pNum=='next'){
        musicPageNum = musicPageNum<artmusicpageTotal-1?musicPageNum+1:musicPageNum;
        artistToMusic(currentArtistId);
    }else if(pNum=='end'){
        musicPageNum = artmusicpageTotal-1;
        artistToMusic(currentArtistId);
    }else{
        musicPageNum = pNum;
        artistToMusic(currentArtistId);
    }
    /*转到特定页码的代码
     else if(pNum==4){
        var inPar = $("#aminputId").val();
        if(inPar<1){ //|| inPar>artmusicpageTotal){
            $("#aminputId").val(1);
            alert("您输入的页数不存在，有效范围：第[ 1--"+artmusicpageTotal+" ]页");             
        }else if(inPar>artmusicpageTotal){
            $("#aminputId").val(artmusicpageTotal);
            alert("您输入的页数不存在，有效范围：第[ 1--"+artmusicpageTotal+" ]页");
        }else{
            musicPageNum = inPar-1;
            artistToMusic(currentArtistId);
        }
    }*/
    if(artmusicpageTotal<6){
        for(var i=0;i<artmusicpageTotal;i++){
            if(i!=musicPageNum){
            $("#songcon_"+(i+1)).attr("class","");
            }
            $("#songcon_"+(musicPageNum+1)).attr("class","ge_anwo");
            
            $("#songcon_"+(i+1)).html(i+1);
                $("#songcon_"+(i+1)).attr("href","javascript:jumpToPage("+i+",0);");
        }
        for(var j=artmusicpageTotal;j<5;j++){
            $("#songcon_"+(j+1)).hide();
        }
    }else{
    if(musicPageNum<3){
        for(var i=0;i<5;i++){
            if(i!=musicPageNum){
            $("#songcon_"+(i+1)).attr("class","");
            }
        }
        $("#songcon_"+(musicPageNum+1)).attr("class","ge_anwo");
        $("#songcon_1").html(1);
        $("#songcon_2").html(2);
        $("#songcon_3").html(3);
        $("#songcon_4").html(4);
        $("#songcon_5").html(5);
            $("#songcon_1").attr("href","javascript:jumpToPage(0,0);");
            $("#songcon_2").attr("href","javascript:jumpToPage(1,0);");
            $("#songcon_3").attr("href","javascript:jumpToPage(2,0);");
            $("#songcon_4").attr("href","javascript:jumpToPage(3,0);");
            $("#songcon_5").attr("href","javascript:jumpToPage(4,0);");
    }else if(musicPageNum<artmusicpageTotal-3){//当前第8页，将8置中，前后有6、7、9、10
        $("#songcon_1").html(musicPageNum-1);
        $("#songcon_2").html(musicPageNum);
        $("#songcon_3").html(musicPageNum+1);
        $("#songcon_4").html(musicPageNum+2);
        $("#songcon_5").html(musicPageNum+3);
            $("#songcon_1").attr("href","javascript:jumpToPage("+(musicPageNum-2)+",0);");
            $("#songcon_2").attr("href","javascript:jumpToPage("+(musicPageNum-1)+",0);");
            $("#songcon_3").attr("href","javascript:jumpToPage("+(musicPageNum)+",0);");
            $("#songcon_4").attr("href","javascript:jumpToPage("+(musicPageNum+1)+",0);");
            $("#songcon_5").attr("href","javascript:jumpToPage("+(musicPageNum+2)+",0);");
                $("#songcon_1").attr("class","");
                $("#songcon_2").attr("class","");
                $("#songcon_3").attr("class","ge_anwo");
                $("#songcon_4").attr("class","");
                $("#songcon_5").attr("class","");
    }else{
        $("#songcon_1").html(artmusicpageTotal-4);
        $("#songcon_2").html(artmusicpageTotal-3);
        $("#songcon_3").html(artmusicpageTotal-2);
        $("#songcon_4").html(artmusicpageTotal-1);
        $("#songcon_5").html(artmusicpageTotal);
            $("#songcon_1").attr("href","javascript:jumpToPage("+(artmusicpageTotal-5)+",0);");
            $("#songcon_2").attr("href","javascript:jumpToPage("+(artmusicpageTotal-4)+",0);");
            $("#songcon_3").attr("href","javascript:jumpToPage("+(artmusicpageTotal-3)+",0);");
            $("#songcon_4").attr("href","javascript:jumpToPage("+(artmusicpageTotal-2)+",0);");
            $("#songcon_5").attr("href","javascript:jumpToPage("+(artmusicpageTotal)+",0);");
            for(var i=0;i<5;i++){
                if(i!=6-artmusicpageTotal+musicPageNum){
                $("#songcon_"+(i+1)).attr("class","");
                }
            }
            $("#songcon_"+(6-artmusicpageTotal+musicPageNum)).attr("class","ge_anwo");
    }
 }
}
function artlistPg(pNum){   
    if(pNum=='first'){
        areaArtistPage = 0;
        loadAreaArtist();
    }else if(pNum=='last'){
        areaArtistPage = (areaArtistPage>0)?(areaArtistPage-1):0;
        loadAreaArtist();
    }else if(pNum=='next'){
        areaArtistPage = areaArtistPage<(artlistpageTotal-1)?(areaArtistPage+1):areaArtistPage;
        loadAreaArtist();
    }else if(pNum=='end'){
        areaArtistPage = artlistpageTotal-1;
        loadAreaArtist();
    }else{
        areaArtistPage = pNum;
        loadAreaArtist();
    }
    /*转到特定页码的代码
    else if(pNum==4){
        var inPar = $("#alinputId").val();
        if(inPar<1){
            $("#alinputId").val(1);
            alert("您输入的页数不存在，有效范围：第[ 1--"+artlistpageTotal+" ]页");              
        }else if(inPar>artlistpageTotal){
            $("#alinputId").val(artlistpageTotal);
            alert("您输入的页数不存在，有效范围：第[ 1--"+artlistpageTotal+" ]页");
        }else{
            areaArtistPage = inPar-1;
            loadAreaArtist();
        }
    }*/
    if(artlistpageTotal<6){
        for(var i=0;i<artlistpageTotal;i++){
            if(i!=areaArtistPage){
            $("#songlist_"+(i+1)).attr("class","");
            }
            $("#songlist_"+(areaArtistPage+1)).attr("class","ge_anwo");
            
            $("#songlist_"+(i+1)).html(i+1);
                $("#songlist_"+(i+1)).attr("href","javascript:jumpToPage("+i+",1);");
        }
        for(var j=artmusicpageTotal;j<5;j++){
            $("#songlist_"+(j+1)).hide();
        }
    }else{
    if(areaArtistPage<3){
        for(var i=0;i<5;i++){
            if(i!=areaArtistPage){
            $("#songlist_"+(i+1)).attr("class","");
            }
        }
        $("#songlist_"+(areaArtistPage+1)).attr("class","ge_anwo");
        $("#songlist_1").html(1);
        $("#songlist_2").html(2);
        $("#songlist_3").html(3);
        $("#songlist_4").html(4);
        $("#songlist_5").html(5);
            $("#songlist_1").attr("href","javascript:jumpToPage(0,1);");
            $("#songlist_2").attr("href","javascript:jumpToPage(1,1);");
            $("#songlist_3").attr("href","javascript:jumpToPage(2,1);");
            $("#songlist_4").attr("href","javascript:jumpToPage(3,1);");
            $("#songlist_5").attr("href","javascript:jumpToPage(4,1);");
    }else if(areaArtistPage<artlistpageTotal-3){//当前第8页，将8置中，前后有6、7、9、10
        $("#songlist_1").html(areaArtistPage-1);
        $("#songlist_2").html(areaArtistPage);
        $("#songlist_3").html(areaArtistPage+1);
        $("#songlist_4").html(areaArtistPage+2);
        $("#songlist_5").html(areaArtistPage+3);
            $("#songlist_1").attr("href","javascript:jumpToPage("+(areaArtistPage-2)+",1);");
            $("#songlist_2").attr("href","javascript:jumpToPage("+(areaArtistPage-1)+",1);");
            $("#songlist_3").attr("href","javascript:jumpToPage("+(areaArtistPage)+",1);");
            $("#songlist_4").attr("href","javascript:jumpToPage("+(areaArtistPage+1)+",1);");
            $("#songlist_5").attr("href","javascript:jumpToPage("+(areaArtistPage+2)+",1);");
                $("#songlist_1").attr("class","");
                $("#songlist_2").attr("class","");
                $("#songlist_3").attr("class","ge_anwo");
                $("#songlist_4").attr("class","");
                $("#songlist_5").attr("class","");
    }else{
        $("#songlist_1").html(artlistpageTotal-4);
        $("#songlist_2").html(artlistpageTotal-3);
        $("#songlist_3").html(artlistpageTotal-2);
        $("#songlist_4").html(artlistpageTotal-1);
        $("#songlist_5").html(artlistpageTotal);
            $("#songlist_1").attr("href","javascript:jumpToPage("+(artlistpageTotal-5)+",1);");
            $("#songlist_2").attr("href","javascript:jumpToPage("+(artlistpageTotal-4)+",1);");
            $("#songlist_3").attr("href","javascript:jumpToPage("+(artlistpageTotal-3)+",1);");
            $("#songlist_4").attr("href","javascript:jumpToPage("+(artlistpageTotal-2)+",1);");
            $("#songlist_5").attr("href","javascript:jumpToPage("+(artlistpageTotal)+",1);");
            for(var i=0;i<5;i++){
                if(i!=6-artlistpageTotal+areaArtistPage){
                $("#songlist_"+(i+1)).attr("class","");
                }
            }
            $("#songlist_"+(6-artlistpageTotal+areaArtistPage)).attr("class","ge_anwo");
    }
 }
}
function searchPg(pNum){
    if(pNum=='first'){
        searchMusicPage = 0;
        searchMusic(searchSourceKey);
    }else if(pNum=='last'){
        searchMusicPage = searchMusicPage>0?searchMusicPage-1:0;
        searchMusic(searchSourceKey);
    }else if(pNum=='next'){
        searchMusicPage = searchMusicPage<searchpageTotal-1?searchMusicPage+1:searchMusicPage;
        searchMusic(searchSourceKey);
    }else if(pNum=='end'){
        searchMusicPage = searchpageTotal-1;
        searchMusic(searchSourceKey);
    }else{
        searchMusicPage = pNum;
        searchMusic(searchSourceKey);
    }
    /*转到特定页码的代码
    else if(pNum==4){
        var inPar = $("#seinputId").val();
        if(inPar<1){
            $("#seinputId").val(1);
            alert("您输入的页数不存在，有效范围：第[ 1--"+searchpageTotal+" ]页");               
        }else if(inPar>searchpageTotal){
            $("#seinputId").val(searchpageTotal);
            alert("您输入的页数不存在，有效范围：第[ 1--"+searchpageTotal+" ]页");
        }else{
            searchMusicPage = inPar-1;
            searchMusic(searchSourceKey)
        }
    }*/
    if(searchpageTotal<6){
        for(var i=0;i<searchpageTotal;i++){
            if(i!=searchMusicPage){
            $("#songsea_"+(i+1)).attr("class","");
            }
            $("#songsea_"+(searchMusicPage+1)).attr("class","ge_anwo");
            
            $("#songsea_"+(i+1)).html(i+1);
                $("#songsea_"+(i+1)).attr("href","javascript:jumpToPage("+i+",2);");
        }
        for(var j=artmusicpageTotal;j<5;j++){
            $("#songsea_"+(j+1)).hide();
        }
    }else{
    if(searchMusicPage<3){
        for(var i=0;i<5;i++){
            if(i!=searchMusicPage){
            $("#songsea_"+(i+1)).attr("class","");
            }
        }
        $("#songsea_"+(searchMusicPage+1)).attr("class","ge_anwo");
        $("#songsea_1").html(1);
        $("#songsea_2").html(2);
        $("#songsea_3").html(3);
        $("#songsea_4").html(4);
        $("#songsea_5").html(5);
            $("#songsea_1").attr("href","javascript:jumpToPage(0,2);");
            $("#songsea_2").attr("href","javascript:jumpToPage(1,2);");
            $("#songsea_3").attr("href","javascript:jumpToPage(2,2);");
            $("#songsea_4").attr("href","javascript:jumpToPage(3,2);");
            $("#songsea_5").attr("href","javascript:jumpToPage(4,2);");
    }else if(searchMusicPage<searchpageTotal-3){//当前第8页，将8置中，前后有6、7、9、10
        $("#songsea_1").html(searchMusicPage-1);
        $("#songsea_2").html(searchMusicPage);
        $("#songsea_3").html(searchMusicPage+1);
        $("#songsea_4").html(searchMusicPage+2);
        $("#songsea_5").html(searchMusicPage+3);
            $("#songsea_1").attr("href","javascript:jumpToPage("+(searchMusicPage-2)+",2);");
            $("#songsea_2").attr("href","javascript:jumpToPage("+(searchMusicPage-1)+",2);");
            $("#songsea_3").attr("href","javascript:jumpToPage("+(searchMusicPage)+",2);");
            $("#songsea_4").attr("href","javascript:jumpToPage("+(searchMusicPage+1)+",2);");
            $("#songsea_5").attr("href","javascript:jumpToPage("+(searchMusicPage+2)+",2);");
                $("#songsea_1").attr("class","");
                $("#songsea_2").attr("class","");
                $("#songsea_3").attr("class","ge_anwo");
                $("#songsea_4").attr("class","");
                $("#songsea_5").attr("class","");
    }else{
        $("#songsea_1").html(searchpageTotal-4);
        $("#songsea_2").html(searchpageTotal-3);
        $("#songsea_3").html(searchpageTotal-2);
        $("#songsea_4").html(searchpageTotal-1);
        $("#songsea_5").html(searchpageTotal);
            $("#songsea_1").attr("href","javascript:jumpToPage("+(searchpageTotal-5)+",2);");
            $("#songsea_2").attr("href","javascript:jumpToPage("+(searchpageTotal-4)+",2);");
            $("#songsea_3").attr("href","javascript:jumpToPage("+(searchpageTotal-3)+",2);");
            $("#songsea_4").attr("href","javascript:jumpToPage("+(searchpageTotal-2)+",2);");
            $("#songsea_5").attr("href","javascript:jumpToPage("+(searchpageTotal)+",2);");
            for(var i=0;i<5;i++){
                if(i!=6-searchpageTotal+searchMusicPage){
                $("#songsea_"+(i+1)).attr("class","");
                }
            }
            $("#songsea_"+(6-searchpageTotal+searchMusicPage)).attr("class","ge_anwo");
    }
 }
}
function gedanPg(pNum){
    if(pNum=='first'){
        gedanPageNum = 0;
        someGeDan('',currGedanSourceId,'',true);
    }else if(pNum=='last'){
        gedanPageNum = gedanPageNum>0?gedanPageNum-1:0;
        someGeDan('',currGedanSourceId,'',true);
    }else if(pNum=='next'){
        gedanPageNum = gedanPageNum<gedanpageTotal-1?gedanPageNum+1:gedanPageNum;
        someGeDan('',currGedanSourceId,'',true);
    }else if(pNum=='end'){
        gedanPageNum = gedanpageTotal-1;
        someGeDan('',currGedanSourceId,'',true);
    }else{
        gedanPageNum = pNum;
        someGeDan('',currGedanSourceId,'',true);
    }
    /*转到特定页码的代码
     else if(pNum==4){
        var inPar = $("#aminputId").val();
        if(inPar<1){ //|| inPar>gedanpageTotal){
            $("#aminputId").val(1);
            alert("您输入的页数不存在，有效范围：第[ 1--"+gedanpageTotal+" ]页");                
        }else if(inPar>gedanpageTotal){
            $("#aminputId").val(gedanpageTotal);
            alert("您输入的页数不存在，有效范围：第[ 1--"+gedanpageTotal+" ]页");
        }else{
            gedanPageNum = inPar-1;
            artistToMusic(currentArtistId);
        }
    }*/
    if(gedanpageTotal<6){
        for(var i=0;i<gedanpageTotal;i++){
            if(i!=gedanPageNum){
            $("#gedan_"+(i+1)).attr("class","");
            }
            $("#gedan_"+(gedanPageNum+1)).attr("class","ge_anwo");
            
            $("#gedan_"+(i+1)).html(i+1);
                $("#gedan_"+(i+1)).attr("href","javascript:jumpToPage("+i+",3);");
        }
        for(var j=gedanpageTotal;j<5;j++){
            $("#gedan_"+(j+1)).hide();
        }
    }else{
    if(gedanPageNum<3){
        for(var i=0;i<5;i++){
            if(i!=gedanPageNum){
            $("#gedan_"+(i+1)).attr("class","");
            }
        }
        $("#gedan_"+(gedanPageNum+1)).attr("class","ge_anwo");
        $("#gedan_1").html(1);
        $("#gedan_2").html(2);
        $("#gedan_3").html(3);
        $("#gedan_4").html(4);
        $("#gedan_5").html(5);
            $("#gedan_1").attr("href","javascript:jumpToPage(0,3);");
            $("#gedan_2").attr("href","javascript:jumpToPage(1,3);");
            $("#gedan_3").attr("href","javascript:jumpToPage(2,3);");
            $("#gedan_4").attr("href","javascript:jumpToPage(3,3);");
            $("#gedan_5").attr("href","javascript:jumpToPage(4,3);");
    }else if(gedanPageNum<gedanpageTotal-3){//当前第8页，将8置中，前后有6、7、9、10
        $("#gedan_1").html(gedanPageNum-1);
        $("#gedan_2").html(gedanPageNum);
        $("#gedan_3").html(gedanPageNum+1);
        $("#gedan_4").html(gedanPageNum+2);
        $("#gedan_5").html(gedanPageNum+3);
            $("#gedan_1").attr("href","javascript:jumpToPage("+(gedanPageNum-2)+",3);");
            $("#gedan_2").attr("href","javascript:jumpToPage("+(gedanPageNum-1)+",3);");
            $("#gedan_3").attr("href","javascript:jumpToPage("+(gedanPageNum)+",3);");
            $("#gedan_4").attr("href","javascript:jumpToPage("+(gedanPageNum+1)+",3);");
            $("#gedan_5").attr("href","javascript:jumpToPage("+(gedanPageNum+2)+",3);");
                $("#gedan_1").attr("class","");
                $("#gedan_2").attr("class","");
                $("#gedan_3").attr("class","ge_anwo");
                $("#gedan_4").attr("class","");
                $("#gedan_5").attr("class","");
    }else{
        $("#gedan_1").html(gedanpageTotal-4);
        $("#gedan_2").html(gedanpageTotal-3);
        $("#gedan_3").html(gedanpageTotal-2);
        $("#gedan_4").html(gedanpageTotal-1);
        $("#gedan_5").html(gedanpageTotal);
            $("#gedan_1").attr("href","javascript:jumpToPage("+(gedanpageTotal-5)+",3);");
            $("#gedan_2").attr("href","javascript:jumpToPage("+(gedanpageTotal-4)+",3);");
            $("#gedan_3").attr("href","javascript:jumpToPage("+(gedanpageTotal-3)+",3);");
            $("#gedan_4").attr("href","javascript:jumpToPage("+(gedanpageTotal-2)+",3);");
            $("#gedan_5").attr("href","javascript:jumpToPage("+(gedanpageTotal)+",3);");
            for(var i=0;i<5;i++){
                if(i!=6-gedanpageTotal+gedanPageNum){
                $("#gedan_"+(i+1)).attr("class","");
                }
            }
            $("#gedan_"+(6-gedanpageTotal+gedanPageNum)).attr("class","ge_anwo");
    }
 }
}
function jumpToPage(pNum,pType){
    if(pType==0){
        artMusicPg(pNum);//歌手下歌曲
    }else if(pType==1){
        artlistPg(pNum);//歌手列表
    }else if(pType==2){
        searchPg(pNum);//搜索结果
    }else if(pType==3){
        gedanPg(pNum);//歌单结果
    }else if(pType==4){
        albumPg(pNum);//专辑结果
    }
/*  switch(pType){
        case 0:artMusicPg(pNum);//歌手下歌曲
        case 1:artlistPg(pNum);//歌手列表
        case 2:searchPg(pNum);//搜索结果
    }*/
}
/*
<div id="artmusicIndex" class="digg">
    <a id="artmusicp0" class="disabled" href="javascript:goToPage(-1,0);"> < </a>
    <a id="artmusicp1" class="current"  href="javascript:goToPage(0,0);">1</a>
    <a id="artmusicp2" class="nomarl" href="javascript:goToPage(1,0);">2</a>
    <a id="artmusicp3" class="nomarl" href="javascript:goToPage(2,0);">3</a>
    <a id="artmusicp4" class="nomarl" href="javascript:goToPage(3,0);">4</a>
    <a id="artmusicp5" class="nomarl" href="javascript:goToPage(4,0);">5</a>
    <a id="artmusicp6" href="javascript:goToPage(5,0);"> > </a>
</div>
*/
function setPageIndex(cpNum,cpType){
    if(cpType==0){//歌手下歌曲分页
        var cpObj = $("#artmusicIndex");
        if(cpNum == -1){
            $("#artmusicp0").attr("class","disabled");
        }
        if(cpNum<3){//假设cpNum=2;则将artmusic3设为当前，
            $("artmusicp"+(cpNum-1)).attr("class","current");
        }
        //$("#artmusicp0").html
    }
}
function xiuchang(){
    allHide(7);
    xcObj.find("#cateArea").html("");
    xcObj.show();
    //alert(0);
    //centerLoadingStart();
    var d = new Date();
    var r = d.getYear()+d.getMonth()+d.getDate()+d.getHours()+parseInt((d.getMinutes()/20));
    r = ''+d.getYear()+d.getMonth()+d.getDate()+r;
    //秀场接口
    var url = "http://qukudata.kuwo.cn/q.k?op=query&cont=ninfo&node=22989&pn=0&rn=20&fmt=json&src=mbox&callback=showXCChild&version=MUSIC_7.3.0.1_BTES&uid=0&kid=28903844&ttime="+r;
    $.getScript(url);
}
var XCChildTotal = 0;
var tagchildsame = "";
function showXCChild(jsondata){
    //alert("返回的秀场数据jsondata为："+jsondata);

    var data = jsondata;
    if(typeof(data)=="undefined"||data.total==0||obj2Str(data)=="{}"||obj2Str(data)==""){
        //tagChildPage++;
        return;
    }
    XCChildTotal = data.total;
    var childOO = data.child;
    var childOOSize = childOO.length;
    var categoryString = "";
    var htmlArray = [];
    //alert(tagId);
    if(childOOSize>0){
        if(tagId==16&&tagChildPage==0){
            htmlArray[0] = '<div id="delay_load_game_2013_4" rel="tagchild"></div>';
        }else{
            htmlArray[0] = '';
        }
        for(var i=0;i<childOOSize;i++){
            var someObj = childOO[i];
            var info = someObj.info;
            if(info=="" || !info){
                info = "";
            }
            var click = "";
            var source = someObj.source;
            if(source==2){
                continue;
            }
            if(source>17){
                //continue;
            }
            if(info=="0首歌曲"){
                continue;
            }
            if(info==""&&(source==4||source==8||source==12||source==13||source==14)){
                info = "10首歌曲";
            }
            var jiaobiao = getJiaoBiao(source);
            var sourceid = someObj.sourceid;
            if(sourceid==""){
                sourceid = "x.kuwo.cn";
            }
    /*      var issame = "";
            if(source==7 || source==8 || source==12 || source==14){
                issame = ''+sourceid;
            }else{
                issame = ''+source+someObj.id;
            }
            if(tagchildsame.indexOf(issame)>-1){
                continue;
            }
            tagchildsame += (issame+"|");
            */
            var name = someObj.name;
            name = returnSpecialChar(name);
            name = encodeString(name);
            var id = someObj.id;
            var pic = someObj.pic;
            if(pic==""){
                pic = default_img;
            }else{
                pic = changeImgDomain(pic);
            }
            
            var sourceidpos = 10;
            if(sourceid.indexOf("from=")>-1){
                sourceidpos = sourceid.indexOf("from=");
                sourceid =  sourceid.substring(0, sourceidpos)+"from=1001001005";
            }else{
                sourceid = "http://x.kuwo.cn?from=1001001005";
            }
            var clickarray = [];
            var clicki = 0;
            clickarray[clicki++] = "commonClick('";
            clickarray[clicki++] = source;
            clickarray[clicki++] = "','";
            clickarray[clicki++] = sourceid;
            clickarray[clicki++] = "','";
            clickarray[clicki++] = name;
            clickarray[clicki++] = "',";
            clickarray[clicki++] = id;
            clickarray[clicki++] = ")";
            click = clickarray.join('');
            clickarray = null;
            var disname = someObj.disname;  
            disname = returnSpecialChar(disname);       
        /*  var listen = someObj.listen;
            if(typeof(listen)=="undefined"||listen==""||listen==0){
                listen = parseInt(100000*Math.random(),10);
            }
            var like = someObj.like;
            if(typeof(like)=="undefined"||like==""||like==0){
                like = parseInt(10000*Math.random(),10);
            }*/
            //var tips = someObj.tips;
            var htmlchildarray = [];
            var xia = 0;
            //var haslike = false;
            /*if(source==1||source==2||source==4||source==6||source==8||source==12||source==13||source==14){
                haslike = true;
            }*/     
            htmlchildarray[xia++] = '<div class="qu_listfa" rel="tagchild"><div class="qu_list"><a data-tips="';
            htmlchildarray[xia++] = '"';    
            htmlchildarray[xia++] = '" href="javascript:';  
            htmlchildarray[xia++] = click;
            if(source==14){
                htmlchildarray[xia++] = '" hidefocus="true" class="qu_pho_2 clickLog" title="';
            }else{
                htmlchildarray[xia++] = '" hidefocus="true" class="qu_pho clickLog" title="';
            }
            htmlchildarray[xia++] = disname;
            if(i<(childOOSize-1)){
                htmlchildarray[xia++] = '"><div class="img_loading"><img onload="imgOnload(this)" alt="'+disname+'" onerror="imgOnError(this)" src="http://image.kuwo.cn/webplayer2013/img/loading1.gif" data-src="';
            }else{
                htmlchildarray[xia++] = '"><div class="img_loading"><img data-islast="';
                htmlchildarray[xia++] = new Date().getTime();
                htmlchildarray[xia++] = '" onload="imgOnload(this)" onerror="imgOnError(this)" alt="'+disname+'" src="http://image.kuwo.cn/webplayer2013/img/loading1.gif" data-src="';
            }
            htmlchildarray[xia++] = pic;
            htmlchildarray[xia++] = '" /></div>';
            htmlchildarray[xia++] = jiaobiao;
            var isnew = someObj.isnew;
            if(typeof(isnew)!="undefined"&&isnew==1){
                htmlchildarray[xia++] = '<span class="newtitle"></span>';
            }
            htmlchildarray[xia++] = '<span class="qq_opa"></span>'; 
            if(source==1||source==2||source==4||source==7||source==8||source==9||source==10||source==12||source==13||source==14){
                htmlchildarray[xia++] = '<p class="em" ';
                htmlchildarray[xia++] = getEmClickString(source,sourceid,id);   
                htmlchildarray[xia++] = '><em></em></p></a>';           
            }else{              
                htmlchildarray[xia++] = '</a>';
            }           
            //click = "getDtDataById('-6007','酷我新歌电台','http://img1.kwcdn.kuwo.cn:81/star/tags/201203/1331101283313.jpg','338')";
            htmlchildarray[xia++] = '</div><p class="qu_name"><a';
            htmlchildarray[xia++] = ' class="clickLog" href="javascript:';  
            htmlchildarray[xia++] = click;
            htmlchildarray[xia++] = '" hidefocus="true" title="';
            htmlchildarray[xia++] = disname;
            htmlchildarray[xia++] = '">';
            htmlchildarray[xia++] = disname;
            htmlchildarray[xia++] = '</a></p>';
        /*      
            htmlchildarray[xia++] = '<p class="qu_dec"><a';
            htmlchildarray[xia++] = ' class="clickLog" ';
            htmlchildarray[xia++] = ' hidefocus="true" title="';
            htmlchildarray[xia++] = '<em>'+info+'</em>';;
            htmlchildarray[xia++] = '">';
            if(source == 1){
                info1 = info.substring(info.length-10,info.length);
            }else{
                info1 = info;
            }
            htmlchildarray[xia++] = info1;
            htmlchildarray[xia++] = '</a></p>';
                */
            htmlchildarray[xia++] = '</div>';
            htmlArray[i+1] = htmlchildarray.join('');
            htmlchildarray = null;      
        }
    }
    categoryString = htmlArray.join('');
    //alert(categoryString);
    htmlArray = null;
    if(tagChildPage==0&&xcObj.find("#cateArea").find(".qu_listfa").size()>0){
        xcObj.find("#cateArea").find(".qu_listfa").remove();
    }   

    var preDiv = '<div class="songer_listcon">';
    var bacDiv = '</div>';
    centerLoadingEnd();
    xcObj.find("#cateArea").html(preDiv+categoryString+bacDiv);
    tagChildPage++;
    childOO = null;
    data = null;
}
//保存当前面包屑
function saveBread(obj){
    var subobj = obj.find(".jiu_navleft");
    var aobjs = subobj.find("a");
    var asize = aobjs.size();
    var spanobj = subobj.find("span");
    if(asize==0){
        return;
    }
    var breadstring = "";
    for(var i = 0; i < asize; i++){
        breadstring += aobjs.eq(i).html()+">";
    }
    /*if(obj.hasClass("search_con")){
        breadstring += "\""+subobj.find("em").html()+"\"";
    }*/
    breadstring += spanobj.html();
    currentBread = breadstring;
    //alert(currentBread);
    spanobj = null;
    aobjs = null;
    subobj = null;
}
//各种页面内容页的导航面包屑设置
function setBread(name,source,sourceid,id){
    var conName = "#"+name+"_con";
    var conJquery = $(conName).find(".jiu_nav");
    var breadString = "";
    breadString = getBreadString(source,sourceid,id);
    conJquery.find(".jiu_navleft").remove();
    conJquery.prepend(breadString);
    conJquery = null;
}
//保存当前的面包屑 用户日志记录
var currentBread = "";
//自动生成内容页的面包屑拼串
function getBreadString(source,sourceid,id){
    var key = id;
    var index = "";
    var breadString = "";
    var breadarray = [];
    var xia = 0;
        index = treeindex[key];
        if(typeof(index)=="undefined" && categoryIndex==-1){
            //alert("undefined");
            //breadString = '<div class="subnav2"><a href="javascript:qukuhtml()" hidefocus="true">曲库</a>&nbsp;&gt;&nbsp;<span></span></div>';
            breadString = '<div class="subnav2">&nbsp;<span></span></div>';
        }
        if((typeof(index)=="undefined" && categoryIndex!=-1)||typeof(index)!="undefined"){
            //alert("defined");
            if(typeof(index)=="undefined"){
                index = categoryIndex;
            }
            var indexArray = index.split("_");
        /*
         <div class="subnav2">
            <a hidefocus="true" href="javascript:qukuhtml()">曲库</a>&nbsp;&gt;&nbsp;<a hidefocus="true" href="javascript:oneCategory(0,2)">排行榜</a>&nbsp;&gt;&nbsp;
            <span>酷我新歌榜</span>
        </div>
        */
            //<div class="jiu_navleft"><span>热门歌曲</span></div>
            breadarray[xia++] = '<div class="jiu_navleft">&nbsp;';
            //breadarray[xia++] = '<div class="subnav2">&nbsp;';
            var arrsize = indexArray.length;
            //alert("arrsize:"+arrsize);
            if(arrsize>0){
                var jj;
                if(tree.child[indexArray[1]].id==2 || tree.child[indexArray[1]].id==3){
                    jj = arrsize - 1;
                }else{
                    jj = arrsize;
                }
                var oo = 0;
                for(var i=1;i<jj;i++){
                    if(i==1){
                        oo = tree.child[indexArray[i]];
                        if(typeof(oo)=="undefined"){
                            continue;
                        }
                        var childarray = [];
                        childarray[0] = '<a href="javascript:oneCategory(';
                        childarray[1] = indexArray[i];
                        childarray[2] = ',';
                        childarray[3] = oo.id;
                        childarray[4] = ')" hidefocus="true">';
                        childarray[5] = oo.disname;
                        childarray[6] = '</a>&nbsp;&gt;&nbsp;';
                        //childarray[6] = '</a>&nbsp;&nbsp;';
                        breadarray[xia++] = childarray.join('');
                    }else{
                        oo = oo.child[indexArray[i]];
                        if(typeof(oo)=="undefined"){
                            continue;
                        }
                        var click = "";
                        var source = oo.source;
                        if(source>17){
                            continue;
                        }
                        var sourceid = oo.sourceid;
                        var name = oo.name;
                        name = encodeString(name);
                        var id = oo.id;
                        var clickarray = [];
                        clickarray[0] = "twoCategory('";
                        clickarray[1] = source;
                        clickarray[2] = "','";
                        clickarray[3] = sourceid;
                        clickarray[4] = "','";
                        clickarray[5] = name;
                        clickarray[6] = "',";
                        clickarray[7] = id;
                        clickarray[8] = ")";
                        click = clickarray.join('');
                        clickarray = null;
                        var childarray = [];
                        childarray[0] = '<a href="javascript:';
                        childarray[1] = click;
                        childarray[2] = '" hidefocus="true">';
                        childarray[3] = oo.disname;
                        childarray[4] = '</a>&nbsp;&gt;&nbsp;';
                    //  childarray[4] = '</a>&nbsp;&nbsp;';
                        breadarray[xia++] = childarray.join('');
                        childarray = null;
                    }
                }
            }
            breadarray[xia++] = '<span></span></div>';
            breadString = breadarray.join('');
            //alert("breadString:"+breadString);
            breadarray = null;
        }       
    return breadString;
}
//二级分类点击事件跳转
var twoCategoryName = "";
function twoCategory(source,sourceid,name,id){
    twoCategoryName = name;
    stopHttpRequest();
    commonClick(source,sourceid,name,id);
}
//获取分类信息
function someCategory(source,sourceid,id){
    //alert("进入someCategory函数");
    stopHttpRequest();
    allHide(5);
    swapTab(6,false);
    tagChildContainerObj.find("#cateArea").html("");
    tagChildContainerObj.show();
    centerLoadingStart();
    var index = treeindex[id];
    if(typeof(index)=="undefined"){
        
    }else{
        categoryIndex = index;
    }
    categoryId = id;
    currentTagId = id;
    categoryPage = 0;
    categoryTotal = -1;
    categorysame = "";
    loadCategoryData();
}
var categoryPage = 0;
var categoryRn = 100;
var categoryTotal = -1;
var categoryId = -1;
var categoryIndex = -1;
var categorysame = "";
function loadCategoryData(){
    var currTotal = categoryTotal;
    var currRn = categoryRn;
    var currPage = categoryPage;

    var url = "http://qukudata.kuwo.cn/q.k?op=query&cont=ninfo&node="+categoryId+"&pn="+currPage+"&rn="+currRn+"&fmt=json&src=mbox&callback=getNodeChild";
    $.getScript(url);
}
function getNodeChild(jsondata){
    //alert("进入getNodeChild函数");
    var starttime = new Date().getTime();
    var data = jsondata;
    if(typeof(data)=="undefined"||obj2Str(data)==""||obj2Str(data)=="{}"||data.total==0){
        if(categoryPage==0){
            tagChildContainerObj.find("#cateArea").html("");
            return;
        }
        categoryPage++;
        return;
    }
    if(data.node!=categoryId){
        return;
    }
    if(currentTagId!=data.node){
        return;
    }
    categoryTotal = data.total;
    var childOO = data.child;
    var childOOSize = childOO.length;
    var categoryString = "";
    var htmlArray = [];
//  alert(childOOSize);
    if(childOOSize>0){
        for(var i=0;i<childOOSize;i++){
            var someObj = childOO[i];
            var info = someObj.info;
            if(info=="" || !info){
                info = "";
            }
            var click = "";
            var source = someObj.source;
            if(source>17){
                continue;
            }
            if(info=="0首歌曲"){
                continue;
            }
            if(info==""&&(source==4||source==8||source==12||source==13||source==14)){
                info = "10首歌曲";
            }
            var jiaobiao = getJiaoBiao(source);
            //alert(jiaobiao);
            var sourceid = someObj.sourceid;
            var name = someObj.name;
            name = encodeString(name);
            var id = someObj.id;
            var issame = "";
            if(source==7 || source==8 || source==12 || source==14){
                issame = ''+sourceid;
            }else{
                issame = ''+source+id;
            }
            if(categorysame.indexOf(issame)>-1){
                continue;
            }
            categorysame += (issame+"|");
            var pic = someObj.pic;
            if(pic==""){
                pic = default_img;
            }else{
                pic = changeImgDomain(pic);
            }
            //alert("pic="+pic);
            var clickarray = [];
            var clicki = 0;
            clickarray[clicki++] = "commonClick('";
            clickarray[clicki++] = source;
            clickarray[clicki++] = "','";
            clickarray[clicki++] = sourceid;
            clickarray[clicki++] = "','";
            clickarray[clicki++] = name;
            clickarray[clicki++] = "',";
            clickarray[clicki++] = id;
            clickarray[clicki++] = ")";
            click = clickarray.join('');
            clickarray = null;
            //var listen = someObj.listen;
            /*if(typeof(listen)=="undefined"||listen==""||listen==0){
                listen = parseInt(100000*Math.random(),10);
            }
            var like = someObj.like;
            if(typeof(like)=="undefined"||like==""||like==0){
                like = parseInt(10000*Math.random(),10);
            }   */          
            var htmlchildarray = [];
            var xia = 0;
            var disname = someObj.disname;
            disname = returnSpecialChar(disname);
            var tips = someObj.tips;
            var haslike = false;
            if(source==1||source==2||source==4||source==6||source==8||source==12||source==13||source==14){
                haslike = true;
            }
            
            //var clickLogString = "8:"+id+":"+source+":"+encodeURIComponent(sourceid)+":"+(i+1+categoryPage*categoryRn)+":";
            htmlchildarray[xia++] = '<div class="qu_listfa" rel="category"><div class="qu_list"><a';
            htmlchildarray[xia++] = ' href="javascript:';
            htmlchildarray[xia++] = click;
            htmlchildarray[xia++] = '" hidefocus="true" class="qu_pho" title="';
            htmlchildarray[xia++] = disname;
            if(i<(childOOSize-1)){
                htmlchildarray[xia++] = '"><div class="img_loading"><img width="100" height="100" alt="'+disname+'" onload="imgOnload(this)" onerror="imgOnError(this)" src="http://image.kuwo.cn/webplayer2013/img/loading1.gif" data-src="';
            }else{
                htmlchildarray[xia++] = '"><div class="img_loading"><img width="100" height="100" alt="'+disname+'" data-islast="';
                htmlchildarray[xia++] = new Date().getTime();
                htmlchildarray[xia++] = '" onload="imgOnload(this)" onerror="imgOnError(this)" src="http://image.kuwo.cn/webplayer2013/img/loading1.gif" data-src="';
            }
            htmlchildarray[xia++] = pic;
            htmlchildarray[xia++] = '" /></div>';
            htmlchildarray[xia++] = jiaobiao;
            //alert(2);
            var isnew = someObj.isnew;
            if(typeof(isnew)!="undefined"&&isnew==1){
                htmlchildarray[xia++] = '<span class="newtitle"></span>';
            }
            htmlchildarray[xia++] = '<span class="qq_opa"></span>';     
            if(source==1||source==2||source==4||source==7||source==8||source==9||source==10||source==12||source==13||source==14){
                htmlchildarray[xia++] = '<p class="em" ';
                htmlchildarray[xia++] = getEmClickString(source,sourceid,id);           
                htmlchildarray[xia++] = '><em></em></p></a>';
            }else{      
                htmlchildarray[xia++] = '</a>';                 
            }                       
            htmlchildarray[xia++] = '</div><p class="qu_name"><a';
            htmlchildarray[xia++] = ' class="clickLog" href="javascript:';
            htmlchildarray[xia++] = click;
            htmlchildarray[xia++] = '" hidefocus="true" title="';
            htmlchildarray[xia++] = disname;
            htmlchildarray[xia++] = '">';
            htmlchildarray[xia++] = disname;
            htmlchildarray[xia++] = '</a></p>';
                //隐藏分类描述
            
/*          htmlchildarray[xia++] = '<p class="qu_dec"><a';
            htmlchildarray[xia++] = '<em>'+info+'</em>';
            htmlchildarray[xia++] = '</a></p>';*/
        
            htmlchildarray[xia++] = '</div>';
            htmlArray[i] = htmlchildarray.join('');
            htmlchildarray = null;
        }
    }
    categoryString = htmlArray.join('');
    //alert("categoryString="+categoryString);
    htmlArray = null;
    if(categoryIndex==-1){
        //return;
    }
    if(data.node!=categoryId){
        return;
    }
    if(currentTagId!=data.node){
        return;
    }
    if(categoryPage==0&&tagChildContainerObj.find(".qu_listfa").size()>0){
        //cateRight.find(".qu_listfa").remove();
    }   
    //alert(1);
    var preDiv = '<div class="songer_listcon">';
    var bacDiv = '</div>';
    //tagChildContainerObj.html(preDiv+categoryString+bacDiv);
    centerLoadingEnd();
    tagChildContainerObj.find("#cateArea").html(preDiv+categoryString+bacDiv);
    //alert(2);
    categoryPage++;
    data = null;
    var endtime = new Date().getTime();
}
var gedanPageNum = 0;
var gedanmusicRn = 12;
var currGedanSourceId;
var gedanpageTotal=0;
//获取某一级分类下的歌单数据
function someGeDan(source,sourceid,id,flag){
    //alert("somegedan");
    stopHttpRequest();
    allHide(8);
    gedanObj.find(".jiu_playlist .jiu_biglist").html("");
    gedanObj.show();
    centerLoadingStart();
    setBread("gedan",source,sourceid,id);
    currGedanSourceId = sourceid;
    var url = "http://nplserver.kuwo.cn/pl.svc?op=getlistinfo&pid="+sourceid+"&pn="+gedanPageNum+"&rn="+gedanmusicRn+"&encode=utf-8&keyset=pl2012&identity=kuwo&callback=loadSomeGeDan";
    $.getScript(url);
}
//加载某个歌单信息
var ss = "";
function loadSomeGeDan(jsondata){
    var starttime = new Date().getTime();
    var data = jsondata;
    if(typeof(data)=="undefined"||obj2Str(data)==""||data==null||typeof(data.id)=="undefined"){
        centerLoadingEnd();
        return;
    }
    var pid = data.id;
    currentGeDanId = pid;
    var gedanName = data.title;
    var musicList = data.musiclist;
    gedanListAllPlay = musicList;
    var musicSize = musicList.length;
    var totalSize = data.total;
    gedanpageTotal = Math.ceil(totalSize/gedanmusicRn);
    //alert("页数："+gedanpageTotal);
    for(var i = 0; i < musicSize; i ++){
        musicList[i].pid = pid;
    }
    var picUrl = data.pic;
    if(typeof(picUrl)!="undefined"){
        picUrl = changeImgDomain(picUrl);
    }
    var info = data.info;
    if(info==""||!info){
        info = "";
    }
    var currObj  = gedanObj;
    currObj.find(".jiu_nav .jiu_navleft span").html(gedanName);
    saveBread(currObj);
    var userid = data.uid;
    var uname = data.uname;
    if(data.total==0){
        gedanObj.find(".jiu_playlist .jiu_biglist").html("<span class='nocontent'>暂没有相关内容</span>");
        return;
    }
    var bigStr = musicBigString(1,1,true,musicList,false);
    if(bigStr==""){
    }
    if(gedanPageNum==0&&gedanpageTotal<6){
        for(var i=0;i<gedanpageTotal;i++){
            $("#gedan_"+(i+1)).html(i+1);
            $("#gedan_"+(i+1)).show();
            $("#gedan_"+(i+1)).attr("href","javascript:jumpToPage("+i+",3);");
                if(i!=0){
                $("#gedan_"+(i+1)).attr("class","");
                }else{
                $("#gedan_"+(i+1)).attr("class","ge_anwo");
                }
        }
        for(var j=gedanpageTotal;j<5;j++){
            $("#gedan_"+(j+1)).hide();
        }
    }else if(gedanPageNum==0&&gedanpageTotal>5){
        for(var i=0;i<5;i++){
            $("#gedan_"+(i+1)).html(i+1);
            $("#gedan_"+(i+1)).show();
            $("#gedan_"+(i+1)).attr("href","javascript:jumpToPage("+i+",3);");
            if(i!=0){
                $("#gedan_"+(i+1)).attr("class","");
            }else{
                $("#gedan_"+(i+1)).attr("class","ge_anwo");
            }
        }
    }
    $("#gedanmusicIndex").show();
    centerLoadingEnd();
    gedanObj.find(".jiu_playlist .jiu_biglist").html(bigStr);
    bigStr = null;
    data = null;
}
/*var albumPageNum = 0;
var albummusicRn = 12;
var currAlbumId;
var albumpageTotal=0;*/
//通过专辑id查找专辑
function someAlbum(id){
    stopHttpRequest();
    allHide(13);
    var currObj = albumObj;
    currObj.find(".jiu_playlist .jiu_biglist").html("");
    albumObj.show();
    centerLoadingStart();
    //currAlbumId = id;
    var url = host_url+"r.s?stype=albuminfo&albumid="+id+"&callback=loadSomeAlbumInfo";
    $.getScript(url);
}
//加载某个专辑信息
var currentAlbumId = "";
function loadSomeAlbumInfo(jsondata){
    var starttime = new Date().getTime();
    var data = jsondata;
    if(typeof(data)=="undefined" ||obj2Str(data)=="" || typeof(data.albumid)=="undefined"){
    
        return;
    }
    var albumid = data.albumid;
    currentAlbumId = albumid;
    var albumName = data.name;
    var currObj = albumObj;
    currObj.find(".jiu_nav .jiu_navleft").remove();
    //var bread = "";
    //bread = '<div class="jiu_navleft">&nbsp;<a href="javascript:oneCategory(1,4)" hidefocus="true">歌手</a>&nbsp;&gt;&nbsp;<a href="javascript:someArtist('+data.artistid+')" hidefocus="true">'+returnSpecialChar(data.artist)+'</a>&nbsp;&gt;&nbsp;<span>'+albumName+'</span></div>';
    if(currcatesourceid == 79 || currcatesourceid == 17250){
        checkLeftStuts();
        bread = '<div class="jiu_navleft">&nbsp;<a href="javascript:oneCategory(4,5)" hidefocus="true">热门分类</a>&nbsp;&gt;&nbsp;<a href="javascript:'+currCateString1+';" hidefocus="true">'+returnSpecialChar(currCateName1)+'</a>&nbsp;&gt;&nbsp;<a href="javascript:'+currCateString+';" hidefocus="true">'+returnSpecialChar(currCateName)+'</a>&nbsp;&gt;&nbsp;<span>'+albumName+'</span></div>';
    }else{
    bread = '<div class="jiu_navleft">&nbsp;<a href="javascript:oneCategory(4,5)" hidefocus="true">热门分类</a>&nbsp;&gt;&nbsp;<a href="javascript:'+currCateString+';" hidefocus="true">'+returnSpecialChar(currCateName)+'</a>&nbsp;&gt;&nbsp;<span>'+albumName+'</span></div>';
    }
    currObj.find(".jiu_nav").prepend(bread);
    var albumObj1 = albumObj.find(".jiu_nav");
    saveBread(albumObj1);
    //bread = '<div class="subnav2">&nbsp;<a href="javascript:oneCategory(1,4)" hidefocus="true">歌手</a>&nbsp;&gt;&nbsp;<a href="javascript:someArtist('+data.artistid+')" hidefocus="true">'+returnSpecialChar(data.artist)+'</a>&nbsp;&gt;&nbsp;<span>'+albumName+'</span></div>';
    //currObj.prepend(bread);
    //saveBread(currObj);
    var musicList = data.musiclist;
    var musicSize = musicList.length;
    var albumartistid = data.artistid;
    for(var i = 0; i < musicSize; i ++){
        musicList[i].albumid = albumid;
        var hasartistid = musicList[i].artistid;
        if(typeof(hasartistid)=="undefined"||hasartistid==""){
            musicList[i].artistid = albumartistid;
        }
    }
    if(musicSize==0){
        albumObj.find(".jiu_playlist .jiu_biglist").html("<span class='nocontent'>暂没有相关内容</span>");
        return;
    }
    
    //var bigStr = musicBigString(musicList,false);
    albummusicListAllPlay = data.musiclist;
    var bigStr = musicBigString(1,1,true,musicList,false);
    //alert(bigStr);
        //data = null;
    var picUrl = data.pic;
    if(picUrl == ""){
        picUrl = album_default_img;
    }else{
        picUrl = getAlbumPrefix(picUrl)+picUrl;
        //picUrl = picUrl.replace("albumcover/120","albumcover/180");
    }
    centerLoadingEnd();
    //swapTab(5,false);
    albumObj.find(".jiu_playlist .jiu_biglist").html(bigStr);
    bigStr = null;
    musicList = null;
    data = null;
}
/**
 * 歌曲列表页面拼字符串通用方法
 * bigObj:歌曲对象list
 * from：歌曲list采集起始位置
 * to：歌曲list采集终止位置
 * hasArrow：是否有箭头；true--排行榜有箭头，false：普通列表无箭头
 * pageMusicSize：翻页时候index显示
 * author：hujianhua 
 */
function musicBigString(from,to,flag,bigObj,hasArrow,pageMusicSize){
    
    /*var ss = getTimeParam();
    alert(ss);*/
    //alert("musicBigString");
    var htmlArray = [];
    if(from==to){
        var f = 0;
        var objSize = bigObj.length;
    }else{
        var f = from;
        var objSize = to;
    }
    var rand = 0;
    for (var i = f; i < objSize; i++) {
        var someObj = bigObj[i];
        var orderNum = 0;
        var index = 0;
        orderNum = parseInt(i,10);
        //alert("orderNum:"+orderNum);
        if(typeof(pageMusicSize)=="number"){
            orderNum = parseInt(orderNum,10)+pageMusicSize;
        }
        index = orderNum;
        if(flag){
            index++;
        }
        if(index < 10){
            index = "0" + index;
        }     
        var name = someObj.name;
        if(typeof(name)=="undefined"){
            name = someObj.mname;
        }
        name = returnSpecialChar(name);
        var artist = someObj.artist;
        if(typeof(artist)=="undefined"){
            artist = someObj.mauther;
        }
        artist = returnSpecialChar(artist);
        var artistid = someObj.artistid;
        var albumName = someObj.album;
        if(typeof(albumName)=="undefined"){
            albumName = someObj.malbum;
        }
        if(!albumName || albumName==null){
            albumName = "";
        }
        albumName = returnSpecialChar(albumName);
        var pid = someObj.pid;
        if(typeof(pid)=="undefined"){
            pid = "";
        }
        var phbid = someObj.phbid;
        if(typeof(phbid)=="undefined"){
            phbid = "";
        }
        //alert(0);
        if(hasArrow){
            //alert(1);
            var param = someObj.param;
            //alert(1.1);
            if(typeof(param)=="undefined"){
                //alert(someObj.playparam);
                param = someObj.playparam;
            }
            //alert(1.3);
            var musicString = "";
            if(param!=""){
                //alert(1.4);
                //alert(param);
                param = returnSpecialChar(param);
                //alert(param);
                var paramArray = param.split(";");
                var childArray = [];
                //alert(1.5);
                var childi = 0;
                childArray[childi++] = encodeString(returnSpecialChar(name));
                childArray[childi++] = encodeString(returnSpecialChar(artist));
                for(var j=2;j<paramArray.length;j++){
                    childArray[childi++] = paramArray[j];
                }
                //alert(2);
                musicString = childArray.join('\t');
                childArray = null;
                var musicridnum = paramArray[5];
                if(musicridnum.indexOf("MUSIC")>-1){
                    musicridnum = musicridnum.substring(6);
                }
                musicString = encodeString(musicString);
                musicString = checkSpecialChar(musicString);
            }
            var rand = getTimeParam2();
            var htmlchildarray = [];
            var xia = 0;
            htmlchildarray[xia++] = '<ul';
            htmlchildarray[xia++] = ' id="music';
            htmlchildarray[xia++] = musicridnum+rand;
            htmlchildarray[xia++] = '" title="';
            htmlchildarray[xia++] = '双击播放';
            htmlchildarray[xia++] = '" onmouseout="overoutColorByRanId(\'music'+musicridnum+rand+'\',\'nobg\');" onmouseover="overoutColorByRanId(\'music'+musicridnum+rand+'\',\'havebg\');" class=""';
            htmlchildarray[xia++] = '>';
            if(flag){
                htmlchildarray[xia++] = '<li class="num">';
                htmlchildarray[xia++] = index+'.';
                htmlchildarray[xia++] = '</li>';
            }
            htmlchildarray[xia++] = '<li class="song">';
            htmlchildarray[xia++] = '<a href="javascript:wb_playSong(\'MUSIC_'+musicridnum+'\',\''+reQuot(name)+'\',\''+reQuot(artist)+'\');" title="播放歌曲：'+name+'">';
            htmlchildarray[xia++] = name;
            htmlchildarray[xia++] = '</a></li>';
            htmlchildarray[xia++] = '<li class="songer"><a href="javascript:someArtist(\''+artistid+'\')" title="查看歌手：'+artist+'">';
            htmlchildarray[xia++] = artist;
            htmlchildarray[xia++] = '</a></li>';
            htmlchildarray[xia++] = '<li class="listicon">';
            htmlchildarray[xia++] = '<a hidefocus="true" href="javascript:webdownSong(\'MUSIC_'+musicridnum+'\',\''+reQuot(name)+'\',\''+reQuot(artist)+'\',\''+reQuot(albumName)+'\');" class="icon_down" title="下载歌曲">';
            htmlchildarray[xia++] = '</a>';
            //rand = Math.ceil(Math.random()*1000000000)+'';
            //alert(rand);
            htmlchildarray[xia++] = '<a hidefocus="true" href="javascript:share(\'music'+musicridnum+rand+'\',\''+reQuot(name)+'\',\'MUSIC_'+musicridnum+'\',\'normal\');" class="icon_fx" title="分享歌曲">'; 
            htmlchildarray[xia++] = '</a>';
            htmlchildarray[xia++] = '<a hidefocus="true" href="javascript:collectMusic(\'MUSIC_'+musicridnum+'\');" onclick="" class="icon_like" title="收藏歌曲">';
            htmlchildarray[xia++] = '</a>';
            htmlchildarray[xia++] = '<a hidefocus="true" href="javascript:wb_playSong(\'MUSIC_'+musicridnum+'\',\''+reQuot(name)+'\',\''+reQuot(artist)+'\');" class="icon_play" title="播放歌曲">';
            htmlchildarray[xia++] = '</a>';
            htmlchildarray[xia++] = '</li>';
            htmlchildarray[xia++] = '</ul>';

            htmlArray[i] = htmlchildarray.join('');     
        }else{
            var rand1 = getTimeParam2();
            //alert(1);
            var param = someObj.param;
            if(typeof(param)=="undefined"){
                param = someObj.params;
            }
            var musicString = "";
            //var musicMVString = "";
            var musicridnum;
            if(typeof(param)=="undefined" || param==""){
                //alert(1);
                var rid = "MUSIC_"+ someObj.musicrid;
                musicridnum = someObj.musicrid;             
                var musicstringarray = [];
                var musici = 0;
                musicstringarray[musici++] = encodeString(returnSpecialChar(name));
                musicstringarray[musici++] = encodeString(returnSpecialChar(artist));
                musicstringarray[musici++] = rid;
                musicString = musicstringarray.join('\t');
                musicstringarray = null;
                musicString = encodeString(musicString);
                musicString = checkSpecialChar(musicString);
            }else{
                //alert(2);
                param = returnSpecialChar(param);
                var paramArray = param.split(";");
                var musicstringarray = [];
                var musici = 0;
                musicstringarray[musici++] = encodeString(returnSpecialChar(name));
                musicstringarray[musici++] = encodeString(returnSpecialChar(artist));
                for(var j=2;j<paramArray.length;j++){
                    musicstringarray[musici++] = paramArray[j];
                }   
                musicString = musicstringarray.join('\t');
                musicridnum = paramArray[5];
                if(musicridnum.indexOf("MUSIC")>-1){
                    musicridnum = musicridnum.substring(6);
                }
                musicString = encodeString(musicString);
                musicString = checkSpecialChar(musicString);
            }   
            var htmlchildarray = [];
            var xia = 0;
            htmlchildarray[xia++] = '<ul';
            htmlchildarray[xia++] = ' id="music';
            htmlchildarray[xia++] = musicridnum+rand1;
            htmlchildarray[xia++] = '" title="';
            htmlchildarray[xia++] = '双击播放';
            htmlchildarray[xia++] = '" onmouseout="overoutColorByRanId(\'music'+musicridnum+rand1+'\',\'nobg\');" onmouseover="overoutColorByRanId(\'music'+musicridnum+rand1+'\',\'havebg\');" class=""';
            htmlchildarray[xia++] = '>';
            if(flag){
                htmlchildarray[xia++] = '<li class="num">';
            }else{
                htmlchildarray[xia++] = '<li class="num1">';
            }
            htmlchildarray[xia++] = index+'.';
            htmlchildarray[xia++] = '</li>';
            htmlchildarray[xia++] = '<li class="song">';
            htmlchildarray[xia++] = '<a href="javascript:wb_playSong(\'MUSIC_'+musicridnum+'\',\''+reQuot(name)+'\',\''+reQuot(artist)+'\');" title="播放歌曲：'+name+'">';
            htmlchildarray[xia++] = name;
            htmlchildarray[xia++] = '</a></li>';
            htmlchildarray[xia++] = '<li class="songer"><a href="javascript:someArtist(\''+artistid+'\')" title="查看歌手：'+artist+'">';
            htmlchildarray[xia++] = artist;
            htmlchildarray[xia++] = '</a></li>';
            
            htmlchildarray[xia++] = '<li class="listicon">';
            if(flag){
            htmlchildarray[xia++] = '<a hidefocus="true" href="javascript:webdownSong(\'MUSIC_'+musicridnum+'\',\''+reQuot(name)+'\',\''+reQuot(artist)+'\',\''+albumName+'\');" class="icon_down" title="下载歌曲">';
            htmlchildarray[xia++] = '</a>';
            }
            htmlchildarray[xia++] = '<a hidefocus="true" href="javascript:share(\'music'+musicridnum+rand1+'\',\''+reQuot(name)+'\',\'MUSIC_'+musicridnum+'\',\'normal\');" class="icon_fx" title="分享歌曲">';
            htmlchildarray[xia++] = '</a>';
            if(flag){
                htmlchildarray[xia++] = '<a hidefocus="true" href="javascript:collectMusic(\'MUSIC_'+musicridnum+'\');" onclick="" class="icon_like" title="收藏歌曲">';
            htmlchildarray[xia++] = '</a>';
            }
            htmlchildarray[xia++] = '<a hidefocus="true" href="javascript:wb_playSong(\'MUSIC_'+musicridnum+'\',\''+reQuot(name)+'\',\''+reQuot(artist)+'\');" class="icon_play" title="播放歌曲">';
            htmlchildarray[xia++] = '</a>';
            htmlchildarray[xia++] = '</li>';
            
            htmlchildarray[xia++] = '</ul>';
            htmlArray[i] = htmlchildarray.join(''); 
            htmlchildarray = null;      
        }
    }
    var bigString = "";
    bigString = htmlArray.join('');
    //alert(bigString);
    htmlArray = null;
    return bigString;
}
//顶部收藏夹
function AddFavorite(sURL, sTitle)
{
    try
    {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e)
    {
        try
        {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e)
        {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
//搜索相关
var inputts="搜索歌手、歌名、专辑、歌词";
var isFirstSearch = true;
function setInput(strId){
    if(""==$("#"+strId).val()){
        $("#"+strId).val(inputts);
    }
}
function clearInput(strId){
    if(inputts==$("#"+strId).val()){
        $("#"+strId).val("");
    }
} 
function searchReplaceAll(s){
    if(searchSourceKey.indexOf("\\")>-1){
        return s;
    }else{
        return s.replace(new RegExp(searchSourceKey,"g"),"<i class='ff66'>"+searchSourceKey+"</i>");
    }
}
//搜索特定词
function c_search_link(key){
    $("#search_key").val(key);
    do_search(1);
}
function do_search(flag){
    var key_search = "";
    if(flag == 1){
        key_search = $("#search_key").val();
    }else{
        key_search = $("#search_key2").val();
    }
    if(key_search==inputts || key_search==""){
        //swapTab(7,true);
        //alert("请输入你要查询的音乐");
        return;
    }else{
        //$("#title5").show();
        isFirstSearch = false;
        swapTab(7,true);
        searchMusicFunction(key_search);
    }
    try{
        WebPlayer.addSearchHistory(key_search);
        setHisInfo();   // 画搜索历史界面
    }catch(e){}
}
function clearStr(str){
    str = str.replace(/'/g,"\'");
    str = str.replace(/"/g,"\"");
    return str;
}
//添加桌面快捷方式请求
function loadlink(){
    var m = new Image();
    m.src="http://player.kuwo.cn/webmusic/webplay/link.jpg";
    window.location.href = "http://player.kuwo.cn/webmusic/webplay/loadlink.jsp";
}
//搜索历史
function setHisInfo(){
    var arr=WebPlayer.getSearchHistory(5);
    //alert("arr:"+arr);
    if(arr==null || arr.length==0){
        $("#left_his").hide();
        getSearchHot(2);
        //return;
    }else{
        $("#left_his").show();
    }
    //左侧搜索历史
    var htm =[];
    htm[htm.length]= '<h2 style="font-size:15px  "Microsoft YaHei",宋体,sans-serif">历史搜索</h2>';
    for(var i=0;i<arr.length;i++){
        htm[htm.length]= '<a href="javascript:c_search_link(\''+clearStr(arr[i])+'\');" title="'+clearStr(arr[i])+'">'+clearStr(arr[i])+'</a>';
    }
    $("#left_his").html(htm.join(""));
    //初始页我在搜
    var htm2 =[];
    htm2[htm2.length]= '<p class="c_t">我在搜...</p>';
    for(var i=0;i<arr.length;i++){
        htm2[htm2.length]= '<ul class="c_list"><li class="num">'+(i+1)+'</li><li class="song"><a href="javascript:c_search_link(\''+clearStr(arr[i])+'\');" title="'+clearStr(arr[i])+'">'+clearStr(arr[i])+'</a></li><li class="num_p"></li></ul>';
    }
    $("#index_his").html(htm2.join(""));
}
//热门搜索
function getSearchHot(flag){
    //alert("getSreachHot执行了");
    var par = 'flag=djdzs';
    jQuery.ajax(
        {
            url:'http://player.kuwo.cn/webmusic/gu/getAlbumInfo',
            type: 'get',
            data:par,
            success: function (resp) {
                //alert("搜索左侧resp:"+resp);
            var arr=resp.split(',');
            if(flag==1){
                var htm = [];
                htm[htm.length]='<h2 style="font-size:15px "Microsoft YaHei",宋体,sans-serif">热门搜索</h2>';
                htm[htm.length]='<a href="javascript:c_search_link(\''+arr[0].replace("'","")+'\')">'+arr[0]+'</a>';
                htm[htm.length]='<a href="javascript:c_search_link(\''+arr[1].replace("'","")+'\')">'+arr[1]+'</a>';
                htm[htm.length]='<a href="javascript:c_search_link(\''+arr[2].replace("'","")+'\')">'+arr[2]+'</a>';
                htm[htm.length]='<a href="javascript:c_search_link(\''+arr[3].replace("'","")+'\')">'+arr[3]+'</a>';
                htm[htm.length]='<a href="javascript:c_search_link(\''+arr[4].replace("'","")+'\')">'+arr[4]+'</a>';
                //alert(htm.join(""));
                $("#left_hot").html(htm.join(""));  
                //搜索初始页面
                var htm1 = [];
                htm1[htm1.length]='<p class="c_t">今日热门</p>';
                htm1[htm1.length]=' <ul class="c_list"><li class="num">'+1+'</li><li class="song"><a href="javascript:c_search_link(\''+arr[0].replace("'","")+'\')">'+arr[0]+'</a></li><li class="num_p"></li></ul>';
                htm1[htm1.length]=' <ul class="c_list"><li class="num">'+2+'</li><li class="song"><a href="javascript:c_search_link(\''+arr[1].replace("'","")+'\')">'+arr[1]+'</a></li><li class="num_p"></li></ul>';
                htm1[htm1.length]=' <ul class="c_list"><li class="num">'+3+'</li><li class="song"><a href="javascript:c_search_link(\''+arr[2].replace("'","")+'\')">'+arr[2]+'</a></li><li class="num_p"></li></ul>';
                htm1[htm1.length]=' <ul class="c_list"><li class="num">'+4+'</li><li class="song"><a href="javascript:c_search_link(\''+arr[3].replace("'","")+'\')">'+arr[3]+'</a></li><li class="num_p"></li></ul>';
                htm1[htm1.length]=' <ul class="c_list"><li class="num">'+5+'</li><li class="song"><a href="javascript:c_search_link(\''+arr[4].replace("'","")+'\')">'+arr[4]+'</a></li><li class="num_p"></li></ul>';
                $("#index_hot").html(htm1.join(""));
            }else if(flag==2){
                //alert(arr.length);
                //搜索初始页面
                var htm2 = [];
                htm2[htm2.length]='<p class="c_t"></p>';
                htm2[htm2.length]=' <ul class="c_list"><li class="num">'+6+'</li><li class="song"><a href="javascript:c_search_link(\''+arr[5].replace("'","")+'\')">'+arr[5]+'</a></li><li class="num_p"></li></ul>';
                htm2[htm2.length]=' <ul class="c_list"><li class="num">'+7+'</li><li class="song"><a href="javascript:c_search_link(\''+arr[6].replace("'","")+'\')">'+arr[6]+'</a></li><li class="num_p"></li></ul>';
                htm2[htm2.length]=' <ul class="c_list"><li class="num">'+8+'</li><li class="song"><a href="javascript:c_search_link(\''+arr[7].replace("'","")+'\')">'+arr[7]+'</a></li><li class="num_p"></li></ul>';
                htm2[htm2.length]=' <ul class="c_list"><li class="num">'+9+'</li><li class="song"><a href="javascript:c_search_link(\''+arr[8].replace("'","")+'\')">'+arr[8]+'</a></li><li class="num_p"></li></ul>';
                htm2[htm2.length]=' <ul class="c_list"><li class="num">'+10+'</li><li class="song"><a href="javascript:c_search_link(\''+arr[9].replace("'","")+'\')">'+arr[9]+'</a></li><li class="num_p"></li></ul>';
                $("#index_his").html(htm2.join(""));
            }   
        }
        }); 
}
function getSreachHotAtSearchTag(){
    var par = 'flag=djdzs';
    jQuery.ajax(
        {
            url:'http://player.kuwo.cn/webmusic/gu/getAlbumInfo',
            type: 'get',
            data:par,
            success: function (resp) {
                var htm = [];
                var arr=resp.split(',');
                htm[htm.length]='<a style="color:#46B4E6;" href="javascript:c_search_link(\''+arr[0].replace("'","")+'\')">'+arr[0]+'</a>&nbsp;&nbsp;';
                htm[htm.length]='<a style="color:#46B4E6;" href="javascript:c_search_link(\''+arr[1].replace("'","")+'\')">'+arr[1]+'</a>&nbsp;&nbsp;';
                htm[htm.length]='<a style="color:#46B4E6;" href="javascript:c_search_link(\''+arr[2].replace("'","")+'\')">'+arr[2]+'</a>&nbsp;&nbsp;';
                htm[htm.length]='<a style="color:#46B4E6;" href="javascript:c_search_link(\''+arr[3].replace("'","")+'\')">'+arr[3]+'</a>&nbsp;&nbsp;';
                htm[htm.length]='<a style="color:#46B4E6;" href="javascript:c_search_link(\''+arr[4].replace("'","")+'\')">'+arr[4]+'</a>';
                $("#searchhot").html(htm.join(""));
            }
        }); 
}
function searchMusicFunction(sourceKey){
    allHide(-3);
    searchObj.find(".jiu_playlist .jiu_biglist").html("");
    searchObj.show();
    centerLoadingStart();
    searchMusicPage = 0;
    searchMusic(sourceKey);
}
var searchKey = "";
var searchSourceKey = "";
var searchMusicPage = 0;
var searchMusicRn = 12;
var searchMusicTotal = 0;
var searchMusicLoad = false;
var searchpageTotal=1;
//var time_search_s =0;
//var imgCall = new Image();
function searchMusic(sourceKey){
    searchSourceKey = sourceKey;
    var url = host_url+"r.s?all="+encodeURIComponent(sourceKey)+"&ft=music&newsearch=1&itemset=web_2013&client=kt&cluster=0&pn="+searchMusicPage+"&rn="+searchMusicRn+"&rformat=json&callback=searchMusicResult&encoding=utf8";
    
    searchMusicLoad = false;
    $.getScript(url);
}
function searchMusicResult(jsondata){
    var starttime = new Date().getTime();
    searchMusicLoad = false;
    var data = jsondata;
    var currPage = searchMusicPage;
    if(typeof(data)=="undefined" || data==null||obj2Str(data)=="{}"||obj2Str(data)==""){
        if(currPage==0){
            searchRight.find("#search_list").hide();
            $("#searchIndex").hide();
            $(".noresult em").html(searchSourceKey);
            $(".noresult").show();
        }
        return;
    }
    if(currPage!=data.PN){
        return;
    }
    //alert("2");
    var musicList = data.abslist;
    searchmusicListAllPlay = musicList;
    searchMusicTotal = data.TOTAL;
/*分页机制建立，故取消数量限制    if(data.TOTAL >= 100){
        searchMusicTotal = 100;
    }else{
        searchMusicTotal = data.TOTAL;
    }*/
    searchpageTotal = Math.ceil(searchMusicTotal/searchMusicRn);
    if(searchMusicPage==0&&searchpageTotal<6){
        for(var i=0;i<searchpageTotal;i++){
            $("#songsea_"+(i+1)).html(i+1);
            $("#songsea_"+(i+1)).show();
            $("#songsea_"+(i+1)).attr("href","javascript:jumpToPage("+i+",2);");
                if(i!=0){
                $("#songsea_"+(i+1)).attr("class","");
                }else{
                $("#songsea_"+(i+1)).attr("class","ge_anwo");
                }
        }
        for(var j=searchpageTotal;j<5;j++){
            $("#songsea_"+(j+1)).hide();
        }
    }else if(searchMusicPage==0&&searchpageTotal>5){
        for(var i=0;i<5;i++){
            $("#songsea_"+(i+1)).html(i+1);
            $("#songsea_"+(i+1)).show();
            $("#songsea_"+(i+1)).attr("href","javascript:jumpToPage("+i+",2);");
            if(i!=0){
                $("#songsea_"+(i+1)).attr("class","");
            }else{
                $("#songsea_"+(i+1)).attr("class","ge_anwo");
            }
        }
    }
    //没有结果
    if(currPage==0&&parseInt(searchMusicTotal,10)==0){
        $("#searchIndex").hide();
        centerLoadingEnd();
        searchObj.find(".jiu_nav .jiu_navleft span").html("");
        searchObj.find(".jiu_nav .jiu_navright #searchallplay").hide();
        searchObj.find(".jiu_playlist .jiu_biglist").hide();
        $(".noresult em").html(searchSourceKey);
        getSreachHotAtSearchTag();
        $(".noresult").show();
        return;
    }else{
        isFirstSearch = false;
        $("#searchIndex").show();
        searchObj.find(".jiu_nav .jiu_navright #searchallplay").show();
        searchObj.find(".jiu_playlist .jiu_biglist").show();
        $(".noresult").hide();
    }

    searchObj.find(".jiu_nav .jiu_navleft span").html("共找到&nbsp;"+searchMusicTotal+"&nbsp;条与 &nbsp;&nbsp;<span style='color:#ff6600'>"+searchSourceKey+"</span>相关的结果");
    var htmlArray = [];
    var objSize = musicList.length;
    for ( var i = 0; i < objSize; i++) {
        var someObj = musicList[i];
        var orderNum = 0;
        var index = 0;
        orderNum = parseInt(i,10)+1;
        if(typeof(searchMusicRn)=="number"){
            orderNum = parseInt(orderNum,10)+(parseInt(searchMusicRn,10)*parseInt(currPage,10));
        }
        index = orderNum;
        if(index < 10){
            index = "0" + index;
        }      
        var score = someObj.SCORE100;
        var width = "";
        if(!score || score==null){
            width = "width:6px";
        }else{
            var scoreNum = parseInt(score,10);
            scoreNum = scoreNum*0.4;
            width = "width:"+scoreNum+"px";
        }
        var formats = someObj.FORMATS;
        var name = someObj.NAME;
        if(typeof(name)=="undefined"){
            name = someObj.SONGNAME;
        }
        name = returnSpecialChar(name);
        var artist = someObj.ARTIST;
        artist = returnSpecialChar(artist);
        var albumName = someObj.ALBUM;
        if(!albumName || albumName==null){
            albumName = "";
        }
        albumName = returnSpecialChar(albumName);
        //alert(4);
        var artistid = someObj.ARTISTID;
        var musicString = "";
        var rid = someObj.MUSICRID;
        var musicridnum = rid;
        if(musicridnum.indexOf("MUSIC")>-1){
            musicridnum = musicridnum.substring(6);
        }
        var musicstringarray = [];
        var musici = 0;
        musicstringarray[musici++] = encodeString(returnSpecialChar(name));
        musicstringarray[musici++] = encodeString(returnSpecialChar(artist));
        musicstringarray[musici++] = rid;
        musicString = musicstringarray.join('\t');
        musicstringarray = null;
        musicString = encodeString(musicString);
        musicString = checkSpecialChar(musicString);
        //alert(1);
        var htmlchildarray = [];
        var xia = 0;
        var rand2 = getTimeParam2();
        htmlchildarray[xia++] = '<ul';
        htmlchildarray[xia++] = ' id="music';
        htmlchildarray[xia++] = musicridnum+rand2;
        htmlchildarray[xia++] = '" title="';
        htmlchildarray[xia++] = '双击播放';
        htmlchildarray[xia++] = '" onmouseout="overoutColorByRanId(\'music'+musicridnum+rand2+'\',\'nobg\');" onmouseover="overoutColorByRanId(\'music'+musicridnum+rand2+'\',\'havebg\');"class="">';
        //htmlchildarray[xia++] = '<li class="ichoice"><input type="checkbox" checked="true" /></li>';
        htmlchildarray[xia++] = '<li class="num">';
        htmlchildarray[xia++] = index;
        htmlchildarray[xia++] = '</li><li class="song"';
        htmlchildarray[xia++] = '><a hidefocus="true" href="javascript:wb_playSong(\'MUSIC_'+musicridnum+'\',\''+reQuot(name)+'\',\''+reQuot(artist)+'\');"title="';
        htmlchildarray[xia++] = '播放歌曲:'+name;
        htmlchildarray[xia++] = '">';
        htmlchildarray[xia++] = searchReplaceAll(name);
        htmlchildarray[xia++] = '</a></li><li class="songer"><a hidefocus="true" href="javascript:c_search_link(\''+reQuot(artist)+'\')" title="'; 
        htmlchildarray[xia++] = '搜索歌手:'+artist;
        htmlchildarray[xia++] = '">';
        htmlchildarray[xia++] = searchReplaceAll(artist);
        htmlchildarray[xia++] = '</a></li>';    
        htmlchildarray[xia++] = '<li class="listicon">';
        htmlchildarray[xia++] = '<a hidefocus="true" href="javascript:webdownSong(\'MUSIC_'+musicridnum+'\',\''+reQuot(name)+'\',\''+reQuot(artist)+'\',\''+reQuot(albumName)+'\');" class="icon_down" title="下载歌曲">';
        htmlchildarray[xia++] = '</a>';
        htmlchildarray[xia++] = '<a hidefocus="true" href="javascript:share(\'music'+musicridnum+rand2+'\',\''+reQuot(name)+'\',\'MUSIC_'+musicridnum+'\',\'normal\');" class="icon_fx" title="分享歌曲">'; 
        htmlchildarray[xia++] = '</a>';
        htmlchildarray[xia++] = '<a hidefocus="true" href="javascript:collectMusic(\'MUSIC_'+musicridnum+'\');" onclick="" class="icon_like" title="收藏歌曲">';
        htmlchildarray[xia++] = '</a>';
        htmlchildarray[xia++] = '<a hidefocus="true" href="javascript:wb_playSong(\'MUSIC_'+musicridnum+'\',\''+reQuot(name)+'\',\''+reQuot(artist)+'\');" class="icon_play" title="播放歌曲">';
        htmlchildarray[xia++] = '</a>';
        htmlchildarray[xia++] = '</li>';    
        
        htmlchildarray[xia++] = '</ul>';
        htmlArray[i] = htmlchildarray.join('');     
    }
    var bigString = "";
    bigString = htmlArray.join('');
    //alert("搜索的bigString为："+bigString);
    htmlArray = null;
    if(currPage!=data.PN){
    
        return;
    }
    if(currPage==0){
        searchObj.find(".jiu_playlist .jiu_biglist").html("");
    }
    centerLoadingEnd();
    searchObj.find(".jiu_playlist .jiu_biglist").html(bigString);
    searchMusicLoad = true;
    //setTimeout(changeScroll,500);
    bigString = null;
    musicList = null;
    data = null;
}
//json对象转字符串
function obj2Str(obj) {
    switch(typeof(obj)) {
        case 'object':
            var ret = [];
            if( obj instanceof Array) {
                for(var i = 0, len = obj.length; i < len; i++) {
                    ret.push(obj2Str(obj[i]));
                }
                return '[' + ret.join(',') + ']';
            } else if( obj instanceof RegExp) {
                return obj.toString();
            } else {
                for(var a in obj) {
                    ret.push("\""+a+"\""+ ':' + obj2Str(obj[a]));
                }
                return '{' + ret.join(',') + '}';
            }
        case 'function':
            return 'function() {}';
        case 'number':
            return obj.toString();
        case 'string':
            return "\"" + obj.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function(a) {
                return ("\n" == a) ? "\\n" : ("\r" == a) ? "\\r" : ("\t" == a) ? "\\t" : "";
            }) + "\"";
        case 'boolean':
            return obj.toString();
        default:
            return obj.toString();
    }
}
//把显示的name特殊字符替换
function checkSpecialChar(s){
    return s.replace(/\&/g,"&amp;").replace(/\"/g,"&quot;").replace(/\'/g,"&apos;");
    //return s.replace(/\&amp;/g,"&").replace(/\"/g,"&quot;").replace(/\&apos;/g,"'");
}
function returnSpecialChar(s){
    return s.replace(/\&amp;/g,"&").replace(/\&nbsp;/g," ").replace(/\&apos;/g,"'").replace(/\&quot;/g,"\"").replace(/\%26apos\%3B/g,"'").replace(/\%26quot\%3B/g,"\"").replace(/\%26amp\%3B/g,"&");
}
function reQuot(s){
    return s.replace(/'/g,  '\\\'');
}
//编码字符串
function encodeString(str){
    return encodeURIComponent(str);
}
//取歌手图片前缀
function getArtistPrefix(pic){
    var num = (getHashCode(pic)%4)+1;
    var prefix = "http://img"+num+".kwcdn.kuwo.cn:81/star/starheads/";
    return prefix;
}
//取专辑图片前缀
function getAlbumPrefix(pic){
    var num = (getHashCode(pic)%4)+1;
    var prefix = "http://img"+num+".kwcdn.kuwo.cn:81/star/albumcover/";
    return prefix;
}
//传入图片地址 如果有img1 2 3 4域名的随机返回一个
function changeImgDomain(url){
    var newurl = url;
    // var num = Math.floor(Math.random()*4+1);
    var num = (getHashCode(url)%4)+1;
    if(newurl.indexOf("img1.kwcdn.kuwo.cn")>-1){
        newurl = newurl.replace("img1.kwcdn.kuwo.cn","img"+num+".kwcdn.kuwo.cn");
    }else if(newurl.indexOf("img2.kwcdn.kuwo.cn")>-1){
        newurl = newurl.replace("img2.kwcdn.kuwo.cn","img"+num+".kwcdn.kuwo.cn");
    }else if(newurl.indexOf("img3.kwcdn.kuwo.cn")>-1){
        newurl = newurl.replace("img3.kwcdn.kuwo.cn","img"+num+".kwcdn.kuwo.cn");
    }else if(newurl.indexOf("img4.kwcdn.kuwo.cn")>-1){
        newurl = newurl.replace("img4.kwcdn.kuwo.cn","img"+num+".kwcdn.kuwo.cn");
    }
    if(newurl.indexOf("albumcover/180")>-1){
        newurl = newurl.replace("albumcover/180","albumcover/100");
    }else if(newurl.indexOf("starheads/150")>-1){
        newurl = newurl.replace("starheads/150","starheads/100");
    }
    return newurl;
}
//hasCode编码
function getHashCode(str){
    var hash = 0;
    var len = str.length;
    if (len == 0) return hash;
    for (var i = 0 ; i < len; i++) {
        var ch = "";
        ch = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+ch;
        hash = hash & hash;
    }
    if(hash<0){
        hash = - hash;
    }
    return hash;
}
window.setInterval(GC,5000);
//停止所有http请求
function stopHttpRequest(){
    if(isIE) {
        document.execCommand("stop");
    }else{
        window.stop();
    }
}
//选中状态
function selectedItem(item){
    var item1 = $(item);
    item1.attr("class","itemUl itemUl_act");    
    var item1 = $(item);
    item1.find(".iSongName").find("a").attr("style","color:#ffffff;");
    item1.find(".iSonger").find("a").attr("style","color:#ffffff;");
    item1.attr("style","color:#fff;background:#46B4E6");
}
function delselectItem(item){
    //alert(item);
    var item1 = $(item);
    item1.attr("class","itemUl"); 
    item1.removeAttr("style");
    item1.css("color","#000000");
    item1.find(".iSongName").find("a").removeAttr("style");
    item1.find(".iSonger").find("a").removeAttr("style");
    item1.find(".iSonger").find("a").css("color","#000");
    item1.find(".iSongName").find("a").css("color","#000");
}
function SetBlackText(item){
    var temp1 = $(item).attr("id");
    var t_rid = "";
    if (WebPlayer.curMusic) {
        t_rid = WebPlayer.curMusic.rid;
    }
    //alert(t_rid);
    if (temp1 != "pl" + t_rid && temp1 != "sc" + t_rid) {
        delselectItem(item);
    }   
    //alert("currmusicitem="+currmusicitem);
    //判断是否为当前歌曲    currmusicitem
    if(WebPlayer.listType == "playList"){
        if("#"+temp1 == currmusicitem){
            selectedItem("#"+temp1);
            //$("#"+temp1).attr("class","itemUl itemUl_def"); 
        }               
        delselectItem("#sc"+temp1.substring(3));    
    }else{
        if("#"+temp1 == currmusicitem){
            selectedItem("#"+temp1);
            //$("#"+temp1).attr("class","itemUl itemUl_def"); 
        }       
        delselectItem("#pl"+temp1.substring(3));    
    }
}
function SetWhiteText(item){
    //var temp2 = $(item).attr("id");
    //if("#"+temp2 == currmusicitem){
        selectedItem(item); 
    //}     
}
function overoutColor(obj, style) {
    var t_rid = "";
    if (WebPlayer.curMusic) {
        t_rid = WebPlayer.curMusic.rid;
    }
    if (obj.id != "pl" + t_rid && obj.id != "sc" + t_rid) {
        obj.setAttribute("class",style);
        //obj.style.background = "#46B4E6";
    }else{
        //obj.setAttribute("class","itemUl itemUl_act");
    }
}
function overoutColorByRanId(objid, style) {
    var obj = $("#"+objid);
    obj.attr("class",style);
}
function overoutColorById(id, style) {
    var overItem = $("#"+id);
    overItem.attr("class",style);
}
//主动调用IE垃圾回收
function GC(){
    if(isIE){
        try{
            setTimeout(CollectGarbage,5000);
        }catch(e){
            webLog("GC error:"+e.message);
        }
    }
}
function imgOnError(obj){
    obj.onerror = null;
    $(obj).hide();
    $(obj).attr("src","http://image.kuwo.cn/webplayer2013/img/kuwo.jpg");
    $(obj).fadeIn("slow");
}
function imgOnload(obj){
    var src =  $(obj).attr("data-src");
    src = src+"";
    obj.onload = null;
    var img = new Image();
    img.src = src;
    if(img.complete){
        try{
            $(obj).hide();
            $(obj).attr("src",src);
            $(obj).fadeIn("slow");
            return;
        }catch(e){
            return;
        }
    }
    img.onerror=function(){
        var errorNum = $(obj).attr("errornum");
        if(typeof(errorNum)=="undefined"){
            $(obj).attr("src",img.src);
            $(obj).attr("errornum","1");
        }else{
            //webLog("imgerrorurl:"+img.src);
            this.onerror = null;
            $(obj).hide();
            $(obj).attr("src","http://image.kuwo.cn/webplayer2013/img/kuwo.jpg");
            $(obj).fadeIn("slow");
        }
    };
    img.onload=function(){
        var islast = $(obj).attr("data-islast");    
        $(obj).hide();
        $(obj).attr("src",src);
        $(obj).fadeIn("slow");
    };
}
//tips上的播放按钮点击方法串生成
function getEmClickString(source,sourceid,id,pic){
    //alert(source+","+sourceid+","+id);
    var clickstring = "";
    var clickarray = [];
    var xia = 0;
    clickarray[xia++] = 'onclick="';
    clickarray[xia++] = 'emClick(arguments[0],\'';
    clickarray[xia++] = source;
    clickarray[xia++] = '\',\'';
    clickarray[xia++] = sourceid;
    clickarray[xia++] = '\',\'';
    clickarray[xia++] = id;
    clickarray[xia++] = '\',\'';
    clickarray[xia++] = pic;
    clickarray[xia++] = '\')';
    clickarray[xia++] = ';return false;" title="直接播放"';
    clickstring = clickarray.join('');
    clickarray = null;  
    return clickstring;
}
//点击图片hover上的播放按钮 取数据直接播放
function emClick(evt,source,sourceid,id,pic){
    var sourceNum = parseInt(source,10);
    switch(sourceNum){
        case 1: getBangMusic(sourceid);break;
        case 2: getBangMusic(sourceid);break;
        case 4: getArtistMusic(sourceid);break;
        case 7: getSomeMV(sourceid);break;
        case 8: getGeDanMusic(sourceid);break;
        case 9: someDianTai(sourceid,pic);break;
        case 10: someTiaoPin(sourceid);break;
        case 12: getGeDanMusic(sourceid);break;
        case 13: getAlbumMusic(sourceid);break;
        case 14: getGeDanMusic(sourceid);break;
        default : //webLog("当前的source:"+source+"没有定义...");
    }
    if(isIE){
        event.cancelBubble = true;
    }else{
        evt.stopPropagation();
    }
}
function getBangMusic(sourceid){
    if(sourceid==""){
        return;
    }
    $.getScript("http://kbangserver.kuwo.cn/ksong.s?from=pc&fmt=json&type=bang&data=content&id="+sourceid+"&callback=playBangMusic&pn=0&rn=100");
}
function playBangMusic(jsondata){
    var data = jsondata;
    if(typeof(data)=="undefined"||data==null||obj2Str(data)=="{}"||obj2Str(data)==""){
        return;
    }
    bangListAllPlay = data.musiclist;
    playAllBangData();
    data = null;
    bangListAllPlay = null;
}
function getArtistMusic(sourceid){
    if(sourceid==""){
        return;
    }
    //alert("sourceid="+sourceid);
    $.getScript(host_url+"r.s?stype=artist2music&artistid="+sourceid+"&pn=0&rn=100&callback=playArtistMusic");
}
function playArtistMusic(jsondata){
    var data = jsondata;
    
    if(typeof(data)=="undefined"||data==null||obj2Str(data)=="{}"||obj2Str(data)==""){
        return;
    }
    //alert("data="+data);
    artmusicListAllPlay = data.musiclist;
    playAllartData();
    data = null;
    artmusicListAllPlay = null;
}
function getGeDanMusic(sourceid){
    if(sourceid==""){
        return;
    }
    //getScriptData("http://iting.kuwo.cn/iting/pb/GetPlById?pid="+sourceid+"&src=mbox_old&callback=playGeDanMusic",false);
    $.getScript("http://nplserver.kuwo.cn/pl.svc?op=getlistinfo&pid="+sourceid+"&pn=0&rn=1000&encode=utf-8&keyset=pl2012&identity=kuwo&callback=playGeDanMusic");
}
function playGeDanMusic(jsondata){
    var data = jsondata;
    //alert("data="+data.musiclist.length);
    gedanListAllPlay = data.musiclist;
    playAllphpartData();
    data = null;
    gedanListAllPlay = null;
}
function getAlbumMusic(sourceid){
    if(sourceid==""){
        return;
    }
    $.getScript(host_url+"r.s?stype=albuminfo&albumid="+sourceid+"&callback=playAlbumMusic");
}
function playAlbumMusic(jsondata){
    var data = jsondata;
    if(typeof(data)=="undefined"||data==null||obj2Str(data)=="{}"||obj2Str(data)==""){
        return;
    }
    albummusicListAllPlay = data.musiclist;
    playAllAlbumData();
    data = null;
    albummusicListAllPlay = null;
}
var centerLoadingInterval;
function centerLoadingStart(){
    clearInterval(centerLoadingInterval);
    centerLoadingInterval = null;
        $("#quku_page_load").html("<img src='http://image.kuwo.cn/webplayer2013/img/loading.gif' /><span>稍等片刻，好音乐马上就来<i data-dot='1'>.</i></span>").show();
        centerLoadingInterval = setInterval(function(){
            var dot =  $("#quku_page_load").find("i").attr("data-dot");
            var dian = '.';
            if(dot==4){
                dot = 1;
            }
            dot++;
            if(dot==2){
                dian = '..';
            }
            if(dot==3){
                dian = '...';
            }
             $("#quku_page_load").find("i").attr("data-dot",dot);
             $("#quku_page_load").find("i").html(dian);
        },500);

}
function centerLoadingEnd(){
    //centerLoadingObj0.hide().html("");
    $("#quku_page_load").hide().html("");
    clearInterval(centerLoadingInterval);
    centerLoadingInterval = null;
}
//对图片角标的添加
function getJiaoBiao(source){
    var jiaobiao = "";
    if(source==5 || source==16 || source==3){
        jiaobiao = "<span class='l_fenlei'></span>";
    }else if(source==14 || source==7){
        jiaobiao = "<span class='l_hd'></span>";
    }else if(source==11){
        jiaobiao = "<span class='l_game'></span>";
    }else if(source==9){
        jiaobiao = "<span class='l_diantai'></span>";
    }else if(source==13){
        jiaobiao = "<span class='l_adm'></span>";
    }
    return jiaobiao;
}
/* 设置用户信息  */
function setuserInfo(){
    if(getCookie("userid")!=""){
        /*var par = 'uid='+getCookie("userid"); 
        jQuery.ajax(
            {
                url:'http://player.kuwo.cn/US/client/uinfo.jsp',
                type:'get',
                data:par,
                success:function(resp){
                    //设置用户信息结果：
                    //call_refresh_info('8482074', 'bishenghua', '11', '2', '0', 'http://img2.kwcdn.kuwo.cn/star/userhead/74/51/1361695950106_8482074s.jpg', '273035073_1', '音乐粉丝', '44', '0');
                    //eval(resp);
                }
            }
        );  */
        var html = '<span style="position:absolute;right:60px"><a href="http://kzone.kuwo.cn/mlog/u'+getCookie("userid")+'/" target="_blank">'+getCookie("username")+'</a></span>';
        html+='<span style="position:absolute;right:15px"><a href="javascript:void(0);" onclick="logoutSession(window.location.href);">退出</a></span>';
        jQuery('#loginStat').html(html);
    }else{
        var htm=[];
        htm[0]='<span style="position:absolute;right:60px">[ <a href="javascript:OnOff(\'l_outer_div\');">登录</a> ]</span>';
        htm[1]='<span style="position:absolute;right:15px">[ <a href="http://i.kuwo.cn/US/reg.htm?ret=webplay" target="_blank">注册</a> ]</span>';
        $("#loginStat").html(htm.join(""));
    }
}
/*   用户登录提交表单数据方法      */
var LoginBox={loginRet:false,callback:null};
function submitLoginForm(flag){
    var form = $("#loginBoxForm");
    if(flag==1){
        var tipsInf = $("#logInfo");
        if(form == null)return;
        var objuname = $("#username");
        if(objuname.val()=="" || objuname.val().indexOf(" ")>=0){
            tipsInf.html('必须填写用户名,且不含空格');
            document.getElementById('username').focus();
            return false;
        }
        var objupwd = $("#password");
        if(objupwd.val()==""){
            tipsInf.html('请填写密码');
            document.getElementById('password').focus();
            return false;
        }
        //tipsInf.className='promptLoad';
        tipsInf.html('正在登录，请稍候...');        
        var par = 'username='+objuname.val()+'&password='+objupwd.val();    
        jQuery.ajax({
                url : 'http://player.kuwo.cn/mlog/st/LoginBox',
                type : 'post',
                data : par,
                success:function(resp){
                    var resText=resp;
                    if(resText.indexOf('登录成功')>-1){
                        //tipsInf.className='promptSucc';
                        tipsInf.html('登录成功,窗口将于  1   秒后自动关闭');
                        var objuname = $("#username");
                        setLoginCookies(objuname.val());
                        //get_collect_list();  //  获取收藏列表数据
                        setTimeout(function(){
                            tipsInf.html('登录成功,窗口将于  1   秒后自动关闭');
                        },1000);
                        setTimeout(function(){
                            tipsInf.html('登录成功,窗口将于  0   秒后自动关闭');
                            $("#l_outer_div").hide();
                            tipsInf.html('欢迎登录');
                        },2000);
                    }else if(resText.indexOf("密码错误")>=0 || resText.indexOf("用户名不存在")>=0){
                        //tipsInf.className='promptErr';
                        tipsInf.html('账号或密码错误');
                        document.getElementById('username').focus();
                    } else {
                        //tipsInf.className='promptErr';
                        tipsInf.html('未知登陆错误，请向我们 <a href="http://mbox.kuwo.cn:8080/ur/reflect/questionW.jsp?ver=WEBPLAYER" target="_blank" style="font-color:#FF9900"> 反馈</a>');
                    }
                }
            }
        );
    }
}
function EmptyInput(){
     $("#username").val("");
     $("#password").val("");
     document.getElementById('username').focus();
}
//动态设置top头登录信息
function call_refresh_info(uid,uname,g,mail,rmd,img,sid,gname,per,vip){
    if(img.indexOf("star")==-1||img==null||img==""||typeof(img)=="undefinded"){
        img = 'http://player.kuwo.cn/webmusic/wbplayer/img/pic50.png';
    }
     var htm=[];
        htm[0]='<a href="http://kzone.kuwo.cn/mlog/u'+uid+'/" class="pic20" target="_blank" title="访问'+uname+'的音乐空间"><img src="'+img+'" width="30" height="30" /></a>';
        htm[1]='<a href="http://kzone.kuwo.cn/mlog/u'+uid+'/" class="" target="_blank" title="访问'+uname+'的音乐空间" style="width:70px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">'+uname+'</a>';
        htm[2]='<a href="http://vip.kuwo.cn/" target="_blank" class="rankicon_'+g+'" title="酷我vip专区"></a>';
        if(vip=="0"){
            htm[3]='<a href="http://vip.kuwo.cn/" target="_blank" class="vip_no" title="酷我vip专区"></a>';
        }else{
            htm[3]='<a href="http://vip.kuwo.cn/" target="_blank" class="vip" title="酷我vip专区"></a>';
        }
        htm[4]='<span>[ <a href="javascript:exitLogin();" title="退出登陆">退出</a> ]</span>';
    $("#loginStat").html(htm.join(""));
}
/* 将用户名设置到cookie中    */
function setLoginCookies(userName){
    var temurl="http://player.kuwo.cn/webmusic/gu/getuseridbyname?uname="+encodeURI(userName);  
     jQuery.ajax({
            url : temurl,
            type : 'get',
            success:function(resp){
                //alert(resp);
                var uarr=resp.split(",");
                addCookie('userid', uarr[0], 86400000000, '/', 'kuwo.cn');
                addCookie('uph', uarr[1], 86400000000, '/', 'kuwo.cn');
                addCookie('username', userName, 86400000000, '/', 'kuwo.cn');
                var html = '<span style="position:absolute;right:60px"><a href="http://kzone.kuwo.cn/mlog/u'+uarr[0]+'/" target="_blank">'+userName+'</a></span>';
                html+='<span style="position:absolute;right:15px"><a href="javascript:void(0);" onclick="logoutSession(window.location.href);">退出</a></span>';
                jQuery('#loginStat').html(html);
                //setuserInfo();
                get_collect_list();
            }
        }
    );
}
//删除用户登录信息cookie
function exitLogin(){
    addCookie('userid',"", 86400000000, '/', 'kuwo.cn');
    addCookie('uph',"", 86400000000, '/', 'kuwo.cn');
    addCookie('username',"", 86400000000, '/', 'kuwo.cn');
    setuserInfo();
    //v_ref_colllist();
}