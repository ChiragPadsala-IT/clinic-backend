import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const clientId = process.env.PAYPAL_CLIENT_ID || "";
const clientSecret = process.env.PAYPAL_CLIENT_SECRET || "";
const PAYPAL_BASE_URL = process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

// Generate OAuth token
export const generateAccessToken = async (): Promise <string> => {
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const response = await axios.post(
        `${PAYPAL_BASE_URL}/v1/oauth2/token`,
        "grant_type=client_credentials",
        {
            headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        }
    )

    return response.data.access_token;
}

