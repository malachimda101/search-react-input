# search-react-input

# Installation

To install search-react-input, in your terminal, run the command

```
npm i search-react-input
```

## Example

```javascript
import React from "react";
import { useState } from "react";
import countries from "./countries";
import Search from "search-box-react";

const options = [];
countries.map((country) =>
  options.push({ label: country.name, value: country.code })
);

function App() {
  // const [searchTerm, setSearchTerm] = useState("");
  const [capturedSearch, setCapturedSearch] = useState(null);

  return (
    <div className="App">
      <div className="container">
        <Search
          options={options}
          onChange={(e, option) => setCapturedSearch(option)}
        />
      </div>
      <div style={{ marginTop: "5vh" }} className="hello">
        <h1>
          {capturedSearch && "Hello and welcome to " + capturedSearch.label}
        </h1>
      </div>
    </div>
  );
}

export default App;
```

## Props

- `options` - an array of label, value objects that the search bar filters through
- `onChange(e, option)` - a function that returns the event and the selected option
- `placeholder` - default text for the search bar, default is "Search"
- `className` - apply a className to the input container, default is "search-bar-container"
- `width` - specify a width for the search bar and the dropdown list, must be a string, default is "50vw"
- `spellcheck` - specify whether the search bar includes red underlines for misspelled words, default is false
- `inputClassName` - apply a className to the input, default is "search-bar"
- `hoverColor` - specifies the color of the highlighted option, defualt is "#e9e9e9"
- `font` - specifies the font, default is "Georama"
- `caseSensitive` - specifies whether or not the search filter takes into account the case of characters, default is false

## Styles

search-react-input comes with default styles that can be overridden by the creation of a new css files. Classnames for the respective jsx elements can be found in the github repository.

## License

MIT Licensed. Copyright (c) Malachi Ashley 2021.
