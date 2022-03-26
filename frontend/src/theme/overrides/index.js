import { merge } from 'lodash'
import Alert from './Alert'
import Button from './Button'
import Card from './Card'
import Input from './Input'
import Typography from './Typography'

export default function ComponentsOverrides(theme) {
  return merge(
    Alert(theme),
    Button(theme),
    Card(theme),
    Input(theme),
    Typography(theme)
  )
}
