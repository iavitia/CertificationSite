import { Link as RouterLink } from 'react-router-dom'
// material
import { styled } from '@mui/material/styles'
import { Box, Button, Container, Typography } from '@mui/material'
// components
import Page from '../components/Page'

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(30),
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(15)
  },
  paddingBottom: theme.spacing(10)
}))

const Page404 = () => {
  return (
    <RootStyle title="404 | Certification">
      <Container>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <Typography variant="h1">404</Typography>
          <Typography variant="h3" paragraph>
            Something went wrong!
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            The page you are looking for it not available.
          </Typography>

          <Button
            sx={{ mt: 4 }}
            to="/"
            size="large"
            variant="contained"
            component={RouterLink}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </RootStyle>
  )
}

export default Page404
