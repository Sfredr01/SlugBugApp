window.onload = () => {
    document.getElementById('input').onchange = showPreview;
}

function changePage(id){
    document.location.href = id;
} 

function submitImage() {
    var fileInput = document.getElementById('input').files[0];
    var reader = new FileReader();

    reader.onload = function () {
        object = {
            title: fileInput.name,
            src: this.result,
        }
      if(fileInput !== null){
        sendMessage(object);
      }
    }
    reader.readAsDataURL(fileInput);
}

function sendMessage(image) {   
    var length; 
    firebase.database().ref('livefeed/').once('value')
    .then((snapshot) => {
        var arrayOfImage = snapshot.val();
        return arrayOfImage;
    }).then((arrayOfImage) => {
        if(arrayOfImage !== null) {
        length = arrayOfImage.length;
        } else { length = 0; }
    }).then( () => {
    firebase.database().ref('livefeed/' + (length)).set({
        type: 'submittion',
        user: sessionStorage.getItem('username'),
        image: image,
        points: 1,
    }).then(() => {
        alert('Submitted');
        changePage('../index.html');  
    });
  });
}

function showPreview() {
    var element = document.getElementById('imageBox');
    element.hidden = false;
    if(element.hasChildNodes){
        element.removeChild(element.firstChild);
    }
    var fileInput = document.getElementById('input').files[0];
    var reader = new FileReader();
    reader.onload = function () {
        object = {
            title: fileInput.name,
            src: this.result,
        }
      if(fileInput !== null){
        var img = document.createElement("img");
        img.src = object.src;
        img.style = "width: 40vw; margin-left: 5vw; margin-top: 3vh; border-radius: 10px;"
        element.appendChild(img);
      }
    }
    reader.readAsDataURL(fileInput);
}