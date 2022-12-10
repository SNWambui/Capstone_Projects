import { useNavigate } from "react-router";
import { fetchToken, setToken } from "./Auth";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //check to see if the fields are not empty
  const login = () => {
    if ((username === "") & (password === "")) {
      return;
    } else {
      // make api call to our backend. we'll leave thisfor later
      axios
        .post("http://localhost:8080/login", {
          username: username,
          password: password,
        })
        .then(function (response) {
          console.log(response.data.token, "response.data.token");
          if (response.data.token) {
            setToken(response.data.token);
            navigate("/home");
          }
        })
        .catch(function (error) {
          console.log(error, "error");
        });
    }
  };

  return (
    <div className="form">
      <div>
          <div>
            <form>
            <h1 className="form-title">Login</h1>
            <div className="form-control">
                <input 
                    type="email" 
                    id="loginName" 
                    className="form-control input"
                    placeholder="Email or Username"
                    onChange={(e) => setUsername(e.target.value)}
                    />
                {/* <label class="form-label" for="loginName">Email or username</label> */}
            </div>
            
            <div className="form-control">
                <input 
                    type="password" 
                    id="setPasswprd" 
                    className="form-control input"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                {/* <label class="form-label" for="loginName">Email or username</label> */}
            </div>

              <button type="button" className="btn" onClick={login}>
                Login
              </button>
            </form>
          </div>
      </div>
    </div>
  );
}