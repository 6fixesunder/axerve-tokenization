import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { CardDetails } from "../components/Payment/Payment";
import CONF from '../config/config.json';

class AxerveAPI {

    private static axiosInstance: AxiosInstance;
    private static readonly API_BASE_PATH: string = "https://sandbox.gestpay.net";
    private static readonly API_VERSION: string = "/api/v1";
    private static readonly PAYMENT_APY: string = "/payment";
    private static readonly CREATE_ENDPOINT: string = "/create";
    private static readonly SUBMIT_ENDPOINT: string = "/submit";
    private static readonly DETAIL_ENDPOINT: string = "/detail";

    private static getAxiosInstance() {

        if (!this.axiosInstance) {
            const axiosConfig: AxiosRequestConfig = {
                headers: {
                    Authorization: `apikey ${CONF.AXERVE_API_KEY}`,
                }
            };
            this.axiosInstance = Axios.create(axiosConfig);
        }

        return this.axiosInstance;
    }

    public static createPayment = (amount: string, paymentID: string) => {
        return new Promise((resolve, reject) => {

            const axiosInstance: AxiosInstance = AxerveAPI.getAxiosInstance();
            let inputData: any = {
                "amount": amount,
                "currency": "242",
                "shopTransactionID": "AXERVE-TOKENIZATION-ID",
                "shopLogin": `${CONF.AXERVE_SHOP_LOGIN}`
            }

            /**
             * Using the previous paymentID you are going to bind
             * this new paymentToken with a previous payment and so
             * you can you the card token
             * **/
            if (paymentID?.length) {
                inputData = {
                    ...inputData,
                    "transDetails": {
                        "previousTransDetails": {
                            "paymentID": paymentID
                        }
                    }
                }
            }else {
                inputData = {
                    ...inputData,
                    "requestToken": "MASKEDPAN",
                }
            }

            axiosInstance.post(`${AxerveAPI.API_BASE_PATH +
                AxerveAPI.API_VERSION +
                AxerveAPI.PAYMENT_APY +
                AxerveAPI.CREATE_ENDPOINT}`,
                inputData)
                .then(res => resolve(res.data))
                .catch(err => {
                    console.error('Error ', err.request);
                    reject(err);
                })
        })
    }

    public static submitPayment = (cardDetails: CardDetails,
        paymentToken: string,
        cardToken: string) => {
        return new Promise((resolve, reject) => {

            const axiosInstance: AxiosInstance = AxerveAPI.getAxiosInstance();
            let inputData: any = {
                "shopLogin": `${CONF.AXERVE_SHOP_LOGIN}`,
                "buyer": {
                    "name": "Your Name",
                    "email": "your_email@email.com"
                },
                "paymentTypeDetails": {
                    "creditcard": {
                        "number": cardDetails.number,
                        "expMonth": cardDetails.expiryMonth,
                        "expYear": cardDetails.expiryYear,
                        "CVV": cardDetails.CVV
                    }
                }
            }

            if (cardToken.length) {
                inputData = {
                    ...inputData,
                    "paymentTypeDetails": {
                        "creditcard": {
                            "token": cardToken,
                        }
                    }
                }
            }

            axiosInstance.post(`${AxerveAPI.API_BASE_PATH +
                AxerveAPI.API_VERSION +
                AxerveAPI.PAYMENT_APY +
                AxerveAPI.SUBMIT_ENDPOINT}`,
                inputData,
                {
                    headers: {
                        paymentToken
                    }
                }
            )
                .then(res => resolve(res.data))
                .catch(err => {
                    console.error('Error ', err.request)
                    reject(err);
                })
        })
    }

    public static detail = (paymentToken: string, paymentID: string) => {
        return new Promise((resolve, reject) => {

            const axiosInstance: AxiosInstance = AxerveAPI.getAxiosInstance();
            const inputData = {
                "shopLogin": `${CONF.AXERVE_SHOP_LOGIN}`,
                "paymentID": paymentID
            }

            axiosInstance.post(`${AxerveAPI.API_BASE_PATH +
                AxerveAPI.API_VERSION +
                AxerveAPI.PAYMENT_APY +
                AxerveAPI.DETAIL_ENDPOINT}`,
                inputData,
                {
                    headers: {
                        paymentToken
                    }
                }
            )
                .then(res => resolve(res.data))
                .catch(err => {
                    console.error('Error ', err.request)
                    reject(err);
                })
        })
    }

}

export default AxerveAPI;