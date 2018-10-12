function changePage(id){
    document.location.href="./index/" + id;
} 

function checkLoginStatus() {
    var loginStatus = sessionStorage.getItem('isLoggedIn');
    if (loginStatus === null) {
        window.location.href = './index/loginForm.html';
    }
}

function openSideBar() {
    var sideBar = document.getElementById('sideBar');
    var gifImage = document.getElementById('gifImage');
    gifImage.style = "animation: carMovementAway 1s; left: -75vw;";
    setTimeout(() => {sideBar.style = "animation: sideBarOpen 1s; display:block; width: 70vw;"}, 200);
}

function closeSideBar() {
    var sideBar = document.getElementById('sideBar');
    var gifImage = document.getElementById('gifImage');
    sideBar.style = "animation: sideBarClose .7s;";
    setTimeout(() => {gifImage.style = "animation: carMovementBack 1s; left: 0vw;";}, 500);
    
}