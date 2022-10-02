import { useState } from 'react'
// material
import { Container, Tab, Box, Tabs, Stack } from '@mui/material'
// components
import { Page } from '../../components'
import {
  PracticeDiscussion,
  PracticeHeader,
  PracticeNotes,
  PracticeQuestion
} from '../../components/dashboard/practice'
import { Icon } from '@iconify/react'
import libraryBook from '@iconify/icons-ic/outline-library-books'
import outlineChat from '@iconify/icons-ic/outline-chat'
import stickyNote from '@iconify/icons-ic/outline-sticky-note-2'

// ----------------------------------------------------------------------

export default function Practice() {
  const [currentTab, setCurrentTab] = useState('practice')

  const ACCOUNT_TABS = [
    {
      value: 'practice',
      icon: <Icon icon={libraryBook} />,
      component: <PracticeQuestion />
    },
    {
      value: 'solution',
      icon: <Icon icon={stickyNote} />,
      component: <PracticeNotes />
    },
    {
      value: 'discussion',
      icon: <Icon icon={outlineChat} />,
      component: <PracticeDiscussion />
    }
  ]

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue)
  }

  return (
    <Page title="Practice | Certification">
      <Container maxWidth="lg">
        <PracticeHeader
          heading="Testing from a senior citizens perspective"
          difficulty="Easy"
          likes={350}
          dislikes={30}
        />

        <Stack spacing={5} sx={{ pt: 1.5 }}>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
          >
            {ACCOUNT_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                label={tab.value}
                icon={tab.icon}
                iconPosition="start"
                value={tab.value}
              />
            ))}
          </Tabs>

          {ACCOUNT_TABS.map((tab) => {
            const isMatched = tab.value === currentTab
            return isMatched && <Box key={tab.value}>{tab.component}</Box>
          })}
        </Stack>
      </Container>
    </Page>
  )
}
