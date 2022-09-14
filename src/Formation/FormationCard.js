import {React, useEffect, useState} from 'react';
import logo from '../logo.svg';
import Card from '@mui/material/Card';
import axios from "axios";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Dialog from "../Component/Dialog";
import Form from './Form';
import FormUpdate from './FormUpdate';

function FormationCard(props){
    const [image, setImage] = useState();
    const [updateForm, setUpdateForm] = useState({
      isOpen: false,
      idFormation: ''
    });
    const [dialog, setDialog] = useState({
        message: '',
        isLoading: false,
        id: ''
    });
    const jwt = localStorage.getItem("token");

    useEffect(()=>{
        axios.get(`http://localhost:8035/api/v1/formation/images/${props.formation.image}`)
        .then((res)=>{setImage(res.data);})}
    ,[]);

    function updateFormation(id){
      setUpdateForm({
        isOpen: true,
        idFormation: id
      })
    }

    function handleDialog(id){
      setDialog({
        message: 'Voulez-vous vraiment supprimer cette Formation?',
        isLoading: true,
        id: id
      });
    }

    const deleteEvent = (choose)=>{
      if(choose){
        axios.delete(`http://localhost:8035/api/admin/deleteFormation/${dialog.id}`,
        {
          headers:{
            'Authorization': 'Bearer '+jwt
          }
        }).then((res)=>{
          if(res.status===200){
            setDialog({
              message:'',
              isLoading: false,
              idFormation: ''
            });
            window.location.href='/formations';
          }
        });
      }
      else{
        setDialog({
          message:'',
          isLoading: false,
          idFormation: ''
        });
      }
    }
    return(
      <div>
        <Card sx={{ maxWidth: 345}}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={image}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {props.formation.titre}
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                {props.formation.date}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" variant="contained"
              onClick={()=>updateFormation(props.formation.id)}
            >
              Modifier
            </Button>
            <Button size="small" variant="contained" color="error"
                onClick={()=>handleDialog(props.formation.id)}
            >
              Supprimer
            </Button>
          </CardActions>
        </Card>
        {dialog.isLoading && <Dialog message={dialog.message} onDialog={deleteEvent}/>}
        {updateForm.isOpen && <FormUpdate openForm={updateForm.isOpen} idFormation={updateForm.idFormation}
          annuler={<Button
            className="btn-choose"
            variant="contained"
            color="error"
            component="span" 
            onClick={()=>setUpdateForm({isOpen: false, idFormation:''})}
            >
            Annuler
          </Button>}
        />}
    </div>
    )
}
export default FormationCard;