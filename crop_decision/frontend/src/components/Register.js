/*
This component implements a registration form for new users. The current implementation is 
not fully functional because of a lack of database. And issues with authentication.
*/

import { useNavigate } from "react-router";
import { fetchToken, setToken } from "./Auth";
import { useState, React } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  //check to see if the fields are not empty
  const register = () => {
    if ((username === "") & (password1 === "") & (email==="")) {
      return;
    } else if (password1 !== password2){
        alert("passwords do not match")
    } else {
      // make api call to our backend. we'll leave thisfor later
      axios
        .post("http://localhost:8080/register", {
          username: username,
          email: email,
          password1: password1,
        //   password2: password2
        })
        .then(function (response) {
        //   console.log(response.data.token, "response.data.token");
            navigate("/login");
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
            <h1 className="form-title">Sign Up</h1>
            <div className="form-control">
                <input 
                    type="name" 
                    id="registerName" 
                    className="form-control input"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    />
                {/* <label class="form-label" for="loginName">Email or username</label> */}
            </div>

            <div className="form-control">
                <input 
                    type="email" 
                    id="registerName" 
                    className="form-control input"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                {/* <label class="form-label" for="loginName">Email or username</label> */}
            </div>
            
            <div className="form-control">
                <input 
                    type="password" 
                    id="setPassword" 
                    className="form-control input"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword1(e.target.value)}
                    />
                {/* <label class="form-label" for="loginName">Email or username</label> */}
            </div>

            <div className="form-control">
                <input 
                    type="password" 
                    id="setPassword" 
                    className="form-control input"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword2(e.target.value)}
                    />
                {/* <label class="form-label" for="loginName">Email or username</label> */}
            </div>

              <button type="button" className="btn" onClick={register}>
                Create Acount
              </button>
            </form>
          </div>
      </div>
    </div>
  );
}
