import React from "react";
import styled from "styled-components";
import Sparrow from "../utils/Sparrow.jpg";
const Logo = () => {
  return (
    <Wrapper>
      {/* <span>Sparrow</span>X */}
      <div className="logo_container">
        <img src={Sparrow} alt="Sparrow Image" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.h3`
  margin-bottom: 0;
  color: var(--clr-grey-1);
  span {
    color: var(--clr-primary-5);
  }
  .logo_container {
    width: 8rem;
    height: 7rem;
    margin-top: 2.5rem;
  }
  img {
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 768px) {
    .logo_container {
      width: 5rem;
      height: 5rem;
      /* margin-top: 2.5rem;
      margin-bottom: 2.5rem; */
    }
  }
`;

export default Logo;
