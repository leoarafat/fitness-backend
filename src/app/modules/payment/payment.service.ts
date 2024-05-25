import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import Stripe from 'stripe';

const stripe = new Stripe('your-secret-key');
const makePaymentIntent = async (payload: { price: number }) => {
  if (typeof payload.price !== 'number' || payload.price <= 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid payment amount');
  }
  const amount = Math.trunc(payload.price * 100);
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    payment_method_types: ['card'],
  });
  const data = {
    client_secret: paymentIntent.client_secret,
    transactionId: paymentIntent.id,
  };
  return data;
};

export const PaymentService = { makePaymentIntent };
