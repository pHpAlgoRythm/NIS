
//front-end magic

const employeeLogin = document.querySelector('.login-container');
const patLogin = document.querySelector('.pat-log-container');

function openPatLogin(){
    patLogin.style.display = 'flex';
    employeeLogin.style.display = 'none'
}

function openEmploLogin(){
    patLogin.style.display = 'none';
    employeeLogin.style.display = 'flex'
}


//api magic

const backendUrl = 'http://localhost:8000';

async function emploLogin() {
    let email = document.getElementById('user-name').value;
    let password = document.getElementById('password').value;

    try {
        const response = await fetch(`${backendUrl}/emploLogin`, {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result); 

        if (result.message) {
            localStorage.setItem("user", JSON.stringify(result.user));
            
            if(result.user.Role === 'admin'){

                location.href = '../html/admin/adminDashboard.html'; 

            }else{
                alert('not admin')
            }


        } else {
            alert("Login failed: " + (result.error || "Unknown error")); 
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again."); 
    }
}