// material
import { Box, Divider, ListItem, Typography, ListItemText } from '@mui/material'
// utils
import { fToNow } from '../../../utils/formatTime'

// ----------------------------------------------------------------------

export default function PracticeCommentItem({ username, message, postedAt }) {
  return (
    <Box>
      <Divider />
      <ListItem
        disableGutters
        sx={{
          alignItems: 'flex-start',
          py: 3
        }}
      >
        <ListItemText
          primary={username}
          primaryTypographyProps={{ variant: 'subtitle1' }}
          secondary={
            <>
              <Typography
                gutterBottom
                variant="caption"
                sx={{
                  display: 'block',
                  color: 'text.disabled'
                }}
              >
                {fToNow(postedAt)}
              </Typography>
              <Typography component="span" variant="body2">
                {message}
              </Typography>
            </>
          }
        />
      </ListItem>
    </Box>
  )
}
