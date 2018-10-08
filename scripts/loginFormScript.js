function registerUser() {
    var userId = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var person = {
        userId,
        password,
    };
    if(userId.length !== 0 && password.length !== 0) {
        writeUserData(person);
    } else {
        alert('dont leave fields blank!');
    }
}

function loginUser() {
    var userId = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    firebase.database().ref('users/' + userId).once('value')
    .then( (data) => {
        if(data.val() !== null) { 
            var userData = data.val();
            if(userData.password === password) {
                alert('Welcome Back ' + userId);
                sessionStorage.setItem('username', userId);
                sessionStorage.setItem('isLoggedIn', true);
                window.location.href = '../index.html';  
            } else {
                alert('Wrong Password');
            }
        } else {
            alert('User not registered or wrong username!');
        }
    })
}

function writeUserData(object) {
    firebase.database().ref('users/' + object.userId).once('value')
    .then( (data) => {
        if(data.val() === null) {
        firebase.database().ref('users/' + object.userId).set({
            userId: object.userId,
            password: object.password,
            points: 0,
            version: '0.0.1',
        })
        sessionStorage.setItem('username', object.userId);
        alert('Successfully Registered!'); 
        } else {
        alert('This user is already Registered!');
        }
    })
  }