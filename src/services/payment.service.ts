import { AppDataSource } from "../config/database";
import { Appointment } from "../entities/Appointment";
import { Payment } from '../entities/Payment'
import { paypalApi } from "../paypal/paypalClient";

const paymentRepo = AppDataSource.getRepository(Payment);
const appointmentRepo = AppDataSource.getRepository(Appointment);

export class PaymentService{

    // create paypal order
    static async createPaypalOrder(appointmentId: number, amount: string) {
        const response = await paypalApi(
            "/v2/checkout/orders",
            "POST",
            {
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currence_code: "CAD",
                            value: amount,
                        },
                        custom_id: String(appointmentId)
                    }
                ],

                application_context: {
                    return_url: process.env.PAYPAL_RETURN_URL,
                    cancel_url: process.env.PAYPAL_CANCEL_URL,
                }
            }
        );

        return response.data;
    }

    // Capture paypal order
    static async captureOrder(orderId: string) {
        const response = await paypalApi(
            `/v2/checkout/orders/${orderId}/capture`,
            "POST",
            {},
        );

        return response.data;
    }

    //save payment in database
    static async recordPayment(
        appointmentId: number,
        amount: string,
        method: string,
        meta?: any
    ){}
}