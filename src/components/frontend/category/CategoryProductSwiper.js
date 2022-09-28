import React, { useEffect } from "react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import { Link } from "react-router-dom";
import { configs } from "../../../config/configs";
import ProductCard from "../product/ProductCard";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
    "& .swiper-button-prev, .swiper-button-next": {
      color: theme.palette.primary.main,
      height: 22,
      width: 16,
    },
    "& .swiper-button-prev::after, .swiper-button-next::after": {
      fontSize: 30,
      [theme.breakpoints.down("sm")]: {
        fontSize: 0,
      },
    },
  },
  titleSpan: {
    color: theme.palette.primary.main,
    fontSize: "1.5rem",
    fontWeight: 700,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },
  white: {
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  viewall: {
    float: "right",
    color: configs.viewall,
    fontWeight: 700,
    [theme.breakpoints.down("sm")]: {
      fontWeight: 600,
    },
  },
  swiperRoot: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
    "& .swiper-button-prev, .swiper-button-next": {
      color: theme.palette.primary.main,
      height: 22,
      width: 16,
    },
    "& .swiper-button-prev::after, .swiper-button-next::after": {
      fontSize: 30,
      [theme.breakpoints.down("sm")]: {
        fontSize: 0,
      },
    },
    "& .swiper-slide": {
      width: "auto",
      marginRight: 10,
      color: theme.palette.primary.main
    },
  },
  spacer: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(1),
    },
  },
  emptyProduct: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(1),
    },
  },
}));

function CategoryProductSwiper(props) {
  const {title, products,categoryId} = props;
  const classes = useStyles();
  

  return (
    <div className={classes.white}>
      {title && (<span className={classes.titleSpan}>{title}</span>)}
      <Button component={Link} to={`/category/${categoryId}`} className={classes.viewall}>
        View All
      </Button>

      <div >
      {!products&& (
        <Swiper
        className={classes.root}
        slidesPerView={"auto"}
        navigation
        height={300}
      >
        {Array.from(new Array(6)).map((value,index)=>{
          return <SwiperSlide key={index}>
          <Skeleton
          key={index}
          variant="rect"
          height={200}
          width={170}
          className={classes.spacer}
        />
        </SwiperSlide>
        })}
      </Swiper>
      )}
      </div>
      {products && products.length === 0 && (
          <div className={classes.emptyProduct}>Coming Soon...</div>
      )}
      {products && (
        <Swiper
          className={classes.swiperRoot}
          slidesPerView={"auto"}
          navigation
          height={300}
        >
          {products.map((productData) => {
            if (productData.visibility) {
                return (
                  <SwiperSlide key={productData.id}>
                    <ProductCard productData={productData} />
                  </SwiperSlide>
                );
              }
              
            })}
        </Swiper>
      )}
    </div>
  );
}
export default CategoryProductSwiper;
