status="";
video="";
objects=[];

function preload(){
}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(480,380);
}

function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting object";
    object_name=document.getElementById("object_name").value;
}
 
function modelLoaded(){
    console.log("model");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function draw(){
    image(video,0,0,480,380);

    if(status!=""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status : Objects detected";
            fill("#fcb603");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("#fcb603");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label==object_name){
                document.getElementById("status").innerHTML=object_name+"FOUND";
                synth=window.speechSynthesis;
                utterthis=new SpeechSynthesisUtterance(object_name+"FOUND");
                synth.speak(utterthis);
            }

            else{
                document.getElementById("status").innerHTML=object_name+"not found";
            }
        }

    }
}

function gotResult(error,results){
   if(error){
       console.log(error);
   }
   else{
    console.log(results);
    objects=results;
   }
}