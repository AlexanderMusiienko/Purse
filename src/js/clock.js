var tday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
var tmonth=new Array("January","February","March","April","May","June","July","August","September","October","November","December");

function GetClock(){
var d=new Date();
var nday=d.getDay(),nmonth=d.getMonth(),ndate=d.getDate();
var d=new Date();
var nhour=d.getHours(),nmin=d.getMinutes();
if(nmin<=9) nmin="0"+nmin

document.getElementById('clockbox').innerHTML=""+tday[nday]+", "+tmonth[nmonth]+" "+ndate+" "+nhour+":"+nmin+"";
}

window.onload=function(){
GetClock();
setInterval(GetClock,1000);
}
