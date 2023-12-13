import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from './pages/Home';
import Login from './pages/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import SignUp from './pages/SignUp.jsx';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
