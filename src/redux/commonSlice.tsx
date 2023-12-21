import { createSlice } from '@reduxjs/toolkit'
import {commonFireBaseGetCheck} from './thunks/commonThunks'

const common = createSlice({
    name: 'common',
    initialState: {
        keyAF: '',
        isCheck:false,
    },
    reducers: {
        updaetKey: (state, action) => {
            state.keyAF = action.payload
        },
        updateChek: (state, action) => {
            state.isCheck = action.payload
        },
        
    },
    extraReducers: (builder) => {
        builder.addCase(commonFireBaseGetCheck.fulfilled, (state, actions) => {
            const { data } = actions.payload
            state.isCheck = data
        })
    }
})

const { reducer, actions } = common
export const {
    updaetKey,
    updateChek,
} = actions
export default reducer