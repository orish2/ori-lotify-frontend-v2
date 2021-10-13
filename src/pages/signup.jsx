import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { onLogin, onSignup, onLogout } from '../store/user.actions.js'
import user from '../assets/img/user.png'



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        mister toy</Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

class _Signup extends React.Component {
  state = {
    credentials: {
      username: '',
      password: '',
      fullname: '',
      isAdmin: false
    },
    isSignup: false,
    isLogin: false
  }

  clearState = () => {
    const clearTemplate = {
      credentials: {
        username: '',
        password: '',
        fullname: ''
      },
      isSignup: false
    }
    this.setState({ clearTemplate })
  }
  handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    this.setState({ credentials: { ...this.state.credentials, [field]: value } });
  }

  onSignup = async (ev = null) => {
    if (!this.state.credentials.username || !this.state.credentials.password || !this.state.credentials.fullname) return;
    if (ev) ev.preventDefault();
    const loginUser = await this.props.onSignup(this.state.credentials);
    if (loginUser) {
      this.props.history.push(`/`)
    }
    this.clearState()
  }


  render() {
    const { username, password, fullname } = this.state.credentials;
    return (
      <ThemeProvider theme={theme} >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <img style={{ height: "28px" }} src={user} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={this.onSignup} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fullname"
                    name="fullname"
                    required
                    fullWidth
                    id="fullname"
                    label="fullname"
                    autoFocus
                    value={fullname}
                    onChange={this.handleChange}

                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={this.handleChange}

                  />
                </Grid>
                <Grid item xs={12}>

                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={this.handleChange}

                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    );
  }
}


function mapStateToProps(state) {
  return {
    //user: state.userModule.user
  }
}

const mapDispatchToProps = {
  onLogin, onSignup, onLogout
}

export const Signup = connect(mapStateToProps, mapDispatchToProps)(_Signup)

