import { createAsyncThunk } from '@reduxjs/toolkit'

const commonFireBaseGetCheck = createAsyncThunk('count/getUnReadNotification', async () => {
    // const { data, code } = await AuthAPIs.getUnReadNotificationNumber()
    // return { data }
})
export { commonFireBaseGetCheck }