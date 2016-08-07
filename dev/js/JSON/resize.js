window.onload = function()
{
	var obj = document.getElementById("obj");
	var butt = document.getElementById("button");
	butt.onclick = function()
	{
		var i=obj.style.width.slice(0,3);
			function a(){
			i--;
			obj.style.width = i+"px";
			if(i<10)
				{
					clearInterval(a);
				}
			}
			var a = setInterval(a,0.3);
	}
}