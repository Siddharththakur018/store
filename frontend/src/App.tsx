import "./App.css";
import Home from "./pages/Home";
import {  Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";

function App() {
  return (
    <>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
        </Routes>

    </>
  );
}

export default App;
