document.addEventListener("DOMContentLoaded", function() {
        const canvas = document.querySelector("canvas"),
        toolbtns = document.querySelectorAll(".tool"),
        sizeslider = document.querySelector("#size-slider"),
        coloroption = document.getElementById('#stroke'),
        clearcanvas=document.querySelector("#clear"),
        saveimg=document.querySelector("#save"),
        
        ctx = canvas.getContext("2d");
        let prevmouseX,prevmouseY, snapshot,
        isdrawing = false;
        selectedtool="brush";
        brushwidth=5;
        selectedcolor= "#000" ;
        const setcanvas = () =>
        {
            ctx.fillStyle ="#fff";
            ctx.fillRect(0,0,canvas.width,canvas.height);
            ctx.fillstyle = selectedcolor;
        }
       
        window.addEventListener("load",()=>
        {
            canvas.width=canvas.offsetWidth;
            canvas.height=canvas.offsetHeight;
            setcanvas();
        });
        
        const start = (e) =>
        {
            isdrawing = true;
            prevmouseX=e.offsetX;
            prevmouseY=e.offsetY;
            ctx.beginPath();
            ctx.lineWidth=brushwidth;
            ctx.strokeStyle=selectedcolor;
            ctx.fillStyle=selectedcolor;
            snapshot = ctx.getImageData(0,0,canvas.width,canvas.height);
        }

        const drawing = (e) => {
            if(!isdrawing) 
            {
                return;
            }
            ctx.putImageData(snapshot,0,0);
            if(selectedtool === "brush" || selectedtool==="eraser")
            {
                ctx.strokeStyle = selectedtool === "eraser" ? "#fff" : selectedcolor;
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
            }
        }
        toolbtns.forEach(btn => 
        {
            btn.addEventListener("click",() => 
        {
            document.querySelector(".options .active").classList.remove("active");
            btn.classList.add("active");
            selectedtool=btn.id;
            console.log(btn.id);
        });
        });
        sizeslider.addEventListener("change",() => brushwidth = sizeslider.value);
        document.getElementById('stroke').addEventListener('change',function(){
                selectedcolor= ctx.strokeStyle=document.getElementById('stroke').value;
            
            

        });
        clearcanvas.addEventListener("click",()=>
    {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        setcanvas();
    });
    saveimg.addEventListener("click", () =>
{
    const link =document.createElement("a");
    link.download = `${Date.now()}.jpg`;
    link.href = canvas.toDataURL();
    link.click();

});

        canvas.addEventListener("mousemove", drawing);
        canvas.addEventListener("mousedown", start);
        canvas.addEventListener("mouseup", () => isdrawing = false);
});