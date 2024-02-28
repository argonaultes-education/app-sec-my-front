const loginform = document.getElementById('loginform');

loginform.addEventListener('submit', async event => {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const btoaPassword = btoa(document.getElementById('password').value);

    const data = JSON.stringify({
        "username": document.getElementById('username').value,
        "password": btoaPassword
    });

    try {
        const res = await fetch('http://localhost:8080/login',
            {
                method: 'POST',
                headers: myHeaders,
                body: data
            }
        );
        const resData = await res.json();
        const userId = parseInt(resData['userId']);
        const isAdmin = resData['admin'];
        console.log(`isAdmin: ${isAdmin}`);
        if (isAdmin) {
            document.getElementById('menuadmin').classList.remove('tohide');
        } else {            
            document.getElementById('menuprofile').classList.remove('tohide');
        }
        if (userId > 0) {
            console.log('setting cookie auth and pass');
            document.cookie = `authenticated=${userId}`;
            document.cookie = `password=${btoaPassword}`;
            document.cookie = `isadmin=${isAdmin}`;
        }
    } catch (exception) {
        console.error(exception);
    } finally {
        window.location.href = "/index.html";
    }
});