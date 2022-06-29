// components
import { Page } from '../components'
import { LandingDetails, LandingHero } from '../components/landing'

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <Page title="Certification">
      <LandingHero />
      <LandingDetails />
    </Page>
  )
}
