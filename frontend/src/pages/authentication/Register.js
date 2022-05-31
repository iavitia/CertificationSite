import { Link as RouterLink } from 'react-router-dom'
// material
import { Box, Link, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
// layouts
import AuthLayout from '../../layouts/AuthLayout'
// components
import { RegisterForm } from '../../components'
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
  minHeight: '100vh',
  flexDirection: 'column',
  padding: theme.spacing(20, 0)
}))

const Landing = () => {
  return (
    <RootStyle title="Register | Certification">
      <AuthLayout />

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" gutterBottom>
              Register
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              A smarter way to study for certifications
            </Typography>
          </Box>

          <RegisterForm />

          <Typography
            variant="body2"
            align="left"
            sx={{ mt: 6 }}
            color="text.secondary"
          >
            Already have an account?&nbsp;
            <Link
              variant="subtitle2"
              component={RouterLink}
              to={PATH_AUTH.login}
            >
              Login
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}

export default Landing
