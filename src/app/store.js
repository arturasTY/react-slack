import { configureStore } from "@reduxjs/toolkit";
import channelReducer from "../redux/ChannelSlice";

export default configureStore({
  reducer: {
    channel: channelReducer,
  },
});
