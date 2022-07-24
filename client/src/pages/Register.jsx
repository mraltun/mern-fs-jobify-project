import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, FormRow, Alert } from "../components";
// Styles
import Wrapper from "../assets/wrappers/RegisterPage";
// Context
import { useAppContext } from "../context/appContext";

// Single object for multiple states in local state.
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  // Navigate for redirects
  const navigate = useNavigate();
  // Local state that hold the multiple stats as an object
  const [values, setValues] = useState(initialState);
  // Global States and Context
  const { user, isLoading, showAlert, displayAlert, registerUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    // Make property name same as the input's name with dynamic object key (email: "user@email.address")
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Destruct values from the state
    const { name, email, password, isMember } = values;
    // Check if email and password is missing. Check the name field only if it's not a member.
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    // Create new object to use it in registerUser, check if they are already a member
    const currentUser = { name, email, password };
    if (isMember) {
      console.log("Already a member");
    } else {
      registerUser(currentUser);
    }
  };

  // Programmatically navigate to Dashboard at "/" after user register.
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {/* Show the Alert if showAlert is true */}
        {showAlert && <Alert />}

        {/* Name input is part of Login form, hide in Register form  */}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {/* Email input */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />

        {/* Password input */}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        {/* Disable the button while loading */}
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          Submit
        </button>
        <p>
          {values.isMember ? "Not a member yet" : "Already a member?"}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
