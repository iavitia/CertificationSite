import * as Yup from 'yup'
import { useFormik, Form, FormikProvider } from 'formik'
// material
import { Box, Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'

// ----------------------------------------------------------------------

export default function PracticeCommentForm() {
  const CommentSchema = Yup.object().shape({
    comment: Yup.string().required('Comment is required')
  })

  const formik = useFormik({
    initialValues: {
      comment: ''
    },
    validationSchema: CommentSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        console.log(values.comment)
        resetForm()
      } catch (error) {
        console.error(error)
      }
    }
  })

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik

  return (
    <Box>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={5}
              label="Comment"
              {...getFieldProps('comment')}
              error={Boolean(touched.comment && errors.comment)}
              helperText={touched.comment && errors.comment}
            />

            <LoadingButton
              type="submit"
              variant="contained"
              color="secondary"
              loading={isSubmitting}
            >
              Post comment
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Box>
  )
}
