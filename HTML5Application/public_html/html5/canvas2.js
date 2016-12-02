/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var canvas, ctx, flag = false,
        pX = 0,
        cX = 0,
        pY = 0,
        cY = 0,
        dot_flag = false;

    var x = "black",
        y = 2;
    
    function canv() {
        canvas = document.getElementById('can');
        ctx = canvas.getContext("2d");
        w = canvas.width;
        h = canvas.height;
    
        canvas.addEventListener("mousemove", function (e) {
            findxy('move', e);
        }, false);
        canvas.addEventListener("mousedown", function (e) {
            findxy('down', e);
        }, false);
        canvas.addEventListener("mouseup", function (e) {
            findxy('up', e);
        }, false);
        canvas.addEventListener("mouseout", function (e) {
            findxy('out', e);
        }, false);
    }
    function draw() {
        ctx.beginPath();
        ctx.moveTo(pX, pY);
        ctx.lineTo(cX, cY);
        ctx.strokeStyle = x;
        ctx.lineWidth = y;
        ctx.stroke();
        ctx.closePath();
    }
    
    function erase() {
        var m = confirm("Want to clear");
        if (m) {
            ctx.clearRect(0, 0, w, h);
          
        }
    }
    
    
    function findxy(res, e) {
        if (res === 'down') {
            pX = cX;
            pY = cY;
            cX = e.clientX - canvas.offsetLeft;
            cY = e.clientY - canvas.offsetTop;
    
            flag = true;
            dot_flag = true;
            if (dot_flag) {
                ctx.beginPath();
                ctx.fillStyle = x;
                ctx.fillRect(cX, cY, 2, 2);
                ctx.closePath();
                dot_flag = false;
            }
        }
        if (res === 'up' || res === "out") {
            flag = false;
        }
        if (res === 'move') {
            if (flag) {
                pX = cX;
                pY = cY;
                cX = e.clientX - canvas.offsetLeft;
                cY = e.clientY - canvas.offsetTop;
                draw();
            }
        }
    }
   


