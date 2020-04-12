import React, { useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const login = () => {
    axios
      .post("https://morning-oasis-81960.herokuapp.com/api/user/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data);
          localStorage.setItem("signedIn", JSON.stringify(true));
          setRedirect(true);
        }
      });
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        width: "50%",
        textAlign: "center",
      }}
    >
      {redirect === true ? <Redirect to="/user" /> : null}
      {localStorage.getItem("signedIn") === JSON.stringify(true) ? (
        <Typography>Already logged in, start using the application</Typography>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            width: "50%",
            textAlign: "center",
          }}
        >
          <Typography variant="h3">Login</Typography>
          <TextField
            variant="outlined"
            placeholder="Must be atleast 10 character"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            placeholder="Must be atleast 6 characters"
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={() => login()}>
            Login
          </Button>
          <Link component={Button} to="/register">
            Register a new account
          </Link>
        </div>
      )}
    </div>
  );
};
