import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Register from './components/Register';
import List from "./components/List";
import {Provider} from 'react-redux';
import store from './redux/store.js';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/'  element={<List />}/>
          <Route path='/Register' element={<Register />}/>
        </Routes>
      </Router>   
    </Provider>
     
  );
}

export default App;
