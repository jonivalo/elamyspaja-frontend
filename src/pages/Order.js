import axios from 'axios';
import React,{useState,useEffect, createRef} from 'react';
import uuid from 'react-uuid';
import './Order.css';
import 'react-bootstrap';

export default function Order({cart,removeFromCart,updateAmount, empty, e}) {
  const [inputs,_] = useState([]);
  const [inputIndex, setInputIndex] = useState(-1);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    for (let i = 0;i < cart.length;i++) {
      inputs[i] = createRef();
    }
  }, [cart.length])
  
  useEffect(()=> {
    if (inputs.length > 0 && inputIndex > -1 && inputs[inputIndex].current !== null) {
      inputs[inputIndex].current.focus();
    }
  },[cart])

  function changeAmount(e,product,index) {
    updateAmount(e.target.value,product);
    setInputIndex(index);
  }

  function order(url) {
    e.preventDefault();
    
    const json = JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      address: address,
      zip: zip,
      city: city,
      cart: cart,
    });
    axios.post(url + 'order/save.php',json,{
      headers: {
        'Accept': 'application/json',
        'Content-type' : 'application/json'
      }
    })
    .then(() => {
      empty();
      setFinished(true);
    }).catch(error => {
      alert(error.response === undefined ? error : error.response.data.error);
    });
  }

  let sum = 0;

  return (
    <div className="container">
      <h3 >Tilaamasi tuotteet</h3>
      <table className="table">
        <tbody>
          {cart.map((product,index) => {
            sum+=parseFloat(product.price);
            return (
              <tr key={uuid()}>
                <td>{product.name}</td>
                <td>{product.price} €</td>
                <td>
                  <input ref={inputs[index]} style={{width: '60px'}} value={product.amount} onChange={e => changeAmount(e,product,index)} />
                </td>
                <td><a href="#" onClick={() => removeFromCart(product)}>Delete</a></td>
              </tr>
            )
            })}
          <tr key={uuid()}>
            <td className="sumrow"></td>
            <td className="sumrow">{sum.toFixed(2)} €</td>
            <td className="sumrow"><a href="#" onClick={e => empty()}>Empty</a></td>
          </tr>
        </tbody>
      </table>
      {cart.length > 0 && 
        <>
          <h3 className="header">Asiakkaan tiedot</h3>
          <form onSubmit={order}>
            <div className="form-group">
              <label>First name:</label>
              <input className="form-control" onChange={e => setFirstname(e.target.value)}/>
            </div>
            <div className="form-group">
              <label>Last name:</label>
              <input className="form-control" onChange={e => setLastname(e.target.value)}/>
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input className="form-control" onChange={e => setAddress(e.target.value)}/>
            </div>
            <div className="form-group">
              <label>Postal code</label>
              <input className="form-control" onChange={e => setZip(e.target.value)}/>
            </div>
            <div className="form-group">
              <label>City</label>
              <input className="form-control" onChange={e => setCity(e.target.value)}/>
            </div>
            <div className="buttons">
              <button className="btn btn-primary">Order</button>
            </div>
          </form>
          </>
}

    </div>
  )
}