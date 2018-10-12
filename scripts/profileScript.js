function changePage(id){
    document.location.href = id;
}

var userData;

window.onload = () => {
    firebase.database().ref('users/' + sessionStorage.getItem('username')).once('value')
    .then((data) => {
        if(data.val() !== null) {
           userData = data.val();
           fillPageData();
           removeElement('loadingDiv');
           document.getElementById('mainBody').hidden = false;
        } else {
            alert('This user has not been registered.');
            changePage('../index.html');
        }
    })
}

function fillPageData() {
    var usernameDiv = document.getElementById('username');
    var nameDiv = document.getElementById('name');
    var descriptionDiv = document.getElementById('desc');

    var usernameText = document.createTextNode(userData.userId);
    var nameText;
    if(userData.name){
        nameText = document.createTextNode(userData.name);
    } else {
        nameText = document.createTextNode('N/A');
    }
    var descText;
    if(userData.description){
        descText = document.createTextNode(userData.description);
    } else {
        descText = document.createTextNode('N/A');
    }

    usernameDiv.replaceChild(usernameText, usernameDiv.childNodes[0]);
    nameDiv.replaceChild(nameText, nameDiv.childNodes[0]);
    descriptionDiv.appendChild(descText);
}

function removeElement(elementId) {
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function popupFadeIn() {
    var popUp = document.getElementById('myForm');
    popUp.style = 'animation: fadeIn 1s; display: flex; opacity: 100;';
}

function popupFadeOut() {
    var popUp = document.getElementById('myForm');
    popUp.style = 'animation: fadeOut 1s; display: flex;'; 
    setTimeout(()=>{popUp.style = "display: none;"}, 1000);
}

function grabImage() {
    var object;
    var fileInput = document.getElementById('imgPicker').files[0];
    var reader = new FileReader();
    
    reader.readAsDataURL(fileInput);
    reader.onload = function () {
        object = {
            title: fileInput.name,
            src: this.result,
        }
        previewImage(object);
    }
}

function previewImage(object) {
    var profPic = document.getElementById('profPic');
    var picture = document.createElement('img');
    var clear = document.getElementById('clearButton');
    var submit = document.getElementById('submitButton');
    var select = document.getElementById('profSelect');
    select.disabled = true;
    clear.style = 'display: block';
    submit.style = 'display: block';
    picture.id = "previewPicture";
    picture.src = object.src;
    picture.style = "width: 45vw; border-radius: 100px; margin-left: 5vw; margin-top: 1vh";

    profPic.appendChild(picture);
}

function clearImage() {
    var clear = document.getElementById('clearButton');
    var submit = document.getElementById('submitButton');
    var select = document.getElementById('profSelect');
    select.disabled = false;
    clear.style = 'display: none';
    submit.style = 'display: none';
    var profPic = document.getElementById('profPic');
    profPic.removeChild(profPic.childNodes[0]);

    var fileInput = document.getElementById('imgPicker')
    fileInput.value = '';
}