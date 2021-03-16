import { createSlice } from "@reduxjs/toolkit";

export const channelSlice = createSlice({
  name: "channel",
  initialState: {
    addChannelIsOpen: false,
    roomId: null,
  },
  reducers: {
    openAddChannel: (state) => {
      state.addChannelIsOpen = true;
    },
    closeAddChannel: (state) => {
      state.addChannelIsOpen = false;
    },
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },
  },
});

export const {
  openAddChannel,
  closeAddChannel,
  enterRoom,
} = channelSlice.actions;
export const selectAddChannelIsOpen = (state) => state.channel.addChannelIsOpen;
export const selectRoomId = (state) => state.channel.roomId;
export default channelSlice.reducer;
