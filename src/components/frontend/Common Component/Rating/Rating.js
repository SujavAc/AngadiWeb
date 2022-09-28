import React, { useEffect } from "react";
import {
  Card,
  Typography,
  Divider,
  Grid,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import FeedbackForm from "../../Form/feedbackForm";
import GlobalDialog from "../../../common/Global Dialog/slide-dialog";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { formatDistance } from "date-fns";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import {values} from 'lodash'
import "./rating.css";
import CustomPagination from "../../../common/Pagination/Pagination";
import RatingCard from "./RatingCard";
// const useStyles = makeStyles((theme) => ({
//   root: {
//       paddingTop:theme.spacing(5),
//     display: 'flex',
//     flexDirection: 'column',
//     '& > * + *': {
//       marginTop: theme.spacing(1),
//     },
//   },
//   irating:{
//       display:'flex',
//       flexDirection:'column',
//   },
//   title:{
//     display:'flex',
//       flexDirection:'row',
//       justifyContent:'space-between',
//   },
// }));

function Review({ id, widget, align}) {
  useFirestoreConnect([ 
    { 
      collection: 'ratings', 
      doc: `${id}`, 
      subcollections: [{ collection: 'rating', where:[["productId", "==", `${id}`]] }], orderBy: [
        ["date", "desc"],
      ],
      storeAs: 'productRating' 
    } 
  ])
 
  // const [ratingData, setRatingData] = React.useState([]);
  // const rating = [4.2, 4.3, 5.0, 1.2, 2.2, 5.0, 5.0, 4.5, 4.8];

  const ratings = useSelector((state) => state.firestore.data);

  const ratingData = values(ratings.productRating)
  const getParkRating = () => {
    const sum = ratingData.reduce((a, b) => {
      return a + parseFloat(b.rating);
    }, 0);
    const average = sum / ratingData.length;
    return Math.round(average * 100) / 100;
  };

  
  

  
// useEffect(()=>{
//  setRatingData(values(ratings.productRating));
// },[ratingData])
  if (widget == "big") {
    return (
      <div className="Rating-component">
        {/* <Card>
          <CardContent> */}
            <div className="title">
              <div style={{padding:"16px"}}>
                <div className="overal-rating">
                  <Typography variant="h4">
                    {getParkRating() ? getParkRating() : ""}
                  </Typography>
                  <Rating
                    readOnly
                    name="rating"
                    value={4.8}
                    size="large"
                    precision={0.5}
                    readOnly={true}
                    style={{
                      display: "felx",
                      flexDirection: "row",
                      alignContent: "center",
                      justifyContent: "center",
                      paddingBottom: "10px",
                    }}
                  />
                </div>
              </div>
              <div style={{padding:"16px"}}>
                <GlobalDialog buttonName={"Add Rating"} actionButton={false}
                title={"Your feedback is very important for us"}
                >
                  <FeedbackForm id={id} />
                </GlobalDialog>
              </div>
            </div>
            <Divider />
            <Grid container></Grid>
          {/* </CardContent> */}
          <CustomPagination 
          data={ratingData}
          page={1}
          overalRating={getParkRating()}
          count={ratingData.length}
          nextPage={() => {}}
          
          />
          {/* {!ratingData ? (
            <>...loadings</>
          ) : ratingData.length < 0 ? <>No ratings</> : (
            <>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {ratingData && ratingData.map((value, index) => {
                  return (
                    <Grid item xs={12} sm={6} lg={6}>
                      <ListItem alignItems="flex-start" key={index}>
                        <ListItemAvatar>
                          <Avatar
                            alt={value.name}
                            src="/static/images/avatar/1.jpg"
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <div className="rating-title">
                                {value.name}

                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="textSecondary"
                                  style={{
                                    paddingTop: "10px",
                                    paddingBottom: "10px",
                                  }}
                                >
                                  {value.rating}
                                  <StarBorderIcon /> rating
                                </Typography>
                              </div>
                            </React.Fragment>
                          }
                          secondary={
                            <React.Fragment>
                              <div className="rating-star-comp">
                                <Rating
                                  value={value.rating}
                                  name="rating"
                                  size="large"
                                  precision={0.5}
                                  readOnly="true"
                                  style={{
                                    display: "felx",
                                    flexDirection: "row",
                                    alignContent: "center",
                                    justifyContent: "center",
                                    paddingBottom: "10px",
                                  }}
                                />

                                <Typography
                                  component="span"
                                  variant="body1"
                                  color="textPrimary"
                                  style={{
                                    blockSize: "auto",
                                    writingMode: "horizontal-tb",
                                    textAlign: "center",
                                  }}
                                >
                                  "{value.feedback}"
                                </Typography>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="textSecondary"
                                  style={{
                                    paddingTop: "10px",
                                    paddingBottom: "10px",
                                    textAlign: "right",
                                  }}
                                >
                                  {formatDistance(new Date(), value.date)}{" "}
                                  ago
                                </Typography>
                              </div>
                              <Divider />
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )} */}
         {/* </Card> */}
      </div>
    );
  }
  if (widget == "small") {
    return (
      <div className="smallWidget">
        <Rating
          value={getParkRating() ? getParkRating() : 0}
          name="rating"
          size="small"
          precision={0.5}
          readOnly="true"
          style={{
            display: "felx",
            flexDirection: "row",
            paddingBottom: "15px",
          }}
        />
        <Typography sx={{ color: "text.primary" }}>
          {getParkRating() ? getParkRating() : 0} ({ratings.length})
        </Typography>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    // ratings: state.firestore.ordered.ratings,
  };
};

export default compose(
  connect(mapStateToProps, null)
)(Review);