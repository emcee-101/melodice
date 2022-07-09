import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import OverviewRoot from './routes/overview/overviewRoot'



function App() {
  return (

    <Router>
        <Routes>
          <Route path="/overview" element={<OverviewRoot />} />
            
          <Route path="/" element={<OverviewRoot />} />
          
        </Routes>

    </Router>
  );
}

export default App;
