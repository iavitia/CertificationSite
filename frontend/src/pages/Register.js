import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import { RegisterForm } from '../components';
import AuthLayout from '../layouts/AuthLayout';
import Page from '../components/Page';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

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

const Landing = () => {
  return (
    <RootStyle title="Register | Certification">
      <AuthLayout>
        Already have an account? &nbsp;
        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to="/login"
        >
          Login
        </Link>
      </AuthLayout>

      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Typography variant="h3" sx={{ px: 5, mt: 30 }}>
          A smarter way to study for certifications
        </Typography>
      </SectionStyle>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Register
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Get started for free
            </Typography>
          </Box>

          <RegisterForm />

          <Typography
            variant="body2"
            align="center"
            sx={{ color: 'text.secondary', mt: 3 }}
          >
            By registering, I agree to the&nbsp;
            <Link underline="always" color="textPrimary">
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link underline="always" color="textPrimary">
              Privacy Policy
            </Link>
            .
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default Landing;
