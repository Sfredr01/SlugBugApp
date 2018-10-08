function changePage(id){
    document.location.href = id;
} 

function grabMessageInfo() {
    var messageValue = message.value;
    message.value = '';
    return messageValue;
}

function getMessages() {
    firebase.database().ref('livefeed/').once('value').then(function(snapshot) {
        var messages = snapshot.val();
        var element = document.getElementById('messageList');
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            if (messages !== null) {
            messages.forEach(element => {
                populatePage(element);
        });
            } else {
                var object = {
                    user: 'Console',
                    message: 'No Messages! Send one!',
                    type: 'message',
                }
                populatePage(object);
        }
    });
}

function populatePage(object) {
  if (object.type === 'message') {
    var element = document.getElementById('messageList');
    var card = document.createElement("div");
    var text = document.createTextNode(object.user + ': ' + object.message);
    card.appendChild(text);
    card.className = 'card';
        if(object.user === sessionStorage.getItem('username')) {
            card.className += ' right';
        }
        if(object.user === "sfredr") {
            card.className += ' adminCard';
        }
    element.appendChild(card);
    }
  if (object.type === 'submittion') {
    var element = document.getElementById('messageList');
    var card = document.createElement("div");
    var img = document.createElement("img");
    var pointContainer = document.createElement("div");
    var pointsText = document.createTextNode(object.points + ' points');
    var userContainer = document.createElement("div");
    var userText = document.createTextNode(object.user);

    userContainer.appendChild(userText);

    pointContainer.appendChild(pointsText);

    img.src = object.image.src;
    img.className = 'imgStyle';

    card.className = 'card';
    
    if(object.user === sessionStorage.getItem('username')) {
        card.className += ' right';
    }

    pointContainer.className = "pointContainer";
    userContainer.className = "userContainer";

    card.appendChild(img);
    card.appendChild(pointContainer);
    card.appendChild(userContainer);

    element.appendChild(card);
    
  }  
}
var length = 0;

function sendMessage(message) {    
    firebase.database().ref('livefeed/').once('value')
    .then(function(snapshot) {
        var arrayOfMessages = snapshot.val();
        return arrayOfMessages;
    }).then(function(arrayOfMessages) {
        if(arrayOfMessages !== null) {
        length = arrayOfMessages.length;
        } else { length = 0; }
    }).then( () => {
    firebase.database().ref('livefeed/' + (length)).set({
        type: 'message',
        user: sessionStorage.getItem('username'),
        message,
    });
    getMessages();
    });
}

function submitButton() {
    sendMessage(grabMessageInfo());
}