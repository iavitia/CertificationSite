import { useState } from 'react'
// material
import { Container, Tab, Tabs, Stack, Grid } from '@mui/material'
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

const post = {
  title: 'Testing from a senior citizens perspective',
  question:
    'You are participating in a role-based review session. Your assigned role is that of a senior citizen. The product is an online banking application that is targeted for use on smart phones. You are currently reviewing the user interface of the product with a prototype that works on iPhones. Which of the following is an area that you should review?',
  solution:
    'C is correct. As a senior citizen, you should be checking that the size of the instruction text is clearly readable and you should verify that the instructions will make sense to a senior citizen. A is not correct because this is not particular to your role as senior citizens are generally not as time compressed as younger users. B is not correct. Although it is nice, attractiveness tends to be very subjective and is difficult to evaluate at a role level. D is not correct because the reliability will be assumed by the senior citizen. This should be reviewed by the technical users and people on the go who are likely to move between covered and not covered zones.',
  multipleChoice: [
    {
      id: 1,
      choice: 'The speed of response from the banking backend',
      correct: true
    },
    { id: 2, choice: 'The attractiveness of the application', correct: false },
    {
      id: 3,
      choice: 'The size and clarity of the instruction text',
      correct: false
    },

    {
      id: 4,
      choice:
        'The reliability of the application when the connection is dropped',
      correct: false
    }
  ],
  difficulty: 'hard',
  upVotes: 657,
  downVotes: 20,
  comments: [
    {
      id: 1,
      username: 'Chris342',
      postedAt: '12-12-2021',
      message: 'test test test'
    },
    {
      id: 2,
      username: 'Isaac634346',
      postedAt: '08-12-2022',
      message: 'Comment 2'
    },
    {
      id: 3,
      username: 'John6346',
      postedAt: '12-12-2017',
      message: 'Another comment example about practice question'
    }
  ]
}

// ----------------------------------------------------------------------

export default function Practice() {
  const {
    title,
    difficulty,
    question,
    comments,
    solution,
    multipleChoice,
    upVotes,
    downVotes
  } = post
  const [currentTab, setCurrentTab] = useState('practice')

  const ACCOUNT_TABS = [
    {
      value: 'practice',
      icon: <Icon icon={libraryBook} />,
      component: (
        <PracticeQuestion question={question} multipleChoice={multipleChoice} />
      )
    },
    {
      value: 'solution',
      icon: <Icon icon={stickyNote} />,
      component: <PracticeNotes solution={solution} />
    },
    {
      value: 'discussion',
      icon: <Icon icon={outlineChat} />,
      component: <PracticeDiscussion comments={comments} />
    }
  ]

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue)
  }

  return (
    <Page title="Practice | Certification">
      <Container maxWidth="lg">
        <PracticeHeader
          heading={title}
          difficulty={difficulty}
          upVotes={upVotes}
          downVotes={downVotes}
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
            return (
              isMatched && (
                <Grid key={tab.value} item xs={12} md={8}>
                  {tab.component}
                </Grid>
              )
            )
          })}
        </Stack>
      </Container>
    </Page>
  )
}
