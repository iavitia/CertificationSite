import { useState } from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'
import copyOutline from '@iconify/icons-eva/copy-outline'
import { CopyToClipboard } from 'react-copy-to-clipboard'
// material
import { Tooltip, TextField, IconButton, InputAdornment } from '@mui/material'

// ----------------------------------------------------------------------

CopyClipboard.propTypes = {
  value: PropTypes.string
}

export default function CopyClipboard({ value, ...other }) {
  const [state, setState] = useState({
    value,
    copied: false
  })

  const handleChange = (event) => {
    setState({ value: event.target.value, copied: false })
  }

  const onCopy = () => {
    setState({ ...state, copied: true })
  }

  return (
    <TextField
      disabled
      value={state.value}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <CopyToClipboard text={state.value} onCopy={onCopy}>
              <Tooltip title="Copy">
                <IconButton>
                  <Icon icon={copyOutline} width={24} height={24} />
                </IconButton>
              </Tooltip>
            </CopyToClipboard>
          </InputAdornment>
        )
      }}
      {...other}
    />
  )
}
