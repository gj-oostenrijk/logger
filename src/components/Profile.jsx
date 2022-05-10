import React, { useState, useEffect } from "react";
import { Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../utils/firebase-config";
import { ref, onValue } from "firebase/database";

export default function Profile() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  function getAllUsers() {
    onValue(ref(db, "/users/" + currentUser.uid), (snapshot) => {
      const response = snapshot.val();
      setUser(response);
    });
  }

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Name: </strong>
            {user?.firstName ? user.firstName : "not set"} <br />
            <strong>Email: </strong>
            {currentUser.email} <br />
            <strong>Age: </strong>
            {user?.age ? user.age : "not set"} <br />
            <strong>Number of dumps: </strong>
            {user?.stool ? Object.keys(user.stool).length : "0"}
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
              Update profile
            </Link>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>
    </Container>
  );
}
