const utils = {}
import { hexMd5 } from "./md5.js";

utils.initRoute = function () {

}

utils.md5 = function (s){
    return hexMd5(s)
}


export default utils