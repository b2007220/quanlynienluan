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
		MuiTableCell: {
			styleOverrides: {
				root: {
					'&:hover': {
						color: '#fff !important',
					},
					fontFamily: 'Montserrat , sans-serif !important',
					color: '#222 !important',
				},
			},
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					fontFamily: 'Montserrat , sans-serif !important',
					height: '120px !important',
					overflow: "hidden",
					 textOverflow: "ellipsis",
					'&:hover': {
						overflow: 'visible',
						size : '12px !important',
					},
				},
			},
		},
	},
});

export default theme;
