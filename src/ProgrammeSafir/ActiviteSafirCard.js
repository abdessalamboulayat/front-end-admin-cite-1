import {React, useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import axios from "axios";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FiberNewOutlinedIcon from '@mui/icons-material/FiberNewOutlined';
import { Button, CardActionArea, CardActions } from '@mui/material';


function ActiviteSafirCard(props){
    const [image, setImage] = useState();
    const jwt = localStorage.getItem("token");
    const [updateForm, setUpdateForm] = useState({
      isOpen: false,
      idEvent: ''
    });
    const [dialog, setDialog] = useState({
        message: '',
        isLoading: false,
        idEvent: ''
    });

    useEffect(()=>{
        axios.get(`http://localhost:8035/api/activiteSafir/image/${props.activites.image}`)
        .then((res)=>{setImage(res.data);})}
    ,[]);

    function accepterActivite(id){
	    fetch(`http://localhost:8035/api/admin/validerActiviteSafir/${id}`,{
            method: 'put',
            headers: new Headers({
                'Access-Control-Allow-Origin': 'http://localhost:3006',
                'Authorization': 'Bearer '+jwt,
            }
            )
        })
        .then((res)=>{
            if(res.status === 200){
                window.location.href='/activiteSafir';
            }
        });
    }

    function refuserActivite(id){
      fetch(`http://localhost:8035/api/admin/refuserActiviteSafir/${id}`,{
            method: 'put',
            headers: new Headers({
                'Access-Control-Allow-Origin': 'http://localhost:3006',
                'Authorization': 'Bearer '+jwt,
            }
            )
        })
        .then((res)=>{
            if(res.status === 200){
                window.location.href='/activiteSafir';
            }
        });

    }
    function handleDialog(id){
      setDialog({
        message: 'Voulez-vous vraiment supprimer cet événement?',
        isLoading: true,
        idEvent: id
      });
    }

    const deleteEvent = (choose)=>{
      if(choose){
        axios.delete(`http://localhost:8035/api/admin/deleteEvent/${dialog.idEvent}`,
        {
          headers:{
            'Authorization': 'Bearer '+jwt
          }
        }).then((res)=>{
          if(res.status===200){
            setDialog({
              message:'',
              isLoading: false,
              idEvent: ''
            });
            window.location.href='/evenements';
          }
        });
      }
      else{
        setDialog({
          message:'',
          isLoading: false,
          idEvent: ''
        });
      }
    }
    
    function statu(statu){
      if(statu== 'refuser'){
        return <Button size="small" color="error">Statu: refusé</Button>
      }
      else if(statu=='valider'){
        return <Button size="small" color="success">Statu: accepté</Button>
      }
      else{
        return (<Button color="warning"><FiberNewOutlinedIcon fontSize="large"/></Button>)
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
                {props.activites.titre}
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                {props.activites.date}
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                {props.activites.resume}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" variant="contained"
               onClick={()=>accepterActivite(props.activites.id)}
            >
              Accepter
            </Button>
            <Button size="small" variant="contained" color="error"
                onClick={()=>refuserActivite(props.activites.id)}
            >
              Refuser
            </Button>
            {statu(props.activites.statu)}
          </CardActions>
        </Card>
        {/* {dialog.isLoading && <Dialog message={dialog.message} onDialog={deleteEvent}/>}
        {updateForm.isOpen && <FormUpdate openForm={updateForm.isOpen} idEvent={updateForm.idEvent}
          annuler={<Button
            className="btn-choose"
            variant="contained"
            color="error"
            component="span" 
            // onClick={()=>setUpdateForm({isOpen: false, idEvent:''})}
            >
            Annuler
          </Button>}
        />} */}
    </div>
    )
}
export default ActiviteSafirCard;