function validator() {
    const storeduser = JSON.parse(localStorage.getItem('todos'));
    const storedLogin = JSON.parse(localStorage.getItem('userlogin'));
    const userName = document.getElementById('userName').value;
    const userPw = document.getElementById('password').value;
    console.log(storeduser);
    const checkValid = storeduser.filter((e) => userName === e.username && userPw === e.password);
    console.log(checkValid);
    if (checkValid.length === 0) {
        alert('Login fail!');
    } else {
        checkValid.forEach((e) => {
            if (userName === e.username && userPw === e.password ) {
                const userLogin = [];
                const loginItem = {
                    username: userName,
                    password: userPw
                }
                userLogin.push(loginItem);
                localStorage.setItem('userlogin', JSON.stringify(userLogin));
                window.location.href = "../home/index.html";
                
            }
        });
    }
}
