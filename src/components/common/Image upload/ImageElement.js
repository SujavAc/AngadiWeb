import React from "react";

import {
   Paper,
   Grid,
   CircularProgress,
   Box
} from "@material-ui/core";

export default function ImageElement({ image, index }) {

    
   return (
      <Box my={2} width={400}>
         <Paper>
            <Grid container direction="row" justify="center" spacing={2}>
                
                  {image.downloadURL ? (
               <Grid item >
                     <img
                        src={image.downloadURL}
                        alt={`${image.imageRef}`}
                        style={{
                           maxHeight: "100%",
                           maxWidth: "100%"
                        }}
                     />
                     </Grid>
                  ) : (
                    <Grid item container alignItems="center" justify="center"> 
                        <Box p={2}>
                            {image.status === "FINISH" ? (
                                <></>
                            ):(
                                <>
                                {image.status}...
                                </>
                            ) }
                            <CircularProgress />
                        </Box>
                    </Grid>
                  )}
               
            </Grid>
         </Paper>
      </Box>
   );
}