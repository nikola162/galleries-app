import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/auth";

export default function Login() {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(login(credentials));
  }

  return (
    <div>
      <h2>Login</h2>
      <form 
      className="login-form"
      onSubmit={handleSubmit}>
        <div className="loginInput-field">
          <input
            required
            className="loginInput"
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={({ target }) =>
              setCredentials({ ...credentials, email: target.value })
            }
          />
        </div>
        <div className="loginInput-field">
          <input
            required
            className="loginInput"
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={({ target }) =>
              setCredentials({ ...credentials, password: target.value })
            }
          />
        </div>

        <button>Login</button>
      </form>
    </div>
  );
}