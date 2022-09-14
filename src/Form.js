import { Stack, TextField, Button } from "@mui/material";
import { DatePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import dayjs from 'dayjs';
import React, { useState } from "react";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import MaterialUIPickers from "./MaterialUIPickers";


function Form(){

    const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
      setValue(newValue);
    };
    const [file, setFile] = useState();
    return(
        <div>
            <Stack direction={"column"} margin={'auto'} width={'50%'} spacing={4} >
                <Stack>
                    <TextField 
                        id="outlined-name"
                        label="Titre"
                        required
                    />
                </Stack>
                <MaterialUIPickers />
                <Stack>
                    <TextField 
                        id="outlined-name"
                        label="Description"
                        required
                        multiline
                        minRows={4}
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
                                    component="span" >
                                    Choisissez une image <PhotoCamera />
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
                                    component="span" >
                                    Ajouter l'événement
                            </Button>
                            <Button
                                    className="btn-choose"
                                    variant="contained"
                                    color="error"
                                    component="span" >
                                    Annuler
                            </Button>
                        </Stack>
            </Stack>
        </div>
    )
}

export default Form;