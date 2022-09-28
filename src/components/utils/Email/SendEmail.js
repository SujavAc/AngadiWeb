import React from "react";
import emailjs from '@emailjs/browser';
// import { ToastContainer, toast } from "react-toastify";
import { dispatchEmail, dispatchEmailErr } from "../../../store/actions/orderActions";

export const SendEmail = (userData => {

    if(!userData){
        return
    }else{
        return emailjs
                .send(
                "service_udrqygp",
                "template_n97oabm",
                userData,
                "user_e9z9DOUz4GgK7F2VJBskd"
                )
                .then(()=>{
                    dispatchEmail();
                }).catch((err)=>{
                    dispatchEmailErr();
                })
    }
    
})
