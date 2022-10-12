import { Link as RouterLink } from 'react-router-dom'
// material
import { styled } from '@mui/material/styles'
import { Stack, Link, Container, Typography } from '@mui/material'
// components
import { LoginForm } from '../../components/authentication'
import Page from '../../components/Page'
// routes
import { PATH_AUTH } from '../../routes/paths'

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}))

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3, 0)
}))

const Login = () => {
  return (
    <RootStyle title="Login | Certification">
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 3 }}>
            <Typography variant="h4" gutterBottom>
              Sign in
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Welcome back!
            </Typography>
          </Stack>

          <LoginForm />

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 6 }}
            color="text.secondary"
          >
            Don’t have an account?&nbsp;
            <Link
              variant="subtitle2"
              component={RouterLink}
              to={PATH_AUTH.register}
            >
              Register
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}

export default Login
