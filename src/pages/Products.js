import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
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
        <div class="card productwidht">
        <div key={product.id}>
         <h5 class="card-title"> {product.name} </h5>
         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
         <div> {product.price} €</div>
          <button className="btn btn-primary" type="button" onClick={e => addToCart(product)}>Lisääppä tuote lisääppä...</button>
        </div>
        </div>
      ))}
    </div>
  )
}