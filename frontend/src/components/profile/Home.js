import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navbar, Nav, Container } from 'react-bootstrap'; 
import styles from './../../styles/bootstrap.min.css';

function Home() {
  const [user, setUser] = useState({ userName: '', userType: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/checkSession', { withCredentials: true })
      .then(response => {
        setUser({
          userName: response.data.name,
          userType: response.data.user_type,
        });
      })
      .catch(error => {
        console.error("There was an error fetching the user data!", error);
        navigate('/');
      });
  }, [navigate]);

  return (
    <div className={styles.dark_bg}>
      <Navbar bg="primary" variant="dark" expand="lg" fixed="top" className="rounded-4">
        <Container>
          <Navbar.Brand as={Link} to="/home">Magneto Switch Talent</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/my-profile">Mi Perfil</Nav.Link>
              <Nav.Link as={Link} to="/">Salir</Nav.Link>
            </Nav>
            {user.userName && (
              <Nav>
                <Nav.Link>Hi {user.userType === 'employee' ? 'employee' : 'leader'} {user.userName}</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container mt-5">
        <div className="row">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center mt-5">
            <h1 className="text-gradient mb-4">Magneto Switch Talent</h1>
            <div className="row mt-4">
              {user.userType === 'leader' && (
                <>
                  <div className="col-md-4">
                    <Link to="/create-opportunity" className="btn btn-primary btn-lg w-100 mb-4 rounded-4">Crear oportunidades</Link>
                  </div>
                  <div className="col-md-4">
                    <Link to="/list-opportunities" className="btn btn-primary btn-lg w-100 mb-4 rounded-4">Ver oportunidades</Link>
                  </div>
                  <div className="col-md-4">
                    <Link to="/create-team" className="btn btn-primary btn-lg w-100 mb-4 rounded-4">Crear equipos de proyecto</Link>
                  </div>
                  <div className="col-md-4">
                    <Link to="/list-teams" className="btn btn-primary btn-lg w-100 mb-4 rounded-4">Ver equipos</Link>
                  </div>
                  <div className="col-md-4">
                    <Link to="/list-postulations" className="btn btn-primary btn-lg w-100 mb-4 rounded-4">Ver Postulaciones</Link>
                  </div>
                </>
              )}
              {user.userType === 'employee' && (
                <>
                  <div className="col-md-4">
                    <Link to="/list-opportunities" className="btn btn-primary btn-lg w-100 mb-4 rounded-4">Ver oportunidades</Link>
                  </div>
                  <div className="col-md-4">
                    <Link to="/list-teams" className="btn btn-primary btn-lg w-100 mb-4 rounded-4">Ver equipos</Link>
                  </div>
                  <div className="col-md-4">
                    <Link to="/create-postulation" className="btn btn-primary btn-lg w-100 mb-4 rounded-4">Aplicacion individual</Link>
                  </div>
                  <div className="col-md-4">
                    <Link to="/list-postulations" className="btn btn-primary btn-lg w-100 mb-4 rounded-4">Ver Postulaciones</Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
