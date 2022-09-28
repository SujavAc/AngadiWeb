export const titleToId = (title) => {
  if(!title){
    return
  }
  return title?.trim().replace("/", "!").replace("^", " ") || "";
};

export const getTitlefromId = (title) => {
  if(!title){
    return
  }
  return title?.trim().replace("^", " ").replace("!", "/") || "";
};
