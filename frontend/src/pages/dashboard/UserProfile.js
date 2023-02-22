// components
import Page from '../../components/Page'

// material
import { Container, Grid } from '@mui/material'
import { ProfileAbout } from '../../components/dashboard/profile'

export default function UserProfile() {
  return (
    <Page title="Profile | Cert Training">
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <ProfileAbout />
          </Grid>
        </Grid>
      </Container>
    </Page>
  )
}
