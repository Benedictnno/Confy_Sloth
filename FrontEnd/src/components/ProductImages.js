import React, { useState } from "react";
import styled from "styled-components";

const ProductImages = ({ images = [{ url: "" }] }) => {
  const [main, setMain] = useState(images[0]);

  return (
    <Wrapper>
      <img src={main.url} alt="main" className="gallery main space" />
      <div className="gallery multiple">
        {images.map((image, index) => {
          return (
            <img
              src={image.url}
              alt={image.url}
              key={index}
              onClick={() => {
                setMain(images[index]);
              }}
              loading="lazy"
              className={`${image.url === main.url ? "active" : null}`}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .space {
    margin-top: -1rem;
  }
  .gallery {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .multiple {
    margin-top: 1rem;
  }
  .active {
    box-shadow: 0px 0px 0px 3px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
    .space {
      margin-top: 0;
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
