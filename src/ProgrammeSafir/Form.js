import { Stack, TextField, Button } from "@mui/material";
import { DatePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import dayjs from 'dayjs';
import React, { useState } from "react";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ArticleIcon from '@mui/icons-material/Article';
import MaterialUIPickers from "../MaterialUIPickers";
import axios from "axios";

function Form(props){

    const [nom, setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [email, setEmail] = useState();
    const [telephone, setTelephone] = useState();
    const [error, setError] = useState();
    const jwt = localStorage.getItem("token");

    function submit(e){
        e.preventDefault();
        const formData = {
                    nomSafir: nom,
                    prenomSafir: prenom,
                    username: email,
                    telephone: telephone,
                }
        axios.post("http://localhost:8035/api/admin/addNewSafir",formData,{
            headers:{
                'Authorization': 'Bearer '+jwt,
                'Content-Type': 'application/json'
            }
        })
        .then((res)=>{
            if(res.status === 200){
                setNom('');
                setPrenom('');
                setEmail('');
                setTelephone('');
                window.location.href='/safir';
            }
            else{
                setError("Error! Veuillez ressayez");
            }
        });
    }

    return(
       <div className="form_container">
            {props.openForm?<form onSubmit={submit}>
            <Stack className="form" direction={"column"} margin={'auto'} width={'50%'} spacing={4} >
                <Stack>
                    <p style={{color:'red'}}>{error}</p>
                </Stack>
                <Stack direction={"row"} spacing={4}>
                    <TextField 
                        id="outlined-name"
                        label="Nom"
                        fullWidth
                        required
                        value={nom}
                        onChange={(e)=>setNom(e.target.value)}
                    />
                    <TextField 
                        id="outlined-name"
                        label="Prénom"
                        fullWidth
                        required
                        value={prenom}
                        onChange={(e)=>setPrenom(e.target.value)}
                    />
                </Stack>
                <Stack direction={"row"} spacing={4}>
                    <TextField 
                        id="outlined-name"
                        label="Email"
                        type={"email"}
                        fullWidth
                        required
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <TextField 
                        id="outlined-name"
                        label="Téléphone"
                        type={"tel"}
                        fullWidth
                        required
                        value={telephone}
                        onChange={(e)=>setTelephone(e.target.value)}
                    />
                </Stack>
                    <Stack direction={'row'} spacing={4} width={'50%'}>
                        <Button
                            className="btn-choose"
                            variant="contained"
                            type="submit" >
                            Ajouter
                        </Button>
                        {props.annuler}
                    </Stack>
            </Stack>
            </form>:null}
        </div>
    )
}

export default Form;