import "./App.css";
import Register from "./modules/register/Register";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='signup-page' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
