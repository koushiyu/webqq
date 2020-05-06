import axios from "axios";

const config: any = localStorage.getItem("config");
let ip , qq ; 
ip = qq= null;
if (!config) window.location.hash = "#/config";
else{
  const temp = JSON.parse(config)
  ip = temp.ip;
  qq = temp.qq;
}


const instance = axios.create({
  baseURL: ip + "/v1/LuaApiCaller?qq=" + qq,
  headers: {
    "Content-Type": "application/json",
    
  },
});
export default instance;
