import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Header from "./components/Header";
import OverviewRoot from './routes/overview/overviewRoot'
import Play from './routes/play/play'
import Save from './components/Save/save'
import LandingPage from './components/LandingPage/LandingPage'

function App() {
  return (
    <>
      
      <Router>
          <Header/>
          <Routes>
            <Route path="/overview" element={<OverviewRoot />} />
              
            <Route path="/overview/:trackid" element={<OverviewRoot />} />

            <Route path="/" element={<Play />} />

            <Route path="/play" element={<Play />} />

            <Route path="/save" element={<Save />} />

            <Route path="/landingpage/:trackid" element={<LandingPage />} />

            
          </Routes>

      </Router>
    </>
  );
}

export default App;
