import React from "react";
import { AppBar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Typography variant="h5">Music Collab</Typography>
        <Link to="/collab" style={{ textDecoration: "none", color: "white" }}>
          <Button color="inherit">Find artists</Button>
        </Link>
        <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
          <Button color="inherit">Login</Button>
        </Link>
        <Link to="/user" style={{ textDecoration: "none", color: "white" }}>
          <Button color="inherit">Account</Button>
        </Link>
      </div>
    </AppBar>
  );
};

export default Navbar;
