// form
import { Form, FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
// material
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography
} from '@mui/material'

// ----------------------------------------------------------------------

function OptionItem({ option, checked, formik, ...other }) {
  const { getFieldProps } = formik

  return (
    <Stack direction="row" justifyContent="space-between" sx={{ py: 0.75 }}>
      <FormControlLabel
        control={
          <Checkbox
            {...getFieldProps('checked')}
            value={option}
            checked={checked}
            {...other}
          />
        }
        label={<Typography variant="body">{option}</Typography>}
      />
    </Stack>
  )
}

export default function PracticeQuestion({ question, multipleChoice }) {
  const FormValidation = Yup.object().shape({
    checked: Yup.array().min(1, 'Must select at least one option')
  })

  const formik = useFormik({
    initialValues: {
      checked: []
    },
    validationSchema: FormValidation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log(values.checked)
    }
  })

  const { errors, values, handleSubmit } = formik

  return (
    <Card>
      <CardContent>
        <Typography variant="body1">{question}</Typography>

        <Box sx={{ pl: { xs: 0, md: 2 }, pt: 2 }}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              {multipleChoice.map((option) => (
                <OptionItem
                  key={option.id}
                  option={option.choice}
                  formik={formik}
                  checked={values.checked.includes(option.choice)}
                />
              ))}

              {errors.checked && (
                <Alert severity="error" icon={false}>
                  {errors.checked}
                </Alert>
              )}

              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                sx={{ pt: 3 }}
              >
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </Form>
          </FormikProvider>
        </Box>
      </CardContent>
    </Card>
  )
}
