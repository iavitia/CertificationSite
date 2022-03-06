import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import {
  Card,
  CardHeader,
  Stack,
  OutlinedInput,
  Link,
  Container,
  Typography,
  Box,
  CardContent,
} from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
import { LoginForm } from '../components';
import Page from '../components/Page';

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 'unset',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

const QuestionNew = () => {
  return (
    <Page title="New Study Question | Certification">
      <Container>
        <Box mb={5}>
          <Typography variant="h4" gutterBottom>
            Create a new study question
          </Typography>
        </Box>
        <Card>
          <CardContent>
            <CardHeader title="Question" />
            <OutlinedInput placeholder="Enter Question" />

            <CardHeader title="Answers" />
            <OutlinedInput placeholder="quetion 1" />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default QuestionNew;
