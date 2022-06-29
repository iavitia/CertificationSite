import { Link as RouterLink } from 'react-router-dom'
// material
import { styled } from '@mui/material/styles'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
// routes
import { PATH_AUTH } from '../../routes/paths'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],

  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0
  }
}))

// ----------------------------------------------------------------------

export default function LandingHero() {
  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative', height: '100%' }}>
        <Grid
          container
          justifyContent="flex-start"
          alignItems="center"
          sx={{ height: '100%' }}
        >
          <Grid item xs={12} md={5}>
            <Box>
              <Typography
                variant="h2"
                sx={{
                  mb: 2,
                  color: 'common.white'
                }}
              >
                A New Way to Prepare for Tech Certifications
              </Typography>
              <Typography
                sx={{
                  color: 'common.white',
                  mb: 5
                }}
              >
                Cert Training is the best platform for enhancing your skills,
                preparing for in demand tech cetifications, and preparing for
                the next step in your IT career.
              </Typography>

              <Button
                size="large"
                variant="outlined"
                sx={{ width: '150px' }}
                component={RouterLink}
                to={PATH_AUTH.register}
              >
                Get Started
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  )
}
