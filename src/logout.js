function logout() {
    document.cookie = 'authenticated=;Max-Age=-1';
    document.cookie = 'password=;Max-Age=-1';
    document.cookie = 'isadmin=;Max-Age=-1';
}


document.addEventListener("DOMContentLoaded", (event) => {
    logout();
});
