import React, { useEffect, useState } from "react";
import StripeCheckout from 'react-stripe-checkout';
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import { connect } from "react-redux";
import { clearCart } from "../../../store/actions/cartActions";
import { SendEmail } from "../../utils/Email/SendEmail";
import { startAnalytics } from "../../../config/firebaseConfig";
import { createOrder, dispatchEmailErr, dispatchEmail, verifyOrder } from "../../../store/actions/orderActions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "#FFFFFF",
  },
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    fontSize: 20,
    fontWeight: 600,
    display: "block",
  },
  priceDiv: {
    fontSize: 14,
    height: 14,
    fontWeight: 550,
  },
  priceHead: {
    color: "rgba(0,0,0,.6);",
    float: "left",
  },
  price: {
    color: "#000000",
    float: "right",
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  tPriceDiv: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
    height: 18,
  },
  tPriceHead: {
    float: "left",
  },
  tPrice: {
    float: "right",
  },
  save: {
    width: "100%",
    display: "flex",
    justifyContent: "end",
    textAlign: "right",
    fontSize: 14,
    color: theme.palette.success.main,
    fontWeight: 660,
  },
}));

const calcAPrice = (items) => {
  if (!items && items.length === 0) return 0;
  var res = 0;
  items.forEach((item) => {
    res += item.quantity * item.price;
  });
  return res;
};

const calcTPrice = (items) => {
  if (!items && items.length === 0) return 0;
  var res = 0;
  items.forEach((item) => {
    res += item.quantity * item.discountPrice;
  });
  return res;
};

function StripeCheckoutButton(props) {

  const classes = useStyles();
  const [aPrice, setAPrice] = useState(0);
  const [tPrice, setTPrice] = useState(0);
  const priceForStripe = tPrice * 100;
  const publishableKey = "pk_test_51KGa8zFsnlWapL4IJEZGdhTy2lYGofutpnGTDlmDUBdjqqzdWVMErOzU4YfdvUkf3MQtyBpowOU6sZUx9Av8fY9F007Lmj2A30";


  useEffect(() => {
	  console.log(props.cart);
	  console.log(props.profile);
    setAPrice(calcAPrice(props.cart));
    setTPrice(calcTPrice(props.cart));
  }, [props.cart]);

  const onToken = (token) => {
	handleSubmit(token);
	};

	function handleSubmit(token) {

		// const { email, uid, products, clearCart, user } = this.props;
		const uid = props.auth.uid;

		const tokenData = {
			token,
		};

		const emailData = {
			subject: "Thank you for your purchase with us.",
			Email: props.profile.email,
			FirstName: props.profile.name,
			title: 'Checkout Success',
			body: `Thank you for your recent purchase, Please visit the order page to view your latest status of your purchase `,
		}
		console.log(emailData);
		try {
			props.createOrder(tokenData);
      console.log('creating order');
			// props.verifyOrder(tokenData,uid);
      console.log('verifying order');
			if(props.profile.email){
        console.log('sending Email');
				SendEmail(emailData);
				props.dispatchEmail();
			}
        console.log('Order verified and completed');
				
		} catch (error) {
			props.dispatchEmailErr();
		}
	}

  return (
    <div className={classes.root}>
      <StripeCheckout
			type='button'
			label='Pay Now'
			name={`A-tech accessories`}
			description={`Your total is AUD ${tPrice}`}
			amount={priceForStripe}
			currency='AUD'
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
			shippingAddress
			billingAddress
			zipCode
		/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    cart: state.cart.items,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
	return {
		createOrder: (tokenData) => dispatch(createOrder(tokenData)),
		verifyOrder: (order,id) => dispatch(verifyOrder(order,id)),
	  clearCart: () => dispatch(clearCart()),
	  dispatchEmailErr: () => dispatch(dispatchEmailErr()),
	  dispatchEmail: () => dispatch(dispatchEmail()),
	};
  };

export default connect(mapStateToProps, mapDispatchToProps)(StripeCheckoutButton);
