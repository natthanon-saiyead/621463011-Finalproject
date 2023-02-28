import  React,{useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const footers = [
 
];

function PricingContent() {
  useEffect(()=>{
    const token = localStorage.getItem('token')
    fetch('http://localhost:3333/authen', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token,
      },
      
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok'){
          localStorage.setItem('token', data.token)
          
          //alert('authen sucess')
        } else {
          alert('authen failed')
          localStorage.removeItem('token')
          window.location='/login'
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },[])


  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token')
    window.location='/login'
  }
  
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Main
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="http://localhost:3001"
              sx={{ my: 1, mx: 1.5 }}
            >
              Chat
            </Link>
          </nav>
          <Button onClick={handleLogout} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <main>
  
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
             
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
             
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" href="http://localhost:3001">Chat Room</Button>
              
            </Stack>
          </Container>
        </main>
     
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}

export default function Pricing() {
  return <PricingContent />;
}