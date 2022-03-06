import { Box, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const Register = () => {
  return (
    <Box component="form" autoComplete="off" noValidate>
      <Stack spacing={3}>
        <TextField fullWidth label="Username" autoComplete="username" />

        <TextField
          fullWidth
          autoComplete="email"
          type="email"
          label="Email address"
        />

        <TextField
          fullWidth
          autoComplete="current-password"
          type={'password'}
          label="Password"
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Register
        </LoadingButton>
      </Stack>
    </Box>
  );
};

export default Register;
