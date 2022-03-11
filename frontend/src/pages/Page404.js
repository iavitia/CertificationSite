import { Link as RouterLink } from 'react-router-dom'
// material
import { styled } from '@mui/material/styles'
import { Box, Button, Typography } from '@mui/material'
// components
import Page from '../components/Page'

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}))

const Page404 = () => {
  return (
    <RootStyle title="404 | Certification">
      <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
        <Typography variant="h1" sx={{ fontWeight: 700 }}>
          404
        </Typography>
        <Typography variant="h4" paragraph sx={{ mt: 4 }}>
          PAGE NOT FOUND
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          we couldn’t find the page you’re looking for.
        </Typography>
        <Button
          sx={{ mt: 5 }}
          to="/"
          size="large"
          variant="contained"
          component={RouterLink}
        >
          Go Home
        </Button>
      </Box>
    </RootStyle>
  )
}

export default Page404
