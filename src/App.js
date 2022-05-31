import React from "react";
import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";

//pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  // const [isLogin, setIsLogin] = useState(false);
  // console.log("state is login", isLogin);

  return (
    <div className="App">
      <NavbarComponent />
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
