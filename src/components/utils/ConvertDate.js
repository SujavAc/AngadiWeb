export function ConvertDate(time){
    if(!time){
        return
    }else{
        if(typeof time === 'number'){
            const date = new Date(time);
            return (
              date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
            );
          }
          var date = new Date(time.toString());
          return (
            date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
          );
    }

}

export function ConvertTime(time){
    if(typeof time === 'number'){
      const date = new Date(time);
      return date.toLocaleTimeString("en-AU");
    }
    var date = new Date(time.toString());
    return date.toLocaleTimeString("en-AU");
  };