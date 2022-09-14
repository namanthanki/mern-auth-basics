import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleLoginUserRequest = async (event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:7803/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, 
        password
      })
    })

    const data = await response.json();

    if(data.user) {
      localStorage.setItem("token", data.user);
      alert("Login Successful");
      navigate("/dashboard");
    } else {
      alert("Login Failed");
    }

    console.log(data);
  }

  return (
    <div className="App">
      <h1>Login</h1>
      <form onSubmit={ handleLoginUserRequest }>
        <input 
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="Email: (i.e -> johndoe@example.com)"
        />
        <input 
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          placeholder="Password"
        />
        <input 
          type="submit"
          value="login"
        />
      </form>
    </div>
  );
}

export default Login;