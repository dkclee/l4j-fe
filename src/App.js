import './App.css';
import Routes from './Routes';
import Navigation from './Navigation';
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes
          user={user}
          login={login}
          signup={signup}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
