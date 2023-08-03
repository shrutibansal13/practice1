import React from 'react'
import image from'../../images/logo.jpg'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";


function TopNavigation() {
    const navigate = useNavigate();
 
    function logout(){
        try{
          localStorage.removeItem('token')
          localStorage.removeItem('role')
          navigate('/login')
        }
        catch(error){
          console.error(error);
        }
      }

  return (
    <>
       <Navbar bg="dark" data-bs-theme="dark" style={{height:'100px', width:'100%'}}>
        <Container>
          <Navbar.Brand href="/"><img src={image} height='80px'widths='100px'/></Navbar.Brand>
          <Nav className="">
            <Nav.Link href="">Profile</Nav.Link>
            <Nav.Link href="">Cart</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
     </>
  )
}

export default TopNavigation