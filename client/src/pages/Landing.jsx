import React from "react";
import { Link } from "react-router-dom";
// Import images
import main from "../assets/images/main.svg";
// Styles
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
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
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        {/* Image */}
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
