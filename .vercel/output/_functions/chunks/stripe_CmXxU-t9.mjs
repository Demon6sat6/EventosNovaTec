import Stripe from 'stripe';

const stripe = new Stripe("sk_test_...");

export { stripe as s };
