function changePage(id){
    document.location.href = id;
} 

function sendImage() {
    var fileInput = document.getElementById('imageSelection').files[0];

    var reader = new FileReader();

    reader.onload = function () {
        var object = {
            height: 100,
            title: fileInput.name,
            src: this.result,
        }
      if(fileInput !== null){
        sendMessage(object);
      }
    }

    reader.readAsDataURL(fileInput);
}

var length;

function sendMessage(image) {    
    firebase.database().ref('livefeed/').once('value')
    .then(function(snapshot) {
        var arrayOfImage = snapshot.val();
        return arrayOfImage;
    }).then(function(arrayOfImage) {
        if(arrayOfImage !== null) {
        length = arrayOfImage.length;
        } else { length = 0; }
    }).then( () => {
    firebase.database().ref('livefeed/' + (length)).set({
        type: 'submittion',
        user: sessionStorage.getItem('username'),
        image: image,
        points: 0,
    });
    console.log('sent');
  });
}