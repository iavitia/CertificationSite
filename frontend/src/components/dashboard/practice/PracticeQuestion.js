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

const OPTIONS = [
  'The speed of response from the banking backend',
  'The attractiveness of the application',
  'The size and clarity of the instruction text',
  'The reliability of the application when the connection is dropped'
]

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

export default function PracticeQuestion() {
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
      console.log(values)
    }
  })

  const { errors, values, handleSubmit } = formik

  return (
    <Card>
      <CardContent>
        <Typography variant="body">
          You are participating in a role-based review session. Your assigned
          role is that of a senior citizen. The product is an online banking
          application that is targeted for use on smart phones. You are
          currently reviewing the user interface of the product with a prototype
          that works on iPhones. Which of the following is an area that you
          should review?
        </Typography>

        <Box sx={{ pl: { xs: 0, md: 2 }, pt: 2 }}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              {OPTIONS.map((option) => (
                <OptionItem
                  key={option}
                  option={option}
                  formik={formik}
                  checked={values.checked.includes(option)}
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
                <Button size="large" variant="outlined" type="submit">
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
