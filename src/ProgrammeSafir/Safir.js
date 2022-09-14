import { Button, Divider, Grid, IconButton,Tooltip } from '@mui/material';
import React, { useState } from 'react';
import LeftBar from '../Component/LeftBar';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import NavBar from '../Component/NavBar';
import './safir.css';
import axios from "axios";
import Box from '@mui/material/Box';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Dialog from "../Component/Dialog";
import Form from './Form';

const columns = [
    {
        field: 'nomSafir',
        headerName: 'Nom',
        width: 150,
      },
  {
    field: 'prenomSafir',
    headerName: 'Prénom',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
  },
  {
    field: 'telephone',
    headerName: 'Numéro de téléphone',
    width: 250,
  },
]
function Safir(){
    const [openForm, setOpenForm] = useState(false);
    const jwt = localStorage.getItem("token");
	const [safir, setSafir] = useState([]);
	axios.get("http://localhost:8035/api/admin/getAllSafir",{
            headers:{
                'Authorization': 'Bearer '+jwt,
            }
        })
	.then((res)=>setSafir(res.data));
	 const rows = safir;
     
     const [dialog, setDialog] = useState({
        message: '',
        isLoading: false,
        idSafir: ''
      });
    function handleDialog(id){
        setDialog({
          message: 'Voulez-vous vraiment supprimer cet activité?',
          isLoading: true,
          idSafir: id
        });
      }

    //  columns.push({
    //     headerName: 'Action',
    //     renderCell: (cellValues)=>{
    //         return(
    //             <>
    //                 <IconButton>
    //                         <EditRoundedIcon fontSize="medium" style={{padding:'5px', color: '#2271f0', backgroundColor:'#e1e5eb', borderRadius:'50%'}}/>
    //                 </IconButton>
    //                 <IconButton onClick={()=>handleDialog()}>
    //                         <DeleteRoundedIcon fontSize="medium" style={{padding:'5px', color: '#ff031c', backgroundColor:'#e1e5eb', borderRadius:'50%'}}/>
    //                 </IconButton>
    //             </>
    //         )
    //     },
    //   });

    return (
        <div>
            <NavBar />
            <Grid container>
                <Grid xs={2}>
                    <LeftBar />
                </Grid>
                <Grid xs={10}>
                    <div className="event">
                    <h2>GESTION DES SAFIRS</h2> 
                    <Tooltip title="Ajouter un nouveau Safir">
                        <IconButton>
                            <AddCircleRoundedIcon onClick={()=>setOpenForm(true)} className="iconAdd" color='success' fontSize="large"/>
                        </IconButton>
                    </Tooltip>
                    </div>
                    <Divider />
			        <Box sx={{ height: '80vh', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    // experimentalFeatures={{ newEditingApi: true }}
                />
                </Box>
                    {openForm?<Form className="form" openForm={openForm} update={false} annuler={<Button
                                    className="btn-choose"
                                    variant="contained"
                                    color="warning"
                                    component="span" 
                                    onClick={()=>setOpenForm(false)}
                                    >
                                    Annuler
                            </Button>}/>:''}
                    {/* {dialog.isLoading && <Dialog message={dialog.message} onDialog={deleteActivite}/>} */}
                </Grid>
            </Grid>
        </div>
    )
}
export default Safir;