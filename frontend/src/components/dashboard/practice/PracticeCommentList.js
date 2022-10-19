// material
import { Box, List } from '@mui/material'
// components
import { PracticeCommentItem } from './'

// ----------------------------------------------------------------------

export default function PracticeCommentList({ comments }) {
  const COMMENTS = comments.comments

  return (
    <List disablePadding>
      {COMMENTS.map((comment) => {
        const { id, username, postedAt, message } = comment

        return (
          <Box key={id}>
            <PracticeCommentItem
              username={username}
              postedAt={postedAt}
              message={message}
            />
          </Box>
        )
      })}
    </List>
  )
}
