import axios from 'axios';
import React,{useState,useEffect} from 'react';
import Cart from './Cart';
import { Link, Navigate } from 'react-router-dom';
import './Navbar.css';





export default function Navbar({url,cart}) {
  const [categories,setCategories] = useState([]);
  const [search,setSearch] = useState([]);

  useEffect(() => {
    axios.get(url + 'products/getcategories.php')
      .then((response) => {
        const json = response.data;
        setCategories(json);
      }).catch (error => {
        alert(error.response === undefined ? error : error.response.data.error);
      })
  }, [])

  function executeSearch(e) {
    if (e.charCode === 13) {
      e.preventDefault();
      Navigate('/search/' + search)
    }
  }
  


  return (
    <nav className="navbar navbar-expand-md fixed-top navbarheader">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Elämyspaja</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className='nav-item dropdown'>
              <a className='nav-link dropdown-toggle' href="#" id="dropdown01" 
              data-bs-toggle="dropdown" aria-expanded="false">Tuotteet</a>
              <ul className='dropdown-menu' aria-labelledby='dropdown01'>
                {categories.map(category => (
                  <li key={category.id}>
                   {<Link 
                      className='dropdown-item'
                      to={'/products/' + category.id}>{category.name}
                    </Link>}
                  </li>
                ))}
              </ul>
            </li>
            

            
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => executeSearch(e)}
            className="fprm-control mr-sm-2"
            type="search"
            placeholder="Search"
            arial-label="Search"
            />
          </form>

          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Cart cart={cart} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}