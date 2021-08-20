# search-react-input

<h1>Demo</h1>
```
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

```
