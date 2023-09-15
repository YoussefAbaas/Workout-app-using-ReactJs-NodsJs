import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { WorkoutsProvider } from "./contexts/WorkoutsContext";
function App() {
  return (
    <WorkoutsProvider>
      <div className="App">
        <Router>
          <NavBar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </Router>
      </div>
    </WorkoutsProvider>
  );
}

export default App;
