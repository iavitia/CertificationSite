import { Link as RouterLink } from 'react-router-dom'
// material
import {
  Autocomplete,
  Link,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TextField,
  Stack
} from '@mui/material'
// utils
import { sentenceCase } from 'sentence-case'
// components
import { Label, Scrollbar } from '../../../components'

// ----------------------------------------------------------------------

function createData(id, title, difficulty) {
  return { id, title, difficulty }
}

// placeholder data for CERTIFICATIONS
// and BASIC_TABLE
const CERTIFICATIONS = [
  {
    id: 1,
    title: 'AWS Certified Solutions Architect - Associate',
    section: 'AWS',
    difficulty: 'easy'
  },
  {
    id: 2,
    title: 'AWS Certified Developer - Associate',
    section: 'AS',
    difficulty: 'medium'
  },
  {
    id: 3,
    title: 'AWS Certified DevOps Engineer - Professional',
    section: 'AW',
    difficulty: 'easy'
  }
]

const BASIC_TABLE = [
  createData(1, 'Average of Levels in Binary Tree', 'easy'),
  createData(2, 'Median of Two Sorted Arrays', 'hard'),
  createData(3, 'Regular Expression Matching', 'medium'),
  createData(4, 'Substring with Concatenation of All Words', 'medium'),
  createData(5, 'Best Time to Buy and Sell Stock III', 'easy')
]

// ----------------------------------------------------------------------

export default function PracticeProblemList() {
  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 3, sm: 2 }}
        justifyContent="space-evenly"
        alignItems="center"
        sx={{ pb: 2 }}
      >
        <Autocomplete
          fullWidth
          options={CERTIFICATIONS}
          renderInput={(params) => (
            <TextField hiddenLabel {...params} placeholder="Certification" />
          )}
        />

        <Autocomplete
          fullWidth
          options={CERTIFICATIONS}
          renderInput={(params) => (
            <TextField {...params} placeholder="Section" hiddenLabel />
          )}
        />

        <Autocomplete
          fullWidth
          options={CERTIFICATIONS}
          renderInput={(params) => (
            <TextField {...params} placeholder="Difficulty" hiddenLabel />
          )}
        />
      </Stack>
      <Scrollbar>
        <TableContainer>
          <Table padding="normal">
            <TableHead>
              <TableRow>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Difficulty</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {BASIC_TABLE.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="left" component="th" scope="row">
                    <Link
                      to="#"
                      color="inherit"
                      underline="hover"
                      component={RouterLink}
                    >
                      {row.title}
                    </Link>
                  </TableCell>
                  <TableCell align="left">
                    <Label
                      variant="ghost"
                      color={
                        (row.difficulty.toLowerCase() === 'hard' && 'error') ||
                        (row.difficulty.toLowerCase() === 'medium' &&
                          'warning') ||
                        'success'
                      }
                    >
                      {sentenceCase(row.difficulty)}
                    </Label>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </>
  )
}
