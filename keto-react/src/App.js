import logo from "./logo.svg";
import styled from "styled-components";
import "./App.css";

const Button = styled.button``;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Reacaca
        </a>
        <Button>Mygtukas</Button>
      </header>
    </div>
  );
}

export default App;
