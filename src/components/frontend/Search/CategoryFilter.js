import React, { useEffect } from "react";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CollapsibleList from "../../common/Collapsible/Collapsible";
import CategoryIcon from '@material-ui/icons/Category';
import { FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
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
  const { category, addSelectedValues, searchSelectedValue } = props;
  const classes = useStyles();
  const handleChange = (event) => {
      addSelectedValues({ ...searchSelectedValue, [event.target.name]: event.target.checked });
    
  };
  
  const handleDelete = (e,chipToDelete) => {
    const filteredByKey = Object.fromEntries(Object.entries(searchSelectedValue).filter(([key, value]) => key === chipToDelete))
    console.log(filteredByKey);
    // addSelectedValues({ ...searchSelectedValue, [chipToDelete]: false });
    // delete searchSelectedValue.chipToDelete;
    // addSelectedValues(searchSelectedValue);
    // const updatedselectedFilter = searchSelectedValue.filter((select) => select !== chipToDelete);
    // console.log(updatedselectedFilter);
    // addSelectedValues({ ...searchSelectedValue, updatedselectedFilter});
    // console.log(updatedselectedFilter);
    // searchSelectedValue.chipToDelete = false;
    // addSelectedValues({...searchSelectedValue, [chipToDelete]: false})
    // const updatedselectedFilter = selectedFilter.filter((select) => select.label !== chipToDelete.label);
    //     setSelectedFilter(updatedselectedFilter);
    //     const label = chipToDelete.label;
    //     // setState({...state, [label]: false});
    //     addSelectedValues(updatedselectedFilter)
  };
    useEffect(()=>{
        // console.log(searchSelectedValue)
        // console.log(state);
    },[searchSelectedValue])

  return (
    <div>
        <SearchFilter selectedFilter={searchSelectedValue} handleDelete={handleDelete}/>
      <FormGroup>
        <CollapsibleList primaryText="Choose Category" icon={<CategoryIcon />}>
            <div className={classes.nested}>
                {category &&
                    category.map(({ name }, index) => {
                    return (
                        <FormControlLabel
                        className={classes.formControlLabel}
                        key={index}
                        control={
                            <Checkbox
                            key={index}
                            checked={searchSelectedValue.name}
                            onChange={(e) => handleChange(e)}
                            name={name}
                            color="primary"
                            />
                        }
                        label={name}
                        />
                    );
                    })}
            </div>
        </CollapsibleList>
      </FormGroup>
    </div>
  );
}
