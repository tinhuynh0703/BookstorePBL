// const initialState = {
//     username: null
// }


// export const userReducer = (state = initialState, action) => {
//     console.log(state, action)
//     switch (action.type) {
//         case "GET_USER_NAME":
//             return {
//                 ...state,
//                 username: action.payload
//             }
//         default:
//             return state
//     }
// }

import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: null,
    },
    reducers: {
        getUserName: (state, action) => {
            state.username = action.payload;
        },
    }
})




