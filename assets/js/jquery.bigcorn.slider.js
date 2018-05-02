---
---
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
                prevButton: null,
                nextButton: null,
                totalImageCount: null,
                isAnimationRunning: false,
                holdOnMouseHover: null,
                init(config){
                    var self = banner;
                    if ($this.length == 0) return;
                    self.id = $this.attr('id');
                    self.imageSlot = $this.find(config.imageSlot.selector || ".img-slot");
                    self.buttonSlot = $this.find(config.buttonSlot.selector || ".btn-slot");
                    self.prevButton = $this.find(config.prevBtnSelector || ".btn-prev");
                    self.nextButton = $this.find(config.nextBtnSelector || ".btn-next");
                    self.direction = config.direction ? config.direction : "left";
                    self.speed = config.speed ? config.speed : "normal";
                    self.btnActiveClass = config.buttonSlot.btnActiveClass ? config.buttonSlot.btnActiveClass : "active";
                    self.btnCommonClass = config.buttonSlot.btnCommonClass ? config.buttonSlot.btnCommonClass : null;
                    self.stay = config.stay ? config.stay : 3000;
                    self.images = config.imageSlot.images || [];
                    self.totalImageCount = self.images.length + self.imageSlot.children().length;
                    self.showButtonNum = config.buttonSlot.showNum ? config.buttonSlot.showNum : false;
                    self.holdOnMouseHover = config.holdOnMouseHover ? config.holdOnMouseHover : false;
                    self._handleImageSlotContent();

                    switch (self.direction){
                        case "right":
                            self._initOnDirectionRight();
                            self._initImageSlotWidth();
                            self._registerAnimate(self._doAnimateRight);
                            break;
                        case "top":
                            self._initOnDirectionTop();
                            self._initImageSlotHeight();
                            self._registerAnimate(self._doAnimateTop);
                            break;
                        case "bottom":
                            self._initOnDirectionBottom();
                            self._initImageSlotHeight();
                            self._registerAnimate(self._doAnimateBottom);
                            break;
                        default:
                            self._initOnDirectionLeft();
                            self._initImageSlotWidth();
                            self._registerAnimate(self._doAnimateDefault);
                            break;
                    }
                },
                _initOnDirectionLeft(){
                    var self = banner;
                    self.imageSlot.css("left", - self.imageSlot.width())
                    ;
                },
                _initOnDirectionRight(){
                    var self = banner;
                    self.imageSlot.css("right", - self.imageSlot.width())
                        .children('a').css("float", "right")
                    ;
                },
                _initOnDirectionBottom(){
                    var self = banner;
                    self.imageSlot.css("bottom", - self.imageSlot.height())
                    ;
                },
                _initOnDirectionTop(){
                    var self = banner;
                    self.imageSlot.css("top", - self.imageSlot.height())
                    ;
                },
                _handleImageSlotContent(){
                    var self = banner,
                        $imageSlot = self.imageSlot,
                        $buttonSlot = self.buttonSlot
                    ;
                    if(self.direction == "bottom"){
                        self.images.forEach((i) => {
                            $imageSlot.prepend(
                                "<a href='javascript:;'><img src='" + i + "'></a>")
                        })
                    }else{
                        self.images.forEach((i) => {
                            $imageSlot.append(
                                "<a href='javascript:;'><img src='" + i + "'></a>")
                        })
                    }

                    /*
                        extra images for smooth transition;
                        [img_n, img_0, img_1, img_2, ...img_n, img_0]
                    */
                    var $children = $imageSlot.children("a");
                    $imageSlot
                        .append($children.eq(0).clone())
                        .prepend($children.eq(-1).clone())

                    //create buttons
                    for (var i = 0; i < self.totalImageCount; i++) {
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
                    if (self.holdOnMouseHover){
                        $imageSlot.hover(
                            self.stop,
                            function(){self.play(theAnimate);}
                        );
                    }

                    $(window)
                        .on("blur", function(){
                            self.stop();
                        })
                        .on("focus", function(){
                            self.play(theAnimate);
                        })
                    ;
                    if (self.prevButton && self.nextButton){
                        self.prevButton.on("click", function(){
                            if (self.isAnimationRunning) return;
                            self.curIndex --;
                            theAnimate();
                            self.stop();
                            self.play(theAnimate);
                        })
                        self.nextButton.on("click", function(){
                            if (self.isAnimationRunning) return;
                            self.curIndex ++;
                            theAnimate();
                            self.stop();
                            self.play(theAnimate);
                        })
                    }
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
                        curIndex = self.curIndex
                    ;
                    function _handleConfig(config){
                        for (let key in config){
                            let value = config[key];
                            if (typeof value == "function"){
                                value = value($imageSlot, curIndex);
                            }
                            config[key] = value;
                        }
                        return config;
                    }
                    self.isAnimationRunning = true;
                    $imageSlot.animate(
                        _handleConfig(config), 
                        self.speed, 
                        function(){
                            self.isAnimationRunning = false;
                            callback($imageSlot, curIndex);
                        }
                    )
                },
                _doAnimateDefault(){
                    var self = banner;
                    self._doAnimate({
                        left: function($imageSlot, curIndex){
                            // `curIndex + 1` considered the first extra image on the left
                            return -($imageSlot.children().width() * (curIndex + 1)) + "px";
                        }
                    }, function($imageSlot, curIndex){
                        if (curIndex >= self.totalImageCount){
                            self.curIndex = 0;
                            $imageSlot.css("left", - $imageSlot.children().width());
                        }else if(curIndex < 0){
                            self.curIndex = self.totalImageCount -1;
                            $imageSlot.css("left", - $imageSlot.children().width() * self.totalImageCount);
                        }
                        self.changeButton();
                    })
                },
                _doAnimateRight(){
                    var self = banner;
                    self._doAnimate({
                        right: function($imageSlot, curIndex){
                            // `curIndex + 1` considered the first extra image on the right
                            return -($imageSlot.children().width() * (curIndex + 1)) + "px";
                        }
                    }, function($imageSlot, curIndex){
                        if (curIndex >= self.totalImageCount){
                            self.curIndex = 0;
                            $imageSlot.css("right", - $imageSlot.children().width());
                        }else if(curIndex < 0){
                            self.curIndex = self.totalImageCount -1;
                            $imageSlot.css("right", - $imageSlot.children().width() * self.totalImageCount);
                        }
                        self.changeButton();
                    })
                },
                _doAnimateTop(){
                    var self = banner;
                    self._doAnimate({
                        top: function($imageSlot, curIndex){
                            return -($imageSlot.children().height() * (curIndex + 1)) + "px";
                        }
                    }, function($imageSlot, curIndex){
                        if (curIndex >= self.totalImageCount){
                            self.curIndex = 0;
                            $imageSlot.css("top", - $imageSlot.children().height());
                        }else if(curIndex < 0){
                            self.curIndex = self.totalImageCount -1;
                            $imageSlot.css("top", - $imageSlot.children().height() * self.totalImageCount);
                        }
                        self.changeButton();
                    })
                },
                _doAnimateBottom(){
                    var self = banner;
                    self._doAnimate({
                        bottom: function($imageSlot, curIndex){
                            return -($imageSlot.children().height() * (curIndex + 1)) + "px";
                        }
                    }, function($imageSlot, curIndex){
                        if (curIndex >= self.totalImageCount){
                            self.curIndex = 0;
                            $imageSlot.css("bottom", - $imageSlot.children().height());
                        }else if(curIndex < 0){
                            self.curIndex = self.totalImageCount -1;
                            $imageSlot.css("bottom", - $imageSlot.children().height() * self.totalImageCount);
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