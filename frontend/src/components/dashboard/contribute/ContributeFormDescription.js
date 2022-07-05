// material
import { styled } from '@mui/material/styles'
import { Card, CardContent, CardHeader, Typography } from '@mui/material'
// icons
import { Icon } from '@iconify/react'
import bulbOutline from '@iconify/icons-eva/bulb-outline'

// ----------------------------------------------------------------------

const CONTENT = [
  'Select the certification and section the question relates to.',
  'Create a title that is concise, descriptive, and specific.',
  'Clearly describe your question, and make sure your problem does not already exist.',
  'Provide an explanation, resources, notes, etc on why it is the correct answer.',
  'Difficulty can be based on how hard it is or how many points it would be worth on an exam.'
]

const HeaderIcon = styled(Icon)(({ theme }) => ({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(-1),
  color: theme.palette.primary.main
}))

// ----------------------------------------------------------------------

export default function ContributeFormDescription() {
  return (
    <Card>
      <CardHeader title="Tips" avatar={<HeaderIcon icon={bulbOutline} />} />

      <CardContent>
        {CONTENT.map((text, index) => {
          return (
            <Typography sx={{ color: 'text.secondary', mb: 2 }} key={index}>
              {text}
            </Typography>
          )
        })}
      </CardContent>
    </Card>
  )
}
