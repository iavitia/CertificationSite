import { Outlet } from 'react-router-dom'
// material
import { styled } from '@mui/material/styles'
import { Box, AppBar, Toolbar, Container } from '@mui/material'
// components
import { Logo } from '../components'

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
  return (
    <>
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
          </Container>
        </ToolbarStyle>
      </AppBar>
      <Outlet />
    </>
  )
}
