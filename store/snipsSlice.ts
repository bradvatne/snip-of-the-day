import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SnipWithComments as Snip } from "@/lib/database";


// Define a type for the slice state
export interface SnipState {
  initialSnips: Snip[];
}

// Define the initial state using that type
const initialState: SnipState = {
  initialSnips: [],
};

export const snipSlice = createSlice({
  name: "snips",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    fetchInitialSnips: (state, action: PayloadAction<Snip[]>) => {
      state.initialSnips = action.payload;
    },
  },
});

// Other code such as selectors can use the imported `RootState` type
export const { fetchInitialSnips } = snipSlice.actions;
export default snipSlice.reducer;
