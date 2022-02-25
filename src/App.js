import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Menu from "./components/Menu";
import Cadastro from './components/Cadastro';
import Lista from "./components/Lista";
import {Provider} from 'react-redux';
import store from './redux/store.js';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Menu />}/>
          <Route path='/Cadastro' element={<Cadastro />}/>
          <Route path='/Lista' element={<Lista />}/>
        </Routes>
      </Router>   
    </Provider>
     
  );
}

export default App;
