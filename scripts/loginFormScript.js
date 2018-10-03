function grabUserInfo() {
    var userId = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var person = {
        userId,
        name,
        email,
    };
    writeUserData(person);
    sessionStorage.setItem('isLoggedIn', true);
    window.location.href = '../index.html';
}

function writeUserData(object) {
    firebase.database().ref('users/' + object.userId).set({
      name: object.name,
      email: object.email,
    })
    sessionStorage.setItem('username', object.userId);
    console.log('Success');
  }
  
function readUserData() {
    firebase.database().ref('users/').once('value').then(function(snapshot) {
        var username = snapshot.val();
        console.log(username);
    });
}