import {SET_USER} from './mutations-type'
import {setLocalStorage} from "@/utils/tools";
import {USER_KEY} from "./mutations-type";

export default{
        [SET_USER](state,value){
          state.user=value
          setLocalStorage(USER_KEY,value)
          console.log(value)
        },
        addCachePage(state,pageName){
          if (!state.cachePages.includes(pageName)){
            state.cachePages.push(pageName)
          }
        },
        removeCachePage(state,pageName){
          let index=state.cachePages.indexOf(pageName)
          if (index!==-1){
            state.cachePages.splice(index,1)
          }
        },


}
