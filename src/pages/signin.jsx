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
import enter from '../assets/img/enter.png'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Lotify      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


class _Signin extends React.Component {
  state = {
    credentials: {
      username: '',
      password: '',
      fullname: '',
      isAdmin: false
    }
  }

  clearState = () => {
    const clearTemplate = {
      credentials: {
        username: '',
        password: '',
        fullname: ''
      }
    }
    this.setState({ clearTemplate })
  }

  handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    this.setState({ credentials: { ...this.state.credentials, [field]: value } });
  }

  onLogin = async (ev = null) => {
    if (!this.state.credentials.username || !this.state.credentials.password) return;
    if (ev) ev.preventDefault();
    const loginUser = await this.props.onLogin(this.state.credentials)
    this.clearState()
    if (loginUser) {
      this.props.history.push(`/`)
    }

  }

  render() {
    const { username, password } = this.state.credentials;
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
              <img style={{ height: "30px" }} src={enter} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={this.onLogin} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="username"
                label="username"
                type="password"
                id="username"
                autoComplete="username"
                onChange={this.handleChange}
                value={username}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
                value={password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    );
  }
}


function mapStateToProps(state) {
  return {}
}

const mapDispatchToProps = {
  onLogin, onSignup, onLogout
}

export const Signin = connect(mapStateToProps, mapDispatchToProps)(_Signin)

