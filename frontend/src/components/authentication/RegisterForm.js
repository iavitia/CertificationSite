import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// form
import * as Yup from 'yup'
import { useFormik, Form, FormikProvider } from 'formik'
// components
import {
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
  Typography,
  Link
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Iconify from '../Iconify'
import { useAppContext } from '../../context/appContext'

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { registerUser } = useAppContext()

  const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username cannot be longer than 20 characters')
      .matches(
        /^[A-Za-z0-9_-]*$/,
        'Letters, numbers, dashes, and underscores only. Please try again without symbols.'
      ),
    email: Yup.string()
      .required('Email is required')
      .email('Enter a valid email address'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password cannot be longer than 64 characters')
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      const currentUser = {
        username: values.username,
        email: values.email,
        password: values.password
      }
      try {
        await registerUser(currentUser)
        navigate('/', { replace: true })
      } catch (error) {
        setErrors({ afterSubmit: error.response.data.msg })
        setSubmitting(false)
      }
    }
  })

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit}</Alert>
          )}

          <TextField
            data-cy="username"
            fullWidth
            label="Username"
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            data-cy="email"
            fullWidth
            autoComplete="email"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            data-cy="password"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Iconify
                      icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                    />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <Typography
            variant="body2"
            align="left"
            sx={{ color: 'text.disabled', mt: 3 }}
          >
            By registering, I agree to the&nbsp;
            <Link underline="always" color="text.disabled">
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link underline="always" color="text.disabled">
              Privacy Policy
            </Link>
            .
          </Typography>

          <LoadingButton
            color="secondary"
            data-cy="submitRegister"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  )
}

export default Register
