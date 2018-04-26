$(function(){

    return;
    $(".nav-pills li").on("click", function(){
        event.preventDefault();
        $(this).addClass('active').siblings().removeClass("active");
    });
    var $intro = $("#introduce");

    var cnt=0;
    var word_list=[
        "I'm not a rookie to it",
        "But not yet awesome anyway",
        "Now I'm looking for the job",
        "which is worth something I have to do",
        ];
    $(".jumbotron").on("click", function(){
        event.preventDefault();
        closeCurtain();
    });
    function closeCurtain(){
        $(".jumbotron").fadeOut(function(){
            // $(".curtain").removeClass("curtain");
            $("#cont").fadeIn();
        });
    }
    function intro(word){
        var a = word.slice(0,word.indexOf(" ")),
            b = word.slice(word.indexOf(" "));
        $intro.html(a + "<small></small>").delay(800).fadeIn(
            function(){
                $intro.children("small").text(b).delay(1200).fadeIn(
                    function(){
                        $intro.delay(2000).fadeOut(
                            function(){
                                cnt +=1;
                                if(cnt==word_list.length){
                                    closeCurtain();
                                }else{
                                    return  intro(word_list[cnt]);
                                }
                            }
                        );
                    }
                ); 
            }
        );
    }
    function make_arrow_box(e){
        var arrow_left = '<span class="glyphicon glyphicon-triangle-right t_arrow t_arrow-left"></span>';
        var arrow_right = '<span class="t_arrow_box"></span>';
        var arrow_box = '<span class="glyphicon glyphicon-triangle-left t_arrow t_arrow-right"></span>';
        $(e).html(arrow_left + arrow_box + arrow_right);
        var $li = $(".t_nav_li");
        var a = parseInt($li.css("padding").split("px")[0]);
        var b = parseInt($li.css("font-size").split("px")[0]);
        var height = a*2 + b;
        $(".t_arrow_box").css("height", height);
        $(".t_arrow").css("top",a);

        
    }
    function shift_arrow(e){
        var n = $(e).parent().index();
        var offset = $(".t_nav_li").css('height');
        $(".t_arrow_wrapper").animate({
            'margin-top': offset.split("px")[0]*n + "px",
        },"fast");
    }
    $(".t_nav_a").on("click", function(){
        event.preventDefault();
        $(this).parent().addClass("active").siblings().removeClass("active");
        shift_arrow(this);
        var txt = $(this).text();
        $(".page-header h1").html(txt.slice(4) + " <small>" + txt.slice(0,4) + "</small>");
        var $p = $(".detail p").eq($(this).parent().index());
        $p.addClass("active").siblings().removeClass("active");

    });
    make_arrow_box(".t_arrow_wrapper");

    function fadeOutIn(e){
        var interval = 1600;
        $(e).fadeOut(interval*0.5).fadeIn(interval);
        setTimeout(function(){
            fadeOutIn(e);
        }, interval*2.5);
    }
    window.onload=function(){
        fadeOutIn(".active .t_nav_a");
        $('.jumbotron').css('height','200px').css('margin-top', '200px').fadeIn(1000);
        intro(word_list[cnt]);

    };
        
});