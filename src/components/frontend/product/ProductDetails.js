import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Hidden } from "@material-ui/core";
import { IconButton, Divider } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import ProductSwiper from "./ProductSwiper";
import Editor from "rich-markdown-editor";
import CopyLink from "../../common/Elements/CopyLink/CopyLink";
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  FacebookShareCount,
} from "react-share";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { addItem, removeItem } from "../../../store/actions/cartActions";
import { getTitlefromId } from "../../common/utils";
import ScrollToTop from "../../common/ScrollToTop";
import Layout from "../Layout/Layout";
import Review from '../Common Component/Rating/Rating';
import ProductImageCarousel from "./ProductImageCarousel";
import AnimatedImage from "../../common/Elements/Image/Image";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eaeded",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  root2: {
    backgroundColor: "#ffffff",
    marginBottom: theme.spacing(1),
  },
  pImage: {
    width: "100%",
    height: "auto",
    marginTop: theme.spacing(1),
  },
  pImageRoot: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  title: {
    fontSize: "20px",
    fontWeight: 700,
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
    },
    marginBottom: "4px",
    display: "block",
  },
  details: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  off: {
    fontSize: "14px",
    fontWeight: "bold",
    padding: "4px",
    background: theme.palette.success.main,
    color: "#FFFFFF",
    borderRadius: theme.shape.borderRadius,
    whiteSpace: "nowrap",
    display: "inline-block",
  },
  priceBox: {
    marginTop: theme.spacing(2),
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  apriceDiv: {
    fontSize: "16px",
    fontWeight: 300,
    display: "inline",
    marginRight: theme.spacing(3),
    textDecoration: "line-through",
    marginBottom: theme.spacing(2),
  },
  priceDiv: {
    fontSize: "26px",
    fontWeight: 300,
    display: "inline",
  },
  saveDiv: {
    fontSize: "16px",
    fontWeight: 300,
    color: theme.palette.success.main,
  },
  save: {
    fontWeight: 600,
  },
  aprice: {
    fontWeight: 600,
  },
  price: {
    fontWeight: 600,
  },
  taxinfo: {
    color: "#808080",
  },
  changeCountDiv: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  countBtn: {
    color: "#FFFFFF",
    backgroundColor: theme.palette.primary.main,
    height: "32px",
    width: "32px",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  change: {
    height: "40px",
    width: "160px",
  },
  count: {
    display: "flex",
    height: "100%",
    width: "64px",
    alignItems: "center",
    justifyContent: "center",
  },
  addBtn: {
    backgroundColor: theme.palette.primary.main,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    color: "#FFFFFF",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: 400,
    justifyContent: "space-between",
    borderRadius: theme.shape.borderRadius,
    height: "100%",
  },
  iconAddBtn: {
    background:
      "rgba(255, 255, 255, 0.1) url(/imgs/add_plus.svg) center no-repeat",
    width: 24,
    height: 24,
    borderRadius: "50%",
    float: "right",
  },
  divider: {
    color: theme.palette.primary.main,
    marginTop: theme.spacing(3),
  },
  descHead: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#000000",
  },
  description: {
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  descSubHead: {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    fontSize: "16px",
    fontWeight: "bold",
  },
  descContent: {
    paddingLeft: theme.spacing(2),
    fontSize: "16px",
  },
  shareDiv: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyItems: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  shareIcon: {
    paddingRight: theme.spacing(1),
  },
  variant: {
    fontSize: "14px",
    fontWeight: "bold",
    padding: 5,
    background: "rgba(111,114,132,.25)",
    borderRadius: theme.shape.borderRadius,
  },
  ofs: {
    color: "grey",
    fontWeight: 400,
    fontSize: 20,
    marginTop: 30,
  },
}));

const url = "/imgs/default.jpg";

function ProductDetails(props) {
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const product =
    props.products !== undefined ? props.products[0] : { imageURL: url };

  useEffect(() => {
    if (props.products !== undefined && props.products.length > 0) {
      setLoaded(true);
    }
  }, [props.products]);

  useEffect(() => {
    if (loaded) {
      var cartP = props.cart.find(
        (x) => x.title === getTitlefromId(props.match.params.productId)
      );
      if (cartP) {
        setCount(cartP.quantity);
      } else {
        setCount(0);
      }
    }
  }, [props.cart, loaded, props.products]);

  const handleAdd = () => {
    if (loaded) {
      props.addItem(product);
    }
  };

  const plusCount = () => {
    if (loaded) {
      props.addItem(product);
    }
  };

  const minusCount = () => {
    if (loaded) {
      props.removeItem(product);
    }
  };

  return (
    <Layout title={"A-Tech > Product Details"} content={getTitlefromId(props.match.params.productId)}>
      <div className={classes.root}>
        <ScrollToTop />
        <div className={classes.root2}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sm={6}
              container
              // justify="center"
              // alignItems="center"
            >
              
                {loaded && (
                  <Hidden smUp>
                    <div className={classes.pImageRoot}>
                      <span className={classes.title}>{product?.title + " "}</span>
                      {product?.discount > 0 && (
                        <span className={classes.off}>
                          {product.discount + "% off"}
                        </span>
                      )}{" "}
                      <span className={classes.variant}>{product?.unit}</span>
                    </div>
                  </Hidden>
                )}
                {/* <img className={classes.pImage} src={product?.imageUrl} /> */}
                
              
              {product?.imageUrls && product?.imageUrls.length > 0 ? (
                  <ProductImageCarousel images={product?.imageUrls.length > 0 ? product?.imageUrls : []}/>
                ) : (
                  <img className={classes.pImage} src={product?.imageUrl} alt={`${product?.title}`}/>
                  //  {/* <AnimatedImage imageUrl={product?.imageUrl} alt="Product presentation" /> */}
                )}
            </Grid>
            <Grid item xs={12} sm={6} container>
              {loaded && (
                <div className={classes.details}>
                  <Hidden xsDown>
                    <span className={classes.title}>{product?.title} </span>
                    {product?.discount > 0 && (
                      <span className={classes.off}>
                        {product.discount + "% off"}
                      </span>
                    )}{" "}
                    <span className={classes.variant}>Available: {product?.unit} unit</span>
                  </Hidden>
                  <div className={classes.priceBox}>
                    {product?.discount > 0 && (
                      <div className={classes.apriceDiv}>
                        <span className={classes.aprice}>
                          {"AUD " + product?.price}
                        </span>
                      </div>
                    )}
                    <div className={classes.priceDiv}>
                      <span>Price: </span>
                      <span className={classes.price}>
                        {"AUD " + product?.discountPrice}
                      </span>
                    </div>
                    {product?.discount > 0 && (
                      <div className={classes.saveDiv}>
                        <span>You Save: </span>
                        <span className={classes.save}>
                          {"AUD " + (product?.price - product?.discountPrice)}
                        </span>
                      </div>
                    )}
                    <div className={classes.taxinfo}>Inclusive of all taxes</div>
                  </div>
                  {product?.visibility && (
                    <div className={classes.change}>
                      {count < 1 && (
                        <div className={classes.addBtn} onClick={handleAdd}>
                          <span>Add to My Cart</span>
                          <span className={classes.iconAddBtn}></span>
                        </div>
                      )}
                      {count > 0 && (
                        <div className={classes.changeCountDiv}>
                          <IconButton
                            onClick={minusCount}
                            className={classes.countBtn}
                            aria-label="remove"
                          >
                            <Remove />
                          </IconButton>

                          <div className={classes.count}>{count}</div>
                          <IconButton
                            onClick={plusCount}
                            className={classes.countBtn}
                            aria-label="add"
                          >
                            <Add />
                          </IconButton>
                        </div>
                      )}
                    </div>
                  )}
                  <div className={classes.shareDiv}>
                    <EmailShareButton url={window.location.href} subject={"Check out this amazing product"}>
                      <EmailIcon
                        className={classes.shareIcon}
                        size={40}
                        round={true}
                      />
                    </EmailShareButton>
                    {/* <FacebookShareButton url={window.location.href}>
                      <FacebookIcon
                        className={classes.shareIcon}
                        size={40}
                        round={true}
                      />
                    </FacebookShareButton> */}
                    <FacebookShareButton
                      url={window.location.href}
                      title={`A-tech-${product?.title}`}
                      hastags={[`${product?.material}`]}
                      quote="A-Tech - Products in one place"
                      draggable={true}
                    >
                      <FacebookShareCount url={window.location.href}>
                        {(shareCount) => (
                          <span className="myShareCountWrapper">{shareCount}</span>
                        )}
                      </FacebookShareCount>
                      <FacebookIcon className={classes.shareIcon} size={40} round={true} />
                    </FacebookShareButton>
                    <TwitterShareButton
                      title={`Check it out!!!-${product?.title}`}
                      url={window.location.href}
                      hastags={[`${product?.material}`]}
                      draggable={true}
                    >
                      <TwitterIcon className={classes.shareIcon} size={40} round />
                    </TwitterShareButton>
                    <WhatsappShareButton url={window.location.href}>
                      <WhatsappIcon
                        className={classes.shareIcon}
                        size={40}
                        round={true}
                      />
                    </WhatsappShareButton>
                    <CopyLink />
                  </div>
                  {!product?.visibility && (
                    <div className={classes.ofs}>Out of Stock</div>
                  )}
                </div>
              )}
            </Grid>
            <Grid item xs={12} container justify="center">
              <Grid item xs={11}>
                <Divider className={classes.divider} />
              </Grid>
            </Grid>
            {loaded && (
              <Grid item xs={12}>
                <div className={classes.description}>
                  <div className={classes.descHead}>Description</div>
                  <div className={classes.descSubHead}>{product?.title} </div>
                  <div className={classes.descContent}>
                    {product?.description && (
                      <Editor 
                        defaultValue={product?.description}
                        className="editor-description"
                        readOnly
                        value={product?.description}
                        
                        style={{
                          fontFamily: "'Merriweather', serif",
                          fontSize: "20px",
                          letterSpacing: "0.05em",
                        }}
                      />
                    )}
                  </div>
                </div>
              </Grid>
            )}
          </Grid>
        </div>
        <Review id={product?.id} widget="big"/>
        <ProductSwiper title={"People also buy"} categoryId={product?.category}/>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.firestore.ordered.products,
    cart: state.cart.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => dispatch(addItem(item)),
    removeItem: (item) => dispatch(removeItem(item)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    if(!props.match.params.productId){
      return
    }
    return [
      {
        collection: "products",
        where: [["title", "==", getTitlefromId(props.match.params.productId)]],
        limit: 1,
      }
    ];
  })
)(ProductDetails);
