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



function App() {
  return (
    <>
      <Router>
          <Header/>
          <Routes>
            <Route path="/overview" element={<OverviewRoot />} />
              
            <Route path="/" element={<OverviewRoot />} />
            
          </Routes>

      </Router>
    </>
  );
}

export default App;
