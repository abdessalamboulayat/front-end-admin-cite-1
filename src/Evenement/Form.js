import { Stack, TextField, Button } from "@mui/material";
import { DatePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import dayjs from 'dayjs';
import React, { useState } from "react";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ArticleIcon from '@mui/icons-material/Article';
import MaterialUIPickers from "../MaterialUIPickers";
import './evenement.css';

function Form(props){

    // setOpenForm(props.openForm);
    const [titre, setTitre] = useState("");
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [dateEvent, setDateEvent] = useState("");
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const jwt = localStorage.getItem("token");

    // const handleChange = (newValue) => {
    //   setValue(newValue);
    // };

    function submit(e){
        e.preventDefault();
        let formData = new FormData();
        formData.append("titre", titre);
        formData.append("texte", text);
        formData.append("file", file);
        formData.append("date", dateEvent);
        fetch("http://localhost:8035/api/admin/addNewEvent",{
            method: 'post',
            headers: new Headers({
                'Access-Control-Allow-Origin': 'http://localhost:3006',
                'Authorization': 'Bearer '+jwt,
            }
            ),
            body: formData
        })
        .then((res)=>{
                setMessage("Nouveau événement est ajouté avec succés");
                setTitre('');
                setText('');
                setFile(null);
                setDateEvent('');
                window.location.href='/evenements';
        }).catch((error)=>setError('Error! Veuillez ressayer à nouveau'));
    }
    function handleCh(e){
        console.log(e.target.value);
    }
    
    return(
       <div className="form_container">
            {props.openForm?<form onSubmit={submit}>
            <Stack className="form" direction={"column"} margin={'auto'} width={'50%'} spacing={4} >
                <Stack>
                    <p style={{color: 'green'}}>{message}</p>
                    <p style={{color: 'red'}}>{error}</p>
                </Stack>
                <Stack>
                    <TextField 
                        id="outlined-name"
                        label="Titre"
                        required
                        onChange={(e)=>setTitre(e.target.value)}
                    />
                </Stack>
                <Stack>
                    {/* <input
                        // id="outlined-name"
                        // label="Date"
                        type={"date"}
                        placeholder="Date"
                        // value={dateEvent}
                        required
                        //onChange={(e)=>{setDateEvent(e.target.value); console.log(e.target.value)}}
                        onChange={(e)=>{
                            const dateValue = e.target.value.replace(/-/g, "/");
                            setDateEvent((prev)=>dateValue);
                            console.log(dateValue)
                        }}
                    /> */}
                    <TextField
                        id="outlined-name"
                        label="Date"
                        type={"date"}
                        required
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
                        required
                        multiline
                        minRows={4}
                        maxRows={6}
                        onChange={(e)=>setText(e.target.value)}
                    />
                </Stack>
                <Stack>
                            <label htmlFor="btn-upload">
                                <input
                                    id="btn-upload"
                                    name="btn-upload"
                                    style={{ display: 'none' }}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e)=>setFile(e.target.files[0])}
                                 />
                                <Button
                                    className="btn-choose"
                                    variant="outlined"
                                    component="span" 
                                    startIcon={<PhotoCamera />}
                                    >
                                    Choisissez une image 
                                </Button>
                            </label>
                            <div >
                                {file!=null?file.name:''}
                            </div>
                        </Stack>
                        <Stack direction={'row'} spacing={4} width={'50%'}>
                            <Button
                                    className="btn-choose"
                                    variant="contained"
                                    // component="span"
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