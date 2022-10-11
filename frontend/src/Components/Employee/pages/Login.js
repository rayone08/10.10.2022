import React, { useState } from "react";
import axios from "axios";
import "../components/css/logincss.css";
import Logo from "../components/Images/iou.png";

const Login = () => {
  const [inputs, setInputs] = useState({
    empid: "",
    empPwd: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (inputs.empid === "") {
      alert("Employee ID should not be empty");
    } else if (inputs.empPwd === "") {
      alert("Password should not be empty");
    } else {
      axios
        .get(`http://localhost:8400/employee/${inputs.empid}`)
        .then((res) => {
          if (res.data === 1) {
            axios
              .post("http://localhost:8400/home", inputs)
              .then((res) => {
                alert("Log In Success!");
                var logID = inputs.empid;
                localStorage.setItem("logID", logID);
                window.location.href = "/employees";
              })
              .catch(function (error) {
                alert("Email or Password is Incorrect!");
              });
          } else {
            alert("Employee Does not Exists!");
          }
        });
    }
  };

  return (
    <div>
      <div className="login_container">
        <div className="login_form_container">
          <div className="left">
            <form className="form_container">
              <h1>Log In To Your Account</h1>
              <input
                type="text"
                name="empid"
                placeholder="Employee ID"
                onChange={handleChange}
                value={inputs.empid || ""}
                required
                className="input"
              />
              <input
                type="password"
                name="empPwd"
                placeholder="Password"
                onChange={handleChange}
                value={inputs.empPwd || ""}
                required
                className="input"
              />
            </form>

            <button
              type="button"
              className="signin_btn"
              onClick={(e) => {
                onSubmit(e);
              }}
            >
              Log In
            </button>

            <a href="">
              <h4>Forget Password</h4>
            </a>
          </div>
          <div className="right">
            <h1>IOU Payroll System</h1>
            <div className="logo">
              <img src={Logo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
