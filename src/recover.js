async function refreshQuestions() {
    const admin_account = document.getElementById('admin_account').value;

    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");        
        const res = await fetch(`http://localhost:8080/recover?username=${admin_account}`,
            {
                method: 'GET',
                headers: myHeaders
            }
        );
        const resData = await res.json();
        console.log(resData);
        for (let qId = 1 ; qId <= resData.length ; qId++) {
            document.getElementById('question' + qId).innerHTML = resData[qId - 1]['question'];
            document.getElementById('q' + qId + '_id').innerHTML = resData[qId - 1]['id'];
        }
        } catch (exception) {
            console.error(exception);
        }
    console.log(admin_account);
}

async function resetPassword() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    answers = [];

    for (let qId = 1 ; qId <= 2 ; qId++) {
        const response = document.getElementById(`q${qId}_answer`).value
        const questionId = document.getElementById(`q${qId}_id`).value
        answers.push({
            "questionId": parseInt(questionId),
            "response": `${response}`
        });
    }
    
    const data = JSON.stringify({
      "username": document.getElementById('admin_account').value,
      "newPassword": document.getElementById('newpassword').value,
      "recoverResponseList": answers
    });
    
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow'
    };

    console.log(data);
    
    const anotherResult = await fetch('http://localhost:8080/recover',
        {
        method: 'POST',
        headers: myHeaders,
        body: data
    });
    const antoherResultTest = await anotherResult.json();
    console.log(antoherResultTest);
}


document.addEventListener("DOMContentLoaded", (event) => {
    const recoverform = document.getElementById('recoverform');

    recoverform.addEventListener('submit', async event => {
        event.preventDefault();
        resetPassword();
    });
});

