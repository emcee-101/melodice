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
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
        integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
        crossorigin="anonymous"
      />
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
