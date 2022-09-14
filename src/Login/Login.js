import { Stack,FormControl,IconButton, TextField, InputLabel, OutlinedInput, InputAdornment, Button, Box} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import React, { useState } from 'react';

function Login(){

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword]=useState(false);
    const [jwt, setJwt] = useState();

    const formData = {
        email: username,
        password : password
    }
    const headers={
        'Access-Control-Allow-Origin': 'http://localhost:3006',
        'Content-Type':'application/json',
    }
    function submit(e){
        e.preventDefault();
        console.log("clicked");
        axios.post("http://localhost:8035/api/auth/login", formData)
        .then((res)=>{console.log(res.status); setJwt(res.data); window.location.href = '/'; localStorage.setItem("token", res.data)});
    }

    return(
        <div>
            <Box component={"form"} onSubmit={submit} style={{marginTop:'25vh'}}>
                <Stack spacing={4} width="30%" margin={"auto"}>
                    {/* <Stack>
                        <h1>Login Admin</h1>
                    </Stack> */}
                    <h2>Admin</h2>
                    <Stack>
                        <TextField
                            id="outlined-name"
                            label="Email"
                            type={"email"}
                            required
                            onChange={(e)=>setUsername(e.target.value)}
                        />
                    </Stack>
                    <Stack>
                        <TextField
                            id="outlined-name"
                            label="Password"
                            type="password"
                            required
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </Stack>
                    <Stack>
                        <Button
                                className="btn-choose"
                                variant="contained"
                                type='submit'
                                color="primary"
                                // component="span" 
                                // onClick={submit}
                                >
                                Connexion
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </div>
    )
}

export default Login;