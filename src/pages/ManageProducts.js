import React,{useState, useEffect} from 'react';
import axios from 'axios';
import CategoryList from '../components/CategoryList';
import uuid from 'react-uuid';

export default function ManageProducts({url}) {

const [selectedCategory, setSelectedCategory] = useState(null);
const [products, setProducts] = useState([]);
const [addingProduct, setAddingProduct] = useState(false);
const [productName, setProductName] = useState('');
const [price, setPrice] = useState('');


useEffect(() => {
    if (selectedCategory !== null) {
    axios.get(url + 'products/getproducts.php/' + selectedCategory.id)
      .then((response) => {
        const json = response.data;
        if (json) {
        setProducts(json.products);
      }
    }).catch(error => {
        alert(error.response === undefined ? error : error.response.data.error);
      })
    }
  }, [url,selectedCategory])

  function saveProduct(e) {
    e.preventDefault();
    const json = JSON.stringify({name: productName, price: price,categoryid: selectedCategory.id});
    axios.post(url + 'products/addproduct.php',json,{
        headers: {
            'Content-Type' : 'application/json'
        }

    })
    .then((response) => {
        const updateProducts = [...productName,response.data];
        setProducts(updateProducts);
        setAddingProduct(false);

    }).catch (error => {
        alert(error.response === undefined ? error : error.response.data.error);
    });
}

if (!addingProduct) {
    return (
        <>
            <h3>manage Products</h3>
            <CategoryList url={url} selectedCategory = {selectedCategory} setSelectedCategory={setSelectedCategory}/>
            <table className='table'>
                <thead>
                    <tr key={uuid()}>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                    <tr key={uuid()}>
                        <td>{product.name}</td>
                        <td>{product.prize}</td>
                    </tr>
                    
                    ))}

                </tbody>

            </table>
            <div>
                <button className="btn btn-dark" type="button" onClick={()=> setAddingProduct(true)}>Add</button>
            </div>
        </>

    )
} else {

return (
<>
    <h3>Add new product</h3>
    <form onSubmit={saveProduct}>
        <div>
            <label>Produce name</label>
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)}/>
        </div>
        <div>
            <label>Produce price</label>
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}/>
        </div>
        <button type="button" onClick={() => setAddingProduct(false)}>Cancel</button>
        <button type="submit">Save</button>
    </form>

</>

    )
}






}
