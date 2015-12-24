/*!
 * kkProgressbar 1.0
 * https://github.com/varkv/kkProgressbar.js
 * @license MIT licensed
 *
 * Copyright (C) 2015 A project by Korol Kirill infokorol@gmail.com
 */

(function( $ ) {
  $.fn.kkProgressbar = function(_options){
    var is_active = false;
    var closeTimeout = null;
    
    var options = {
        "textList": [
            "Обрабатываем запрос",
            "Размечаем границы",
            "Ставим маркеры",
            "Ищем карты",
            "Вращаем землю",
            "Запускаем спутник",
            "Кормим единорога",
        ],
        "speed": 15,
        "closeDelay": 1000,
    };
	
    options["$progressbar_container"] = this;
    $.extend(options,_options);
    
    options.$progressbar_container.addClass("kkProgressbar");
    
    var count = 2;
    var selectedTextIndex = -1;
    
    var progressInteral;
    var progressbarObj;
    var progressbarList = [];
	for(var i=0;i<count;i++){
		var tmp = {};        
		var $cont = $("<div/>").addClass("progressbar_item").appendTo(options.$progressbar_container);
		tmp.$progressbar = $("<div/>").addClass("progressbar").appendTo($cont).progressbar({});
        tmp.$progressLabel = $("<div/>").addClass("progress-label").appendTo($cont);
		progressbarList.push(tmp);
	}
    var selectedProgressbarIndex = -1;
    
    var getNextLabelText = function(){
    	if(selectedTextIndex == -1){
            selectedTextIndex = 0;
        }else{
            selectedTextIndex++
        }
        if(selectedTextIndex >= options.textList.length){
            selectedTextIndex = 0;
        }
        return options.textList[selectedTextIndex];            
    }
    var changeProgressBar = function(){    	
		var oldprogressbar = progressbarObj;
        var timeoutSec = options.speed * 100 / 2;
    	progressbarObj = getNextProgressbar(); 
        
        if(typeof oldprogressbar == "undefined" || oldprogressbar == null){
            progressbarObj.$progressLabel.text(getNextLabelText())
            oldprogressbar = getPrevProgressbar();
            oldprogressbar.$progressbar.closest(".progressbar_item").hide();
        }

        var $item = oldprogressbar.$progressbar.closest(".progressbar_item")
        $item.animate({
            margin:"-40px 0 0",
        }, timeoutSec, "swing", function(){
            oldprogressbar.$progressbar.progressbar( "value", 0);                      
            oldprogressbar.$progressLabel.text(getNextLabelText())
            $item.show();
            $item.css({margin:"0",height:0});
            $item.appendTo(options.$progressbar_container).animate({
                height:40,
                margin:"5px 0",
            }, timeoutSec);
        });        
    	progressbarObj.$progressbar.progressbar( "value", 0);         
    }
    var getNextProgressbar = function(){
    	if(selectedProgressbarIndex == -1){
            selectedProgressbarIndex = 0;
        }else{
            selectedProgressbarIndex++
        }
        if(selectedProgressbarIndex >= progressbarList.length){
            selectedProgressbarIndex = 0;
        }
        return progressbarList[selectedProgressbarIndex];            
    }
    var getPrevProgressbar = function(){
        var prevIndex = selectedProgressbarIndex -1 ;
        if(prevIndex < 0 ){
            prevIndex = progressbarList.length-1;
        }
        return progressbarList[prevIndex];            
    }
    
    var runProgress = function(){
    	var val = progressbarObj.$progressbar.progressbar( "value" ) || 0; 
        if(val == 100){
            changeProgressBar();
            val = 0;
        }
      	progressbarObj.$progressbar.progressbar( "value", val + 1 );
    }
    
    var show = function(){
    	options.$progressbar_container.slideDown("fast");
    }
    var hide = function(){
    	options.$progressbar_container.slideUp("fast");
    }
    
    var close = function(){
        hide();
        is_active=false;
        progressbarObj.$progressbar.progressbar( "value", 0);  
        progressbarObj = null;
        selectedProgressbarIndex = -1;                  

        if(typeof progressInteral != "undefined"){
            clearInterval(progressInteral); 
        }           
    }
    
    var enable = function(){
        if(closeTimeout != null){
            clearTimeout(closeTimeout);
        }        
    	if(is_active) return;
        is_active=true;
        changeProgressBar();
        show();
        progressInteral = setInterval(runProgress, options.speed );   
    }    
    var disable = function(){    
    	if(!is_active) return;
        is_active=false;
        closeTimeout = setTimeout(function(){
        	close();
        },options.closeDelay);
    }
    
    return {
    	"enable":enable,
    	"disable":disable,
    }
}
})(jQuery);