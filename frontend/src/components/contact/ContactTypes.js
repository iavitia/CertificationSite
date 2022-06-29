// material
import { styled } from '@mui/material/styles'
import { Box, Container, Stack, Typography } from '@mui/material'
// components
import { CopyClipboard } from '../../components'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(20)
}))

// ----------------------------------------------------------------------

export default function LandingMinimalHelps() {
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box>
          <Stack spacing={3} alignItems="center">
            <Typography variant="h2">Emails</Typography>
            <Stack direction="column" alignItems="center">
              <Typography sx={{ pb: 2 }}>
                {'Business & media inquiries'}
              </Typography>
              <CopyClipboard value="business@test.com" />
            </Stack>

            <Stack direction="column" alignItems="center">
              <Typography sx={{ pb: 2 }}>General inquiries</Typography>
              <CopyClipboard value="general@test.com" />
            </Stack>
          </Stack>
        </Box>
      </Container>
    </RootStyle>
  )
}
