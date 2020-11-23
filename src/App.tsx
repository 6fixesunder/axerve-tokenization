import React, { useEffect } from 'react';
import './App.css';
import AxerveAPI from '../src/Utils/AxerveAPI';
import Button from '@material-ui/core/Button/Button';
import Product from './Components/Product/Products';


function App() {

  useEffect(() => {

  })

  const createPayment = () => {
    AxerveAPI.createPayment('10')
      .then(res => {
        console.log('Response ', res);
      })
      .catch(err => console.error('Error ', err));
  }

  return (
    <div className="App">
      <Product />
      <Button variant="contained"
        color="primary"
        onClick={createPayment}
      >
        Create Payment
        </Button>
    </div>
  );
}

export default App;
