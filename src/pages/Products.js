import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {  useParams } from 'react-router-dom';
import './Products.css';


export default function Products({url,addToCart}) {
  const [categoryName,setCategoryName] = useState('');
  const [products, setProducts] = useState([]);

  let params = useParams();
  
  useEffect(() => {
    axios.get(url + 'products/getproducts.php/' + params.categoryId)
      .then((response) => {
        const json = response.data;
        setCategoryName(json.category);
        setProducts(json.products);
      }).catch(error => {
        alert(error.response === undefined ? error : error.response.data.error);
      })
  }, [params])
  
  return (  
    <div>
      <h3>Tuotteet {categoryName}</h3>
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