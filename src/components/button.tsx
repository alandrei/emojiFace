import React from "react";

const buttonStyle = {
  active: {
    color: "#333",
    backgroundColor: "azure",
    border: "1px solid #222",
    borderRadius: "30px",
    padding: "5px 10px",
    position: "absolute" as "absolute",
    margin: "5px"
  },
  absolute: {
    top: "50px",
    left: "50%",
    zIndex: 999,
    transform: "translateX(-50%)"
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
  absolute?: boolean;
}

const Button: React.SFC<ButtonProps> = props => (
  <button
    style={{
      ...buttonStyle.active,
      ...(props.disabled ? buttonStyle.disabled : {}),
      ...(props.absolute ? buttonStyle.absolute : {})
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
