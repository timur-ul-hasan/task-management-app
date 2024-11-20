import {
  Box,
  Typography,
  Container,
  styled
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import image404 from 'src/assets/404.svg';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

function Status404() {
  const { t }: { t: any } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Status - 404</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <img alt="404" height={180} src={image404} />
            <Typography
              variant="h2"
              sx={{
                my: 2
              }}
            >
              {t("The page you were looking for doesn't exist.")}
            </Typography>
            <Typography
              variant="h4"
              color="text.secondary"
              fontWeight="normal"
              sx={{
                mb: 4
              }}
            >
              {t(
                "It's on us, we moved the content to a different page. The search below should help!"
              )}
            </Typography>
          </Box>
        </Container>
      </MainContent>
    </>
  );
}

export default Status404;
