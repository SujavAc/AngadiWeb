import React, { useEffect } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { formatDistance } from 'date-fns';
import Editor from "rich-markdown-editor";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const useStyles = makeStyles((theme) => ({
    answer: {
        display: 'flex',
        flexDirection: 'column',
    },
    details: {
        flexDirection: 'column',
    }
}));

function FaqList(props){
    const classes = useStyles();
    const faqList = props.faqs ? props.faqs : "";
    const [expanded, setExpanded] = React.useState('panel0');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    
  
    return(
        <div>
            {faqList.length === 0 && (
                <Skeleton
                animation="wave"
                variant="rect"
                width="100%"
                height={100}
              />
            )}
            {faqList.length > 0 &&(
                <>
                {faqList.map((value,index)=>{
                    if(value?.answer){
                        return(
                            <Accordion key={index} expanded={expanded === `panel${index}` ? true : false} onChange={handleChange(`panel${index}`)}>
                                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                    <Typography>{value.question}</Typography>
                                </AccordionSummary>
                                <AccordionDetails className={classes.details}>
                                    <div className={classes.answer}>
                                    <strong>Answer:</strong>
                                    <Typography>
                                    <Editor
                                        defaultValue={value?.answer}
                                        readOnly
                                        value={value?.answer}
                                    />
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" align="right">
                                    Update: {formatDistance(new Date(),(value.date))} ago
                                    </Typography>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        )
                    }
                })}
                </>
            )}
    </div>
    )
}

const mapStateToProps = (state) => {
    return {
      faqs: state.firestore.ordered.faqs,
    };
  };
  
  
  export default compose(
    connect(mapStateToProps, null),
    firestoreConnect((props) => {
      return [
        {
          collection: "faqs",
          orderBy: [['date', 'desc' ]]
        },
      ];
    })
  )(FaqList);