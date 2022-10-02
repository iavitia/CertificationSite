import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// form
import * as Yup from 'yup'
import { useFormik, Form, FormikProvider } from 'formik'
// components
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Alert
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Iconify from '../Iconify'
import { useAppContext } from '../../context/appContext'

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { login } = useAppContext()

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      const currentUser = {
        username: values.username,
        password: values.password
      }
      try {
        await login(currentUser)
        navigate('/', { replace: true })
      } catch (error) {
        setErrors({ afterSubmit: error.response.data.msg })
        setSubmitting(false)
      }
    }
  })

  const handleShowPassword = () => {
    setShowPassword((show) => !show)
  }

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && (
            <Alert severity="error" data-cy="loginError">
              {errors.afterSubmit}
            </Alert>
          )}

          <TextField
            data-cy="username"
            fullWidth
            autoComplete="username"
            label="Username"
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            data-cy="password"
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleShowPassword}
                    edge="end"
                    data-cy="showPassword"
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

          <LoadingButton
            color="secondary"
            data-cy="submitLogin"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  )
}

export default LoginForm
