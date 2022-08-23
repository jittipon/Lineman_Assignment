import React, { useState } from 'react';
import { BsFillArrowUpSquareFill } from 'react-icons/bs';
import '../style/_mixin.scss'

const ScrollButton = () => {

  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true)
    }
    else if (scrolled <= 300) {
      setVisible(false)
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  window.addEventListener('scroll', toggleVisible);

  return (
    <div>
      <BsFillArrowUpSquareFill onClick={scrollToTop}
        style={{ display: visible ? 'inline' : 'none', cursor: "pointer",
        color: "#317fcc", fontSize: "3rem", position: "fixed", bottom: "40px", zIndex: "1", left: "95%" }} />
    </div>
  );
}

export default ScrollButton;