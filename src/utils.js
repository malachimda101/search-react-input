import React from "react";
import { useEffect } from "react";

export const ClickOutsideSearch = (ref, setDisplayDropdown) => {
  useEffect(() => {
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setDisplayDropdown(false);
      }
    }
    document.addEventListener("click", handleOutsideClick);
  }, [ref, setDisplayDropdown]);
};

export const filterOptions = (options, query, caseSensitive) => {
  if (!query) {
    return options;
  }
  return options.filter((option) => {
    const optionLabel = !caseSensitive
      ? option.label.toLowerCase()
      : option.label;
    return optionLabel.slice(0, query.length) === query.toLowerCase();
  });
};
