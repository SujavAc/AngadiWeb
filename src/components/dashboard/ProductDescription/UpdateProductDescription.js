import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PageHeader from "../common/PageHeader";
import DescriptionIcon from '@material-ui/icons/Description';
import { Paper, Grid, TextField, IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import TabView from "../../common/Tabs/Tab";
import { truncate } from "lodash";
import RichMarkdownEditor from "rich-markdown-editor";
import Button from "../../common/controls/Button";
import { saveProductDescripion } from "../../../store/actions/productActions";
// import { writeLocations } from "../../../store/actions/locationActions";

const useStyles = makeStyles((theme) => ({

  productList: {
    display: 'flex',
    flexDirection: 'rows',
    innerHeight: 300,
    overflowX: 'scroll',
    overflow: 'hidden',
    padding: theme.spacing(3),
  },
  rootPaper:{
    padding: theme.spacing(3),
    margin: theme.spacing(3),
  },
  item: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  selectedItem: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
}));

const item = [
  {name: "sujav",href:"products/?category=favorites",imageUrl:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTpWI9Ut0u9PQdVRwrxITYcnX2baK2WpAm0jnmesQLe0dNPhKrrLwkZDkyaLARi6HeVkEGTpIdEfBw&usqp=CAc"},
  {name: "acharya",href:"products/?category=favorites", imageUrl:"data:image/png;base64,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"},
  {name: "sujav",href:"products/?category=favorites",imageUrl:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTpWI9Ut0u9PQdVRwrxITYcnX2baK2WpAm0jnmesQLe0dNPhKrrLwkZDkyaLARi6HeVkEGTpIdEfBw&usqp=CAc"},
  {name: "sujav",href:"products/?category=favorites",imageUrl:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTpWI9Ut0u9PQdVRwrxITYcnX2baK2WpAm0jnmesQLe0dNPhKrrLwkZDkyaLARi6HeVkEGTpIdEfBw&usqp=CAc"},
  {name: "sujav",href:"products/?category=favorites",imageUrl:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTpWI9Ut0u9PQdVRwrxITYcnX2baK2WpAm0jnmesQLe0dNPhKrrLwkZDkyaLARi6HeVkEGTpIdEfBw&usqp=CAc"},
  {name: "sujav",href:"products/?category=favorites",imageUrl:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTpWI9Ut0u9PQdVRwrxITYcnX2baK2WpAm0jnmesQLe0dNPhKrrLwkZDkyaLARi6HeVkEGTpIdEfBw&usqp=CAc"}  
]

function UpdateProductDescription(props) {
  const classes = useStyles();
  const [updatedDescription,setUpdatedDescription] = React.useState('');
  const [itemDescription,setItemDescription] = React.useState(null);
  const [selectedProduct,setSelectedProduct] = React.useState(null);

  const handleSelectedProduct = (item) => {
    if(!item){
      return
    }
    setItemDescription(item.description);
    setSelectedProduct(item.id);
  }

  const handleSaveProductDescripion = () => {
    if(selectedProduct,updatedDescription){
      props.saveProductDescripion(selectedProduct,updatedDescription);
    }
  }

  return (
    <div>
      <PageHeader
        title={"Update product Description"}
        icon={<DescriptionIcon fontSize="large" />}
        subTitle={"Add, remove, and update product description"}
      />
      <Grid container justify="center">
        <Grid item xs={12}>
          <Paper className={classes.rootPaper}>
            {/* <TabView alignment="horizontal" items={item}/> */}
            <Grid container justify="center" spacing={2}>
              <Grid item xs={12} sm={12}>
               Item List:
               <div className={classes.productList}>
               {props.fetchingStatus && (
                 props.products && props.products.map((value)=>{
                 return(
                   <div key={value.id} className={value.id === selectedProduct ? classes.selectedItem : classes.item} onClick={()=>handleSelectedProduct(value)}>
                     <img src={value.imageUrl} alt={value.title} width="100px" height="150px" />
                     <span>{truncate(value.title,100) }</span>
                  </div>
                 )
               }))}
               </div>
              </Grid>
              <Grid item xs={12} sm={12}>
                Item description
                {itemDescription && (
                  <RichMarkdownEditor
                  defaultValue={itemDescription || ""}
                  value={itemDescription || ""}
                  onChange={(value)=>{setUpdatedDescription(value())}}
                />
                )}
                {itemDescription && (
                  <Grid item container justify="center">
                  <Grid item>
                    <Button text="Save Changes" variant="outlined" size="large" onClick={handleSaveProductDescripion} disabled={updatedDescription ? itemDescription === updatedDescription ? true : false : true}/>
                  </Grid>
                </Grid>
                )}
                
              </Grid>
            </Grid>
            <div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    fetchingStatus: state.firestore.status.requested.products,
    products: state.firestore.ordered.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveProductDescripion: (id,description) => dispatch(saveProductDescripion(id,description))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: "products" }])
)(UpdateProductDescription);
