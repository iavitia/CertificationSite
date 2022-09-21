import { Container } from '@mui/material'
import { Header, Page } from '../../components'
import { AccountSettings } from '../../components/dashboard/account'

export default function UserSettings() {
  return (
    <Page title="Settings | Cert Training">
      <Container maxWidth="lg">
        <Header heading="Settings" />
        <AccountSettings />
      </Container>
    </Page>
  )
}
