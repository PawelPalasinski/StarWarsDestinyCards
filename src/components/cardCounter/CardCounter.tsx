import React from "react";
import styled from "styled-components";

import useCardCountStore from "../../store/cardCountStore";
import Statistics from "../statistics/Statistics";

const CardAmount = styled.ul`
  list-style: none;
  position: absolute;
  top: 0;
  margin-top: 120px;
  left: 20px;
  color: white;
  mix-blend-mode: difference;
  li {
    margin-right: 10px;
    font-size: 16px;
    font-weight: bold;
  }
  &:last-child {
    margin: 2rem 0;
    margin-left: -40%;
    max-height: 80vh;
  }
`;

function CardCounter() {
  const cardCount = useCardCountStore((state) => state.cardCount);
  const cardRedCount = useCardCountStore((state) => state.cardRedCount);
  const cardYellowCount = useCardCountStore((state) => state.cardYellowCount);
  const cardBlueCount = useCardCountStore((state) => state.cardBlueCount);
  const cardGrayCount = useCardCountStore((state) => state.cardGrayCount);

  return (
    <>
      <CardAmount>
        <li>All: {cardCount}</li>
        <li>Red: {cardRedCount}</li>
        <li>Yellow: {cardYellowCount}</li>
        <li>Blue: {cardBlueCount}</li>
        <li>Gray: {cardGrayCount}</li>
      </CardAmount>
      <Statistics />
    </>
  );
}

export default CardCounter;
