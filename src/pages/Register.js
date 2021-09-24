import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../store/auth";

export default function Register() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name:"",
    email: "",
    password: "",
    password_confirmation: "",
    terms:1,
  });

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(register(userData));
  }

  return (
    <div>
      <h2>Register</h2>
      <form
       className="login-form"
        onSubmit={handleSubmit}>
        <div  className="loginInput-field">
          <input
            required
             className="loginInput"
            placeholder="First Name"
            value={userData.first_name}
            onChange={({ target }) =>
              setUserData({ ...userData, first_name: target.value })
            }
          />
        </div>
        <div className="loginInput-field">
          <input
            required
             className="loginInput"
            placeholder="Last Name"
            value={userData.last_name}
            onChange={({ target }) =>
              setUserData({ ...userData, last_name: target.value })
            }
          />
        </div>
        <div className="loginInput-field">
          <input
            required
             className="loginInput"
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={({ target }) =>
              setUserData({ ...userData, email: target.value })
            }
          />
        </div>
        <div className="loginInput-field">
          <input
            required
             className="loginInput"
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={({ target }) =>
              setUserData({ ...userData, password: target.value })
            }
          />
        </div>
        <div className="loginInput-field">
          <input
            required
             className="loginInput"
            type="password"
            placeholder="Confirm password"
            value={userData.password_confirmation}
            onChange={({ target }) =>
              setUserData({ ...userData, password_confirmation: target.value })
            }
          />
        </div>

        <button>Register</button>
      </form>
    </div>
  );
}