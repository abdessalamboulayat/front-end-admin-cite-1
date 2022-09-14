import React from 'react';

function Dialog(props){

    return(
        <div style={{
            position: "fixed",
            left: "0",
            right: "0",
            bottom: "0",
            top: "0",
            backgroundColor: "rgba(0,0,0,0.1)",
            zIndex: "1"
        }}>
            <div style={{
                display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center",position:'absolute', top: "50%",
                left: "50%", borderRadius:"5px",transform: "translate(-50%, -50%)",border:"1px solid gray" ,backgroundColor:"white", padding: "50px", textAlign: "center", lineHeight:"30px"
            }}>
                <h3>{props.message}</h3>
                <div style={{display: "flex", alignItems: "center"}}>
                    <button style={{backgroundColor: "#ff031c", color: "white", padding:"5px", marginRight: "4px", 
                    border:"none",borderRadius:"5px", cursor: "pointer"}} onClick={()=>props.onDialog(true)}>Oui</button>
                    <button style={{backgroundColor: "#2271f0", color: "white", padding:"5px", marginLeft: "4px",
                    border:"none", borderRadius:"5px",cursor: "pointer"}} onClick={()=>props.onDialog(false)}>Non</button>
                </div>
            </div>

        </div>
    )
}

export default Dialog;