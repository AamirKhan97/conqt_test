import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Main from "./pages/Main";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="container">
        <Main/>
      </div>
    </div>
  );
}

export default App;
