import React, { useState, useEffect } from "react";
import { Logo, FormRow } from "../components";
// Styles
import Wrapper from "../assets/wrappers/RegisterPage";

// Single object for multiple states
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  // Global state and useNavigate

  const handleChange = (e) => {
    console.log(e.target);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo />
        <h3>Login</h3>

        {/* name input */}
        <FormRow
          type='text'
          name='name'
          value={values.name}
          handleChange={handleChange}
        />

        {/* email input */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />

        {/* password input */}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />

        <button type='submit' className='btn btn-block'>
          Submit
        </button>
      </form>
    </Wrapper>
  );
};

export default Register;
