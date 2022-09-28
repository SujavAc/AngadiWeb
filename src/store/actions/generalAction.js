import { openSnackBar } from "./snackBarAction";
import { SendEmail } from "../../components/utils/Email/SendEmail";

export const sendContactData = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const state = getState();
    try {
      const ContactData = {
        ...data,
        date: Date.now(),
      };
      firestore
        .collection("enquiry")
        .add(ContactData)
        .then(() => {
          dispatch({ type: "SENT_ENQUIRY", ContactData });
          const payload = {
            variant: "success",
            message:
              "Successfully sent an enquiry, kindly wait for us to get back to you. Thank you!!",
            disableSubmit: false,
          };
          dispatch(openSnackBar(payload));
          const emailData = {
            subject: "Thank you for your recent enquiry.",
            Email: ContactData.email,
            FirstName: ContactData.name,
            title: "Enquiry",
            body: `Thank you for sending your enquiry. Here is the confirmation that we got your enquiry saying .....................>>>>>>>>>>>>>>>>>>>>>>[[[ ${ContactData.message} ]]].....................>>>>>>>>>>>>>>>>>>>>>>  and we are working on to get to you as soon as possible. Thank you for your being patient`,
          };
          SendEmail(emailData);
        })
        .catch((err) => {
          dispatch({ type: "SENT_ENQUIRY_ERR", err });
          const payload = {
            variant: "error",
            message: "Error while sending an enquiry",
            disableSubmit: false,
          };
          dispatch(openSnackBar(payload));
        });
    } catch {
      dispatch({ type: "SENT_ENQUIRY_ERR" });
      const payload = {
        variant: "error",
        message: "Error while sending an enquiry",
        disableSubmit: false,
      };
      dispatch(openSnackBar(payload));
    }
  };
};

export const addTAndCData = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const state = getState();
    if(state.firebase.auth.uid){
      try {
        firestore
          .collection("Term and Condition")
          .doc(data.termId)
          .update(data)
          .then(() => {
            dispatch({ type: "UPDATED_T&C_CONTENT", data });
            const payload = {
              variant: "success",
              message:
                "Successfully updated T&C content!!",
              disableSubmit: false,
            };
            dispatch(openSnackBar(payload));
          })
          .catch((err) => {
            dispatch({ type: "UPDATED_T&C_CONTENT_ERR", err });
            const payload = {
              variant: "error",
              message: "Error while updating T&C content",
              disableSubmit: false,
            };
            dispatch(openSnackBar(payload));
          });
      } catch {
        dispatch({ type: "UPDATED_T&C_CONTENT_ERR" });
        const payload = {
          variant: "error",
          message: "Error while updating T&C content",
          disableSubmit: false,
        };
        dispatch(openSnackBar(payload));
      }
    }else{
      dispatch({ type: "UPDATED_T&C_CONTENT_ERR" });
        const payload = {
          variant: "error",
          message: "You are not allowed to change content",
          disableSubmit: false,
        };
        dispatch(openSnackBar(payload));
    }
  };
};

export const addAboutUsData = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const state = getState();
    if(state.firebase.auth.uid){
      try {
        firestore
          .collection("About Us")
          .doc(data.aboutusId)
          .update(data)
          .then(() => {
            dispatch({ type: "UPDATED_ABOUTUS_CONTENT", data });
            const payload = {
              variant: "success",
              message:
                "Successfully updated about us content!!",
              disableSubmit: false,
            };
            dispatch(openSnackBar(payload));
          })
          .catch((err) => {
            dispatch({ type: "UPDATED_ABOUTUS_CONTENT_ERR", err });
            const payload = {
              variant: "error",
              message: "Error while updating about us content",
              disableSubmit: false,
            };
            dispatch(openSnackBar(payload));
          });
      } catch {
        dispatch({ type: "UPDATED_ABOUTUS_CONTENT_ERR" });
        const payload = {
          variant: "error",
          message: "Error while updating about us content",
          disableSubmit: false,
        };
        dispatch(openSnackBar(payload));
      }
    }else{
      dispatch({ type: "UPDATED_ABOUTUS_CONTENT_ERR" });
        const payload = {
          variant: "error",
          message: "You are not allowed to change content",
          disableSubmit: false,
        };
        dispatch(openSnackBar(payload));
    }
  };
};

export const sendFeedbackData = (data,productId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const state = getState();
    if(state.firebase.auth.uid){
      try {
        const RatingData = {
          ...data,
          productId: productId,
          date: Date.now(),
        };
        firestore
          .collection("ratings")
          .doc(productId)
          .collection("rating")
          .add(RatingData)
          .then(() => {
            dispatch({ type: "SENT_FEEDBACK", RatingData });
            const payload = {
              variant: "success",
              message:
                "Successfully sent an feedback, Thank you!!",
              disableSubmit: false,
            };
            dispatch(openSnackBar(payload));
          })
          .catch((err) => {
            dispatch({ type: "SENT_FEEDBACK_ERR", err });
            const payload = {
              variant: "error",
              message: "Error while sending your feedback",
              disableSubmit: false,
            };
            dispatch(openSnackBar(payload));
          });
      } catch {
        dispatch({ type: "SENT_FEEDBACK_ERR" });
        const payload = {
          variant: "error",
          message: "Error while sending your feedback",
          disableSubmit: false,
        };
        dispatch(openSnackBar(payload));
      }
    }else{
      dispatch({ type: "SENT_FEEDBACK_ERR" });
        const payload = {
          variant: "error",
          message: "You are not allowed to post a rating, if you are not a member with us.",
          disableSubmit: false,
        };
        dispatch(openSnackBar(payload));
    }
  };
};

export const sendFaqData = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const state = getState();
    try {
      const FaqData = {
        ...data,
        date: Date.now(),
      };
      firestore
        .collection("faqs")
        .add(FaqData)
        .then(() => {
          dispatch({ type: "SENT_FAQ", FaqData });
          const payload = {
            variant: "success",
            message:
              "Successfully sent an faq, kindly wait for our reply. Thank you!!",
            disableSubmit: false,
          };
          dispatch(openSnackBar(payload));
          // const emailData = {
          //   subject: "Thank you for your recent FAQ.",
          //   Email: FaqData.email,
          //   FirstName: FaqData.name,
          //   title: "Frequently Asked Question",
          //   body: `Thank you for sending your FAQ using our website. Here is the confirmation that we got your FAQ saying .....................>>>>>>>>>>>>>>>>>>>>>>[[[ ${FaqData.question} ]]].....................>>>>>>>>>>>>>>>>>>>>>>  and we are working on to priovide you an answer as soon as possible and will available on the website. Thank you for your being patient`,
          // };
          // SendEmail(emailData);
        })
        .catch((err) => {
          dispatch({ type: "SENT_FAQ_ERR", err });
          const payload = {
            variant: "error",
            message: "Error while sending an FAQ",
            disableSubmit: false,
          };
          dispatch(openSnackBar(payload));
        });
    } catch {
      dispatch({ type: "SENT_FAQ_ERR" });
      const payload = {
        variant: "error",
        message: "Error while sending an FAQ",
        disableSubmit: false,
      };
      dispatch(openSnackBar(payload));
    }
  };
};

export const handleUpdateFaq = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    firestore
      .collection("faqs")
      .doc(data.id)
      .update(data)
      .then(() => {
        const payload = {
          variant: "success",
          message: "Successfully updated FAQ",
          disableSubmit: false,
        };
        dispatch(openSnackBar(payload));
        dispatch({ type: "DELETE_FAQ", data });

      })
      .catch((err) => {
        const payload = {
          variant: "error",
          message: "Error while updating an FAQ",
          disableSubmit: false,
        };
        dispatch(openSnackBar(payload));
        dispatch({ type: "DELETE_FAQ_ERR", err });
      });
  };
} 

export const handleDeleteFaq = (id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    firestore
      .collection("faqs")
      .doc(id)
      .delete()
      .then(() => {
        const payload = {
          variant: "success",
          message: "Successfully deleted FAQ",
          disableSubmit: false,
        };
        dispatch(openSnackBar(payload));
        dispatch({ type: "DELETE_FAQ", id });

      })
      .catch((err) => {
        const payload = {
          variant: "error",
          message: "Error while deleting an FAQ",
          disableSubmit: false,
        };
        dispatch(openSnackBar(payload));
        dispatch({ type: "DELETE_FAQ_ERR", err });
      });
  };
} 

export const requestForRestPassword = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    try {
      firestore
        .collection("users")
        .where("email", "==", data.email)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            if (doc.data()) {
              const payload = {
                variant: "success",
                message: "Email verified",
                disableSubmit: false,
              };
              dispatch(openSnackBar(payload));
              firebase.auth().sendPasswordResetEmail(data.email);
              dispatch({ type: "EMAIL_VERIFIED" });
            } else {
              const payload = {
                variant: "error",
                message:
                  "Email not verified, Looks like you are not in system, Please sign up using this email address",
                disableSubmit: false,
              };
              dispatch(openSnackBar(payload));
              dispatch({ type: "EMAIL_VERIFIED_FAILED" });
            }
          });
        })
        .catch((err) => {
          console.log(err);
          dispatch({ type: "PASSWORD_RESET_ERR", err });
          const payload = {
            variant: "error",
            message: "Error while reseting the password",
            disableSubmit: false,
          };
          dispatch(openSnackBar(payload));
          dispatch({ type: "EMAIL_VERIFIED_FAILED" });
        });
    } catch {
      dispatch({ type: "SENT_FAQ_ERR" });
      const payload = {
        variant: "error",
        message: "Error while reseting the password",
        disableSubmit: false,
      };
      dispatch(openSnackBar(payload));
      dispatch({ type: "EMAIL_VERIFIED_FAILED" });
    }
  };
};

export const requestMemberValidateEmail = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    try {
      const memberData = {
        ...data,
        date: Date.now(),
      };
      const subscriber = [];
      firestore
        .collection("Subscriber")
        .where("Email", "==", data.Email)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            subscriber.push(doc.data());
          });
        })
        .then(() => {
          if (subscriber.length > 0) {
            const payload = {
              variant: "info",
              message: "Already member with us",
              disableSubmit: false,
            };
            dispatch(openSnackBar(payload));
            dispatch({ type: "MEMBER_ADDED_REJECT" });
          } else {
            const emailData = {
              subject: "A-Tech Verify Your Email Address",
              Email: memberData.Email,
              FirstName: memberData.FirstName,
              LastName: memberData.LastName,
              title: "Please Verify Your Email Address",
              body: `You are one step away to find out the great deals and promotion of variety of product in our store. I hope you will not be dissappointed. Here is your secret code ${memberData.code} for you to validate before subscribing`,
            };

            SendEmail(emailData);
            const payload = {
              variant: "success",
              message:
                "Please check the email for the unique code to validate your email address",
              disableSubmit: false,
            };
            dispatch(openSnackBar(payload));

            dispatch({ type: "VERIFICATION_EMAIL_SENT" });
          }
        })
        .catch((err) => {
          dispatch({ type: "MEMBER_ADDED_ERROR", err });
          const payload = {
            variant: "error",
            message: "Error while siging a memeber",
            disableSubmit: false,
          };
          dispatch(openSnackBar(payload));
        });
    } catch {
      dispatch({ type: "MEMBER_ADDED_ERROR" });
      const payload = {
        variant: "error",
        message: "Error while siging a memeber",
        disableSubmit: false,
      };
      dispatch(openSnackBar(payload));
    }
  };
};

export const requestMemberSubscribe = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const state = getState();
    const firebase = getFirebase();
    try {
      const memberData = {
        ...data,
        date: Date.now(),
      };
      firestore
        .collection("Subscriber")
        .add(memberData)
        .then(() => {
          const payload = {
            variant: "success",
            message: "Thank you for subscribing to our store.",
            disableSubmit: false,
          };
          const emailData = {
            subject: "Thank you for subscribing our store.",
            Email: memberData.Email,
            FirstName: memberData.FirstName,
            LastName: memberData.LastName,
            title: "Welcome to A-Tech Family",
            body: `Find out the great deals and promotion of variety of product in our store. I hope it will be an amazing experience on you e-commerce site.`,
          };
          SendEmail(emailData);
          dispatch(openSnackBar(payload));
          dispatch({ type: "MEMBER_ADDED_AFTER_VERIFICATION" });
        });
    } catch {
      dispatch({ type: "MEMBER_ADDED_ERROR" });
      const payload = {
        variant: "error",
        message: "Error while siging a memeber",
        disableSubmit: false,
      };
      dispatch(openSnackBar(payload));
    }
  };
};

export const getProductByCategoryName = (catName) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    try {
      const products = [];
      const productsSnapshots =  firestore.collection('products').get();
      const categoriesSnapshots =  firestore.collection('categories').get();
      productsSnapshots.forEach((productsSnapshot) => {
        let categoryName;
        categoriesSnapshots.forEach((snapshot) => {
          if (snapshot.id === productsSnapshot.data().category) {
            categoryName = snapshot.data().name;
          }
        });
  
        if (categoryName === catName) {
          const productData = productsSnapshot.data();
  
          products.push({
            // eslint-disable-next-line no-alert
            ...productData,
            // eslint-disable-next-line
          id: productsSnapshot.id,
            category: {
              id: productsSnapshot.data().category,
              name: categoryName,
            },
          });
        }
      });
      dispatch({type: "PRODUCT_OBTINED", products})
    } catch (err) {
      dispatch({type: "PRODUCT_OBTINED_ERROR"})
    }
  };
};