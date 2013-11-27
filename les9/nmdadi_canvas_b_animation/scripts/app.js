/*
    Canvas Tutorial
    =================================================
    * Course: NMDAD-I
    * Programmed by: Philippe De Pauw - Waterschoot
    * Last updated: 20/11/2013
    * Version: v0.1.0
    =================================================
    * Setting up canvas
    * Drawing some cool shit
    * Such as: rectangle, lines, circles, k's
    * Animate like an artist
    =================================================
*/

/*
    Declare Global variables
    ========================
    * Extend the scope --> applicable with JS Files
*/
var _canvas, _canvasContext, _particlesArray;

/*
    Declare My Own Nice Animation Frame
    ===================================
*/
window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback){
          window.setTimeout(callback, 1000 / 60);
        };
})();

/*
 Function: initCanvas
 ========================
 * Initialize a canvas with his/here 2d context
 */
function initCanvas(){
    if(Modernizr.canvas){
        _canvas = document.getElementById('canvas');//Assign canvas html element to global variable _canvas
        if(_canvas && _canvas.getContext('2d')){
            _canvasContext = _canvas.getContext('2d');//Assign 2d context of current canvas to global variable _canvasContext
            //Solving the f* bug --> redimension the canvas
            _canvas.width = _canvas.clientWidth;
            _canvas.height = _canvas.clientHeight;
            //Execute a unit test for particles
            UnitTestParticles();
            //Call function: window.requestAnimFrame
            //Do a new animation --> 1/60s
            requestAnimFrame(animateCanvas);
        }
    }
}

/*
 Function: animateCanvas
 ========================
 * Draw some rectangles
 * Fill color, stroke color, ...
 */
function animateCanvas(){

    

    //Loop through Particles Array
    var l = _particlesArray.length, particle;
    for(var i=0;i<l;i++){
        particle = _particlesArray[i];
        particle.update();
        particle.drawOnCanvasContext(_canvasContext);//Draw on 2d Context of canvas
    }

    //Do a new animation --> 1/60s
    requestAnimFrame(animateCanvas);
}

/*
 Function: Particle
 ========================
 * Simulation of a OOP class
 * Properties + Methods (functions)
 * Actions: Setup + Update + ReDraw
 */
function Particle(px, py, psize){
    this.px = px;
    this.py = py;
    this.psize = psize;

    this.update = function(){
        this.px += 5;
        this.py += 5;
    }

    this.drawOnCanvasContext = function(context){
        context.beginPath();
        context.fillStyle = "rgba(22,160,133,0.9)";
        context.arc(this.px, this.py, this.psize, 0, Math.PI*2, true);
        context.fill();
        context.closePath();
    }
}

/*
 Function: UnitTestParticles
 ========================
 * Test the Particles
 */
function UnitTestParticles(){

    if(_particlesArray == null)
        _particlesArray = [];//Like new Array();

    var particle, px, py, psize = 4;
    for(var i=0;i<1000;i++){
        px = Math.random()*_canvas.width;
        py = Math.random()*_canvas.height;
        particle = new Particle(px, py, psize);//Create a new Particle --> object

        _particlesArray.push(particle);//Add particle to existing array
    }
}

/*
 Function: EventHandler
 ========================
 * Listen to the event: if the document is ready for use
 * Event: ready
 */
(function(){
    //Resize event window
    $(window).resize(function(ev){
        ev.preventDefault();
        if(_canvas){
            _canvas.width = _canvas.clientWidth;
            _canvas.height = _canvas.clientHeight;
        }
        return false;
    });

    initCanvas();//Call the function: initCanvas()
})();