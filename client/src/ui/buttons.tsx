import React from "react";

type BaseButtonProps = {
  onClick?: () => void;
  className?: string;
};

type ConfirmButtonProps = BaseButtonProps & {};

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="py-1 px-5 bg-green font-medium text-white font-ui rounded-md shadow-md hover:bg-dark-green active:bg-light-green focus:outline-none"
    >
      {children}
    </button>
  );
};

type CancelButtonProps = BaseButtonProps & {};

export const CancelButton: React.FC<CancelButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`py-none px-2 bg-red text-white font-medium font-ui rounded-md hover:bg-dark-red active:bg-light-red focus:outline-none ${
        className ?? ""
      }`}
    >
      {children}
    </button>
  );
};
