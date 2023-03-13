import React, { useState } from "react";
import "./HomePage.scss";
import Register from "../../components/Register";

interface IProps {
  msg: string;
}

export const HomePage: React.FC<IProps> = ({ msg }) => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Register />
    </>
  );
};
