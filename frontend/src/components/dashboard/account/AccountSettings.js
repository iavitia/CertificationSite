import * as Yup from 'yup'
import { styled } from '@mui/material/styles'
import { Form, FormikProvider, useFormik } from 'formik'
// material
import { Box, Grid, Card, Stack, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}))

// ----------------------------------------------------------------------

export default function AccountSettings() {
  // const { user, updateProfile } = useAuth()

  const UpdateUserSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Enter a valid email address')
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      location: '',
      title: '',
      about: '',
      github: '',
      linkedIn: '',
      twitter: ''
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        console.log('success')
      } catch (error) {
        console.error(error)
      }
    }
  })

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <div>
                  <LabelStyle>Account</LabelStyle>
                  <Stack spacing={{ xs: 3, sm: 2 }}>
                    <TextField
                      fullWidth
                      label="Name"
                      {...getFieldProps('displayName')}
                    />
                    <TextField
                      fullWidth
                      label="lastName"
                      {...getFieldProps('lastName')}
                    />
                    <TextField
                      fullWidth
                      label="Email Address"
                      {...getFieldProps('email')}
                      {...getFieldProps('email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <TextField
                      fullWidth
                      label="Location"
                      {...getFieldProps('location')}
                    />
                  </Stack>
                </div>

                <div>
                  <LabelStyle>Profile</LabelStyle>
                  <Stack direction="column" spacing={{ xs: 3, sm: 2 }}>
                    <TextField
                      fullWidth
                      label="Title"
                      {...getFieldProps('title')}
                    />
                    <TextField
                      {...getFieldProps('about')}
                      fullWidth
                      multiline
                      minRows={4}
                      maxRows={4}
                      label="About"
                    />
                  </Stack>
                </div>

                <div>
                  <LabelStyle>Socials</LabelStyle>
                  <Stack direction="column" spacing={{ xs: 3, sm: 2 }}>
                    <TextField
                      fullWidth
                      label="Github"
                      {...getFieldProps('github')}
                    />
                    <TextField
                      fullWidth
                      label="LinkedIn"
                      {...getFieldProps('linkedIn')}
                    />
                    <TextField
                      fullWidth
                      label="Twitter"
                      {...getFieldProps('twitter')}
                    />
                  </Stack>
                </div>
              </Stack>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton
                  color="secondary"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Save Changes
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  )
}
