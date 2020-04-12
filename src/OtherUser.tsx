import React, { useState, useEffect } from "react";
import { Typography, Card } from "@material-ui/core";
import axios from "axios";

interface Review {
  description: string;
  rating: number;
}
interface ConnectedUser {
  name: string;
  email: string;
}
interface User {
  name: string;
  email: string;
  reviews: Review[];
  type: string;
  connectingWith: string;
  genre: string;
  connectedWith: ConnectedUser;
}
export const OtherUser = (props: any) => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    reviews: [],
    type: "",
    connectingWith: "",
    genre: "",
    connectedWith: { name: "", email: "" },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://morning-oasis-81960.herokuapp.com/api/user/user/${props.match.params.id}`,
        { headers: { authToken: localStorage.getItem("token") } }
      )
      .then((res) => {
        setUser({
          name: res.data.user.name,
          email: res.data.user.email,
          reviews: res.data.user.reviews,
          type: res.data.user.type,
          connectingWith: res.data.user.connectingWith,
          genre: res.data.user.genre,
          connectedWith: res.data.user.connectedWith,
        });
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading === true ? (
        <Typography>...loading</Typography>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          <Card style={{ width: "100%" }}>
            <Typography color="textPrimary" variant="h2">
              Information
            </Typography>
            <div>
              <Typography variant="h3">
                Name: <Typography variant="h6">{user.name}</Typography>
              </Typography>
            </div>
            <div>
              <Typography variant="h4">
                Contact: <Typography variant="h6">{user.email}</Typography>
              </Typography>
            </div>
          </Card>
          <Card style={{ width: "100%" }}>
            <Typography variant="h3">
              What I am: <Typography variant="h6">{user.type}</Typography>
            </Typography>
            <Typography variant="h4">
              I want talent in:{" "}
              <Typography variant="h6">{user.genre}</Typography>
            </Typography>
          </Card>

          <Card style={{ width: "100%" }}>
            <Typography variant="h3">
              Right now I am connecting with:{" "}
              {user.connectingWith === null ||
              user.connectingWith === undefined ? (
                <Typography>nobody</Typography>
              ) : (
                <div style={{ width: "100%", display: "flex" }}>
                  <Typography variant="h5">
                    Name: {user.connectingWith}{" "}
                  </Typography>
                  <Typography variant="h5">Email: {user.email}</Typography>
                </div>
              )}
            </Typography>
          </Card>

          <div>
            <Typography variant="h4">Reviews: </Typography>
            {user.reviews.map((review) => (
              <div>
                <Card style={{ width: "50%" }}>
                  <Typography>Rating: {review.rating}</Typography>
                  <Typography>Description: {review.description}</Typography>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
