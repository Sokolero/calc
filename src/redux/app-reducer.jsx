import {authMe} from "./auth-reducer";
import {getProducts} from "./products-reduce";
import{getPosts} from "./home-reducer.jsx"

const INITIALIZED_SUCCESSFUL = "INITIALIZED_SUCCESSFUL";


let initialStore = {
    initialized: false,
};

const appReducer = (state = initialStore, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESSFUL: {
            return {
                ...state,
                initialized: true
            }
        }

        default:
            return state;
    }
};

const setInitialized = () => {
    return {type: INITIALIZED_SUCCESSFUL}
};

export const initializedApp = () => async (dispatch) => {
    let promiseAuthMe = await dispatch(authMe());
    let obj = "{\"total\":0,\"products\":[]}"
    console.log(promiseAuthMe)

    if (promiseAuthMe.resultCode === 0) {
        obj = promiseAuthMe.user[0].myprice
    }

    let promiseProducts = await dispatch(getProducts(obj));


    let promisePosts = await dispatch(getPosts());
  

    Promise.all([promiseAuthMe, promiseProducts,promisePosts]);
    dispatch(setInitialized());
}

export default appReducer;