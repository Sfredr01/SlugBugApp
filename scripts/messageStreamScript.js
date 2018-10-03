function changePage(id){
    document.location.href = id;
} 

function grabMessageInfo() {
    var messageValue = message.value;
    message.value = '';
    return messageValue;
}

function getMessages() {
    firebase.database().ref('messages').once('value').then(function(snapshot) {
        var messages = snapshot.val();
        var element = document.getElementById('messageList');
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        if (messages !== null) {
        messages.forEach(element => {
            populatePage(element);
        });
      }
    });
}

function populatePage(object) {
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
var length = 0;

function sendMessage(message) {    
    firebase.database().ref('messages').once('value')
    .then(function(snapshot) {
        var arrayOfMessages = snapshot.val();
        return arrayOfMessages;
    }).then(function(arrayOfMessages) {
        if(arrayOfMessages !== null) {
        length = arrayOfMessages.length;
        } else { length = 0; }
    }).then( () => {
    firebase.database().ref('messages/' + (length)).set({
        user: sessionStorage.getItem('username'),
        message,
    });
    getMessages();
    });
}

function submitButton() {
    sendMessage(grabMessageInfo());
}