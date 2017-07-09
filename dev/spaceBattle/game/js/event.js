/**
 * Created by pahlavaubivca on 25.06.2017.
 */
define(function(){
    var init = function(mh){
        window.addEventListener("keydown",function (ev) {
            // 1 - true, 2 - false
            if(ev.keyCode === 65){
                mh.mLeft = 1;
            }
            if(ev.keyCode === 68){
                mh.mLeft = 0;
            }
            if(ev.keyCode === 87){
                mh.mTop = 1;
            }
            if(ev.keyCode === 83){
                mh.mTop = 0;
            }
            /*if(ev.keyCode === 65){
                mh.mLeft = true;
            }
            if(ev.keyCode === 68){
                mh.mRight = true;
            }
            if(ev.keyCode === 87){
                mh.mTop = true;
            }
            if(ev.keyCode === 83){
                mh.mBottom = true;
            }*/
        });
        window.addEventListener("keyup",function(ev){
            if(ev.keyCode === 65 || ev.keyCode === 68){
                mh.mLeft = null;
            }
            /*if(ev.keyCode === 68){
                mh.mRight = false;
            }*/
            if(ev.keyCode === 87 || ev.keyCode === 83){
                mh.mTop = null;
            }
           /* if(ev.keyCode === 83){
                mh.mBottom = false;
            }*/
        });
    };
    return {
        init:init
    };
});