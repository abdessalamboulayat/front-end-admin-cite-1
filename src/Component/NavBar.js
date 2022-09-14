import { AppBar,IconButton,Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import "./style.css";
import axios from "axios";

function NavBar(){
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClose = () => {
        setAnchorEl(null);
        localStorage.removeItem("token");
        window.location.href="/login";
      };
      const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    return(
        <AppBar position="static" color="inherit">
            <Toolbar className="toolbar">
                <Typography variant="h6">Admin</Typography>
                <div>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        // aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                    <AccountCircle />
                     </IconButton>
                     <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem >Admin Admin</MenuItem>
                        <MenuItem onClick={handleClose}>Déconnexion</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    )
}
export default NavBar;