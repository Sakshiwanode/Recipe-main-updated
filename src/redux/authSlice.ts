
import { createSlice } from '@reduxjs/toolkit';

export const appStateSlice = createSlice({
  name: 'appState',
  initialState: {
    authToken: null, 
   
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
   
   
  },
});

export const { setAuthToken } = appStateSlice.actions;

export default appStateSlice.reducer;
