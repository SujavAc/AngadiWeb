export const configs = {};

configs.title = "A-Tech";
configs.description = "Buy Online from A-Tech | All payment options available";

configs.aboutus =
  "A-Tech is a easy to deploy e commerce application with all payment options, specially designed for Australian user space";

configs.address =
  "#000, xyz street, near xyz complex";

// provide contact number with country code
configs.contactInfo = {
  email: "a.techaccess@gmail.com",
  watsappNum: "+61424403509",
  androidAppLink: "#",
  iosAppLink: "#",
};

// Buttons, Icons, Some Imp text color
configs.primary = "#c70f11";
// Heade/Toolbar color
configs.secondary = "#E1F5FE";
// Footer color
configs.footer = "#c5c5c5";
// view all button
configs.viewall = "#900325";

configs.razorpay = {
  key_id: process.env.REACT_APP_RAZORPAY_KEY_ID,
};

configs.algolia = {
  app_id: process.env.REACT_APP_ALGOLIA_APP_ID,
  search_only_key: process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_KEY,
};

// max cards in single pagination
configs.maxPageCards = 20;
configs.maxCategoryOnHomepage = 10;
configs.maxRatingCards = 20;
// max categories on category bar below header
configs.maxCategoriesOnBar = 16;
// max categories on category box
configs.maxCategoriesInBox = 16;

// Open Pincodes check dialog when user clicks on "Add to my cart" button when the cart is empty
configs.openPincodeEmptyCart = false;

// Firebase functions base_url
configs.functionsURL =
  "https://us-central1-tlist-ee9f5.cloudfunctions.net/api";

configs.usingAlgoliaFree = true;
