import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Menu from "./components/Menu";
import Register from './components/Register';
import List from "./components/List";
import {Provider} from 'react-redux';
import store from './redux/store.js';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Menu />}/>
          <Route path='/Register' element={<Register />}/>
          <Route path='/List' element={<List />}/>
        </Routes>
      </Router>   
    </Provider>
     
  );
}

export default App;
