// material
import { Container } from '@mui/material'
// components
import { Header, Page } from '../../components'
import { ContributeForm } from '../../components/dashboard/contribute'

// ----------------------------------------------------------------------

export default function Contribute() {
  return (
    <Page title="Contribute | Certification">
      <Container maxWidth="lg">
        <Header heading="Create a new study question" />

        <ContributeForm />
      </Container>
    </Page>
  )
}
