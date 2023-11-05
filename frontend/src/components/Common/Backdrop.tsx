import React from "react";
import ReactDOM from "react-dom";

interface IBackdropProps {
  show?: boolean;
  onClick?: () => void;
}

const Backdrop: React.FC<IBackdropProps> = ({ show = true, onClick }) => {
  return ReactDOM.createPortal(
    show ? (
      <div
        onClick={onClick}
        className="fixed z-50 inset-0 bg-transparent"
      ></div>
    ) : null,
    document.getElementById("custom-backdrop")!
  );
};

export default Backdrop;
