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
					overflow: 'auto !important',
				},
			},
		},
	},
	"&:hover .MuiTableCell-root, &:hover .MuiTableCell-root span.material-icons-outlined": {
		color: "red"
	  }
});

export default theme;
