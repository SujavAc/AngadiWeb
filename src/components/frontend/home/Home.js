import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import RMCarousel from "./RMCarousel";
import CategorySwiper from "../category/CategorySwiper";
import ProductSwiper from "../product/ProductSwiper";
import CategoryProductSwiper from "../category/CategoryProductSwiper";
import ScrollToTop from "../../common/ScrollToTop";
import Layout from "../Layout/Layout";
import SubscribeUS from "../Subscribe/Subscribe";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import BackToTop from "../Layout/Anchor/Anchor";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eaeded",
    paddingBottom: theme.spacing(2),
  },
}));

function Home(props) {
  const classes = useStyles();

  function getProducts(id){
   const categoryProduct = props.products && props.products.filter((a)=> a.category === id);
   return categoryProduct;
  }
  

  return (
    <Layout title='A-Tech > Home' content="Find the products you are looking for!!">
      {/* <BackToTop id="#home"> */}
      <div className={classes.root}>
        <ScrollToTop />
        <RMCarousel />
        <ProductSwiper title={"Top Deals"} />
        <CategorySwiper />
        {props.categories && props.categories.map((value,index)=>(
          <CategoryProductSwiper key={index} title={value.name} products={getProducts(value.id)} categoryId={value.id}/>
        ))}
        <SubscribeUS 
          user={props.profile}
          title={"Subscribe for latest deals and promotion"}
          text={
              "To subscribe to this website, please enter your email address here. We will send updates occasionally."
            }
          />
        </div>
        {/* </BackToTop> */}
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.firestore.ordered.categories,
    products: state.firestore.ordered.products,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // sendContactData: (data) => dispatch(sendContactData(data)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "categories" },{collection:"products"}])
)(Home);
