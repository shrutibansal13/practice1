import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SideNavigation from '../helpers/sideNavigation';
import TopNavigation from '../helpers/TopNavigation';

function CategoryProducts() {
    const [products,setProducts]= useState([])

     const category_id= localStorage.getItem('category_id') || ''
    async function getproducts(catid){
        try{ 
            await axios.get('http://localhost:8000/getproducts?'+ new URLSearchParams({
                id: catid
            })).then((res)=>{
                console.log(res.data.data);
                setProducts(res.data.data)
            })
        }
        catch(error){

        }
    }

    useEffect(()=>{
        getproducts(category_id);
    },[])

    return (
        <div>
            <Row>
            <Col  md='2'><SideNavigation/></Col>
           <Col md='10'>
           <Row>
            <TopNavigation/>
            </Row>
            <Row>
           {products.map((product)=>( 
            <Col>
           <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="" />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                      {product.description}
                    </Card.Text>
                    <Button variant="primary">Add to Cart</Button>
                </Card.Body>
            </Card>
            </Col>
            ))}
            
            </Row>
            </Col>

            </Row>
        </div>
    )
}

export default CategoryProducts