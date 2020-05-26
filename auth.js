(function() {

    //Global variable
    window.auth = {};

    function Register(e) {
        e.preventDefault();
        //Get values
        const email = register_email.value;
        const password = register_password.value;

        //Clear form
        register_form.reset();

        //Create user
        firebase.auth().createuserWithEmailAndPassword(email, password)
        .then(function(user) {
            console.log("User successfully registered");
            console.log(user);
        }).catch(function(error) {
            //Handle errors here
            console.log(error);
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    function Login(e) {
        e.preventDefault();
        //Get values
        const email = login_email.value;
        const password = login_password.value;

        //Clear form
        login_form.reset();

        //Sign user in
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(user) {
            console.log("User successfully logged in");
            console.log(user);
        }).catch(function(error) {
            //Handle errors here
            console.log(error);
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    function Logout(e) {
        e.preventDefault();
        //Sign user out
        firebase.auth().signOut();
    }

    //Will be called whenever auth state changes
    function authStateChanged(user) {
        //User is signed in
        if(user) {
            register.style.display = "none";
            LogIn.style.display = "none";
            logout_btn.style.display = "block";
            if(auth.login) console.log("No login event");
            else auth.loginEvent();
        }
        //No user is signed in
        else {
            register.style.display = "block";
            LogIn.style.display = "block";
            logout_btn.style.display = "none";
            if(auth.logout) console.log("No logout event");
            else auth.logoutEvent();
        }
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        //Register button is clicked
        register_submit_button.addEventListener('click', Register);

        //Log In button is clicked
        login_submit_button.addEventListener('click', Login);

        //Log Out button is clicked
        logout_btn.addEventListener('click', Logout);

        const auth = firebase.auth();
        auth.onAuthStateChanged(authStateChanged);
    });

}) ();