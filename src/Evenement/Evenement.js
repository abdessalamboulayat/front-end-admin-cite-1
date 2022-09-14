import { Divider, IconButton, Tooltip,Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { DataGrid } from '@mui/x-data-grid';
import Form from './Form';
import axios from "axios";
import LeftBar from "../Component/LeftBar";
import NavBar from "../Component/NavBar";
import EvenementCard from "./EvenementCard";

function Evenement(){
    const jwt = localStorage.getItem("token");
    const [openForm, setOpenForm] = useState(false);

    function clickButton(id){
        alert("clicked " + id);
    }
    const [events, setEvents] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:8035/api/v1/evenement/getAllEvent")
        .then((res)=>(setEvents(res.data)))}
    ,[]);

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
            <div className="event">
                <h2>ÉVÉNEMENTS</h2> 
                <Tooltip title="Ajouter un nouveau événement">
                    <IconButton>
                        <AddCircleRoundedIcon onClick={()=>setOpenForm(true)} className="iconAdd" fontSize="large"/>
                    </IconButton>
                </Tooltip>
            </div>
            <Divider /> 
            <div style={{padding: '10px'}}>
                <Grid container>
                        {
                            events.map((event)=>(
                                <Grid key={event.id} sm={5} md={4} xl={3} height='320px'>
                                    <EvenementCard evenement={event}/>
                                </Grid>
                            ))
                        }
                </Grid>
            </div>
            {openForm?<Form className="form" openForm={openForm} update={false} annuler={<Button
                                    className="btn-choose"
                                    variant="contained"
                                    color="error"
                                    component="span" 
                                    onClick={()=>setOpenForm(false)}
                                    >
                                    Annuler
                            </Button>}/>:''}
            </Grid>
            </Grid>
            
        </div>
    )
}

export default Evenement;