import React from "react";
import Hall from "./components/hall/Hall";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyle } from "./assets/style/GlobalStyle.style";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Hall />
    </div>
  );
}

export default App;
