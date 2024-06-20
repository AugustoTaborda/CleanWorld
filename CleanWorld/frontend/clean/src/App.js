import './App.css';

import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { Cadastro } from './pages/cadastro';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Cadastro/> }/>
      </Routes>
    </Router>

  );
}

export default App;
