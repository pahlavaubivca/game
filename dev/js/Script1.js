window.onload = function () {
    var recl = document.getElementById("ph_id");
    recl.style.zIndex = "111";
    recl.style.paddingTop = "5px";
    recl.style.position = "relative";
	//recl.style.width = "970px";

    var smallPanel = document.createElement("div");
    smallPanel.id = "smallPanel";
    smallPanel.style.width = "80px";
    smallPanel.style.height = "25px";
    smallPanel.style.backgroundColor = "yellow";
    smallPanel.style.position = "absolute";
    smallPanel.style.right = "5px";
    smallPanel.style.top = "5px";
    smallPanel.style.cursor = "pointer";
    recl.appendChild(smallPanel);
   
    var textRecl = document.createElement("p");
    var text = document.createTextNode("EXPAND");
    textRecl.style.textAlign = "center";
    textRecl.style.verticalAlign = "center";
    textRecl.style.fontFamily = "sans-serif";
    textRecl.style.margin = "4px";
    textRecl.appendChild(text);
    smallPanel.appendChild(textRecl);

    var bigPannel = document.createElement("div");
    bigPannel.id = "idBigPannel";
    bigPannel.style.display = "none";
    bigPannel.style.width = "970px";
    bigPannel.style.height = "250px";
    bigPannel.style.zIndex = "221";
    bigPannel.style.backgroundSize = " 100% 250px";
    bigPannel.style.backgroundRepeat = "no-repeat";
    
    var intWidthBPE = bigPannel.style.width.slice(0, -2);
    bigPannel.style.left = "50%";
    bigPannel.style.marginLeft = ((intWidthBPE / 2) * -1) + "px";

    bigPannel.style.position = "absolute";
    bigPannel.style.backgroundImage = "url(http://localhost/js/carBigPannel.jpg)";
    recl.appendChild(bigPannel);

    var closeButt = document.createElement("div");
    closeButt.id = "close";
    closeButt.style.width = "25px";
    closeButt.style.height = "25px";
    closeButt.style.backgroundColor = "red";
    closeButt.style.position = "absolute";
    closeButt.style.left = "50%";
    closeButt.style.display = "none";
    closeButt.style.marginLeft = (intWidthBPE / 2)-25 + "px";
    closeButt.style.cursor = "pointer";
    closeButt.style.zIndex = "2222222222";
    recl.appendChild(closeButt);

    var smallPanel = document.getElementById("smallPanel");
    var bigPannelExp = document.getElementById('idBigPannel');
    var close = document.getElementById("close");
    
    function collapse()
    {
        bigPannelExp.style.display = "none";
        close.style.display = "none";
        recl.style.height = "0px";
        smallPanel.style.display = "block";
    }
    function expand()
    {
        bigPannelExp.style.display = "block";
        close.style.display = "block";
        smallPanel.style.display = "none";
        recl.style.height = "250px";
    }

    bigPannelExp.onclick=function()
    {
        window.open("http://google.com", "_blank");
        collapse();
        
    }
    smallPanel.onclick = function()
    {
        expand();
    }
    close.onclick = function closee()
    {
        collapse();
    }
    
}

