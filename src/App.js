import logo from './logo.svg';
import './App.css';
// import Form from './Form';
// import ListEvenement from './evenement1/ListEvenement';
// import NavBar from './Component/NavBar';
// import LeftBar from './Component/LeftBar';
import { Grid } from '@mui/material';
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './Dashboard/Dashboard';
import Evenement from './Evenement/Evenement';
import Login from './Login/Login';
import Layout from './Layout';
import Formation from './Formation/Formation';
import Incubation from './DemandeIncubation/Incubation';
import Safir from './ProgrammeSafir/Safir';
import ActiviteSafir from './ProgrammeSafir/ActiviteSafir';
import PrivateRoutes from './utils/PrivateRoutes';
import Consultation from './Consultation/Consultation';
import Contact from './Contact/Contact';

function App() {
  return (
    <>
   
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<PrivateRoutes />}>
        <Route path='/' element={<Navigate replace to="dashboard"/>} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path="/evenements" element={<Evenement />} />
        <Route path="/formations" element={<Formation />} />
        <Route path="/incubation" element={<Incubation />} />
        <Route path='/safir' element={<Safir />} />
        <Route path='/activiteSafir' element={<ActiviteSafir />} />
        <Route path='/consultation' element={<Consultation />} />
        <Route path='/contact' element={<Contact />} />
      </Route>
    </Routes>
</>
  );
}

export default App;
