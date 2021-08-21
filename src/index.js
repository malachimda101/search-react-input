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
  const [cursor, setCursor] = useState(-1);
  const [displayDropdown, setDisplayDropdown] = useState(
    searchTerm.length > 0 ? true : false
  );
  ClickOutsideSearch(searchRef, setDisplayDropdown);
  const filteredOptions = filterOptions(options, searchTerm, caseSensitive);

  function handleSearchBarChange(e) {
    e.target.value.length > 0
      ? setDisplayDropdown(true)
      : setDisplayDropdown(false);
    tempSearchTerm.length > 0 && setTempSearchTerm("");
    setSearchTerm(e.target.value);
    setCursor(-1);
  }

  function handleKeyPress(e) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      cursor > 0
        ? setTempSearchTerm(filteredOptions[cursor - 1].label)
        : setTempSearchTerm("");
      cursor > -1 && setCursor((cursor) => cursor - 1);
    } else if (
      e.key === "ArrowDown" &&
      cursor < filteredOptions.length - 1 &&
      cursor < 4
    ) {
      e.preventDefault();
      setTempSearchTerm(filteredOptions[cursor + 1].label);
      setCursor((cursor) => cursor + 1);
    } else if (e.key === "Enter") {
      let newOption = { label: searchTerm, value: null };
      cursor > -1
        ? onChange(filteredOptions[cursor], e)
        : onChange(newOption, e);
      setSearchTerm("");
      setTempSearchTerm("");
      setDisplayDropdown(false);
    }
  }

  function handleSearchClick(e) {
    setSearchTerm("");
    setTempSearchTerm("");
    let selected = { label: e.target.innerHTML, value: e.target.id };
    onChange(selected, e);
    setDisplayDropdown(false);
  }

  return (
    <div className={className} ref={searchRef}>
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
                      cursor === idx
                        ? { background: hoverColor }
                        : { background: "white" }
                    }
                    className={
                      cursor === idx
                        ? "search-list-item-active"
                        : "search-list-item"
                    }
                    key={idx}
                    id={option.value}
                    onClick={(e) => handleSearchClick(e)}
                    onMouseEnter={() => setCursor(idx)}
                    onMouseLeave={() => setCursor(-1)}
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
