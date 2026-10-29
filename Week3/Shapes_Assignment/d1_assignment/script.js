const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Yellow box
ctx.strokeStyle = "black";
        ctx.lineWidth = 5.0;
        ctx.beginPath(canvas.width/2 + -315, 300);
        ctx.moveTo(canvas.width/2 + -315, 300);
        ctx.lineTo(canvas.width/2 + -315, 300);
        ctx.lineTo(canvas.width/2 + -215, 300);
        ctx.lineTo(canvas.width/2 - 215, 403);
        ctx.lineTo(canvas.width/2 - 315, 403);
        ctx.lineTo(canvas.width/2 + -315, 300);
        ctx.stroke();

        ctx.fillStyle = "yellow"
ctx.fillRect(canvas.width/3 - 82, canvas.height/3 - -136, -99, -101)



// Red line
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5.0;
        ctx.beginPath(canvas.width/2 + -315, 685);
        ctx.moveTo (canvas.width/2 + -315, 685);
        ctx.lineTo(canvas.width/2 + -315, 685);
        ctx.lineTo(canvas.width/2 + -118, 550);
ctx.stroke();

//Yellow circle
ctx.beginPath();
        ctx.arc(390, 440, 70, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();


// "magenta" pentagon
ctx.strokeStyle = "cyan";
        ctx.lineWidth = 5.0;
        ctx.beginPath(canvas.width/2 + 160, 310);
        ctx.lineTo(canvas.width/2 + 160, 310);
        ctx.lineTo(canvas.width/2 + 270, 285);
        ctx.lineTo(canvas.width/2 + 325, 385);
        ctx.lineTo(canvas.width/2 + 250, 465);
        ctx.lineTo(canvas.width/2 - -148, 421);
        ctx.lineTo(canvas.width/2 + 160, 310);
ctx.stroke();

ctx.fillStyle = "magenta"
ctx.lineTo(160, 310)
ctx.lineTo(-148, 421);
ctx.lineTo(160, 310);
ctx.closePath();
ctx.fill();
// ctx.fillRect(canvas.width/2 + 290, canvas.height/3 - -170, -100, -130, 90, 90)


ctx.strokeStyle = "red";
ctx.lineWidth = 5.0;
ctx.beginPath(canvas.width/2 + 160, 300);
ctx.moveTo(canvas.width/2 + 235, 495);
ctx.lineTo(canvas.width/2 + 270, 555);
ctx.lineTo(canvas.width/2 + 335, 565);
ctx.lineTo(canvas.width/2 + 285, 625);
ctx.lineTo(canvas.width/2 + 295, 680);
ctx.lineTo(canvas.width/2 + 235, 652);
ctx.lineTo(canvas.width/2 + 175, 680);
ctx.lineTo(canvas.width/2 + 187, 615);
ctx.lineTo(canvas.width/2 + 140, 565);
ctx.lineTo(canvas.width/2 + 205, 555);
ctx.lineTo(canvas.width/2 + 235, 495);
ctx.stroke();

ctx.fillStyle = "black"
// ctx.lineTo(160, 300)
ctx.lineTo(235, 495);
ctx.lineTo(270, 555);

ctx.lineTo(235, 495);
ctx.closePath();
ctx.fill();