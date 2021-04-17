import modeType from './modeType'
import {USER_KEY} from './mutations-type'
import {getLocalStorage} from "@/utils/tools";

export default {
    user:getLocalStorage(USER_KEY)


}
