// material
import { Autocomplete, TextField, Stack } from '@mui/material'

// ----------------------------------------------------------------------

// placeholder data for CERTIFICATIONS
// and BASIC_TABLE
const CERTIFICATIONS = [
  {
    id: 1,
    title: 'AWS Certified Solutions Architect - Associate',
    section: 'AWS',
    difficulty: 'easy'
  },
  {
    id: 2,
    title: 'AWS Certified Developer - Associate',
    section: 'AS',
    difficulty: 'medium'
  },
  {
    id: 3,
    title: 'AWS Certified DevOps Engineer - Professional',
    section: 'AW',
    difficulty: 'easy'
  }
]

// ----------------------------------------------------------------------

export default function PracticeAllProblemsFilter() {
  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 3, sm: 2 }}
        justifyContent="space-evenly"
        alignItems="center"
        sx={{ pb: 2 }}
      >
        <Autocomplete
          fullWidth
          options={CERTIFICATIONS}
          renderInput={(params) => (
            <TextField hiddenLabel {...params} placeholder="Certification" />
          )}
        />

        <Autocomplete
          fullWidth
          options={CERTIFICATIONS}
          renderInput={(params) => (
            <TextField {...params} placeholder="Section" hiddenLabel />
          )}
        />

        <Autocomplete
          fullWidth
          options={CERTIFICATIONS}
          renderInput={(params) => (
            <TextField {...params} placeholder="Difficulty" hiddenLabel />
          )}
        />
      </Stack>
    </>
  )
}
