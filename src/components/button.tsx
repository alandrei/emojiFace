import React from "react";

const buttonStyle = {
  active: {
    color: "#333",
    backgroundColor: "azure",
    boxShadow: "0 0 20px 1px black",
    borderRadius: "30px",
    padding: "5px 10px",
    margin: "15px"
  },
  disabled: {
    color: "#AAA",
    backgroundColor: "#CCC"
  }
};

interface ButtonProps {
  label: String;
  onClick(): void;
  disabled?: boolean;
}

const Button: React.SFC<ButtonProps> = props => (
  <button
    style={{
      ...buttonStyle.active,
      ...(props.disabled ? buttonStyle.disabled : {})
    }}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.label}
  </button>
);

Button.defaultProps = {
  disabled: false
};

export default Button;
