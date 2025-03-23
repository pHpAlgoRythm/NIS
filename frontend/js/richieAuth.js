//functinon sng button sa navigation (ma appear ang login inputs)
function showInput(){
  
    let showRegistration = document.querySelector('.container');
    let showInput = document.querySelector('.input');
   showInput.style.display = 'block';
   showRegistration.style.display = 'none';
   let changeBtn = document.querySelector('.navButton');
   if (changeBtn.innerHTML === "Login") {
    showInput.style.display = 'block';
    changeBtn.innerHTML = "Register";

} else if(changeBtn.innerHTML === 'Register'){
   showRegistration.style.display = 'block';
   showInput.style.display = 'none';
   changeBtn.innerHTML = 'Login';
} 

}//function sang x icon sa login
function closeInput(){
    let Btn = document.querySelector('.navButton');
    let close = document.querySelector('.input');
    close.style.display = 'none';
    if(close.style.display === 'none'){
        Btn.innerHTML = 'Login';
    }
    }/*function sng button nga ara sa navigation 
     (makadto sa registration form kung i-click nga  naka "register" ang text value sng button)*/
    function registerLink(){
        let navButton = document.querySelector('.navButton');
        let showInput = document.querySelector('.input');
        let register = document.querySelector('.container');
        if(register.style.display === 'none'){
            register.style.display = 'block';
            showInput.style.display = 'none';
            navButton.innerHTML = 'Login';
            
        }
    }


    //authentication logics

    const backendUrl = 'http://localhost:8000';
    
    //funtions if mag create acc ang user (wala data storing)
    function register(){
        let name = document.querySelector('.name').value;
        let secName = document.querySelector('.secName').value;
        let bDate = document.querySelector('.bDate').value;
        let uName = document.querySelector('.uName').value;
        let email = document.querySelector('.email').value;
        let password = document.querySelector('.password').value;
        let confirmPass = document.querySelector('.confirmPass').value;
        let gender = document.querySelector('.selectGender').value;
        let role = document.querySelector('.regSelect');
        
        if(!name || !secName || !bDate || !uName || 
            !email || !password || !confirmPass|| 
            !gender || !role){
           alert("Please fill all fields!");
    
    } else if(password !== confirmPass){
        alert("Password do not match!");
    }else{
        alert("Registered successfully!");
    }
  }
  
  //function sng login (pansamantala nga account sng Nurse)
 async function login(){
    let email = document.getElementById('loginUname').value;
    let password = document.getElementById('loginPass').value;

    try{
        const response = await fetch(`${backendUrl}/emploLogin`, {
            method:'POST',
            headers: {'Content-Type' : 'application/json'},
            body : JSON.stringify({email, password})
        });

        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result)

        if(result.message){
            localStorage.setItem("login Token", JSON.stringify(result.user.id));
            location.href = '../html/admin/adminDashboard.html'; 
        }else {
            alert("Login failed: " + (result.error || "Unknown error")); 
        }

    }

    catch (error) 
    {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again."); 
    }
    
  }