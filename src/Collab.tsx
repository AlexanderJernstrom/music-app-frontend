import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, Select, Typography, MenuItem } from "@material-ui/core";
import axios from "axios";

export const Collab = () => {
  const [type, setType] = useState("");
  const [genre, setGenre] = useState("");

  const getArtist = () => {
    if (type === "" || genre === "") {
      alert("You can't leave the the checkboxes empty!");
    }
    axios
      .post(
        "https://morning-oasis-81960.herokuapp.com/api/user/connect",
        { type, genre },
        { headers: { authToken: localStorage.getItem("token") } }
      )
      .then((res) => {
        if (typeof res.data === "object") {
          alert("Connection succesful");
        } else if (typeof res.data === "string") {
          alert(res.data);
        } else if (res.status === 400) {
          alert(res.data);
        }
      })
      .catch((err) => {
        alert(
          "You cannot connect to someone if yo are already connected, if you want to connect to again then end you existing collab"
        );
      });
  };

  return (
    <div
      style={{
        textAlign: "center",
        width: "100%",
      }}
    >
      {!localStorage.getItem ? <Redirect to="/login" /> : null}
      <Typography variant="h5">I am looking for a: </Typography>
      <Select
        style={{ width: "12rem" }}
        onChange={(e) => setType(e.target.value as string)}
      >
        <MenuItem value="producer">Producer</MenuItem>
        <MenuItem value="songwriter">Songwriter</MenuItem>
        <MenuItem value="singer">Singer</MenuItem>
      </Select>
      <Typography variant="h5">Who can play: </Typography>
      <Select
        style={{ width: "12rem" }}
        onChange={(e) => setGenre(e.target.value as string)}
      >
        <MenuItem value="pop">Pop</MenuItem>
        <MenuItem value="country">Country</MenuItem>
        <MenuItem value="hip hop">Hip hop</MenuItem>
      </Select>
      <div>
        <Button size="small" color="primary" onClick={() => getArtist()}>
          Search for artists
        </Button>
      </div>
    </div>
  );
};
