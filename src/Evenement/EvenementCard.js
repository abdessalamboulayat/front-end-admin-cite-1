import {React, useEffect, useState} from 'react';
import logo from '../logo.svg';
import Card from '@mui/material/Card';
import axios from "axios";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
// import Dialog from "./Dialog";
import Dialog from "../Component/Dialog";
import Form from './Form';
import FormUpdate from './FormUpdate';

function EvenementCard(props){
    const [image, setImage] = useState();
    const [updateForm, setUpdateForm] = useState({
      isOpen: false,
      idEvent: ''
    });
    const [dialog, setDialog] = useState({
        message: '',
        isLoading: false,
        id: ''
    });
    const jwt = localStorage.getItem("token");

    useEffect(()=>{
        axios.get(`http://localhost:8035/api/v1/evenement/images/${props.evenement.image}`)
        .then((res)=>{setImage(res.data);})}
    ,[]);

    function updateEvent(id){
      setUpdateForm({
        isOpen: true,
        idEvent: id
      })
    }

    function handleDialog(id){
      setDialog({
        message: 'Voulez-vous vraiment supprimer cet événement?',
        isLoading: true,
        id: id
      });
    }

    const deleteEvent = (choose)=>{
      if(choose){
        axios.delete(`http://localhost:8035/api/admin/deleteEvent/${dialog.id}`,
        {
          headers:{
            'Authorization': 'Bearer '+jwt
          }
        }).then((res)=>{
          if(res.status===200){
            setDialog({
              message:'',
              isLoading: false,
              id: ''
            });
            window.location.href='/evenements';
          }
        });
      }
      else{
        setDialog({
          message:'',
          isLoading: false,
          id: ''
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
                {props.evenement.titre}
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                {props.evenement.date}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" variant="contained"
              onClick={()=>updateEvent(props.evenement.id)}
            >
              Modifier
            </Button>
            <Button size="small" variant="contained" color="error"
                onClick={()=>handleDialog(props.evenement.id)}
            >
              Supprimer
            </Button>
          </CardActions>
        </Card>
        {dialog.isLoading && <Dialog message={dialog.message} onDialog={deleteEvent}/>}
        {updateForm.isOpen && <FormUpdate openForm={updateForm.isOpen} idEvent={updateForm.idEvent}
          annuler={<Button
            className="btn-choose"
            variant="contained"
            color="error"
            component="span" 
            onClick={()=>setUpdateForm({isOpen: false, idEvent:''})}
            >
            Annuler
          </Button>}
        />}
    </div>
    )
}
export default EvenementCard;