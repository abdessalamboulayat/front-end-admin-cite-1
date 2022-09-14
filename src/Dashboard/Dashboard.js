import { Divider, Grid, Stack } from '@mui/material';
import React, { useState } from 'react';
import axios from "axios";
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import ArticleIcon from '@mui/icons-material/Article';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from "react-router-dom";
import './dashboard.css';
import NavBar from '../Component/NavBar';
import LeftBar from '../Component/LeftBar';
import Chart from '../Component/Chart';

function Dashboard(){
    
    const [numberConsultation, setNumberConsultation] = useState()
    axios
      .get(`http://localhost:8035/api/v1/Consultation/count/`)
      .then((res) => {
        setNumberConsultation(res.data)
      })
      .catch(function (error) {
        console.log(error);
      });
      const [numberEvent, setNumberEvent] = useState();
    axios
      .get(`http://localhost:8035/api/v1/evenement/count/`)
      .then((res) => {
        setNumberEvent(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  
    const [numberFormation, setNumberFormation] = useState("");
    axios
      .get(`http://localhost:8035/api/v1/formation/count/`)
      .then((res) => {
        setNumberFormation(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  
    const [numberFormulaire, setNumberFormulaire] = useState("");
    axios
      .get(`http://localhost:8035/api/v1/formulaire/count/`)
      .then((res) => {
        setNumberFormulaire(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  
    const [numberContact, setNumberContact] = useState("");
    axios
      .get(`http://localhost:8035/api/v1/contact/count/`)
      .then((res) => {
        setNumberContact(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
      const [numberActiviteSafir, setNumberActiviteSafir] = useState("");
      axios.get(`http://localhost:8035/api/activiteSafir/count`)
      .then((res)=>{
        setNumberActiviteSafir(res.data);
      })
      .catch((error)=>console.log(error));

    return(
        <div>
            <div className="navBar">
                <NavBar />
            </div>
            <Grid container>
                <div className="leftBar">
                    <Grid xs={2} md={2} sm={2} mt={8}>
                        <LeftBar />
                    </Grid>
                </div>
            <Grid xs={10} md={10} sm={10} mt={8} className="content">
                <div className="title">
                    <h2>DASHBOARD</h2>
                </div>
            <Divider />
            <Grid container>
                <Grid  sm={5} md={4} xl={3} m={'auto'}>
                    <div className="card">
                        <div className="cardElement">
                            <div className="cardElement1">
                                <h3>EVENEMENTS</h3>
                                <h6 className="">{numberEvent}</h6>
                            </div>
                            <EventAvailableRoundedIcon className='icon'/>
                        </div>
                        <Link to="/evenements">
                            <span>Voir tout ...</span>
                        </Link>
                    </div>
                </Grid>
                <Grid  sm={5} md={4} xl={3} m={'auto'}>
                    <div className="card">
                        <div className="cardElement">
                            <div className="cardElement1">
                                <h3>FORMATIONS</h3>
                                <h6 className="">{numberFormation}</h6>
                            </div>
                            <SchoolRoundedIcon className='icon'/>
                        </div>
                        <Link to="/formations">
                            <span>Voir tout ...</span>
                        </Link>
                    </div>
                </Grid>
                <Grid sm={5} md={4} xl={3} m={'auto'}>
                    <div className="card">
                        <div className="cardElement">
                            <div className="cardElement1">
                                <h3>INCUBATION</h3>
                                <h6 className="">{numberFormulaire}</h6>
                            </div>
                            <ArticleIcon className='icon'/>
                        </div>
                        <Link to="/incubation">
                            <span>Voir tout ...</span>
                        </Link>
                    </div>
                </Grid>
                <Grid sm={5} md={4} xl={3} m={'auto'}>
                    <div className="card">
                        <div className="cardElement">
                            <div className="cardElement1">
                                <h3>ACTIVITÉS SAFIR</h3>
                                <h6 className="">{numberActiviteSafir}</h6>
                            </div>
                            <EventAvailableRoundedIcon className='icon'/>
                        </div>
                        <Link to="/activiteSafir">
                            <span>Voir tout ...</span>
                        </Link>
                    </div>
                </Grid>
                <Grid sm={5} md={4} xl={3} m={'auto'}>
                    <div className="card">
                        <div className="cardElement">
                            <div className="cardElement1">
                                <h3>CONSULTATION</h3>
                                <h6 className="">{numberConsultation}</h6>
                            </div>
                            <SensorOccupiedIcon className='icon'/>
                        </div>
                        <Link to="/consultation">
                            <span>Voir tout ...</span>
                        </Link>
                    </div>
                </Grid>
                <Grid sm={5} md={4} xl={3} m={'auto'}>
                    <div className="card">
                        <div className="cardElement">
                            <div className="cardElement1">
                                <h3>CONTACT</h3>
                                <h6 className="">{numberContact}</h6>
                            </div>
                            <PermContactCalendarIcon className='icon'/>
                        </div>
                        <Link to="/activiteSafir">
                            <span>Voir tout ...</span>
                        </Link>
                    </div>
                </Grid>
                <Grid sm={10} md={10} xl={10} m={'auto'}>
                    <Chart />
                </Grid>
            </Grid>
            </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard;