import { Box, Typography } from '@mui/material'

export default function HeaderBreadcrumbs({ heading, sx, ...other }) {
  return (
    <Box sx={{ mb: 5, ...sx }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4">{heading}</Typography>
        </Box>
      </Box>
    </Box>
  )
}
