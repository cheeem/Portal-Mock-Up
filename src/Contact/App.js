import './App.css';
import { Route, Routes } from 'react-router-dom';
import Nav from './Nav/Nav.js';
import Home from './Home/Home.js';
import About from './About/About.js';
import Products from './Products/Products.js';

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;