// material
import { styled } from '@mui/material/styles'
import { Box, Container, Grid, Typography } from '@mui/material'

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

export default function LandingHero2() {
  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative', height: '100%' }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: '100%' }}
        >
          <Grid item xs={12} md={5}>
            <Box>
              <Typography
                align="center"
                variant="h2"
                sx={{
                  mb: 2,
                  color: 'common.white'
                }}
              >
                Get in touch
              </Typography>
              <Typography
                align="center"
                sx={{
                  color: 'common.white'
                }}
              >
                Have an inquiry or some feedback for us?
                <br />
                We'd love to hear from you.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  )
}
