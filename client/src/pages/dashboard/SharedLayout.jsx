import React from "react";
// Render all the child and sub components
import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
// Import components
import { Navbar, BigSidebar, SmallSidebar } from "../../components";

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className='dashboard'>
        {/* Only one of them will be rendered at certain screen size we set in the CSS via media query */}
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
