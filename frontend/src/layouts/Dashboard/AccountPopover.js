import { useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
// components
import Iconify from '../../components/Iconify'
import { MenuPopover } from '../../components'
// material
import { alpha } from '@mui/material/styles'
import { Box, Divider, MenuItem, Avatar, IconButton } from '@mui/material'
//  routes
import { PATH_DASHBOARD } from '../../routes/paths'
// context
import { useAppContext } from '../../context/appContext'

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    linkTo: PATH_DASHBOARD.user.profile
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    linkTo: PATH_DASHBOARD.user.settings
  }
]

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null)
  const [open, setOpen] = useState(false)
  const { logout } = useAppContext()

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              to={option.linkTo}
              component={RouterLink}
              onClick={handleClose}
              sx={{ typography: 'body2', py: 1, px: 2.5 }}
            >
              <Iconify
                icon={option.icon}
                sx={{
                  mr: 2,
                  width: 24,
                  height: 24
                }}
              />

              {option.label}
            </MenuItem>
          ))}
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ mb: 1.5 }}>
          <MenuItem
            key={'Logout'}
            onClick={logout}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Iconify
              icon={'eva:power-fill'}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />
            Logout
          </MenuItem>
        </Box>
      </MenuPopover>
    </>
  )
}
