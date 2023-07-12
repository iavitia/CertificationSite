// icons
import { Icon } from '@iconify/react'
import pinOutline from '@iconify/icons-eva/pin-outline'
import roundBusinessCenter from '@iconify/icons-eva/briefcase-outline'
import schoolRounded from '@iconify/icons-material-symbols/school-outline-rounded'
import GitHub from '@mui/icons-material/GitHub'
import LinkedIn from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
// material
import { styled } from '@mui/material/styles'
import { Card, Typography, Stack, IconButton } from '@mui/material'
// context
import { useAppContext } from '../../../context/appContext'

// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(1)
}))

// ----------------------------------------------------------------------

export default function ProfileAbout() {
  const { user } = useAppContext()
  console.log(user)
  return (
    <Card>
      <Stack spacing={3} sx={{ p: 3, color: 'text.secondary' }}>
        <Stack>
          <Typography variant="h4" sx={{ color: 'text.primary' }}>
            {user.fullName}
          </Typography>
          <Typography sx={{ opacity: 0.72 }}>@{user.username}</Typography>
        </Stack>

        <Typography variant="body2">{user.summary}</Typography>

        <Stack spacing={2}>
          <Stack direction="row">
            <IconStyle icon={roundBusinessCenter} />
            <Typography variant="body2">{user.title}</Typography>
          </Stack>

          <Stack direction="row">
            <IconStyle icon={pinOutline} />
            <Typography variant="body2">{user.location}</Typography>
          </Stack>

          <Stack direction="row">
            <IconStyle icon={schoolRounded} />
            <Typography variant="body2">School Attended</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1}>
          {user.social.github && (
            <IconButton
              aria-label="github"
              edge="start"
              href={user.social.github}
              target="_blank"
            >
              <GitHub />
            </IconButton>
          )}

          {user.social.linkedIn && (
            <IconButton
              aria-label="linkedin"
              href={user.social.linkedIn}
              edge="start"
              target="_blank"
            >
              <LinkedIn />
            </IconButton>
          )}

          {user.social.twitter && (
            <IconButton
              aria-label="twitter"
              href={user.social.twitter}
              target="_blank"
              edge="start"
            >
              <TwitterIcon />
            </IconButton>
          )}

          {user.social.website && (
            <IconButton
              aria-label="website"
              href={user.social.website}
              target="_blank"
              edge="start"
            >
              <OpenInNewIcon />
            </IconButton>
          )}
        </Stack>
      </Stack>
    </Card>
  )
}
