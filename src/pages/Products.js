import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {  useParams } from 'react-router-dom';
import './Products.css';


export default function Products({url, addToCart}) {
  const [name, setName] = useState('')
  const [products, setProducts] = useState([]);

  let params = useParams();
  
  useEffect(() => {
    let address = '';

    if (params.searchPhrase === undefined) {
      address = url + 'products/getproducts.php/' + params.categoryId;
    } else {
      address = url + 'products/searchproducts.php' + params.searchPhrase;
    }
    axios.get(address)
    .then((response) => {
      const json = response.data;
      if (params.searchPhrase === undefined) {
        setName(json.category);
        setProducts(json.products);
      } else {
        setName(params.searchPhrase);
        setProducts(json);
      }
    }
    )
  }, [params]
  )


  
  return (  
    <div>
      <h3>{name}</h3>
      {products.map(product => (
        <div className="card productwidht">
        <div key={product.id}>
         <h5 className="card-title"> {product.name} </h5>
         <p className="card-text">{product.description}.</p>
         <div> {product.price} €</div>
         <div> {product.image}</div>
          <button className="btn btn-primary" type="button" onClick={e => addToCart(product)}>Lisääppä tuote lisääppä...</button>
        </div>
        </div>
      ))}
    </div>
  )
}