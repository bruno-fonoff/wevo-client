import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Edit } from "./pages/Edit";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { SignUp } from "./pages/SignUp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/:id" element={<Profile />} />
        <Route path="/user/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
