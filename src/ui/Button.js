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
      "bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded";

    return (
      <button
        ref={ref}
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`${baseClass} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
