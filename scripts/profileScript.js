function changePage(id){
    document.location.href = id;
}

window.onload = () => {
    firebase.database().ref('users/' + sessionStorage.getItem('username')).once('value')
    .then((data) => {
        if(data.val() !== null) {
           var userData = data.val();
           console.log(userData); 
        } else {
            alert('This user has not been registered.');
            changePage('../index.html');
        }
    })
}