import { Link as RouterLink, useLocation } from 'react-router-dom'
// material
import { styled } from '@mui/material/styles'
import { Box, Button, AppBar, Toolbar, Container } from '@mui/material'
// components
import { Logo } from '../../components'
// routes
import { PATH_AUTH, PATH_DASHBOARD } from '../../routes/paths'

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64
const APP_BAR_DESKTOP = 88

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP
  }
}))

// ----------------------------------------------------------------------

export default function MainNavbar() {
  const { pathname } = useLocation()
  const isHome = pathname === PATH_DASHBOARD.root

  return (
    <AppBar
      elevation={0}
      position="static"
      sx={{
        bgcolor: 'transparent'
      }}
    >
      <ToolbarStyle disableGutters>
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Logo />
          <Box sx={{ flexGrow: 1 }} />

          {isHome && (
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_AUTH.login}
            >
              Login
            </Button>
          )}
        </Container>
      </ToolbarStyle>
    </AppBar>
  )
}
