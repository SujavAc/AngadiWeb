import React, { useState, useEffect } from "react";

import { Grid, Box, Button, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import ImagesDropzone from "./ImageDropzone";
import ImageElement from "./ImageElement";
import { IconButton } from "@material-ui/core";
import { Delete,AddPhotoAlternate } from "@material-ui/icons";
import {
   updateProductMultipleImage,
   updateProductMultipleImageURL,
   deleteImage,
   closeSnackbar,
 } from "../../../store/actions/productActions";
 import { connect } from "react-redux";
 import { compose } from "redux";
// import Loader from "../../Loader/Loader";

 function ImageUpload(props) {
   const [imageList, setImageList] = useState([]);
   const [saveImageList, setSaveImageList] = useState([]);
   const [trigerAutoSave, setTriggerAutoSave] = useState(false);
   const { product, imageLists, updateProductMultipleImage, updateProductMultipleImageURL,deleteImage} = props;
   // const [sanckbarStatus, setSnackbarStatus] = useState(props.productStatus);

   // const handleSnackbarClose = () => {
   //    props.closeSnackbar();
   //  };

   const changeImageField = (index, parameter, value) => {
      const newArray = [...imageList];
      newArray[index][parameter] = value;
      setImageList(newArray);
   };

   const handelDeleteOneImage = (image,index) => () => {
    const data = {
        imageRef: image
    }
   //  axios.post('/admin/product/deleteone/image', data, {
   //  }).then(async(response) => {
      //   console.log(response.data);
      deleteImage(product,image);

        const array = [...saveImageList];
        array.splice(index, 1);
        setSaveImageList(array);

        console.log(saveImageList);
      //   updateProductMultipleImage(product,saveImageList);
      //   toast.success(`${response.data.message}`);
      //   console.log(typeof imageList);
   //  })
}
const saveToProductDatabase = () => {
    const authToken = localStorage.getItem('Authorization');
			// axios.defaults.headers.common = { Authorization: `${authToken}` };

            // const data = {
            //     productId: productId,
            //     imageUrls: imageList,
            // }
            const newImageList = imageList.concat(imageLists);
            console.log(newImageList);
            updateProductMultipleImage(product,imageList);
   //  axios
	// .put(`/admin/product/${productId}`, data)
   //  .then((response) => {
   //      console.log(response.data);
   //  })
}

// useEffect(() => {
//    setSnackbarStatus(props.productStatus);
//  }, [props.productStatus]);

// useEffect(()=>{
//    if(imageLists.length > 0){
//       setImageList(imageLists);
//    }
// },[imageLists])

useEffect(()=>{
   // const newArray = imageList.concat(imageLists);
   // setImageList(newArray);
   setSaveImageList(imageLists);
},[imageList,imageLists])

   useEffect(() => {
       imageList && imageList.forEach(async(image, index) => {
         if (image.status === "FINISH" || image.status === "UPLOADING") return;
         changeImageField(index, "status", "UPLOADING");
         const formData = new FormData();
         formData.append('product', product );
         // formData.append('productId', image.fileName );
            formData.append('file', image.fileName);
            formData.append('image', image.file);
      //   const formData = {
      //       'productId': image.fileName,
      //       'image': image.file
      //   }
            
            await updateProductMultipleImageURL(product,image);
            
            const path = `productImages%2F${product.id}%2Furls%2F`;
            changeImageField(index, "downloadURL", `https://firebasestorage.googleapis.com/v0/b/tlist-ee9f5.appspot.com/o/${path}${image.fileName}?alt=media`);
            changeImageField(index, "imageRef", image.fileName);
            changeImageField(index, "path", path);
            changeImageField(index, "status", "FINISH");
            
      //    axios.post('/admin/product/image', formData, {
      //       headers: {
      //           'content-type': 'multipart/form-data'
      //       }
      //   }).then(async(response) => {
      //       console.log(response);
      //       const data = await response.data;
      //       changeImageField(index, "downloadURL", data.image);
      //       changeImageField(index, "imageRef", data.imageRef);
            // changeImageField(index, "path", uploadedImage.path);
      //       changeImageField(index, "status", "FINISH");
      //   })
        
        //  const uploadTask = image.storageRef.put(image.file);
        //  uploadTask.on(
        //     "state_changed",
        //     null,
        //     function error(err) {
        //        console.log("Error Image Upload:", err);
        //     },
        //     async function complete() {
        //        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
        //        changeImageField(index, "downloadURL", downloadURL);
        //        changeImageField(index, "status", "FINISH");
        //     }
        //  );
      });
      
   });

   return (
      <Grid container direction="column" alignItems="center" spacing={2} >
          {/* <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={sanckbarStatus?.snackbarStatus}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        key={"topright"}
      >
        <Alert onClose={handleSnackbarClose} severity={sanckbarStatus?.variant}>
          {sanckbarStatus?.message}
        </Alert>
      </Snackbar> */}
         <Box border={1} margin={4} padding={3} >
            <Grid
               item
               container
               direction="column"
               alignItems="center"
               xs={12}
               spacing={1}
               
            >
               <Grid item container xs={12} justify="center" >
                   {product && (
                       <Button variant="contained" endIcon={<AddPhotoAlternate />} onClick={saveToProductDatabase}>
                       Upload
                     </Button>
                   )}
                  <ImagesDropzone setImageList={setImageList} />
               </Grid>
            </Grid>
         </Box>
         {saveImageList && (
                  <>
                  <h1>Previous image list</h1>
                  {saveImageList.length > 0 ? (
                     <>
                     {saveImageList.map((image, index) => {
                     return (
                        <Grid item key={index} sx={{position:'absolute'}}>
                            <IconButton aria-label="delete" size="large" sx={{position:'relative',top:10, right:0}} onClick={handelDeleteOneImage(image.imageRef,index)}>
                               <Delete fontSize="inherit" />
                            </IconButton>
                           <ImageElement
                              image={image}
                              index={index}
                           />
                        </Grid>
                     );
                  })}
                  </>
                  ):(
                     <span>No image to display</span>
                  )}
                  
                  </>
               )}
         {imageList.length > 0 && (
            <Box>
               
               {/* {imageList && (
                      <Loader />
                  )} */}
            </Box>
         )}
      </Grid>
   );
}
const mapStateToProps = (state) => {
   return {
      uploadedImage: state.product.uploadedImage,
   };
 };
 

const mapDispatchToProps = (dispatch) => {
   return {
      deleteImage : (product, imageRef) => 
       dispatch(deleteImage(product,imageRef)),
      updateProductMultipleImageURL: (product, imageData) =>
         dispatch(updateProductMultipleImageURL(product, imageData)),
      updateProductMultipleImage: (productId, ImageData) =>
       dispatch(updateProductMultipleImage(productId, ImageData)),
       closeSnackbar: () => dispatch(closeSnackbar()),
   };
 };

 export default compose(
   connect(mapStateToProps, mapDispatchToProps)
 )(ImageUpload);