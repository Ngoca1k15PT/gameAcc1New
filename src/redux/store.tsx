import { applyMiddleware, configureStore } from '@reduxjs/toolkit'


const rootReducer = {

}

const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: false
    //     })
})

export default store