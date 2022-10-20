// material
import { Card, CardContent, Typography } from '@mui/material'

// ----------------------------------------------------------------------

export default function PracticeNotes({ solution }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="body1">{solution}</Typography>
      </CardContent>
    </Card>
  )
}
