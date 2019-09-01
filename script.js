onmousemove = function(e){xMouse = e.pageX;yMouse = e.pageY;}
/*
 * 
 * The example package for LolpOS
 * 
 * 
 */

function simakyrBlueCom(e){
if(e=='.js'){
    if(!processRunned('simakyrBlueCom')){//He don't give access for many windows
addWinToTaskBar('simakyrBlueCom','Blue','icon/blue.png');
createWin('simakyrBlueCom','Blue',true,true,true,'<button>He is run</button>');
changeSizeWindow('simakyrBlueCom',300,500);

    }
}}



/*
 * 
 * 
 * 
 * 
 */
oncontextmenu = function(){
event.preventDefault();
var dropdown = document.getElementsByClassName('forMouse')[0];
dropdown.style = 'left:'+ xMouse +'px;'+'top:'+ yMouse + 'px;';
dropdown.className = 'showTypeDrop forMouse';

onmousedown = function(){
dropdown.className = 'hideTypeDrop forMouse';
}

};

widgetOnTaskbar();

setInterval(widgetOnTaskbar, 30000);

function widgetOnTaskbar(){
time = new Date();
var timeTask = document.getElementById('time');
if(time.getMinutes().toString().length==1){
timeTask.innerText = time.getHours() + ':0' + time.getMinutes();
}else{
timeTask.innerText = time.getHours() + ':' + time.getMinutes();
}}

addWinToTaskBar('tykan','Tykan', 'icon/tykan.png');

winDows('about');
winDows('sandbox');
winDows('tykan');

filE('tykan.js');
filE('file1');
filE('file2');
filE('blue.js');

function processRunned(id){
var win = document.getElementById(id);
return win!=undefined;
}

function changeSizeWindow(id,height,width){
    var win = document.getElementById(id);
    win.style.height = height + 'px';
    win.style.width = width + 'px';
}

function taskbarMenu(){
var taskbarMenu = document.getElementById('taskbarMenu');
if(taskbarMenu.className=='hideType'){
    taskbarMenu.className = 'simpleType';
}else{
    taskbarMenu.className = 'hideType';
}}

function changeNameFile(id){
var input = document.getElementById(id).getElementsByTagName('input')[0];
localStorage['filename' + id] = input.value;
}

function createWin(id, title, fullscreen, hide, close, code){
var para = document.createElement("window");
para.id = id;
para.draggable = true;
var para1 = document.createElement("statusbar");
var para2 = document.createElement("b");
para2.className = "title textsimple";
para2.innerText = title;
var para3;

if(close){
para3 = '<close></close>';
}
if(fullscreen){
para3 = para3 + '<fullscreen></fullscreen>';
}
if(hide){
para3 = para3 + '<hide></hide>';
}

para1.innerHTML = para2.outerHTML + para3
para.innerHTML = para1.outerHTML + code;
document.body.appendChild(para);
winDows(id);
}

function addWinToTaskBar(id,name,urlicon){
var para = document.createElement("open");
if(urlicon!=undefined){
para.innerHTML = '<img src="' + urlicon + '"></img>';
    
}
para.innerHTML = para.innerHTML + name;
para.className = id + ' textsimple';
document.getElementsByTagName('bar')[0].appendChild(para);
document.getElementsByClassName(id)[0].onclick = function(e) {hideWin(id);}
}

function hideWin(id){
    var win = document.getElementById(id);
    if(win.className.replace('hideType','') == win.className){
    if(win.className!=win.className.replace('fullscreenType','')){
win.className='fullscreenType hideType';
}
else{
win.className='hideType';
}}
else{
win.className = win.className.replace('hideType','showType');
setTimeout(function() { win.className=win.className.replace('showType',''); localStorage['status' + id] = win.className;},300);
}
    localStorage['status' + id] = win.className;
}

function fullscreenWin(id){
var win = document.getElementById(id);
if(win.className=='fullscreenType'){
win.className='simpleType';
setTimeout(function() { win.className=''; localStorage['status' + id] = win.className;},300);
}else{
win.className='fullscreenType';
}
localStorage['status' + id] = win.className;
}
function closeWin(id){
    var task = document.getElementsByClassName(id)[0];
    task.className  = task.className + ' closeType';
    var win = document.getElementById(id);
    if(win.className!=win.className.replace('fullscreenType','')){
    win.className = 'fullscreenType closeType';
    }else{
    win.className = 'closeType';
    }
    setTimeout(function() {
    if(document.getElementsByClassName(id)[0]!=undefined){
        document.getElementsByClassName(id)[0].outerText = '';
    } 
    document.getElementById(id).outerText = '';
    }, 1000);

}

function createElementOnDeskop(id,name,iconurl,x,y,fonclick){
var para = document.createElement('file');
para.id = id;
para.draggable = true;
para.style.left = x;
para.style.top = y;
para.onclick = fonclick;
var para2 = document.createElement('img');
para2.src = iconurl;
var para3 = '<input value="' + name + '"></input>';
para2 = para2.outerHTML + para3;
para.innerHTML = para2;
document.body.appendChild(para);
filE(id);
}

function winDows(nameWin){
var win = document.getElementById(nameWin);

if(localStorage['status' + nameWin]!=undefined){
win.className = localStorage['status' + nameWin];
}

//Secure buttons + simple
var statusWin = win.getElementsByTagName('statusbar')[0];
if(statusWin.getElementsByTagName('close')[0]!=undefined){
statusWin.getElementsByTagName('close')[0].onclick = function() {
    closeWin(nameWin);
}}

if(statusWin.getElementsByTagName('fullscreen')[0]!=undefined){
statusWin.getElementsByTagName('fullscreen')[0].onclick = function() {
    fullscreenWin(nameWin);
}}
if(statusWin.getElementsByTagName('hide')[0]!=undefined){
statusWin.getElementsByTagName('hide')[0].onclick = function() {
    hideWin(nameWin);
}}
//end
if(localStorage['window' + nameWin + 'X']!=undefined){
win.style.left = localStorage['window' + nameWin + 'X'] +'px';
win.style.top = localStorage['window' + nameWin + 'Y']  +'px';
}

statusWin.onmousedown = function(e) {
var cor = getCoords(win)
var shiftX = xMouse - cor.left;
var shiftY = yMouse - cor.top;

function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

function dragWin(id){
    var x,y;
    if(win.className=='fullscreenType'){
        if(yMouse>20){
            fullscreenWin(win.id);
            var cor = getCoords(win)
            shiftX = xMouse/2 - cor.left*2;
            shiftY = yMouse - cor.top;

        }
    }

    if(win.className!='fullscreenType'){
x = xMouse - shiftX;
y = yMouse - shiftY;
y = Math.floor(y);
if(y<0){y=0;}
var maxY = window.innerHeight/100*(100-5.5)-20;
if(y>maxY){
y=maxY;
}

win.style.left = x +'px';
win.style.top = y +'px';
}}
win.ondragstart = function() {
  return false;
};
document.onmousemove = function(e) {dragWin();}

  document.onmouseup = function(e) {
          win.onmouseup = null;
    win.onmousemove = null;
    var y = win.style.top.replace('px','');
    var x = win.style.left.replace('px','');
    var maxY = window.innerHeight/100*(100-5.5)-20;
    if(y==maxY||y==0){
        if(win.className==win.className.replace('fullscreenType','')){
        fullscreenWin(win.id);
        }
    }
    localStorage['window' + nameWin + 'X'] = x;
    localStorage['window' + nameWin + 'Y'] = y;
    document.onmousemove = null;
  };

}
}
//NEXT
function filE(fileId){
    
var file = document.getElementById(fileId);
var input = file.getElementsByTagName('input')[0];
input.onchange = function() {
    changeNameFile(fileId);
    
}
    
if(localStorage['filename' + fileId]!=undefined){
file.getElementsByTagName('input')[0].value = localStorage['filename' + fileId];
}

if(localStorage['file' + fileId + 'X']!=undefined){
file.style = 'left:'+ localStorage['file' + fileId + 'X'] +'px;'+'top:' + localStorage['file' + fileId + 'Y']  +'px;';
}

file.onmousedown = function(e) {
var cor = getCoords(file)
var shiftX = xMouse - cor.left;
var shiftY = yMouse - cor.top;

function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

function dragWin(id){
var x = xMouse - shiftX;
var y = yMouse - shiftY;
if(y<0){y=0;}
if(x<0){x=0;}
var maxY = window.innerHeight/100*(100-5.5)-64;
if(y>maxY){
y=maxY;
}
file.style = 'left:'+ x+'px;'+'top:'+ y  +'px;';
localStorage['file' + fileId + 'X'] = x;
localStorage['file' + fileId + 'Y'] = y;
}
file.ondragstart = function() {
  return false;
};
document.onmousemove = function(e) {dragWin();}

  document.onmouseup = function(e) {
    document.onmousemove = null;
    file.onmouseup = null;
    file.onmousemove = null;
    //win.ondragstart = null;
  };

}
}
