// material
import { Container } from '@mui/material'
// components
import { Page } from '../../components'
import {
  PracticeProblemList,
  PracticeAllProblemsFilter
} from '../../components/dashboard/practiceAllProblems'

// ----------------------------------------------------------------------

export default function PracticeAllProblems() {
  return (
    <Page title="Practice | Certification">
      <Container maxWidth="lg">
        <PracticeAllProblemsFilter />
        <PracticeProblemList />
      </Container>
    </Page>
  )
}
