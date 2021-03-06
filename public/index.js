// *****************************************************************
// CLICK LOGIN TO DISPALY LOGIN FORM DIV
// *****************************************************************
function showLogin() {
    $('#loginBtn').on('click', event => {
        event.preventDefault();
        // $('#register').hide();
        $('#login').toggle();
    })
};

// *****************************************************************
// REGISTRATION BUTTON: GO TO REGISTRATION SCREEN
// *****************************************************************
function goToReg(){
    $('#registerBtn').on('click', event => {
        event.preventDefault();
        window.location = 'register.html';                
    })
}


// *****************************************************************
// LOGIN FORM 
// *****************************************************************
function watchLoginFormSubmit() {

    $('#loginForm').submit(function (e) {
        // Prevent dedault form behaviour 
        e.preventDefault();
        let user = {
            username: $('#loginEmail').val(),
            password: $('#loginPassword').val(),
        }

        let options = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(user)
        }

        fetch('/api/auth/login', options)
            .then(response => {
                return response.json(response)
            })
            .then(user => {
                localStorage.setItem("user", user.authToken);
                window.location = 'dashboard.html';             
            })
            .catch(err => {
                console.error('Error:', err)
                $('#errorMsg').show();
            });
    })
};

// -------------------------------------------------------------------------------------------------------------------


// *****************************************************************
// WRAPPER FUNCTION  
// *****************************************************************
function indexWrapperFunction() {
    showLogin();
    watchLoginFormSubmit();
    goToReg();
}

$(indexWrapperFunction());
