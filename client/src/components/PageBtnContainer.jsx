import React from "react";
import { useAppContext } from "../context/appContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
// Stylesheet
import Wrapper from "../assets/wrappers/PageBtnContainer";

const PageBtnContainer = () => {
  const { numOfPages, page } = useAppContext();

  const nextPage = () => {};

  const prevPage = () => {};

  return (
    <Wrapper>
      <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <button className='next-btn' onClick={nextPage}>
        <HiChevronDoubleRight />
        right
      </button>
      <div className='btn-container'></div>
    </Wrapper>
  );
};

export default PageBtnContainer;
