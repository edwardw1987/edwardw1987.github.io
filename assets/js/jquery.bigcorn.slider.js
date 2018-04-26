(function ($) {
    function BigCornSlider(config){
        var $this = this,
            banner = {
                imageSlot: null,
                buttonSlot: null,
                interval: null,
                curIndex: 0,
                direction: null,
                speed: null,
                hasplay: false,
                btnCommonClass: null,
                btnActiveClass: null,
                stay: null,
                id: null,
                showButtonNum: null,
                init(config){
                    var self = banner;
                    if ($this.length == 0) return;
                    self.id = $this.attr('id');
                    self.imageSlot = $this.find(config.imageSlot.selector || ".img-slot");
                    self.buttonSlot = $this.find(config.buttonSlot.selector || ".btn-slot");
                    self.direction = config.direction ? config.direction : "left";
                    self.speed = config.speed ? config.speed : "normal";
                    self.btnActiveClass = config.buttonSlot.btnActiveClass ? config.buttonSlot.btnActiveClass : "active";
                    self.btnCommonClass = config.buttonSlot.btnCommonClass ? config.buttonSlot.btnCommonClass : null;
                    self.stay = config.stay ? config.stay : 3000;
                    self.images = config.imageSlot.images || [];
                    self.showButtonNum = config.buttonSlot.showNum ? config.buttonSlot.showNum : false;

                    self._handleImageSlotContent();

                    switch (self.direction){
                        case "right":
                            self._initOnDirectionRight();
                            self._initImageSlotWidth();
                            self._registerAnimate(self._doAnimateRight);
                            break;
                        case "top":
                            self._initImageSlotHeight();
                            self._registerAnimate(self._doAnimateTop);
                            break;
                        case "bottom":
                            self._initOnDirectionBottom();
                            self._initImageSlotHeight();
                            self._registerAnimate(self._doAnimateBottom);
                            break;
                        default:
                            self._initImageSlotWidth();
                            self._registerAnimate(self._doAnimateDefault);
                            break;
                    }
                },
                _initOnDirectionRight(){
                    var self = banner;
                    self.imageSlot.css("right", 0)
                        .children('a').css("float", "right")
                    ;
                },
                _initOnDirectionBottom(){
                    var self = banner;
                    self.imageSlot.css("bottom", 0)

                    ;
                },
                _handleImageSlotContent(){
                    var self = banner,
                        $imageSlot = self.imageSlot,
                        $buttonSlot = self.buttonSlot;
                    if (self.direction == "bottom"){
                        for (var i = self.images.length - 1;i >= 0;i--){
                            $imageSlot.append(
                                "<a href='javascript:;'><img src='" + self.images[i] + "'></a>")
                        }
                        //extra image for smooth transition;
                        $imageSlot.prepend($imageSlot.children("a").eq(-1).clone());
                    }else{
                        self.images.forEach((i) => {
                            $imageSlot.append(
                                "<a href='javascript:;'><img src='" + i + "'></a>")
                        })                         
                        //extra image for smooth transition;
                        $imageSlot.append($imageSlot.children("a").eq(0).clone());
                    }
                    //create buttons
                    for (var i = 0; i < self.images.length; i++) {
                        $buttonSlot.append("<a href='javascript:;'>" + (self.showButtonNum === true? (i + 1) : '') + "</a>");
                    }
                    var btns = $buttonSlot.children();
                    if (self.btnCommonClass !== null){
                        btns.addClass(self.btnCommonClass);
                    }
                    btns.eq(0).addClass(self.btnActiveClass);

                },
                _initImageSlotHeight(direction){
                    var self = banner,
                        $imageSlot = self.imageSlot,
                        orgHeight = $imageSlot.height(),
                        imgs = $imageSlot.children("a").css("height", orgHeight)
                    ;
                    $imageSlot.css("height", orgHeight * imgs.length);
                },
                _initImageSlotWidth(direction){
                    /* init image (slot) width when direction is `left` or `right` */
                    var self = banner,
                        $imageSlot = self.imageSlot,
                        orgWidth = $imageSlot.width(),
                        imgs = $imageSlot.children("a").css("width", orgWidth)
                    ;
                    $imageSlot.css("width", orgWidth * imgs.length);
                },
                _registerAnimate(theAnimate){
                    var self = banner,
                        $imageSlot = self.imageSlot
                    ;

                    self._onClickBtn(theAnimate);

                    $imageSlot.hover(
                        self.stop,
                        function(){self.play(theAnimate);}
                    );

                    $(window)
                        .on("blur", function(){
                            self.stop();
                        })
                        .on("focus", function(){
                            self.play(theAnimate);
                        })
                    ;

                    self.play(theAnimate);

                },
                _onClickBtn(callback){
                    var self = banner;
                    var btns = self.buttonSlot.children();
                    btns.on("click",function(){
                        console.log(self.id)
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
                _doAnimateDefault(){
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
                _doAnimateRight(){
                    var self = banner;
                    self._doAnimate({
                        right: function($imageSlot, curIndex){
                            return -($imageSlot.width() / $imageSlot.children().length * curIndex) + "px";
                        }
                    }, function($imageSlot, curIndex){
                        if (curIndex == $imageSlot.children().length -1){
                            self.curIndex = 0;
                            $imageSlot.css("right", 0);
                        }
                        self.changeButton();
                    })
                },
                _doAnimateTop(){
                    var self = banner;
                    self._doAnimate({
                        top: function($imageSlot, curIndex){
                            return -($imageSlot.height() / $imageSlot.children().length * curIndex) + "px";
                        }
                    }, function($imageSlot, curIndex){
                        if (curIndex == $imageSlot.children().length - 1){
                            self.curIndex = 0;
                            $imageSlot.css("top",0);
                        }
                        self.changeButton();
                    })
                },
                _doAnimateBottom(){
                    var self = banner;
                    self._doAnimate({
                        bottom: function($imageSlot, curIndex){
                            return -($imageSlot.height() / $imageSlot.children().length * curIndex) + "px";
                        }
                    }, function($imageSlot, curIndex){
                        if (curIndex == $imageSlot.children().length - 1){
                            self.curIndex = 0;
                            $imageSlot.css("bottom",0);
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
        banner.init(config);
    }
    $.fn.BigCornSlider = BigCornSlider;

})(jQuery);

