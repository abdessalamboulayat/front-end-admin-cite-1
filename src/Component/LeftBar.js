import React from "react";
import {Container, Typography} from "@mui/material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import { Link } from "react-router-dom";


import ListSubheader from '@mui/material/ListSubheader';
import LensRoundedIcon from '@mui/icons-material/LensRounded';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArticleIcon from '@mui/icons-material/Article';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import StarBorder from '@mui/icons-material/StarBorder';

function LeftBar(){
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return(
        <Container className="container">
            <div >
                <Link to={"/"} className="item">
                    <DashboardRoundedIcon className="iconHome"/>
                    <Typography className="text"> Dashboard</Typography>
                </Link>
            </div>
            <div >
                <Link to={"/evenements"} className="item">
                    <EventAvailableRoundedIcon className="iconHome"/>
                    <Typography className="text">Eévénements</Typography>
                </Link>
            </div>
            <div>
                <Link to={"/formations"} className="item">
                    <SchoolRoundedIcon className="iconHome"/>
                    <Typography className="text">Formations</Typography>
                </Link>
            </div>
            <div>
                <Link to={"/incubation"} className="item">
                    <ArticleIcon className="iconHome"/>
                    <Typography className="text">Demande d'incubation</Typography>
                </Link>
            </div>
            
            <div className="">
                <div className="item item_safir" onClick={handleClick}>
                    <InboxIcon className="iconHome"/>
                    <Typography className="text">Safir</Typography>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </div>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <Link to={"/safir"} className="item_list">
                            <GroupsRoundedIcon fontSize="small" className="iconHome"/>
                            <ListItemText primary="Les saphirs" className="text"/>
                        </Link>
                        <Link to={"/activiteSafir"} className="item_list">
                            <GroupsRoundedIcon fontSize="small" className="iconHome"/>
                            <ListItemText primary="Activités Saphir" className="text"/>
                        </Link>
                    </List>
                </Collapse>
            </div>
            <div>
                <Link to={"/consultation"} className="item">
                    <SensorOccupiedIcon className="iconHome"/>
                    <Typography className="text">Consultation</Typography>
                </Link>
            </div>
            <div>
                <Link to={"/contact"} className="item">
                    <PermContactCalendarIcon className="iconHome"/>
                    <Typography className="text">Contact</Typography>
                </Link>
            </div>
        </Container>
    )
}
export default LeftBar;