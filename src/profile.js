function getProfile() {
    const userId = isAuthenticated(() => {});

    console.log(`userId: ${userId}`);

    const myHeaders = new Headers();
    myHeaders.append("authentication", userId);
    
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    
    fetch("http://localhost:8080/profile?profileId=" + userId, requestOptions)
      .then(response => response.json())
      .then(result => {
        document.getElementById('avatar').innerHTML = "<img src=\"https://i.pravatar.cc/150?u=" + btoa(result['email']) + " \"/>"
        document.getElementById('username').innerHTML = result['username'];
        document.getElementById('firstname').innerHTML = result['firstname'];
        document.getElementById('lastname').innerHTML = result['lastname'];
        document.getElementById('email').innerHTML = result['email'];
      })
      .catch(error => console.log('error', error));
}

document.addEventListener("DOMContentLoaded", (event) => {
    getProfile();
});