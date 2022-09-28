import React, { useEffect } from "react";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CollapsibleList from "../../common/Collapsible/Collapsible";
import CategoryIcon from '@material-ui/icons/Category';
import { FormGroup, FormControlLabel, Checkbox, Grid, Divider } from "@material-ui/core";
import SearchFilter from "./SearchFilter";

const useStyles = makeStyles((theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
    formControlLabel: {
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.up("sm")]: {
            flexDirection: 'row',
            flexWrap: 'wrap'
          },
      },
  }),
);

export default function CategoryFilter(props) {
  const { category, addSelectedValues, searchSelectedValue, deleteSelectedValues, sortByPrice } = props;
  const classes = useStyles();

  const handleChange = (event,data) => {
    if(data && event.target.checked){
      return addSelectedValues({...data });
    }
    if(data && !event.target.checked){
      return deleteSelectedValue(data);
    }
  };

  const deleteSelectedValue = (data) => {
    const newSelectedValue = searchSelectedValue.filter(value => value.key != data.key);
    return deleteSelectedValues(newSelectedValue);
  } 
  const handleEditChange = (event,data) => {
    handleChange(event,data);
};

  const handleFilterChange = (e) => {
    let value = e.target.value;
        let direction = value.endsWith('asc') ? "asc" : "desc";
};
    useEffect(()=>{
      
    },[searchSelectedValue])

    const option = [
      {key: "Name - A-Z", value: '', type:'alphabet'},{key: "Name - Z-A", value: '', type:'alphabet'},{key: "Price - Lowest to Highest", value: '', type:'price'},{key: "Price - Highest to Lowest", value: '', type:'price'}
    ]
  return (
    <div>
      <Grid item xs={12} sm={12}>
      <SearchFilter selectedFilter={searchSelectedValue} handleDelete={handleEditChange}/>
      </Grid>
      <Grid container justify="space-between">
      <Grid item xs={12} sm={4}>
      <FormGroup>
        <CollapsibleList primaryText="Choose Category" icon={<CategoryIcon />}>
            <div className={classes.nested}>
                {category &&
                    category.map((value, index) => {
                    return (
                        <FormControlLabel
                        className={classes.formControlLabel}
                        key={index}
                        control={
                            <Checkbox
                            key={index}
                            checked={searchSelectedValue?.name}
                            onChange={(e) => handleChange(e,{key: value?.name, value: value?.id})}
                            name={value?.name}
                            color="primary"
                            />
                        }
                        label={value?.name}
                        />
                    );
                    })}
            </div>
        </CollapsibleList>
        </FormGroup>
      </Grid>
      <Grid item xs={12} sm={4}>
      <FormGroup>
        <CollapsibleList primaryText="Filter" icon={<CategoryIcon />}>
            <div className={classes.nested}>
                {option &&
                    option.map((value, index) => {
                    return (
                        <FormControlLabel
                        className={classes.formControlLabel}
                        key={index}
                        control={
                            <Checkbox
                            key={index}
                            checked={searchSelectedValue?.name}
                            onChange={(e) => handleChange(e,value)}
                            name={value.key}
                            color="primary"
                            />
                        }
                        label={value.key}
                        />
                    );
                    })}
            </div>
        </CollapsibleList>
      </FormGroup>
      </Grid>
      </Grid>
      
    </div>
  );
}
