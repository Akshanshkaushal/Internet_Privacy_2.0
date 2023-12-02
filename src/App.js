import logo from './logo.svg';
import './App.css';
import Header from './components/Navbar/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import About from './components/about';
import Home from './Home';

function App() {
  return (
  <>
  <Router>
  <Header/>
  <Routes>
  <Route path = "/" element={<Home/>}/>
    <Route path = "/about" element={<About/>}/>
  </Routes>
  </Router>
   </>
  );
}

export default App;
