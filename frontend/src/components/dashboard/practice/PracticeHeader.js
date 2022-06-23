// material
import { styled } from '@mui/material/styles'
import { Box, Typography, Stack } from '@mui/material'
// utils
import { sentenceCase } from 'sentence-case'
// components
import { Label } from '../../../components'
import { Icon } from '@iconify/react'
import thumbUp from '@iconify/icons-ic/outline-thumb-up'
import thumbDown from '@iconify/icons-ic/outline-thumb-down'

// ----------------------------------------------------------------------

const ItemBlockStyle = styled((props) => (
  <Stack direction="row" alignItems="center" {...props} />
))({})

const ItemIconStyle = styled(Icon)(({ theme }) => ({
  width: 16,
  height: 16,
  marginRight: theme.spacing(0.5),
  color: theme.palette.text.disabled
}))

// ----------------------------------------------------------------------

export default function PracticeHeader({
  heading,
  difficulty,
  likes,
  dislikes
}) {
  return (
    <Box>
      <Typography variant="h5">{heading}</Typography>

      <Stack spacing={3} sx={{ pt: 1 }}>
        <Stack direction="row" alignItems="center" spacing={3}>
          <ItemBlockStyle>
            <Label
              variant="plain"
              color={
                (difficulty.toLowerCase() === 'hard' && 'error') ||
                (difficulty.toLowerCase() === 'medium' && 'warning') ||
                'success'
              }
            >
              {sentenceCase(difficulty)}
            </Label>
          </ItemBlockStyle>
          <ItemBlockStyle>
            <ItemIconStyle icon={thumbUp} />
            <Typography variant="body2">{likes}</Typography>
          </ItemBlockStyle>
          <ItemBlockStyle>
            <ItemIconStyle icon={thumbDown} />
            <Typography variant="body2">{dislikes}</Typography>
          </ItemBlockStyle>
        </Stack>
      </Stack>
    </Box>
  )
}
