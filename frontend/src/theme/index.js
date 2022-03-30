import { useMemo } from 'react'
// material
import { CssBaseline } from '@mui/material'
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider
} from '@mui/material/styles'
//
import typography from './typography'
import breakpoints from './breakpoints'
import shape from './shape'
import componentsOverride from './overrides'
import shadows, { customShadows } from './shadows'
import palette from './palette'

export default function ThemeConfig({ children }) {
  const themeOptions = useMemo(
    () => ({
      shape,
      typography,
      breakpoints,
      shadows,
      customShadows,
      palette
    }),
    []
  )

  const theme = createTheme(themeOptions)
  theme.components = componentsOverride(theme)

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
