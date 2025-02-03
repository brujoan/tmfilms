import React from "react";

const ScrollLink = ({ targetId, buttonText }) => {
  const scrollToTarget = () => {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button onClick={scrollToTarget}>
      {buttonText}
    </button>
  );
};

export default ScrollLink;