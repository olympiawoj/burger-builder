import axios from "axios";

//now I have my own axios configured to this base URL
//later in course when we add authenticaion, we'll use different URL so I don't want to set this URL as global default
const instance = axios.create({
  baseURL: "https://olympias-burger-app.firebaseio.com/"
});

export default instance;
