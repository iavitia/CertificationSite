import { Link as RouterLink } from 'react-router-dom'
// material
import { styled } from '@mui/material/styles'
import {
  Grid,
  Link,
  Divider,
  Container,
  Typography,
  Stack
} from '@mui/material'
// components
import Logo from '../../components/Logo'
// routes
import { PATH_COMPANY } from '../../routes/paths'

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'Company',
    children: [
      { name: 'About us', href: PATH_COMPANY.about },
      { name: 'Blog', href: PATH_COMPANY.blog },
      { name: 'Contact us', href: PATH_COMPANY.contact }
    ]
  },
  {
    headline: 'Legal',
    children: [
      { name: 'Terms and Condition', href: PATH_COMPANY.terms },
      { name: 'Privacy Policy', href: PATH_COMPANY.privacy }
    ]
  }
]

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default
}))

// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Divider />
      </Container>
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item xs={12} md={7}>
            <Stack
              spacing={5}
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
            >
              <Stack>
                <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />

                <Typography
                  component="p"
                  variant="body2"
                  sx={{
                    mt: 2,
                    fontSize: 13,
                    textAlign: { xs: 'center', md: 'left' }
                  }}
                >
                  &copy; {new Date().getFullYear()} Cert Training
                </Typography>
              </Stack>
              {LINKS.map((list) => {
                const { headline, children } = list
                return (
                  <Stack key={headline} spacing={2}>
                    <Typography component="p" variant="overline">
                      {headline}
                    </Typography>
                    {children.map((link) => (
                      <Link
                        to={link.href}
                        key={link.name}
                        color="inherit"
                        variant="body2"
                        component={RouterLink}
                        sx={{ display: 'block' }}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </Stack>
                )
              })}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  )
}
