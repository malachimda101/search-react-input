# search-react-input

# About

The motivation for making search-react-input came when I was practicing my full-stack development skills and I couldn't find a pre-made search bar for my react frontend that looked clean, was customizable, and worked to my likings. I decided to make one myself and this is the result. The component is modeled after the search bar's of Google and Reddit and makes it incredibly easy to dynamically render routes or capture the search term.

# Installation

To install search-react-input run the following command in your terminal.

```
npm i search-react-input
```

## Example

```javascript
import React from "react";
import { useState } from "react";
import Search from "search-box-react";

const countries = [
  { label: "Madagascar", value: "MG" },
  { label: "Malawi", value: "MW" },
  { label: "Malaysia", value: "MY" },
  { label: "Maldives", value: "MV" },
  { label: "Mali", value: "ML" },
  { label: "Malta", value: "MT" },
  { label: "Marshall Islands", value: "MH" },
  { label: "Martinique", value: "MQ" },
  { label: "Mauritania", value: "MR" },
  { label: "Mauritius", value: "MU" },
  { label: "Mayotte", value: "YT" },
  { label: "Mexico", value: "MX" },
];

function App() {
  const [capturedSearch, setCapturedSearch] = useState(null);

  return (
    <div className="App">
      <div className="container">
        <Search
          options={countries}
          onChange={(option, e) => setCapturedSearch(option)}
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
- `onChange(option, e)` - a function that returns the event and the selected option. If the option selected isn't in the option list, option.value will be null
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
