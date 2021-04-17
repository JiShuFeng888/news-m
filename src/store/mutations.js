import {SET_USER} from './mutations-type'
import {setLocalStorage} from "@/utils/tools";
import {USER_KEY} from "./mutations-type";

export default{
        [SET_USER](state,value){
          state.user=value
          setLocalStorage(USER_KEY,value)
        },

}
