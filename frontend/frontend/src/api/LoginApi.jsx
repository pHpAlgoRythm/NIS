import axios from './axios';

const LoginApi = async (email, password, navigate) => {
  try {
    const response = await axios.post('/emploLogin', {
      email,
      password
    });
   
    const user = response.data.user; 

    if (user) {
      localStorage.setItem("name", user.FullName);
      localStorage.setItem("id", user.EmployeeID);
      navigate("/dashboard");
    }

  } catch (error) {
    console.error('Error creating post:', error);
  }
};

export default LoginApi;
