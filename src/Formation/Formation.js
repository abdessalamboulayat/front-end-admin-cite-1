import { Divider, IconButton, Tooltip,Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { DataGrid } from '@mui/x-data-grid';
import Form from './Form';
import axios from "axios";
import LeftBar from "../Component/LeftBar";
import NavBar from "../Component/NavBar";
// import Dialog from "./Dialog";
import FormationCard from "./FormationCard";

function Formation(){
    const jwt = localStorage.getItem("token");
    const [openForm, setOpenForm] = useState(false);

    function clickButton(id){
        alert("clicked " + id);
    }
    const [formations, setFormations] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:8035/api/v1/formation/getFormation")
        .then((res)=>{setFormations(res.data); console.log(res.data)})}
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
                <h2>FORMATION</h2>
                <Tooltip title="Ajoutez une nouvelle formation">
                    <IconButton>
                        <AddCircleRoundedIcon onClick={()=>setOpenForm(true)} className="iconAdd" fontSize="large"/>
                    </IconButton>
                </Tooltip>
            </div> 
            <Divider />
            <div style={{padding: '10px'}}>
                <Grid container>
                        {
                            formations.map((formation)=>(
                                <Grid key={formation.id} xs={4} height='320px'>
                                    <FormationCard formation={formation}/>
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

export default Formation;