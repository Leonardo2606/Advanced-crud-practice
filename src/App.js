import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Menu from "./components/Menu";
import Cadastro from './components/Cadastro';
import Lista from "./components/Lista";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />}/>
        <Route path='/Cadastro' element={<Cadastro />}/>
        <Route path='/Lista' element={<Lista />}/>
      </Routes>
    </Router>
  );
}

export default App;
