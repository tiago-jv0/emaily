const config = require('config');
const stripe = require('stripe')(config.get('STRIPE_SECRET_KEY'));
const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.post('/api/stripe', requireLogin, async (req, resp) => {
    try {
      const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '$5 for 5 credits',
        source: req.body.id,
      });

      req.user.credits += 5;
      const user = await req.user.save();

      return resp.status(200).json({
        status: 'success',
        data: { user },
      });
    } catch (error) {
      console.log(error);
    }
  });
};
