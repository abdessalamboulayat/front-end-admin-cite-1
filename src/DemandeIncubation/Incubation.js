import {React, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import NavBar from '../Component/NavBar';
import { Grid , Divider} from '@mui/material';
import LeftBar from '../Component/LeftBar';
import "./incubation.css";
import axios from 'axios';

const columns = [
    {
        field: 'ncin',
        headerName: 'CIN',
        width: 100,
      },
  {
    field: 'nom',
    headerName: 'Nom',
    width: 150,
  },
  {
    field: 'prenom',
    headerName: 'Prénom',
    width: 150,
  },
  {
    field: 'ideedeprojet',
    headerName: 'Idée de projet',
    width: 150,
  },
  {
    field: 'secteuredeprojet',
    headerName: 'Secteur du projet',
    width: 150,
  },
  {
    field: 'anneexperience',
    headerName: 'Expérience',
    width: 60,
    type:'number'
  },
  {
    field: 'datedenaissance',
    headerName: 'Date de naissance',
    width: 150,
    type:'date'
  },
  {
    field: 'numerodetelephone',
    headerName: 'Numéro',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'adresse',
    headerName: 'Adresse',
    width: 200,
  },
  {
    field: 'nationalite',
    headerName: 'Nationalité',
    width: 100,
  },
];
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
export default function Incubation() {
    const [demandIncubation, setDemandIncubation] = useState([]);
    const jwt = localStorage.getItem("token");
    useEffect(()=>{
        axios.get("http://localhost:8035/api/v1/formulaire/getAllRequest",
        {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        })
        .then((res)=>setDemandIncubation(res.data));
    },[]);
    const rows = demandIncubation;
  return (
    <>
        <div className='navBar'>
          <NavBar />
        </div>
        <Grid container>
          <div className='leftBar'>
              <Grid xs={2} md={2} sm={2} mt={8}>
                  <LeftBar />
              </Grid>
          </div>
            <Grid xs={10} md={10} sm={10} mt={8} className="content">
                <div className="incubation">
                    <h2>DEMANDE D'INCUBATION</h2>
                </div>
                <Divider />
                <Box sx={{ height: '80vh', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    // components={{
                    //   Toolbar: CustomToolbar,
                    // }}
                    components ={{
                      Toolbar:CustomToolbar
                  }}

                    // experimentalFeatures={{ newEditingApi: true }}
                />
                </Box>
            </Grid>
        </Grid>
    </>
  );
}
