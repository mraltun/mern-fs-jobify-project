import React from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";

const SharedLayout = () => {
  return (
    <Wrapper>
      <nav>add</nav>
      <Outlet />
    </Wrapper>
  );
};

export default SharedLayout;
