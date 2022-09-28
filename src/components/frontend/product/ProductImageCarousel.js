import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";


// import "./styles.css";
import { EffectFlip } from 'swiper';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, EffectCards } from "swiper";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import { makeStyles } from "@material-ui/core/styles";
import AnimatedImage from "../../common/Elements/Image/Image";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
    "& .swiper-button-prev, .swiper-button-next": {
      color: theme.palette.primary.main,
      height: 22,
      width: 16,
    },
    "& .swiper-button-prev": {
      left: 0,
    },
    "& .swiper-button-next": {
      right: 0,
    },
    "& .swiper-pagination-bullet-active": {
      color: "#fff",
      background: theme.palette.primary.main,
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    "& .swiper-pagination": {
      position: "absolute",
      bottom: 0,
    },
    "& .swiper-pagination-bullet": {
      color: "#fff",
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    "& .swiper-button-prev::after, .swiper-button-next::after": {
      fontSize: 30,
      [theme.breakpoints.down("sm")]: {
        fontSize: 0,
      },
    },
    "& .swiper-wrapper": {
      // display:'flex',
      // flexDirection: 'rows',
      // justifyContent: 'center',
      width: "300px",
      color: theme.palette.primary.main
    },
    "& .swiper-conatiner": {
      color: theme.palette.primary.main,
      
    },
    "& .swiper-slide": {
      marginRight: 10,
      color: theme.palette.primary.main
    },
    clear: "both",
  },
}));

export default function ProductImageCarousel(props) {
  const classes = useStyles();
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <>
    {/* {props.images ? (
      <> */}
      {props.images.length && (
        <Swiper
        className={classes.root}
        grabCursor={true}
        slidesPerView={1}
        centeredSlides={true}
        spaceBetween={30}
        pagination={pagination}
        navigation={true}
        modules={[Navigation,Pagination]}
        height={400}
      >
       {props.images.map((image,index)=> <SwiperSlide key={index}><AnimatedImage imageUrl={image.downloadURL} alt={image.filename} /></SwiperSlide>)}
      </Swiper>
      )}
      {/* </>
    ):(
      <> */}
      {props.image && (
      <Swiper
      grabCursor={true}
        pagination={pagination}
        // navigation={true}
        modules={[Pagination, Navigation]}
      
    >
     <SwiperSlide><img src={props.image} alt={`product-image`} /></SwiperSlide>
    </Swiper>
    )}
    </>
    // )} 
    // </>
  );
}
