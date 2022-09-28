import React from "react";
import {
  Typography,
  Divider,
  Grid,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { formatDistance } from "date-fns";
import "./rating.css";

export default function RatingCard({ widget, value, overalRating, count }) {
  if (widget == "big") {
    return (
      <div className="Rating-component">
        <Divider />
        <Grid container></Grid>
        <>
          <Grid
            container
            direction="row"
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} sm={12} lg={12}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={value.name} src="/static/images/avatar/1.jpg" />
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
                          readOnly={true}
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
                          {formatDistance(new Date(), value.date)} ago
                        </Typography>
                      </div>
                      <Divider variant="inset" />
                    </React.Fragment>
                  }
                />
              </ListItem>
            </Grid>
          </Grid>
        </>
      </div>
    );
  }
  if (widget == "small") {
    return (
      <div className="smallWidget">
        <Rating
          value={overalRating ? overalRating : 0}
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
          {overalRating ? overalRating : 0} ({count})
        </Typography>
      </div>
    );
  }
}
