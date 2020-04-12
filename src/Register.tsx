import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button
} from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";

interface User {
  name: string;
  email: string;
  password: string;
  type: string;
  genre: string;
}

export const Register = () => {
  const [user, setUser] = useState<User>({
    email: "",
    name: "",
    password: "",
    genre: "",
    type: ""
  });
  const [redirect, setRedirect] = useState(false);

  const register = () => {
    axios
      .post("https://morning-oasis-81960.herokuapp.com/api/user", user)
      .then(res => {
        if (res.data.token) {
          setRedirect(true);
        } else {
          alert("Something went wrong try again");
        }
      });
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        width: "50%"
      }}
    >
      {redirect === true ? (
        <Redirect
          to={{
            pathname: "/login",
            state: { email: user.email, password: user.password }
          }}
        />
      ) : null}
      <TextField
        placeholder="minimum 10 characters"
        label="Email"
        value={user.email}
        name="email"
        onChange={e =>
          setUser({
            email: e.target.value,
            genre: user.genre,
            type: user.type,
            password: user.password,
            name: user.name
          })
        }
      />
      <TextField
        placeholder="minimum 6 characters"
        label="Name"
        value={user.name}
        name="name"
        onChange={e =>
          setUser({
            email: user.email,
            genre: user.genre,
            type: user.type,
            password: user.password,
            name: e.target.value
          })
        }
      />
      <TextField
        placeholder="minimum 6 characters"
        type="password"
        label="Password"
        value={user.password}
        name="password"
        onChange={e =>
          setUser({
            email: user.email,
            genre: user.genre,
            type: user.type,
            password: e.target.value,
            name: user.name
          })
        }
      />
      <InputLabel>What type of music do I play</InputLabel>
      <Select
        value={user.genre}
        onChange={e =>
          setUser({
            email: user.email,
            genre: e.target.value as string,
            type: user.type,
            password: user.password,
            name: user.name
          })
        }
      >
        <MenuItem value="hip hop">Hip hop</MenuItem>
        <MenuItem value="pop">Pop</MenuItem>
        <MenuItem value="country">Country</MenuItem>
      </Select>
      <InputLabel>What am I?</InputLabel>
      <Select
        value={user.type}
        onChange={e =>
          setUser({
            email: user.email,
            genre: user.genre,
            type: e.target.value as string,
            password: user.password,
            name: user.name
          })
        }
      >
        <MenuItem value="producer">Producer</MenuItem>
        <MenuItem value="singer">Singer</MenuItem>
        <MenuItem value="song writer">Song writer</MenuItem>
      </Select>
      <Button variant="contained" color="primary" onClick={() => register()}>
        Register
      </Button>
    </div>
  );
};
