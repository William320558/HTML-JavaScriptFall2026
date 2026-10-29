const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


ctx.strokeStyle = "pink";
        ctx.lineWidth = 5.0;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(canvas.width/2 + 15, 275);
        ctx.lineTo(canvas.width/2 + 15, 325);
        ctx.lineTo(canvas.width/2 - 15, 325);
        ctx.lineTo(canvas.width/2 - 15, 275);
        ctx.lineTo(canvas.width/2 + 15, 275);
        ctx.stroke();

// ctx.fillStyle = "yellow";
// ctx.lineWidth = 5.0;
// ctx.fillRect(750, canvas.height/2 - -250, 50, 50);
// ctx.strokeRect(85,302, 100,100);