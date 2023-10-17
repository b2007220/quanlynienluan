import { colors, createTheme } from '@mui/material';

const theme = createTheme({
	components: {
		MuiSelect: {
			styleOverrides: {
				root: {
					fontFamily: 'Montserrat , sans-serif !important',
				},
				
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					borderRadius: '10px !important',
					fontFamily: 'Montserrat , sans-serif !important',
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					fontFamily: 'Montserrat , sans-serif !important',
				},
			},
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					fontFamily: 'Montserrat , sans-serif !important',
					overflow: 'auto !important',
				},
			},
		},
	},
});

export default theme;
