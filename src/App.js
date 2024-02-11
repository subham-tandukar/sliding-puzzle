import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Index from "./components/Index";
import MainState from "./components/context/MainState";
import SlidingPuzzle from "./components/SlidingPuzzle";

function App() {
  return (
    <>
      <MainState>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sliding-own-puzzle" element={<SlidingPuzzle />} />
        </Routes>
      </MainState>
    </>
  );
}

export default App;
