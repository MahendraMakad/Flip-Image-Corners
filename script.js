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

function flipCanvasVertically() {
  // Create a temporary canvas to store the flipped image
  var tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  var tempCtx = tempCanvas.getContext("2d");
  // Flip the image vertically
  tempCtx.scale(1, -1);
  tempCtx.translate(0, -canvas.height);
  tempCtx.drawImage(canvas, 0, 0);
  // Replace the existing canvas with the flipped image
  canvas.width = tempCanvas.width;
  canvas.height = tempCanvas.height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(tempCanvas, 0, 0);
}

function flipCanvasHorizontally() {
  // Create a temporary canvas to store the flipped image
  var tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  var tempCtx = tempCanvas.getContext("2d");
  // Flip the image horizontally
  tempCtx.scale(-1, 1);
  tempCtx.translate(-canvas.width, 0);
  tempCtx.drawImage(canvas, 0, 0);
  // Replace the existing canvas with the flipped image
  canvas.width = tempCanvas.width;
  canvas.height = tempCanvas.height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(tempCanvas, 0, 0);
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
    downloadLink.href = modifiedCanvas.toDataURL('image/jpeg',0.9);
  } else if (event.target.id === 'imagePNG') {
    downloadLink.download = 'my-image.png';
    downloadLink.href = modifiedCanvas.toDataURL('image/png',1);
  }
  downloadLink.click();
}





