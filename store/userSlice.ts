import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./";
import { User } from "@/lib/database";


// Define a type for the slice state
export interface UserState {
  currentUser: User | null;
}

// Define the initial state using that type
const initialState: UserState = {
  currentUser: null,
};

export const UserSlice = createSlice({
  name: "Users",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
});

// Other code such as selectors can use the imported `RootState` type
export const { getCurrentUser } = UserSlice.actions;
export default UserSlice.reducer;
