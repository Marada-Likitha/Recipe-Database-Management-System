import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [values, setValues] = useState({
    FullName: '',
    PhoneNo: '',
    Email: '',
    UserName: '',
    Password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8800/SignUp', values)
      .then((res) => navigate('/'))
      .catch((err) => console.log(err));
  };

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow rounded w-75">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Sign Up</h2>
          <div className="mb-3">
            <input
              type="text"
              name="FullName"
              value={values.FullName}
              onChange={handleInput}
              className="form-control"
              placeholder="Full Name"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="PhoneNo"
              value={values.PhoneNo}
              onChange={handleInput}
              className="form-control"
              placeholder="Phone Number"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="Email"
              value={values.Email}
              onChange={handleInput}
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="UserName"
              value={values.UserName}
              onChange={handleInput}
              className="form-control"
              placeholder="User Name"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="Password"
              value={values.Password}
              onChange={handleInput}
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
          <div className="mt-3 text-center">
            <Link to="/">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
