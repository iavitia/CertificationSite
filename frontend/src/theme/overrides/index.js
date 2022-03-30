import { merge } from 'lodash'
import Alert from './Alert'
import Autocomplete from './Autocomplete'
import Avatar from './Avatar'
import Button from './Button'
import Card from './Card'
import Container from './Container'
import Drawer from './Drawer'
import Grid from './Grid'
import IconButton from './IconButton'
import Input from './Input'
import Link from './Link'
import Lists from './Lists'
import Menu from './Menu'
import Paper from './Paper'
import Popover from './Popover'
import Select from './Select'
import Tooltip from './Tooltip'
import Typography from './Typography'

export default function ComponentsOverrides(theme) {
  return merge(
    Alert(theme),
    Autocomplete(theme),
    Avatar(theme),
    Button(theme),
    Card(theme),
    Container(theme),
    Drawer(theme),
    Grid(theme),
    IconButton(theme),
    Input(theme),
    Link(theme),
    Lists(theme),
    Menu(theme),
    Paper(theme),
    Popover(theme),
    Select(theme),
    Tooltip(theme),
    Typography(theme)
  )
}
