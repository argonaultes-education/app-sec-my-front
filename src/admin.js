function getPasswordFromCookie() {
    const cookie = document.cookie;
    const cookies = cookie.split(';');
    for(let cookievalue of cookies) {
        console.log(cookievalue);
        const keyvalue = cookievalue.split('=');
        const rawValue = keyvalue[1].trim();
        if ( keyvalue[0].trim() == 'password' ) {
            return rawValue;
        }
    }
    return '';
}

function getAdminProfile() {
    const userId = isAuthenticated(() => {});

    console.log(`userId: ${userId}`);

    const myHeaders = new Headers();
    myHeaders.append("authentication", userId);
    myHeaders.append("Password", getPasswordFromCookie());
    
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    
    fetch("http://localhost:8080/adminprofile?id=" + userId, requestOptions)
      .then(response => response.json())
      .then(result => {
        document.getElementById('avatar').innerHTML = "<img src=\"https://i.pravatar.cc/150?u=" + btoa(result['email']) + " \"/>"
        document.getElementById('username').innerHTML = result['username'];
        document.getElementById('firstname').innerHTML = result['firstname'];
        document.getElementById('lastname').innerHTML = result['lastname'];
        document.getElementById('email').innerHTML = result['email'];
        document.getElementById('xaccount').innerHTML = result['xaccount'];
      })
      .catch(error => console.log('error', error));
}

document.addEventListener('DOMContentLoaded', (event) => {
    getAdminProfile();
})