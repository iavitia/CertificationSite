import { Box, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const LoginForm = () => {
  return (
    <Box component="form" autoComplete="off" noValidate>
      <Stack spacing={3}>
        <TextField
          fullWidth
          autoComplete="username"
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
          Login
        </LoadingButton>
      </Stack>
    </Box>
  );
};

export default LoginForm;
