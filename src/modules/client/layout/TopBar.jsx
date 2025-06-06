// TopbarClient.jsx
import React from 'react';
import { Button, Nav, Navbar, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/auth");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-4 shadow-sm">
      <Container fluid>
        <Navbar.Toggle aria-controls="client-navbar" />
        <Navbar.Collapse id="client-navbar">
          <Nav className="me-auto">
            <Nav.Link href="/">Produits</Nav.Link>
            <Nav.Link href="/client/cart">Mon Panier</Nav.Link>
            <Nav.Link href="/client/factures">Mes Factures</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center gap-3">
            <span className="text-white fw-bold">{username}</span>
            <Button variant="outline-light" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;
