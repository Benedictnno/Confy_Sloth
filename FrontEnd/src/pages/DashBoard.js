import React from "react";
import styled from "styled-components";

function DashBoard() {
  return (
    <Wrapper>
      <div>
        <h4>Add Product</h4>
        {/* product details */}
        <div class="container">
          <div class="modal">
            <div class="modal__header">
              <span class="modal__title">New Product</span>
              <button class="button button--icon">
                <svg
                  width="24"
                  viewBox="0 0 24 24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                </svg>
              </button>
            </div>
            <div class="modal__body">
              <div class="input">
                <label class="input__label">Project title</label>
                <input class="input__field" type="text" />
                <p class="input__description">
                  The title must contain a maximum of 32 characters
                </p>
              </div>
              <div class="input">
                <label class="input__label">Description</label>
                <textarea class="input__field input__field--textarea"></textarea>
                <p class="input__description">
                  Give your project a good description so everyone know what's
                  it for
                </p>
              </div>

              <div className="mt-4 flex flex-row space-x-2">
                <div className="flex-1">
                  <label className="text-black" for="city">
                    Price
                  </label>
                  <input
                    placeholder="Price"
                    className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
                    id="city"
                    type="number"
                  />
                </div>

                <div className="flex-1">
                  <label className="text-black" for="state">
                    Category
                  </label>
                  <input
                    placeholder="Category"
                    className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
                    id="state"
                    type="text"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-row space-x-2">
                <div className="flex-1">
                  <label className="text-black" for="city">
                    Company
                  </label>
                  <input
                    placeholder="company"
                    className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
                    id="city"
                    type="text"
                  />
                </div>

                <div className="flex-1">
                  <label className="text-black" for="state">
                    inventory
                  </label>
                  <input
                    placeholder="Number of item"
                    className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
                    id="state"
                    type="number"
                  />
                </div>
              </div>
              {/* check box */}
              <div className="flex flex-grow gap-16">
                <div>
                  <p>Free shipping</p>
                  <label class="cont">
                    <input type="checkbox" checked="" />
                    <span></span>
                  </label>
                </div>
                <div>
                  <p>Featured</p>
                  <label class="cont">
                    <input type="checkbox" checked="" />
                    <span></span>
                  </label>
                </div>

                <div className="flex-1">
                  <label className="text-black" for="city">
                    Color
                  </label>
                  <input
                    placeholder="#Black"
                    className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
                    id="city"
                    type="text"
                  />
                </div>
              </div>
              {/* end */}
            </div>

            <div class="modal__footer">
              <button class="button button--primary">Create Product</button>
            </div>
          </div>
        </div>

        {/* add photos */}
      </div>
      <label class="custum-file-upload" for="file">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
            <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
            <g
              stroke-linejoin="round"
              stroke-linecap="round"
              id="SVGRepo_tracerCarrier"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fill=""
                d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>{" "}
            </g>
          </svg>
        </div>
        <div class="text">
          <span>Click to upload image</span>
        </div>
        <input type="file" id="file" />
      </label>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  margin: 3rem 0;

  /* check box */
  /* Hide the default checkbox */
  .cont {
    display: flex;
    align-items: center;
    transform: scale(1);
  }

  input[type="checkbox"] {
    height: 1.7rem;
    width: 1.7rem;
    margin: 5px;
    display: inline-block;
    appearance: none;
    position: relative;
    background-color: #f2ecff;
    border-radius: 15%;
    cursor: pointer;
    overflow: hidden;
  }

  input[type="checkbox"]::after {
    content: "";
    display: block;
    height: 0.9rem;
    width: 0.4rem;
    border-bottom: 0.31rem solid #a0ffe7;
    border-right: 0.31rem solid #a0ffe7;
    opacity: 0;
    transform: rotate(45deg) translate(-50%, -50%);
    position: absolute;
    top: 45%;
    left: 21%;
    transition: 0.25s ease;
  }

  input[type="checkbox"]::before {
    content: "";
    display: block;
    height: 0;
    width: 0;
    background-color: #00c896;
    border-radius: 50%;
    opacity: 0.5;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
    transition: 0.3s ease;
  }

  input[type="checkbox"]:checked::before {
    height: 130%;
    width: 130%;
    opacity: 100%;
  }

  input[type="checkbox"]:checked::after {
    opacity: 100%;
  }

  span {
    font-size: 2rem;
  }

  /* product details */
  .button {
    appaerance: none;
    font: inherit;
    border: none;
    background: none;
    cursor: pointer;
  }

  .container {
    /* position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0; */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
  }

  .modal {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
    background-color: #fff;
    box-shadow: 0 15px 30px 0 rgba(0, 125, 171, 0.15);
    border-radius: 10px;
  }

  .modal__header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .modal__body {
    padding: 1rem 1rem;
  }

  .modal__footer {
    padding: 0 1.5rem 1.5rem;
  }

  .modal__title {
    font-weight: 700;
    font-size: 1.25rem;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: 0.15s ease;
  }

  .button--icon {
    width: 2.5rem;
    height: 2.5rem;
    background-color: transparent;
    border-radius: 0.25rem;
  }

  .button--icon:focus,
  .button--icon:hover {
    background-color: #ededed;
  }

  .button--primary {
    background-color: #007dab;
    color: #fff;
    padding: 0.75rem 1.25rem;
    border-radius: 0.25rem;
    font-weight: 500;
    font-size: 0.875rem;
  }

  .button--primary:hover {
    background-color: #006489;
  }

  .input {
    display: flex;
    flex-direction: column;
  }

  .input + .input {
    margin-top: 1.75rem;
  }

  .input__label {
    font-weight: 700;
    font-size: 0.875rem;
  }

  .input__field {
    display: block;
    margin-top: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    padding: 0.75rem 0.75rem;
    transition: 0.15s ease;
  }

  .input__field:focus {
    outline: none;
    border-color: #007dab;
    box-shadow: 0 0 0 1px #007dab, 0 0 0 4px rgba(0, 125, 171, 0.25);
  }

  .input__field--textarea {
    min-height: 100px;
    max-width: 100%;
  }

  .input__description {
    font-size: 0.875rem;
    margin-top: 0.5rem;
    color: #8d8d8d;
  }

  /* image upload */

  .custum-file-upload {
    height: 200px;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    gap: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border: 2px dashed #cacaca;
    background-color: rgba(255, 255, 255, 1);
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0px 48px 35px -48px rgba(0, 0, 0, 0.1);
  }

  .custum-file-upload .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .icon svg {
    height: 80px;
    fill: rgba(75, 85, 99, 1);
  }

  .custum-file-upload .text {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .text span {
    font-weight: 400;
    color: rgba(75, 85, 99, 1);
  }

  .custum-file-upload input {
    display: none;
  }
`;
export default DashBoard;
