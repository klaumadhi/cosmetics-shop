import React from "react";

const Button = React.forwardRef(
  (
    {
      children,
      onClick,
      type = "button",
      disabled = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClass =
      "bg-pink-700 text-white font-bold py-2 px-4 border-b-4 border-pink-950 rounded transition-transform transform active:scale-95";

    const hoverClass = "hover:bg-pink-800 hover:border-pink-900";
    const disabledClass = "opacity-50 cursor-not-allowed";

    return (
      <button
        ref={ref}
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`${baseClass} ${hoverClass} ${
          disabled ? disabledClass : ""
        } ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
