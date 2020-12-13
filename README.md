# Axerve Card Tokenization

The aim of this project is to show off how to use the card tokenization mechanism, discussed in this [article](https://6fixesunder.com), available through  Axerve service.

I've built a simple e-shop where you can add products to your cart and then purchase them. 

All the payments are managed through Axerve payment api. Afer the first payment si made, the next payment are executed using a token of the credit card instead it's details.

## Basic Setup

Before starting the app configure your [Merchant API key and Shop ID](https://docs.gestpay.it/rest/getting-started/setup-merchant-profile/) into *config.json* file located [here](https://github.com/6fixesunder/axerve-tokenization/blob/master/src/Config/config.json).

## Running the app
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
