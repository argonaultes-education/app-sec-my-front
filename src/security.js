function isAuthenticated(callback) {
    const cookie = document.cookie;
    console.log(cookie);
    const cookies = cookie.split(';');
    for(let cookievalue of cookies) {
        console.log(cookievalue);
        const keyvalue = cookievalue.split('=');
        const userId = parseInt(keyvalue[1]);
        console.log(userId);
        if ( keyvalue[0].trim() == 'authenticated' && userId > 0) {
            console.log("isAuthenticated: true");
            callback();
            return userId;
        }
    }
    return false;
}

function enableNavbar() {
        const navigation = document.getElementById('navigation');
        if (navigation) {
            navigation.classList.replace('guest', 'authenticated');        
        }
        const cookie = document.cookie;
        const cookies = cookie.split(';');
        for(let cookievalue of cookies) {
            const keyvalue = cookievalue.split('=');
            if ( keyvalue[0].trim() == 'isadmin') {
                console.log(`enableNavBar: ${keyvalue[1].trim()}`);
                if ( keyvalue[1].trim() == 'true' ) {
                    document.getElementById('menuadmin').classList.remove('tohide');
                } else {
                    document.getElementById('menuprofile').classList.remove('tohide');
                }
            }
        }}

function login(form) {
    console.log(`${form.username.value}: ${form.password.value}`);
}

document.addEventListener("DOMContentLoaded", (event) => {
    isAuthenticated(enableNavbar);
});
