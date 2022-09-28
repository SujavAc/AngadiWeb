import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip,IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addToFav } from '../../../store/actions/favAction';
import { includes } from 'lodash';

const useStyles = makeStyles((theme) => ({
    icon:{
    }
  }));

function AddToFav(props) {
	const { state, auth, productId, addToFav, profile } = props;
	const history = useHistory(); 
    const classes = useStyles();

	const isFavourite = (pId) =>{
		const fav = profile.fav ? profile.fav : [];
			if(includes(fav,pId)){
				return true;
			}else{
				return false
			}
	}

	async function handleOnIconClick() {
		if (!auth.uid) {
			history.push('/signin');
			addToFav();
			return;
		}
		 else {
			addToFav(productId);
		}
	}

	return (
		<Tooltip title="Add to Favourite">
            <IconButton aria-label="add to favorites" onClick={() => handleOnIconClick()}>
                <FavoriteIcon className={classes.icon} color={isFavourite(productId) ? 'primary' : "inherit"} sx={{cursor:"pointer"}} />
            </IconButton>
		</Tooltip>
		
	);
}

function mapDispatchToProps(dispatch) {
	return {
		addToFav: (productId) => dispatch(addToFav(productId)),
	};
}

const mapStateToProps = (state) => {
	return {
        auth: state.firebase.auth,
		profile: state.firebase.profile,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToFav);
