import "./App.css";
import Login from "./modules/login/Login";
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
          <Route path='/login-page' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
