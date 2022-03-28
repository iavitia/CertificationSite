// material
import { Container } from '@mui/material'
// components
import Page from '../components/Page'
import QuestionNew from '../components/Study/StudyQuestionNewForm'
import { Header } from '../components'

export default function StudyQuestionCreate() {
  return (
    <Page title="Create new study question | Certification">
      <Container maxWidth={'lg'}>
        <Header heading="Create new study question" />

        <QuestionNew />
      </Container>
    </Page>
  )
}
