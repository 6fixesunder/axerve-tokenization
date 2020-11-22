import React, { useEffect } from 'react';
import './App.css';
import AxerveAPI  from '../src/Utils/AxerveAPI';

function App() {

  useEffect(() => {
    AxerveAPI.createPayment('10')
    .then(res => {
      console.log('Response ', res);
    }).catch(err => console.error('Error ', err));
  })

  return (
    <div className="App">
    </div>
  );
}

export default App;
