import React from 'react'
import './Home.css';
import img from '..//images/Logo.png'
//import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
//import { BiSearch } from 'react-icons/bi';
//import SearchFilter from 'react-filter-search';



export default function Home() {
  return (
    <div className="homeheader">
      <h1>Elämyspaja</h1>
      <p>Rohkeasti valitsemaan tuote</p>
      <div>
        <img src={img} alt="" className='responsive' />
      </div>
    </div>
    
  )
}