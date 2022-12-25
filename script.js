// Ricky Leung
// Period 7/8 Odd
// Level 4 JS Project
// Picture Puzzle

var images = [];
var imageWidth;
var imageHeight;
var imagePieces = [];
var originalImagePieces = [];
var selectedImages = [];
var score = 0;

function initialize() {
    for (let i = 0; i < 16; i++) {
        eval(`image${i}HTML = document.getElementById("image${i}");`);
        images.push(eval(`image${i}HTML`));
    }
    cutImages();

    scoreHTML = document.getElementById('score');
    pyroContainerHTML = document.getElementById('pyroContainer');
    pyroContainerHTML.style.opacity = '0';
    winnerHTML = document.getElementById('winner');
}

function cutImages() {
    let image = new Image();
    image.src = 'images/image.jpg';
    imageWidth = image.width / 4;
    imageHeight = image.height / 4;
    for(var y = 0; y < 4; y++) {
        for(var x = 0; x < 4; x++) {
            var canvas = document.createElement('canvas');
            canvas.width = imageWidth;
            canvas.height = imageHeight;
            var context = canvas.getContext('2d');
            context.drawImage(image, x * imageWidth, y * imageHeight, imageWidth, imageHeight, 0, 0, canvas.width, canvas.height);
            imagePieces.push(canvas.toDataURL());
            originalImagePieces.push(canvas.toDataURL());
        }
    }

    // imagePieces now contains data urls of all the pieces of the image

    // load one piece onto the page
    for (let i = 0; i < 16; i++) {
        images[i].src = imagePieces[i];
    }
}
function shuffle(array) {
    score = 0;
    scoreHTML.innerHTML = 'Score: ' + score;
    pyroContainerHTML.style.opacity = '0';
    winnerHTML.innerHTML = '';
    for (let i = 0; i < images.length; i++) {
        images[i].setAttribute('onclick', `selectImage(${i});`);
    }

    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    display();

    // for (let i = 0; i < 16; i++) {
    //     let imageSource = "Images/picture" + imageArray[i] + ".PNG";
    //     imageElements[i].src=imageSource;
    // }
}
function display() {
    for (let i = 0; i < 16; i++) {
        images[i].src = imagePieces[i];
    }
}
function selectImage(index) {
    if (selectedImages.length == 0) {
        selectedImages.push(index);
        images[index].style.border = "2px solid red";
    } else if (index == selectedImages[0]) {
        selectedImages.pop();
        images[index].style.border = "1px solid black";
        score -= 2;
    } else {
        selectedImages.push(index);
        images[selectedImages[0]].style.border = "1px solid black";
        swapImages();
        selectedImages.length = 0;
        console.log(checkDone());
    }
    score++;
    scoreHTML.innerHTML = 'Score: ' + score;
}
function swapImages() {
    let temp = imagePieces[selectedImages[0]];
    imagePieces[selectedImages[0]] = imagePieces[selectedImages[1]];
    imagePieces[selectedImages[1]] = temp;
    display();
}
function checkDone() {
    for (let i = 0; i < imagePieces.length; i++) {
        if (imagePieces[i] !== originalImagePieces[i]) {
            pyroContainerHTML.style.opacity = '0';
            return false;
        }
    }
    winnerHTML.innerHTML = 'You won!';
    pyroContainerHTML.style.opacity = '1';
    return true;
}