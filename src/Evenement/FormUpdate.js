import { Stack, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import './evenement.css';
import axios from "axios";

function FormUpdate(props){

    const [event, setEvent] = useState();
    const [titre, setTitre] = useState();
    const [text, setText] = useState();
    const [file, setFile] = useState(null);
    const [dateEvent, setDateEvent] = useState();
    useEffect(()=>{
        axios.get(`http://localhost:8035/api/v1/evenement/getEventById/${props.idEvent}`)
        .then((res)=>{
                setEvent(res.data); 
                setTitre(res.data.titre); 
                setText(res.data.texte); 
                setDateEvent(res.data.date)});
    }, []);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const jwt = localStorage.getItem("token");

    function submit(e){
        e.preventDefault();
        let formData = new FormData();
        formData.append("titre", titre);
        formData.append("texte", text);
        formData.append("date", dateEvent);
        fetch(`http://localhost:8035/api/admin/updateEvent/${props.idEvent}`,{
            method: 'put',
            headers: new Headers({
                'Access-Control-Allow-Origin': 'http://localhost:3006',
                'Authorization': 'Bearer '+jwt,
                //'content-type': 'multipart/form-data;boundary=---WebKitFormBoundary7MA4YWxkTrZu0gW'
            }
            ),
            body: formData
        })
        .then((res)=>{
                setMessage("L'événement est modifié avec succés");
                setTitre('');
                setText('');
                setFile(null);
                setDateEvent(''); 
                window.location.href='/evenements';
        }).catch((error)=>setError("Erreur! Veuillez ressayer à nouveau"));
    }
    return(
       <div className="form_container">
            {props.openForm?<form onSubmit={submit}>
            <Stack className="form" direction={"column"} margin={'auto'} width={'50%'} spacing={4} >
                <Stack>
                    {message!=null?<p style={{color:'green'}}>{message}</p>:null}
                    {error!=null?<p style={{color:'red'}}>{error}</p>:null}
                </Stack>
                <Stack>
                    <TextField 
                        id="outlined-name"
                        label="Titre"
                        value={titre}
                        required
			            focused
                        onChange={(e)=>setTitre(e.target.value)}
                    />
                </Stack>
                
                <Stack>
                    <TextField 
                        id="outlined-name"
                        label="Date"
                        type={"date"}
                        //value={dateEvent}
                        required
			focused
                        //onChange={(e)=>setDateEvent(e.target.value)}
			onChange={(e)=>{
                            const dateValue = e.target.value.replace(/-/g, "/");
                            setDateEvent((prev)=>dateValue);
                            console.log(dateValue)
                        }}
                    />
                </Stack>
                <Stack>
                    <TextField 
                        id="outlined-name"
                        label="Description"
                        value={text}
                        required
			            focused
                        multiline
                        minRows={4}
                        maxRows={6}
                        onChange={(e)=>setText(e.target.value)}
                    />
                </Stack>
                        <Stack direction={'row'} spacing={4} width={'50%'}>
                            <Button
                                    className="btn-choose"
                                    variant="contained"
                                    // component="span"
                                    type="submit" >
                                    Modifier
                            </Button>
                            {props.annuler}
                        </Stack>
            </Stack>
            </form>:null}
        </div>
    )
}

export default FormUpdate;