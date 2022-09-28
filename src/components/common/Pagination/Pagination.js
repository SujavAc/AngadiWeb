import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { configs } from "../../../config/configs";
import RatingCard from "../../frontend/Common Component/Rating/RatingCard";
import Transition from "../Elements/Transition/Transition";

const useStyles = makeStyles((theme) => ({
  productRoot: {
    backgroundColor: "#ffffff",
    padding: theme.spacing(1),
  },
  pagination: {
    margin: theme.spacing(1),
  },
  meta: {
    boxSizing: "border-box",
    padding: theme.spacing(2),
    fontSize: 16,
    fontWeight: 400,
  },
  pageCount: {
    fontSize: 20,
    fontWeight: 600,
  },
}));

const sliceProducts = (data, page, limit) => {
  const startIndex = limit * (page - 1);
  const totalPages = Math.ceil(data.length / limit);
  if (page !== totalPages) {
    return data.slice(startIndex, startIndex + limit);
  } else {
    return data.slice(startIndex, data.length);
  }
};

const getProductCountInPage = (data, page, limit) => {
  const startIndex = limit * (page - 1);
  const totalPages = Math.ceil(data.length / limit);
  if (data.length <= limit) {
    return data.length;
  }
  if (page !== totalPages) {
    return limit;
  } else {
    return data.length - startIndex;
  }
};

function CustomPagination(props) {
  const classes = useStyles();
  const [page, setPage] = useState(props.page);
  const handleChange = (event, value) => {
    if (value > page) {
      props.nextPage(value);
    }
    setPage(value);
  };
  const pageLimit = configs.maxRatingCards;
  const { data } = props;

  return (
    <div>
      <div className={classes.meta}>
        Showing{" "}
        <span className={classes.pageCount}>
          {getProductCountInPage(data, page, pageLimit)}
        </span>{" "}
        of <span className={classes.pageCount}> {props.count}</span> ratings
      </div>
      <div className={classes.productRoot}>
        <Grid container spacing={1}>
          {sliceProducts(data, page, pageLimit).map((rating,index) => {
            return (
              <Grid key={index} item xs={12} sm={6} md={6} xl={6}>
                
                  <Transition transitionType="grow" active={true} direction="up" timeout={2000}>
                <RatingCard
                widget="big" 
                overalRating={props.overalRating}
                value={rating}
                count = {props.count}
                fullwidth={true}
                  titleLimit={50}
                />
                </Transition>
              </Grid>
            );
          })}
        </Grid>
        <Grid container justify="center">
          <Grid item>
            <Pagination
              count={Math.ceil(props.count / pageLimit)}
              color="primary"
              variant="outlined"
              shape="round"
              page={page}
              className={classes.pagination}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default CustomPagination;
