import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    org: null,
    openChat: false,
}
const chatOrgSlice = createSlice({
    name: "CHAT_ORG",
    initialState,
    reducers: {
        onSetOrgChat: (state, action) => {

        },
        onToggleOpenChat: (state, action) => {
            state.openChat = action.payload
        },
    }
})
const { actions } = chatOrgSlice;
export const { onSetOrgChat, onToggleOpenChat } = actions;
export default chatOrgSlice.reducer;