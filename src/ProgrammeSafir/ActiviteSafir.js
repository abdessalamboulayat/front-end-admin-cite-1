import { Divider, Grid, IconButton,Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LeftBar from '../Component/LeftBar';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import NavBar from '../Component/NavBar';
import './safir.css';
import axios from 'axios';
import ActiviteSafirCard from './ActiviteSafirCard';

function ActiviteSafir(){
    const [openForm, setOpenForm] = useState();
    const [activites, setActivites] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8035/api/activiteSafir/getAllActivities")
        .then((res)=>setActivites(res.data));
    }, []);

    return(
        <div>
            <div className='navBar'>
                <NavBar />
            </div>
            <Grid container>
                <div className="leftBar">
                    <Grid xs={2} md={2} sm={2} mt={8}>
                        <LeftBar />
                    </Grid>
                </div>
                <Grid xs={10} md={10} sm={10} mt={8} className="content"> 
                    <div className="event">
                    <h2>ACTIVITÉS SAFIR</h2> 
                    
                    </div>
                    <Divider />
                    <div style={{padding: '10px'}}>
                        <Grid container>
                                {
                                    activites.map((activite)=>(
                                        <Grid key={activite.id} sm={5} md={4} xl={3} height='320px'>
                                            <ActiviteSafirCard activites={activite}/>
                                        </Grid>
                                    ))
                                }
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default ActiviteSafir;