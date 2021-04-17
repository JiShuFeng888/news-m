import {SET_USER} from './mutations-type'
import {} from './../api/user'
export default{
      setUser({commit},value){
      commit(SET_USER,value);
      },


}


