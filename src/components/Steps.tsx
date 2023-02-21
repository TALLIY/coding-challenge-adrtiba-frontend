import React from "react";
import { Container } from "reactstrap";
import { IStepsProps } from "../constants/types/components";

const Steps: React.FunctionComponent<IStepsProps> = (props) => {
  const { children } = props;

  return (
    <ul className="steps steps-vertical">
      <li className={children.selected ? "step step-primary" : "step"}>
        {children.date}
      </li>
    </ul>
  );
};

export default Steps;
