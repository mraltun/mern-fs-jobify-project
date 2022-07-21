import React from "react";
// Import images
import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";
// Styled components
import Wrapper from "../assets/wrappers/LandingPage";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt='Jobify' className='logo' />
      </nav>
      <div className='container page'>
        {/* Info */}
        <div className='info'>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto
            impedit quo et. Quam cum nulla itaque, at vel id voluptatum
            perferendis officiis distinctio in ex ipsum velit numquam totam
            sequi rem ratione magni corrupti enim eius! Incidunt ipsum
            perferendis magni.
          </p>
          <button className='btn btn-hero'>Login/Register</button>
        </div>
        {/* Image */}
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
