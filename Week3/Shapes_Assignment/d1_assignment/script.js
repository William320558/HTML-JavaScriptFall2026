const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d")


ctx.strokeStyle = "black";
ctx.fillStyle = "yellow"
ctx.fillRect(canvas.width/3 - 80, canvas.height/3 - -135, -100, -100)
        ctx.lineWidth = 5.0;
        ctx.beginPath();
        ctx.moveTo (-315, 300);
        ctx.lineTo(canvas.width/2 + -315, 300);
        ctx.lineTo(canvas.width/2 + -215, 300);
        ctx.lineTo(canvas.width/2 - 215, 403);
        ctx.lineTo(canvas.width/2 - 315, 403);
        ctx.lineTo(canvas.width/2 + -315, 300);
        ctx.stroke();
      

