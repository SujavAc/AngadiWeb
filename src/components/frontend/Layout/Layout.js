import React,{useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router";
import DocumentHead from "./DocumentHead/DocumentHead";
import BackToTop from './Anchor/Anchor';
import Footer from "../home/Footer";
import AppBar from "../appbar/AppBar";
import { startAnalytics } from "../../../config/firebaseConfig";

const useStyles = makeStyles((theme) => ({
    // root: {
    //   paddingTop: theme.spacing(15),
    //   [theme.breakpoints.down("lg")]: {
    //     paddingTop: theme.spacing(8.75),
    //   },
    // },
}));

export default function Layout({ title, content, richSnippets, images, quote, hastag, children, color }){
    const { pathname, search } = useLocation();
    const classes = useStyles();
    useEffect(()=>{
        if(title && pathname){
            startAnalytics().logEvent('page_view',{
                "path": pathname,
                "search": search,
                "title": title,
            })
        }
    },[title,pathname,search])
    return(
        <React.Fragment>
            <div className={classes.root}>
                <DocumentHead title={title} content={content} richSnippets={richSnippets} images={images} quotes={quote} hashtags={hastag} color={color}/>
                {children}
            </div>
        </React.Fragment>
    );
}