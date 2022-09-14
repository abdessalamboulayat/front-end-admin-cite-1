import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import NavBar from '../Component/NavBar';
import { Grid , Divider} from '@mui/material';
import LeftBar from '../Component/LeftBar';
import axios from 'axios';

const columns = [
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
    field: 'email',
    headerName: 'Email',
    width: 250,
  },
  {
    field: 'numero',
    headerName: 'Numéro de téléphone',
    width: 150,
  },
  {
    field: 'consultation',
    headerName: 'Consultation',
    width: 500,
  },
]

function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
function Consultation(){

    const [consultations, setConsultations] = useState([]);

    axios.get("http://localhost:8035/api/v1/Consultation/")
    .then((res)=>setConsultations(res.data))
    .catch((error)=>console.log(error));

    const rows = consultations;
    return(
    <>
        <div className='navBar'>
          <NavBar />
          </div>
        <Grid container>
            <div className="leftBar">
              <Grid xs={2} md={2} sm={2} mt={8}>
                <LeftBar />
              </Grid>
            </div>
            <Grid xs={10} md={10} sm={10} mt={8} className="content">
                <div className="incubation">
                    <h2>CONSULTATION</h2>
                </div>
                <Divider />
                <Box sx={{ height: '80vh', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    components={{
                      Toolbar: CustomToolbar,
                    }}
                    // experimentalFeatures={{ newEditingApi: true }}
                />
                </Box>
            </Grid>
        </Grid>
    </>
    )
}

export default Consultation;