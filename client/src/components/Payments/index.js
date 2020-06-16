import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import { handleToken } from '../../redux/auth/auth.actions';

import { connect } from 'react-redux';

const Payments = ({ handleToken }) => {
  return (
    <StripeCheckout
      name="Emaily"
      description="$5 for 5 email credits"
      amount={500}
      token={(token) => handleToken(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <button className="btn"> Add credits</button>
    </StripeCheckout>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleToken: (token) => dispatch(handleToken(token)),
});

export default connect(null, mapDispatchToProps)(Payments);
