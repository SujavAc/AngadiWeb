import React, { useEffect } from "react";
import { makeStyles, Grid, Typography, Divider } from "@material-ui/core";
import ActionButton from "./actionButton";
import { ConvertDate, ConvertTime } from "../../../../utils/ConvertDate";

import { cancelOrder, deliveredOrder } from "../../../../../store/actions/paymentActions";
import { connect } from "react-redux";
import FaqForm from "./FaqForm";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "80vh",
    backgroundColor: "#FFFFFF",
    [theme.breakpoints.down("xs")]: {
      marginRight: "0px",
      marginBottom: "10px",
    },
    paddingBottom: "10px",
  },
  metadata: {
    padding: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  divider: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  orderBtns: {
    color: theme.palette.primary.dark,
    marginButton: theme.spacing(1),
  },
  cancelled: {
    color: "red",
    textAlign: "center",
  },
  delivered: {
    color: "green",
    textAlign: "center",
  },
}));

const getItems = (cart) => {
  const items = [];
  if (!cart) return items;
  const citems = cart.split("|");
  citems.forEach((c) => {
    const sc = c.split(";");
    if (sc.length === 5)
      items.push({
        title: sc[0],
        quantity: parseInt(sc[1]),
        price: sc[2],
        variant: sc[3],
        productId: sc[4],
      });
  });
  return items;
};

const getItemsCount = (cart) => {
  return cart.split("|").length;
};

function FaqDetails(props) {
  const classes = useStyles();

  const handleCancel = () => {
    props.cancelOrder(props.faq.id);
  };

  const handleDeliver = () => {
    props.deliveredOrder(props.faq.id);
  };

  if (!props.faq.date) {
    return <div className={classes.root}></div>;
  }

  
  return (
    <div className={classes.root}>
      <div className={classes.metadata}>
        <Grid container>
          <Grid item xs={12}>
            {/* <Grid item container justify="center"> */}
              <Grid item>
              <Typography component="h1" variant="h4">
                  Faq's Details:
                </Typography>
                <Typography component="p">
                  <b>faq Id:</b> {props.faq.id}
                </Typography>
                
              </Grid>
            {/* </Grid> */}
          </Grid>
          <Grid item xs={12}>
            {/* <Grid item container justify="center"> */}
              <Grid item>
                <Typography component="p">
                  <b>Date:</b> {ConvertDate(props.faq.date)}
                </Typography>
                <Typography component="p">
                  <b>Time:</b> {ConvertTime(props.faq.date)}
                </Typography>
              </Grid>
            {/* </Grid> */}
          </Grid>
        </Grid>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.metadata}>
        <Grid container>
          <Grid item xs={12}>
            <Grid item container justify="center">
              <Grid item>
                <Typography component="p">
                  <b>Customer Email: </b> {props.faq.email}
                </Typography>
                <Typography component="p">
                  <b>Customer Name: </b> {props.faq.name}
                </Typography>
                <Typography component="p">
                  <b>question: </b> {props.faq.question}
                </Typography>
                <Typography component="p">
                  <b>Answer: </b> {props.faq.answer ? (props.faq.answer) : "To do"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {/* <Grid item container justify="center"> */}
              <FaqForm faq={props.faq} handleUpdateFaq={props.handleUpdateFaq} handleDeleteFaq={props.handleDeleteFaq}/>
            {/* </Grid> */}
          </Grid>
        </Grid>
      </div>
      {/* <div className={classes.metadate}>
            <Grid container>
              <Grid item xs={6}>
                <Grid item container justify="center">
                  <Grid item>
                    <ActionButton
                      deliver={true}
                      handleDelivery={handleDeliver}
                      handleCancel={handleCancel}
                      id={props.faq.id}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid item container justify="center">
                  <Grid item>
                    <ActionButton
                      deliver={false}
                      handleDelivery={handleDeliver}
                      handleCancel={handleCancel}
                      id={props.faq.id}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
      </div> */}
      {/* {getItemsCount(props.faq.order_data) > 0 &&
        getItems(props.faq.order_data).map((product) => (
          <ProductSummary key={product.productId} product={product} />
        ))} */}
    </div>
  );
}

const mapDispatchtoProps = (dispatch) => {
  return {
    cancelOrder: (id) => dispatch(cancelOrder(id)),
    deliveredOrder: (id) => dispatch(deliveredOrder(id)),
  };
};

export default connect(null, mapDispatchtoProps)(FaqDetails);
