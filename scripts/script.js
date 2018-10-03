function changePage(id){
    document.location.href="./index/" + id;
} 

function checkLoginStatus() {
    var loginStatus = sessionStorage.getItem('isLoggedIn');
    if (loginStatus === null) {
        window.location.href = './index/loginForm.html';
    }
}