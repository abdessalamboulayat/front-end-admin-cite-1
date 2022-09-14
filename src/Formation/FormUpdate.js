import { Stack, TextField, Button } from "@mui/material";
import { DatePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import dayjs from 'dayjs';
import React, { useEffect, useState } from "react";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from "axios";

function FormUpdate(props){

    const [event, setEvent] = useState();
    const [titre, setTitre] = useState();
    const [text, setText] = useState();
    const [file, setFile] = useState(null);
    const [dateFormation, setDateFormation] = useState();

    useEffect(()=>{
        axios.get(`http://localhost:8035/api/v1/formation/getFormationById/${props.idFormation}`)
        .then((res)=>{setEvent(res.data); console.log(res.data);
            setTitre(res.data.titre); setText(res.data.texte); 
            setDateFormation(res.data.date);
        });
    }, []);
    
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const jwt = localStorage.getItem("token");

    function submit(e){
        e.preventDefault();
        let formData = new FormData();
        formData.append("titre", titre);
        formData.append("texte", text);
        formData.append("date", dateFormation);
        fetch(`http://localhost:8035/api/admin/updateFormation/${props.idFormation}`,{
            method: 'put',
            headers: new Headers({
                'Access-Control-Allow-Origin': 'http://localhost:3006',
                'Authorization': 'Bearer '+jwt,
            }
            ),
            body: formData
        })
        .then((res)=>{
            if(res.status === 200){
                setMessage("La formation est modifiée avec succés");
                setTitre('');
                setText('');
                setDateFormation('');
                window.location.href='/formations';
            }
            else{
                setError("Error! Veuillez ressayer à nouveau");
            }
        });
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
                        focused
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
                        // value={dateFormation}
                        required
                        onChange={(e)=>{
                            const dateValue = e.target.value.replace(/-/g, "/");
                            setDateFormation((prev)=>dateValue);
                            console.log(dateValue)
                        }}
                    />
                </Stack>
                <Stack>
                    <TextField 
                        id="outlined-name"
                        label="Description"
                        value={text}
                        focused
                        required
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