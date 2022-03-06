import { Link as RouterLink } from 'react-router-dom';
// material
import { Box } from '@mui/material';

const Logo = ({ sx }) => {
  return (
    <RouterLink to="/">
      <Box
        component="img"
        src="/static/logo.svg"
        alt="logo"
        sx={{ width: 40, height: 40, ...sx }}
      />
    </RouterLink>
  );
};

export default Logo;
