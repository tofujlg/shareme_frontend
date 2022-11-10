export const fetchUser = () => {
//TODO:これも多分後々また改良しないといけない
/* const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
      */
     const localData = localStorage.getItem("user")
  return localData
}

