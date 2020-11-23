import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import CONF from '../Config/config.json';

class AxerveAPI {

    private static readonly API_BASE_PATH: string = "https://sandbox.gestpay.net";
    private static readonly API_VERSION: string = "/api/v1";
    private static readonly PAYMENT_APY: string = "/payment";
    private static readonly CREATE_ENDPOINT: string = "/create";

    public static createPayment = (amount: string) => {
        return new Promise((resolve, reject) => {

            const axiosConfig: AxiosRequestConfig = {
                headers: {
                    Authorization: `apikey ${CONF.AXERVE_API_KEY}`,
                }
            };

            const axiosInstance: AxiosInstance = Axios.create(axiosConfig);
            const inputData = {
                "amount": amount,
                "currency": "242",
                "shopTransactionID": "AXERVE-TOKENIZATION-ID",
                "requestToken": "MASKEDPAN",
                "shopLogin": `${CONF.AXERVE_SHOP_LOGIN}`
            }

            console.log('Input data 2', inputData);

            axiosInstance.post(`${AxerveAPI.API_BASE_PATH +
                AxerveAPI.API_VERSION +
                AxerveAPI.PAYMENT_APY +
                AxerveAPI.CREATE_ENDPOINT}`,
                inputData)
                .then(res => resolve(res.data))
                .catch(err => {
                    console.error('Error ', err);
                    reject(err);
                })
        })
    }

}

export default AxerveAPI;