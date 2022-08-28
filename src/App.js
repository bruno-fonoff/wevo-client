import { Route, Routes } from "react-router-dom";
import "./App.css";
import { SignUp } from "./pages/SignUp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/user/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
