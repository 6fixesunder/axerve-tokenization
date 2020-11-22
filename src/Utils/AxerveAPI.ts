import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import CONF from '../Config/config.json';

class AxerveAPI {

    private readonly API_BASE_PATH: string = "https://ecomms2s.sella.it";
    private readonly API_VERSION: string = "/api/v1";
    private readonly PAYMENT_APY: string = "/payment";
    private readonly CREATE_ENDPOINT: string = "/create";

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
            console.log('JSON ', CONF);

            // axiosInstance.post(`${this.API_BASE_PATH + this.API_VERSION + this.PAYMENT_APY + this.CREATE_ENDPOINT}`, inputData)
            //     .then(res => resolve(res))
            //     .catch(err => reject(err))
        })
    }

}

export default AxerveAPI;