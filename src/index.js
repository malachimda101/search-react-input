import React from "react";
import { useState, useRef } from "react";
import PropTypes from "prop-types";
import "./search.css";
import { ClickOutsideSearch, filterOptions } from "./utils";

const Search = ({
  options,
  onChange,
  placeholder,
  className,
  width,
  spellCheck,
  inputClassName,
  hoverColor,
  font,
  caseSensitive,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef(null);
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [keyCursor, setKeyCursor] = useState(-1);
  const [mouseCursor, setMouseCursor] = useState(-1);
  const [displayDropdown, setDisplayDropdown] = useState(
    searchTerm.length > 0 ? true : false
  );
  ClickOutsideSearch(searchRef, setDisplayDropdown);
  const filteredOptions = filterOptions(options, searchTerm, caseSensitive);

  const handleSearchBarChange = (e) => {
    e.target.value.length > 0
      ? setDisplayDropdown(true)
      : setDisplayDropdown(false);
    tempSearchTerm.length > 0 && setTempSearchTerm("");
    setSearchTerm(e.target.value);
    setKeyCursor(-1);
    setMouseCursor(-1);
  };

  const handleKeyPress = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      keyCursor > 0
        ? setTempSearchTerm(filteredOptions[keyCursor - 1].label)
        : setTempSearchTerm("");
      keyCursor > -1 && setKeyCursor((keyCursor) => keyCursor - 1);
    } else if (
      e.key === "ArrowDown" &&
      keyCursor < filteredOptions.length - 1 &&
      keyCursor < 4
    ) {
      e.preventDefault();
      setTempSearchTerm(filteredOptions[keyCursor + 1].label);
      setKeyCursor((keyCursor) => keyCursor + 1);
    } else if (e.key === "Enter") {
      let newOption = { label: searchTerm, value: null };
      keyCursor > -1
        ? onChange(filteredOptions[keyCursor], e.key)
        : onChange(newOption, e.key);
      setSearchTerm("");
      setTempSearchTerm("");
      setDisplayDropdown(false);
    }
  };

  const handleSearchClick = (e) => {
    setSearchTerm("");
    setTempSearchTerm("");
    let selected = filteredOptions[e.target.id];
    onChange(selected, "Click");
    setDisplayDropdown(false);
  };

  const handleMouseEnter = (e) => {
    let selected = filteredOptions[e.target.id];
    setTempSearchTerm(selected.label);
    console.log(e);
    setMouseCursor(Number(e.target.id));
    setKeyCursor(Number(e.target.id));
  };

  return (
    <div className={className} ref={searchRef} style={{ width: width }}>
      <input
        style={{ width: width, font: font }}
        className={inputClassName}
        value={tempSearchTerm.length > 0 ? tempSearchTerm : searchTerm}
        onChange={(e) => handleSearchBarChange(e)}
        placeholder={placeholder}
        onKeyDown={(e) => handleKeyPress(e)}
        spellCheck={spellCheck}
      />
      {filteredOptions.length !== 0 &&
      searchTerm.length !== 0 &&
      displayDropdown ? (
        <div className="search-list-container">
          <ul
            className="search-list"
            style={{ width: width, listStyle: "none" }}
          >
            {filteredOptions.map(
              (option, idx) =>
                idx < 5 && (
                  <li
                    style={
                      keyCursor === idx || mouseCursor === idx
                        ? { background: hoverColor }
                        : { background: "white" }
                    }
                    className={
                      keyCursor === idx || mouseCursor === idx
                        ? "search-list-item-active"
                        : "search-list-item"
                    }
                    key={idx}
                    id={idx}
                    onClick={(e) => handleSearchClick(e)}
                    onMouseEnter={(e) => handleMouseEnter(e)}
                    onMouseLeave={() => setMouseCursor(-1)}
                  >
                    {option.label}
                  </li>
                )
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

Search.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  width: PropTypes.string,
  spellCheck: PropTypes.bool,
  hoverColor: PropTypes.string,
  font: PropTypes.string,
  caseSensitive: PropTypes.bool,
};

Search.defaultProps = {
  options: [],
  onChange() {},
  placeholder: "Search",
  className: "search-bar-container",
  inputClassName: "search-bar",
  width: "50vw",
  spellCheck: false,
  hoverColor: "#e9e9e9",
  font: "Georama",
  caseSensitive: false,
};
export default Search;
