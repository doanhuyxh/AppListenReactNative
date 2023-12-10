import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
    },
  },
})

export const { SetUser} = UserSlice.actions;
export const getUser = state=>state.user.user;
export default UserSlice.reducer;
