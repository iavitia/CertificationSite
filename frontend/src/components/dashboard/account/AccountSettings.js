// form
import * as Yup from 'yup'
import { styled } from '@mui/material/styles'
import { Form, FormikProvider, useFormik, getIn } from 'formik'
// material
import {
  Alert,
  Box,
  Grid,
  Card,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
// context
import { useAppContext } from '../../../context/appContext'

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}))

// ----------------------------------------------------------------------

export default function AccountSettings() {
  const { user, updateUser } = useAppContext()

  const UpdateUserSchema = Yup.object().shape({
    fullName: Yup.string().max(70, 'Name character limit is 70'),
    location: Yup.string().max(100, 'Location character limit is 100'),
    email: Yup.string()
      .required('Email is required')
      .email('Enter a valid email address'),
    title: Yup.string().max(100, 'Title character limit 100'),
    summary: Yup.string().max(500, 'Summary character limit 500'),
    social: Yup.object().shape({
      website: Yup.string().url('Enter a valid URL'),
      github: Yup.string().url('Enter a valid URL'),
      linkedIn: Yup.string().url('Enter a valid URL'),
      twitter: Yup.string().url('Enter a valid URL')
    })
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      location: user.location,
      title: user.title,
      summary: user.summary,
      social: {
        website: user.social.website,
        github: user.social.github,
        linkedIn: user.social.linkedIn,
        twitter: user.social.twitter
      }
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await updateUser(values)
      } catch (error) {
        setErrors({ afterSubmit: error.response.data.msg })
        setSubmitting(false)
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
                {errors.afterSubmit && (
                  <Alert severity="error" data-cy="settingsError">
                    {errors.afterSubmit}
                  </Alert>
                )}
                <div>
                  <LabelStyle>Account</LabelStyle>
                  <Stack spacing={{ xs: 3, sm: 2 }}>
                    <TextField
                      disabled
                      fullWidth
                      label="Username"
                      {...getFieldProps('username')}
                    />
                    <TextField
                      fullWidth
                      label="Full Name"
                      {...getFieldProps('fullName')}
                      error={Boolean(touched.fullName && errors.fullName)}
                      helperText={touched.fullName && errors.fullName}
                    />
                    <TextField
                      fullWidth
                      label="Email Address"
                      {...getFieldProps('email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <TextField
                      fullWidth
                      label="Location"
                      {...getFieldProps('location')}
                      error={Boolean(touched.location && errors.location)}
                      helperText={touched.location && errors.location}
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
                      error={Boolean(touched.title && errors.title)}
                      helperText={touched.title && errors.title}
                    />
                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      label="Summary"
                      {...getFieldProps('summary')}
                      error={Boolean(touched.summary && errors.summary)}
                      helperText={touched.summary && errors.summary}
                    />
                  </Stack>
                </div>

                <div>
                  <LabelStyle>Socials</LabelStyle>
                  <Stack direction="column" spacing={{ xs: 3, sm: 2 }}>
                    <TextField
                      fullWidth
                      label="Website, portfolio, etc."
                      {...getFieldProps('social.website')}
                      error={Boolean(
                        getIn(touched, 'social.website') &&
                          getIn(errors, 'social.website')
                      )}
                      helperText={
                        getIn(touched, 'social.website') &&
                        getIn(errors, 'social.website')
                      }
                    />
                    <TextField
                      fullWidth
                      label="Github"
                      {...getFieldProps('social.github')}
                      error={Boolean(
                        getIn(touched, 'social.github') &&
                          getIn(errors, 'social.github')
                      )}
                      helperText={
                        getIn(touched, 'social.github') &&
                        getIn(errors, 'social.github')
                      }
                    />
                    <TextField
                      fullWidth
                      label="LinkedIn"
                      {...getFieldProps('social.linkedIn')}
                      error={Boolean(
                        getIn(touched, 'social.linkedIn') &&
                          getIn(errors, 'social.linkedIn')
                      )}
                      helperText={
                        getIn(touched, 'social.linkedIn') &&
                        getIn(errors, 'social.linkedIn')
                      }
                    />
                    <TextField
                      fullWidth
                      label="Twitter"
                      {...getFieldProps('social.twitter')}
                      error={Boolean(
                        getIn(touched, 'social.twitter') &&
                          getIn(errors, 'social.twitter')
                      )}
                      helperText={
                        getIn(touched, 'social.twitter') &&
                        getIn(errors, 'social.twitter')
                      }
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
