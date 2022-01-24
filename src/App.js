import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Menu from "./components/Menu";
import Cadastro from './components/Cadastro';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />}/>
        <Route path='/Cadastro' element={<Cadastro />}/>
      </Routes>

    </Router>
  );
}

export default App;
