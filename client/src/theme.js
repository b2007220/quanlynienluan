import { createTheme } from '@mui/material';

const theme = createTheme({
	components: {
		MuiSelect: {
			styleOverrides: {
				root: {},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					borderRadius: '10px !important',
				},
			},
		},
	},
});

export default theme;
