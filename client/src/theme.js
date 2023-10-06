import { colors, createTheme } from '@mui/material';

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
		MuiTableRow: {
			styleOverrides: {
				root: {
					'&:hover': {
						color: '#fff !important',
					},
				},
			},
		},
	},
});

export default theme;
