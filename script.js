// Select the input file element
var fileInput = document.querySelector('#file-input');
var originalHeight, originalWidth;
var checkbox1 = document.getElementById("checkbox1");
var checkbox2 = document.getElementById("checkbox2");
// global variable to preserve original image data
// selecting the image canvas
var canvas = document.getElementById('my-image');
var ctx = canvas.getContext("2d");


var container = document.getElementById("imageContainer");
var slider = document.querySelector('#radius-slider');


checkbox1.addEventListener("change",function() {
    if(this.checked) {
      flipCanvasHorizontally();
    }
});

checkbox2.addEventListener("change",function() {
  if(this.checked) {
    flipCanvasVertically()
  }
});


// Flip the canvas horizontally with an image stored in it
function flipCanvasHorizontally() {
  // Save the current state of the context
  ctx.save();

  // Flip the canvas horizontally
  ctx.scale(-1, 1);
  // Move the flipped canvas back into view
  ctx.translate(-canvas.width, 0);

  // Draw the image on the flipped canvas
  ctx.drawImage(canvas, 0, 0);

  // Restore the original state of the context
  ctx.restore();
}


// onchage event on loading of a file which will draw image and canvas for
// original image
$('#file-input').change(function () {
  var file = this.files[0];
  var image = new Image();

  // Load the image into the canvas and resize it
  var reader = new FileReader();
  reader.onload = function (event) {
    image.src = event.target.result;
    image.onload = function () {
      let width, height;
      originalHeight = image.height;
      originalWidth = image.width;
      if (image.width > image.height) {
        var widthRatio = 500 / image.width;
        width = 500;
        height = image.height * widthRatio;
        if (height > 500) {
          var heightRatio = 500 / height;
          height = 500;
          width = width * heightRatio;
        }
      } else {
        var heightRatio = 500 / image.height;
        height = 500;
        width = image.width * heightRatio;
        if (width > 500) {
          var widthRatio = 500 / width;
          width = 500;
          height = height * widthRatio;
        }
      }
      canvas.width = width;
      canvas.height = height;
      console.log(width, height);
      container.style.height = height + 10 + "px";
      container.style.width = width + 10 + "px";
      ctx.drawImage(image, 0, 0, width, height);
      originalData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };
  };
  reader.readAsDataURL(file);
});







//add eventListner to JPG and PNG download buttons
document.getElementById("imageJPG").addEventListener("click", downloadImage);
document.getElementById("imagePNG").addEventListener("click", downloadImage);

function downloadImage(event) {
  var modifiedCanvas = document.createElement('canvas');
  modifiedCanvas.width = originalWidth;
  modifiedCanvas.height = originalHeight;
  var modifiedCtx = modifiedCanvas.getContext('2d');
  modifiedCtx.drawImage(canvas, 0, 0, originalWidth, originalHeight);
  modifiedCtx.globalCompositeOperation = 'destination-in';
  modifiedCtx.rect(0, 0, originalWidth, originalHeight);
  modifiedCtx.fill();
  var downloadLink = document.createElement('a');
  if (event.target.id === 'imageJPG') {
    downloadLink.download = 'my-image.jpg';
    downloadLink.href = modifiedCanvas.toDataURL('image/jpeg');
  } else if (event.target.id === 'imagePNG') {
    downloadLink.download = 'my-image.png';
    downloadLink.href = modifiedCanvas.toDataURL('image/png');
  }
  downloadLink.click();


}



document.getElementById('invert-btn').addEventListener('click', () => {

   // Save the current state of the context
   ctx.save();

   // Flip the canvas horizontally
   ctx.scale(-1, 1);
   // Move the flipped canvas back into view
   ctx.translate(-canvas.width, 0);
 
   // Draw the image on the flipped canvas
   ctx.drawImage(canvas, 0, 0);
 
   // Restore the original state of the context
   ctx.restore();
}
);

function flipCanvasVertically() {
  // Save the current state of the context
  ctx.save();

  // Flip the canvas vertically
  ctx.scale(1, -1);
  // Move the flipped canvas back into view
  ctx.translate(0, -canvas.height);

  // Draw the image on the flipped canvas
  ctx.drawImage(canvas, 0, 0);

  // Restore the original state of the context
  ctx.restore();
}


