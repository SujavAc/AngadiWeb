import * as React from 'react';
import { makeStyles, styled, Chip, Paper } from '@material-ui/core';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));
const useStyles = makeStyles((theme) => ({
    filterWrapper: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,

    },
}));

export default function SearchFilter(props) {
  const classes = useStyles();
  const { selectedFilter,handleDelete } = props


  return (
    <div
      className={classes.filterWrapper}
    >
      {selectedFilter && selectedFilter.map((data,index) => {
        let icon;
        
          return (
            <ListItem key={index}>
              {data && (
                <Chip
                  icon={icon}
                  variant="outlined"
                  label={data.key}
                  // onDelete={(e)=>handleDelete(e,data)}
                  color="primary"
                />
              )}
            </ListItem>
          );
        
      })}
      
    </div>
  );
}
