import React from "react";
import styled from "styled-components";

const SvgContainer = styled.svg`
  fill: #ffd700;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  transition: transform 0.2s ease-in-out;
  width: 20px;
  height: 20px;

  &:hover {
    transform: scale(1.1);
    fill: #fff;
  }
`;

const Fullscreen = () => {
  return (
    <SvgContainer
      fill="#000000"
      viewBox="-5 -5 60.00 60.00"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M2 15.758v-13.758h14.299l5.262 4h-8.769l9.208 9.758-5.701 5.242-9.299-8.749v8.769zm31.752-13.758h14.248v13.809l-4 5.261v-8.768l-10.003 9.208-5.364-5.456 8.626-9.054h-8.769zm14.248 31.752v14.248h-14.299l-5.262-4h8.769l-9.208-10.003 5.701-5.364 9.299 8.626v-8.769zm-31.752 14.248h-14.248v-14.299l4-5.262v8.769l10.003-9.208 5.364 5.701-8.626 9.299h8.769z"></path>
      </g>
    </SvgContainer>
  );
};

export default Fullscreen;
