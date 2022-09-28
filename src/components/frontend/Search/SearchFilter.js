import * as React from 'react';
import { makeStyles, styled, Chip, Paper } from '@material-ui/core';
import { TagFaces } from '@material-ui/icons';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));
const useStyles = makeStyles((theme) => ({
    filterWrapper: {
        display: 'flex',
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
  const [chipData, setChipData] = React.useState([]);

  // const handleDelete = (chipToDelete) => () => {
  //   setChipData((chips) => chipData.filter((chip) => chip.key !== chipToDelete.key));
  // };

  React.useEffect(()=>{
    console.log(selectedFilter);
    setChipData(selectedFilter)
  },[props.selectedFilter])

  return (
    <Paper
      className={classes.filterWrapper}
      component="ul"
    >
      {selectedFilter && Object.keys(selectedFilter).map((data,index) => {
        let icon;
        
          return (
            <ListItem key={index}>
              {data && (
                <Chip
                  icon={icon}
                  variant="outlined"
                  label={data}
                  onDelete={(e)=>handleDelete(e,data)}
                  color="primary"
                />
              )}
            </ListItem>
          );
      })}
      
    </Paper>
  );
}
