(function ($) {
    var banner = {
        imageSlot: null,
        buttonSlot: null,
        interval: null,
        curIndex: 0,
        direction: null,
        speed: null,
        hasplay: false,
        btnActiveClass: null,
        stay: null,
        init(config){
            var self = banner;
            self.imageSlot = $(config.imageSlot.selector || ".img-slot");
            self.buttonSlot = $(config.buttonSlot.selector || ".btn-slot");
            self.direction = config.direction ? config.direction : "h";
            self.speed = config.speed ? config.speed : "normal";
            self.btnActiveClass = config.buttonSlot.btnActiveClass ? config.buttonSlot.btnActiveClass : "active";
            self.stay = config.stay ? config.stay : 3000;
            $imageSlot = self.imageSlot;
            $buttonSlot = self.buttonSlot;

            config.imageSlot.images.forEach((i) => {
                $imageSlot.append(
                    "<a href='javascript:;'><img src='" + i + "'></a>")
            }) 
            var imgs = $imageSlot.children("a");
            console.log(imgs.length)
            //create buttons
            for (var i = 0; i < imgs.length; i++) {
                $buttonSlot.append("<a href='javascript:;'>" + (i + 1) + "</a>");
            }
            var btns = $buttonSlot.children();
            btns.eq(0).addClass(self.btnActiveClass);
            //extra image for smooth transition;
            $imageSlot.append(imgs.eq(0).clone());
            imgs = $imageSlot.children("a");//update
            //init
            var doAnimateX = self.doAnimateX,
                doAnimateY = self.doAnimateY
            ;
            switch (self.direction){
                case "h":
                    $imageSlot.css("width", $imageSlot.width()*imgs.length);// init $imageSlot's width
                    self._onClickBtn(doAnimateX)
                    $imageSlot.hover(
                        self.stop,
                        function(){self.play(doAnimateX);}
                    );
                    self.play(doAnimateX);
                    break;
                case "v":
                    self._onClickBtn(doAnimateY)
                    $imageSlot.hover(
                        self.stop,
                        function(){self.play(doAnimateY);}
                    );
                    self.play(doAnimateY);
                    break;
            }
            
        },
        _onClickBtn(callback){
            var self = banner;
            var btns = self.buttonSlot.children();
            btns.on("click",function(){
                self.curIndex = $(this).index();
                callback();
                self.stop();
                self.play(callback)
            });
        },
        play(fn){
            var self = banner;
            if (self.hasplay) return;
            self.interval = setInterval(function(){
                self.curIndex += 1;
                fn();
            }, self.stay);
            self.hasplay = true;
        },
        stop(){
            var self = banner;
            clearInterval(self.interval);
            self.hasplay = false;
        },
        _doAnimate(config, callback){
            var self = banner,
                $imageSlot = banner.imageSlot,
                imageCount = $imageSlot.children().length,
                curIndex = self.curIndex
            ;
            function _handleConfig(config){
                for (key in config){
                    let value = config[key];
                    if (typeof value == "function"){
                        value = value($imageSlot, curIndex);
                    }
                    config[key] = value;
                }
                return config;
            }
            $imageSlot.animate(
                _handleConfig(config), 
                self.speed, 
                function(){
                    callback($imageSlot, curIndex);
                }
            )

        },
        doAnimateX(){
            //水平移动
            var self = banner;
            self._doAnimate({
                left: function($imageSlot, curIndex){
                    return -($imageSlot.width() / $imageSlot.children().length * curIndex) + "px";
                }
            }, function($imageSlot, curIndex){
                if (curIndex == $imageSlot.children().length -1){
                    self.curIndex = 0;
                    $imageSlot.css("left", 0);
                }
                self.changeButton();
            })
        },
        doAnimateY(){
            //垂直
            var self = banner;
            self._doAnimate({
                top: function($imageSlot, curIndex){
                    return -$imageSlot.height() * curIndex + "px";
                }
            }, function($imageSlot, curIndex){
                if (curIndex == $imageSlot.children().length - 1){
                    self.curIndex = 0;
                    $imageSlot.css("top",0);
                }
                self.changeButton();
            })
        },
        changeButton(){
            var self = banner;
            self.buttonSlot.children().eq(self.curIndex)
                .addClass(self.btnActiveClass)
                .siblings()
                .removeClass(self.btnActiveClass);
        }

        
    }
    
    $.fn.BigCornSlider = banner.init;

})(jQuery);

