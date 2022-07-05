import * as Yup from 'yup'
import { Form, FormikProvider, useFormik } from 'formik'
// material
import { LoadingButton } from '@mui/lab'
import { styled } from '@mui/material/styles'
import {
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
  Autocomplete
} from '@mui/material'
import ContributeFormDescription from './ContributeFormDescription'

// ----------------------------------------------------------------------

const CERTIFICATIONS = [
  'ISTQB Certified Tester Foundation Level',
  'ISTQB Test Analyst',
  'ISTQB Test Manager'
]

const SECTIONS = ['1', '2', '3', '4']

const DIFFICULTY = ['easy', 'medium', 'hard']

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}))

// ----------------------------------------------------------------------

export default function ContributeForm() {
  const NewBlogSchema = Yup.object().shape({
    certification: Yup.string()
      .required('Certification is required')
      .nullable(),
    section: Yup.string().required('section is required').nullable(),
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    notes: Yup.string().required('Additional notes are required'),
    difficulty: Yup.string()
      .required('Difficulty is required')
      .oneOf(['easy', 'medium', 'hard'])
  })

  const formik = useFormik({
    initialValues: {
      certification: '',
      section: '',
      title: '',
      description: '',
      notes: '',
      difficulty: 'easy',
      multipleChoices: [
        // {'answer': false, 'option': ''}
      ]
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        console.log(values)
      } catch (error) {
        console.error(error)
      }
    }
  })

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setFieldValue
  } = formik

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div>
                    <LabelStyle>Certification</LabelStyle>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={{ xs: 3, sm: 2 }}
                      justifyContent="space-evenly"
                      alignItems="center"
                    >
                      <Autocomplete
                        fullWidth
                        onChange={(event, value) => {
                          setFieldValue('certification', value)
                        }}
                        options={CERTIFICATIONS}
                        renderInput={(params) => (
                          <TextField
                            hiddenLabel
                            {...params}
                            placeholder="Select Certification"
                            error={Boolean(
                              touched.certification && errors.certification
                            )}
                            helperText={
                              touched.certification && errors.certification
                            }
                          />
                        )}
                      />

                      <Autocomplete
                        fullWidth
                        onChange={(event, value) => {
                          setFieldValue('section', value)
                        }}
                        options={SECTIONS}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select Section"
                            hiddenLabel
                            error={Boolean(touched.section && errors.section)}
                            helperText={touched.section && errors.section}
                          />
                        )}
                      />
                    </Stack>
                  </div>

                  <div>
                    <LabelStyle>Title</LabelStyle>
                    <TextField
                      fullWidth
                      placeholder="Pick a Title"
                      hiddenLabel
                      multiline
                      maxRows={4}
                      {...getFieldProps('title')}
                      error={Boolean(touched.title && errors.title)}
                      helperText={touched.title && errors.title}
                    />
                  </div>

                  <div>
                    <LabelStyle>Description</LabelStyle>

                    <TextField
                      sx={{ pb: 3 }}
                      fullWidth
                      multiline
                      minRows={3}
                      maxRows={5}
                      placeholder="Quill editor here"
                      hiddenLabel
                      {...getFieldProps('description')}
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                    />

                    <LabelStyle>Explanation</LabelStyle>
                    <TextField
                      fullWidth
                      multiline
                      minRows={3}
                      maxRows={5}
                      placeholder="Additional notes, resources, etc about answer"
                      hiddenLabel
                      {...getFieldProps('notes')}
                      error={Boolean(touched.notes && errors.notes)}
                      helperText={touched.notes && errors.notes}
                    />

                    <TextField
                      select
                      sx={{ mt: 2 }}
                      size="small"
                      {...getFieldProps('difficulty')}
                      SelectProps={{ native: true }}
                      error={Boolean(touched.difficulty && errors.difficulty)}
                      helperText={touched.difficulty && errors.difficulty}
                    >
                      {DIFFICULTY.map((set) => (
                        <option key={set} value={set}>
                          {set}
                        </option>
                      ))}
                    </TextField>
                  </div>

                  <div>
                    <LabelStyle>Multiple Choice</LabelStyle>
                  </div>
                </Stack>
              </Card>
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                sx={{ mt: 3 }}
              >
                <LoadingButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  loading={isSubmitting}
                >
                  Submit
                </LoadingButton>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <ContributeFormDescription />
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  )
}
