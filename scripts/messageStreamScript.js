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
    card.style = "width: 35vw;"
    element.appendChild(card);
    }
  if (object.type === 'submittion') {
    var element = document.getElementById('messageList');
    var card = document.createElement("div");
    var imgButton = document.createElement('button');
    var img = document.createElement("img");
    var pointContainer = document.createElement("div");
    var pointsText = document.createTextNode(object.points + ' points');
    var userButton = document.createElement("button");
    var userContainer = document.createElement("div");
    var userText = document.createTextNode(object.user);

    userButton.onclick= () => {previewUser(object.user)};
    userButton.style="font-size: 4vw; background-color: white; border:none;";
    userButton.appendChild(userText);
    userContainer.appendChild(userButton);

    imgButton.style = "margin-left: 7vw; background-color: white; border:none;";
    imgButton.appendChild(img);
    
    var trigger = true;
    if (object.user === sessionStorage.getItem('username')) {
      imgButton.onclick= () => {
        if(trigger === true) {
          img.style="animation: scaleUp 1s; width: 500px; margin-left: 18vw;";
          card.style="animation: widenCard 1s; animation: rightToLeft 1s;"
          card.className='card left';
        } 
        if(trigger === false) {
          img.style="animation: scaleDown 1s; width: 200px";
          card.style="animation: shrinkCard 1s; animation: leftToRight 1s;"
          setTimeout(() => {card.className='card right';} , 1000);
          
        }
        trigger = !trigger;
      }  
    } else {
        card.style="width:35vw;";
        imgButton.onclick= () => {
            
            if(trigger === true) {
              img.style="animation: scaleUp 1s; width: 500px; margin-left: 18vw;";
              card.style="animation: widenCard 1s; width:90vw;";
            //   card.className='card left';
            } 
            if(trigger === false) {
              img.style="animation: scaleDown 1s; width: 200px";
              card.style="animation: shrinkCard 1s; width:35vw;";
            //   card.style="animation: rightToLeft 1s;";
            }
            trigger = !trigger;
          }  
    }
    
    pointContainer.appendChild(pointsText);

    img.src = object.image.src;
    img.className = 'imgStyle';

    card.className = 'card';
    
    if(object.user === sessionStorage.getItem('username')) {
        card.className += ' right';
    }

    pointContainer.className = "pointContainer";
    userContainer.className = "userContainer";

    card.appendChild(imgButton);
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

function previewUser(username) {
    firebase.database().ref('users/' + username).once('value')
    .then(function(snapshot) {
        var userData = snapshot.val();
        document.getElementById('profilePreview').style='display: block;';

        var userNameDiv = document.getElementById('profileUser');
            if(userNameDiv.childNodes){
                userNameDiv.removeChild(userNameDiv.childNodes[0]);
            }

        var userPoints = document.getElementById('profilePoints');
            if(userPoints.childNodes){
                userPoints.removeChild(userPoints.childNodes[0]);
            }

        var profilePicImg = document.getElementById('profilePic');   

        if(userData.userId) {
            var userNameText = document.createTextNode('Username: ' + userData.userId);
            userNameDiv.appendChild(userNameText);
        } else {
            var userNameText = document.createTextNode('Username:  N/A');
            userNameDiv.appendChild(userNameText);
        }

        if(userData.points) {
            var userPointsText = document.createTextNode('Points: ' + userData.points );
            userPoints.appendChild(userPointsText);
        } else {
            var userPointsText = document.createTextNode('Points: N/A');
            userPoints.appendChild(userPointsText);
        }
        if(userData.profilePic) {
            profilePicImg.src = userData.profilePic.src;
        } else {
            profilePicImg.src = '../images/defaultProfilePicture.png';
        }
    });
}