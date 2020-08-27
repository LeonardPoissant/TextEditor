import React, { useRef, useState, useEffect } from "react";

/*function useOutsideAlerter(ref) {
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowMenu(false);
        console.log("HERE???OUTSIDEREF", showMenu);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    console.log("HERE???ADD", showMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      console.log("HERE???REMOVE");
    };
  }, [ref]);
}

const OutsideMenuClick = (props) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  console.log("IN ALERTER");

  return <div ref={wrapperRef}>{props.children}</div>;
};
export default OutsideMenuClick; */

function useVisible(initialIsVisible) {
  const [isVisible, setIsVisible] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isVisible, setIsVisible };
}

export default useVisible;
