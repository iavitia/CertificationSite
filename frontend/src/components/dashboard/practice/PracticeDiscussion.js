// material
import { Box, Card, CardContent } from '@mui/material'
// components
import { PracticeCommentForm, PracticeCommentList } from './'

// ----------------------------------------------------------------------

export default function PracticeDiscussion(comments) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 5 }}>
          <PracticeCommentForm />
        </Box>

        <PracticeCommentList comments={comments} />
      </CardContent>
    </Card>
  )
}
