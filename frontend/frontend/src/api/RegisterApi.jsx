import axios from "./axios"

const RegisterApi = async (name, email, password) => {
 try{
    const response = await axios.post('/register', {
        name,
        email,
        password
    })

    if(response.status === 200){
        alert("Registered Succesfully")
        window.location.reload();
    }
 }catch(error){
          console.error('Error creating post:', error);
 }
}

export default RegisterApi
