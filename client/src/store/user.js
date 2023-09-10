import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		setUser(state, { payload }) {
			state = {
				...state,
				...payload,
			};
			return state;
		},
	},
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
