/**
 * textUtils is are methods to be used within image manipulation files.
 * 
 */
const Canvas = require('@napi-rs/canvas');

 function applyText(canvas, text){
    const context = canvas.getContext('2d');

    //Default font size
    let fontSize = 70;

    do {
        //Assign font and decrement for remeasuring
        context.font = `${fontSize -= 10}px sans-serif`;
        //Compare pixel width of text to the canvas minus avatar size
    } while (context.measureText(text).width > canvas.width - 300);

    //Return result
    return context.font; 
};