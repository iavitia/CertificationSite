import { merge } from 'lodash'
import Alert from './Alert'
import Autocomplete from './Autocomplete'
import Avatar from './Avatar'
import Button from './Button'
import ButtonGroup from './ButtonGroup'
import Card from './Card'
import Checkbox from './Checkbox'
import Container from './Container'
import ControlLabel from './ControlLabel'
import Drawer from './Drawer'
import Grid from './Grid'
import IconButton from './IconButton'
import Input from './Input'
import Link from './Link'
import Lists from './Lists'
import LoadingButton from './LoadingButton'
import Menu from './Menu'
import Paper from './Paper'
import Popover from './Popover'
import Radio from './Radio'
import Select from './Select'
import SvgIcon from './SvgIcon'
import Switch from './Switch'
import Table from './Table'
import Tabs from './Tabs'
import ToggleButton from './ToggleButton'
import Tooltip from './Tooltip'
import TreeView from './TreeView'
import Typography from './Typography'

export default function ComponentsOverrides(theme) {
  return merge(
    Alert(theme),
    Autocomplete(theme),
    Avatar(theme),
    Button(theme),
    ButtonGroup(theme),
    Card(theme),
    Checkbox(theme),
    Container(theme),
    ControlLabel(theme),
    Drawer(theme),
    Grid(theme),
    IconButton(theme),
    Input(theme),
    Link(theme),
    Lists(theme),
    LoadingButton(theme),
    Menu(theme),
    Paper(theme),
    Popover(theme),
    Radio(theme),
    Select(theme),
    SvgIcon(theme),
    Switch(theme),
    Table(theme),
    Tabs(theme),
    ToggleButton(theme),
    Tooltip(theme),
    TreeView(theme),
    Typography(theme)
  )
}
