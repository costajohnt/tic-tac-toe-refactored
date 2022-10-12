import * as React from "react";
import { SquareValue } from "../Types";

interface Props {
  onClick: () => void;
  value: SquareValue;
}

const Square: React.FC<Props> = ({ onClick, value }) => (
  <button className="square" onClick={() => onClick()}>
    {value}
  </button>
);

export default Square;
