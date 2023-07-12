import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
// material
import {
  Link,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer
} from '@mui/material'
// utils
import { sentenceCase } from 'sentence-case'
// components
import { Label, Scrollbar } from '../../../components'
// context
import { useAppContext } from '../../../context/appContext'

// ----------------------------------------------------------------------

export default function PracticeProblemList() {
  const { getAllProblems, problems } = useAppContext()
  const [loading, setLoading] = useState(true)
  console.log(problems)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllProblems()
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch problems:', error)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
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
              {problems.map((organization) =>
                organization.exams.map((exam) =>
                  exam.sections.map((section) =>
                    section.questions.map((question) => (
                      <TableRow key={question._id}>
                        <TableCell align="left" component="th" scope="row">
                          <Link
                            to="#"
                            color="inherit"
                            underline="hover"
                            component={RouterLink}
                          >
                            {question.title}
                          </Link>
                        </TableCell>
                        <TableCell align="left">
                          <Label
                            variant="ghost"
                            color={
                              (question.difficulty.toLowerCase() === 'hard' &&
                                'error') ||
                              (question.difficulty.toLowerCase() === 'medium' &&
                                'warning') ||
                              'success'
                            }
                          >
                            {sentenceCase(question.difficulty)}
                          </Label>
                        </TableCell>
                      </TableRow>
                    ))
                  )
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </>
  )
}
