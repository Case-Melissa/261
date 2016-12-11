var canSign = (function () {

	
        
        

	return {
		
		get: function (){
				var parent = document.getElementById("canvas");
				parent.childNodes[0].nodeValue = "";

				var canvasArea = document.createElement("canvas");
				canvasArea.setAttribute("id", "addSign");
				parent.appendChild(canvasArea);

				var canvas = document.getElementById("addSign");
				var ctx = canvas.getContext("2d");

				if (!ctx) {
					throw new Error("Failed to get canvas' 2d context");
				}

				screenwidth = screen.width;

				if (screenwidth < 480) {
					canvas.width = screenwidth - 8;
					canvas.height = (screenwidth * 0.63);
				} else {
					canvas.width = 460;
					canvas.height = 220;
				}

				ctx.fillStyle = "#fff";
				ctx.strokeStyle = "#006699";
				ctx.lineWidth = 1;
				ctx.lineCap = "round";

				ctx.fillRect(0, 0, canvas.width, canvas.height);

				ctx.fillStyle = "#3a87ad";
				ctx.strokeStyle = "#3a87ad";
				ctx.lineWidth = 1;
				ctx.stroke();

				ctx.fillStyle = "#fff";
				ctx.strokeStyle = "#006699";
				
				var disableSave = true;
				var pixels = [];
				var xyLast = {};
				var xyAddLast = {};
				var calculate = false;
				//functions
				{
					function remove_event_listeners() {
						canvas.removeEventListener('mousemove', on_mmove, false);
						canvas.removeEventListener('mouseup', on_mup, false);
						canvas.removeEventListener('touchmove', on_mmove, false);
						canvas.removeEventListener('touchend', on_mup, false);

						document.body.removeEventListener('mouseup', on_mup, false);
						document.body.removeEventListener('touchend', on_mup, false);
					}

					function get_coords(e) {
						var x, y;

						if (e.touches && e.touches[0]) {
							var offsety = canvas.offsetTop || 0;
							var offsetx = canvas.offsetLeft || 0;

							x = e.touches[0].pageX - offsetx;
							y = e.touches[0].pageY - offsety;
						} else if (e.layerX || 0 === e.layerX) {
							x = e.layerX;
							y = e.layerY;
						} else if (e.offsetX || 0 === e.offsetX) {
							x = e.offsetX;
							y = e.offsetY;
						}

						return {
							x : x,
							y : y
						};
					};

					function on_mdown(e) {
						e.preventDefault();
						e.stopPropagation();

						canvas.addEventListener('mousemove', on_mmove, false);
						canvas.addEventListener('mouseup', on_mup, false);
						canvas.addEventListener('touchmove', on_mmove, false);
						canvas.addEventListener('touchend', on_mup, false);

						document.body.addEventListener('mouseup', on_mup, false);
						document.body.addEventListener('touchend', on_mup, false);

						
						var xy = get_coords(e);
						ctx.beginPath();
						pixels.push('moveStart');
						ctx.moveTo(xy.x, xy.y);
						pixels.push(xy.x, xy.y);
						xyLast = xy;
					};

					function on_mmove(e) {
						e.preventDefault();
						e.stopPropagation();

						var xy = get_coords(e);
						var xyAdd = {
							x : (xyLast.x + xy.x) / 2,
							y : (xyLast.y + xy.y) / 2
						};

						if (calculate) {
							var xLast = (xyAddLast.x + xyLast.x + xyAdd.x) / 3;
							var yLast = (xyAddLast.y + xyLast.y + xyAdd.y) / 3;
							pixels.push(xLast, yLast);
						} else {
							calculate = true;
						}

						ctx.quadraticCurveTo(xyLast.x, xyLast.y, xyAdd.x, xyAdd.y);
						pixels.push(xyAdd.x, xyAdd.y);
						ctx.stroke();
						ctx.beginPath();
						ctx.moveTo(xyAdd.x, xyAdd.y);
						xyAddLast = xyAdd;
						xyLast = xy;

					};

					function on_mup(e) {
						remove_event_listeners();
						ctx.stroke();
						pixels.push('e');
						calculate = false;
					};

				}

				canvas.addEventListener('mousedown', on_mdown, false);
				canvas.addEventListener('touchstart', on_mdown, false);

		}
		,
		image : function(){

				var canvas = document.getElementById("addSign");
				var dataURL = canvas.toDataURL("image/png");
				document.getElementById("saved").src = dataURL;

		}
		,
		delete : function(){

				var parent = document.getElementById("canvas");
				var child = document.getElementById("addSign");
				parent.removeChild(child);
				this.get();

		}
		
		

	}

})()

var canSign;