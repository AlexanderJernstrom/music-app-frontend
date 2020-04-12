import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Button, Modal, TextField, Card } from "@material-ui/core";
import Rating from "react-rating";
import { Star, StarOutlined } from "@material-ui/icons";
import { Redirect, Link } from "react-router-dom";

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

export const User = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    reviews: [],
    type: "",
    connectingWith: "",
    genre: "",
    connectedWith: { email: "", name: "" },
  });

  const [modal, setModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const endCollab = () => {
    axios
      .patch(
        "https://morning-oasis-81960.herokuapp.com/api/user/endConnection",
        { connectedUser: user.connectingWith },
        { headers: { authToken: localStorage.getItem("token") } }
      )
      .then((res) => window.location.reload());
  };

  const endCollabandReview = () => {
    axios
      .post(
        "https://morning-oasis-81960.herokuapp.com/api/user/review",
        {
          userToReview: user.connectingWith,
          rating,
          review: description,
        },
        { headers: { authToken: localStorage.getItem("token") } }
      )
      .then((res) => endCollab());
  };

  useEffect(() => {
    axios
      .get("https://morning-oasis-81960.herokuapp.com/api/user/user", {
        headers: { authToken: localStorage.getItem("token") },
      })
      .then((res) => {
        setLoading(false);
        setUser({
          name: res.data.user.name as string,
          email: res.data.user.email,
          reviews: res.data.user.reviews,
          type: res.data.user.type,
          connectingWith: res.data.user.connectingWith,
          genre: res.data.user.genre,
          connectedWith: res.data.connectedWith,
        });
      });
  }, []);

  return (
    <div>
      {localStorage.getItem("signedIn") ? null : <Redirect to="/login" />}
      {loading === true ? (
        <Typography>...loading</Typography>
      ) : (
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
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
                  <Link
                    to={`/otherUser/${user.connectingWith}`}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontSize: "30px",
                    }}
                  >
                    Name: {user.connectedWith.name}{" "}
                  </Link>

                  <Typography variant="h5">
                    Email: {user.connectedWith.email}
                  </Typography>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => setModal(true)}
                  >
                    End collab
                  </Button>
                </div>
              )}
            </Typography>
          </Card>
          <div>
            <Typography>Reviews: </Typography>

            {user.reviews.map((review) => (
              <div>
                <Card style={{ width: "50%" }}>
                  <Typography>Rating: {review.rating}</Typography>
                  <Typography>Description: {review.description} </Typography>
                </Card>
              </div>
            ))}
          </div>

          <Button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("signedIn");
              window.location.reload();
            }}
            color="secondary"
            variant="contained"
            style={{ height: "40px" }}
          >
            Logout
          </Button>
          <Modal open={modal} onClose={() => setModal(false)}>
            <div
              style={{ backgroundColor: "white", height: "100%", width: "50%" }}
            >
              <Typography>Would you like to rate your experience?</Typography>
              <Rating
                fullSymbol={<Star color="inherit" />}
                emptySymbol={<StarOutlined color="action" />}
                onChange={(val) => setRating(val)}
              />
              <TextField
                variant="outlined"
                multiline
                rows="10"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => endCollabandReview()}
              >
                Submit your review and end collab
              </Button>
              <Button
                color="inherit"
                variant="contained"
                onClick={() => endCollab()}
              >
                End collab without review
              </Button>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};
