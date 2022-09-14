import { Stack, TextField, Button } from "@mui/material";
import { DatePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import dayjs from 'dayjs';
import React, { useState } from "react";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import MaterialUIPickers from "../MaterialUIPickers";

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
        fetch("http://localhost:8035/api/admin/addNewFormation",{
            method: 'post',
            headers: new Headers({
                'Access-Control-Allow-Origin': 'http://localhost:3006',
                'Authorization': 'Bearer '+jwt,
                //'content-type': 'multipart/form-data;boundary=---WebKitFormBoundary7MA4YWxkTrZu0gW'
            }
            ),
            body: formData
        })
        .then((res)=>{
            if(res.status === 200){
                setMessage("Nouvelle formation ajouté avec succé");
                setTitre('');
                setText('');
                setFile(null);
                setDateEvent('');
                window.location.href='/formations';
            }
            else{
                setError("Error! Veuillez ressayer à nouveau");
            }
        });
    }
    function handleCh(e){
        console.log(e.target.value);
    }
    // const [value, setValue] = React.useState(dayjs('2014-08-18'));
    return(
       <div className="form_container">
            {props.openForm?<form onSubmit={submit}>
            <Stack className="form" direction={"column"} margin={'auto'} width={'50%'} spacing={4} >
                <Stack>
                    <p style={{color:'green'}}>{message}</p>
                    <p style={{color:'red'}}>{error}</p>
                </Stack>
                <Stack> 
                    <TextField 
                        id="outlined-name"
                        label="Titre"
                        required
                        onChange={(e)=>setTitre(e.target.value)}
                    />
                </Stack>
                {/* <MaterialUIPickers handle={handleCh} /> */}
                <Stack>
                    <TextField 
                        id="outlined-name"
                        label="Date"
                        type={"date"}
                        focused
                        //value={dateEvent}
                        required
                        // onChange={(e)=>setDateEvent(e.target.value)}
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