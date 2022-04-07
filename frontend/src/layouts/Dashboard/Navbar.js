// material
import { alpha, styled } from '@mui/material/styles'
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material'
// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer'
// components
import AccountPopover from './AccountPopover'
import { MHidden } from '../../components'
import menuFill from '@iconify/icons-eva/menu-fill'
import { Icon } from '@iconify/react'

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280
const COLLAPSE_WIDTH = 102

const APPBAR_MOBILE = 64
const APPBAR_DESKTOP = 92

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
  }
}))

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}))

// ----------------------------------------------------------------------

export default function Navbar({ onOpenSidebar }) {
  const { isCollapse } = useCollapseDrawer()

  return (
    <RootStyle
      sx={{
        ...(isCollapse && {
          width: { lg: `calc(100% - ${COLLAPSE_WIDTH}px)` }
        })
      }}
    >
      <ToolbarStyle>
        <MHidden width="lgUp">
          <IconButton onClick={onOpenSidebar}>
            <Icon icon={menuFill} />
          </IconButton>
        </MHidden>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  )
}
