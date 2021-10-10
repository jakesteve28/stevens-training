import * as React from 'react';
import { StyleSheet  } from 'react-native';
import { Text, View, } from '../components/Themed';
import styled from 'styled-components/native';
import { useState } from 'react';
import { evaluateEmail, evaluatePassword, evaluateUsername } from '../util/evalUtils';
export let socket: any; 

const SignInContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

export default function SignInScreen() {
  return (
    <SignInContainer style={styles.container}>
       <SignInSide />
    </SignInContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "transparent"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {/* {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
        
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'} */}
//     </Typography>
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   successfulOutline: {
//     borderWidth: "1px",
//     borderColor: "#59E684 !important"
//   },
//   failOutline: {
//     borderWidth: "1px",
//     borderColor: "#E83668 !important"
//   },
//   root: {
//     height: '100vh',
//     "& input": {
//       "&:-webkit-autofill": {
//           transition:
//               "background-color 50000s ease-in-out 0s, color 50000s ease-in-out 0s",
//       },
//       "&:-webkit-autofill:focus": {
//           transition:
//               "background-color 50000s ease-in-out 0s, color 50000s ease-in-out 0s",
//       },
//       "&:-webkit-autofill:hover": {
//           transition:
//               "background-color 50000s ease-in-out 0s, color 50000s ease-in-out 0s",
//       },
//   },
//   },
//   '& .MuiInputBase-root': {
//     color: "#DDDDDD"
//   },
//   "& .MuiFormLabel-root": {
//     color: theme.palette.secondary.main
//   },
//   image: {
//     backgroundImage: 'url(https://i.pinimg.com/originals/f9/a5/87/f9a5870e85597fc33981d50af820a05c.jpg)',
//     backgroundRepeat: 'no-repeat',
//     backgroundColor:
//        theme.palette.grey[900],
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     filter: "brightness(0.6)"

//   },
//   paper: {
//     marginLeft: "15px",
//     marginRight: "15px",
//     marginTop: "15px",
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     maxHeight: "75%",
//     textAlign: "center"
//   },
//   avatar: {
//     backgroundColor: theme.palette.primary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1)
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//     padding: "10px",
//     width: "33vw",
//     marginLeft: "auto",
//     marginRight: "auto",

//   },
//   grid: {
//     backgroundColor: "#191919",
//      color: "#DDDDDD",
//      overflow: "auto",
//      "&::-webkit-scrollbar": {
//        width: 20,
//      },
//      "&::-webkit-scrollbar-track": {
//        boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.6)`,
//      },
//      "&::-webkit-scrollbar-thumb": {
//        backgroundColor: "#303030",
//        outline: `1px solid #191919`,
//        borderRadius: "15px"
//      }
//   }, 
//   textinput: {
//     color: "#DDDDDD",
//   },
//   input: {
//     '&:-webkit-autofill': {
//              WebkitBoxShadow: theme.palette.type === 'dark' ? '0 0 0 100px #266798 inset' : null,
//               WebkitTextFillColor: theme.palette.type === 'dark' ? '#fff' : null,
//               borderRadius: theme.shape.borderRadius,
//             },
//      '&:hover': {
//       backgroundColor: "#202020"
//      },
//      '&:focus': {
//       backgroundColor: "#202020"
//      },
//      '&:active': {
//       backgroundColor: "#202020"
//      }
//   }
// }));

export function SignInSide() {
  //const classes = useStyles();
  const [username, setUsername] = useState(""); 
  const [pw, setPw] = useState("");
  const [usernameError, setUsernameError] = useState(false); 
  const [pwError, setPwError] = useState(false); 
  const [showOutline, setShowOutline] = useState(false); 
  const submit = async () => {
    setUsernameError(false); 
    setPwError(false); 
    if(evaluateEmail(username)) {
      if(evaluatePassword(pw)) {
        await signin(); 
      } else {
        setPwError(true);
      }
    }
    else if(evaluateUsername(username)) {
      if(evaluatePassword(pw)) {
        await signin(); 
      } else {
        setPwError(true);
      }
    }
    else { setUsernameError(true); }
    setShowOutline(true);
  }
  const signin = async () => {

  }
  return (
    <h1>test</h1>
    // <Grid container component="main" className={classes.root}>
    //   <CssBaseline />
    //   <Grid item xs={false} sm={4} md={7} className={classes.image} />
    //   <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.grid}>
    //     <div className={classes.paper}>
    //       <Avatar className={classes.avatar}>
    //         <LockOutlinedIcon />
    //       </Avatar>
    //       <Typography component="h1" variant="h5">
    //         Sign in
    //       </Typography>
    //       <form className={classes.form} noValidate>
    //         <TextField
    //           variant="outlined"
    //           margin="normal"
    //           required
    //           fullWidth
    //           id="username"
    //           label="Username or Email Address"
    //           name="email"
    //           autoComplete="email"
    //           autoFocus
    //           color="primary"
    //           InputLabelProps={{ style: { color: "#DDDDDD" }}}
    //           InputProps={{ style: { color: "#DDDDDD" }, classes: { input: classes.input, notchedOutline: (showOutline) ? ((usernameError) ? classes.failOutline : classes.successfulOutline) : undefined}}}
    //           inputProps={{ classes: classes.input} }
    //           onChange={(e) => {setUsername(e.target.value)}}
    //         />
    //         <TextField
    //           variant="outlined"
    //           margin="normal"
    //           required
    //           fullWidth
    //           name="password"
    //           label="Password"
    //           type="password"
    //           id="password"
    //           autoComplete="current-password"
    //           color="primary"
    //           InputLabelProps={{ style: { color: "#DDDDDD" }}}
    //           InputProps={{ style: { color: "#DDDDDD" }, classes: { input: classes.input, notchedOutline: (showOutline) ? ((pwError) ? classes.failOutline : classes.successfulOutline) : undefined}}}
    //           onChange={(e) => {setPw(e.target.value)}}
    //         />
    //         <FormControlLabel
    //           control={<Checkbox value="remember" color="primary" />}
    //           label="Remember me"
    //           style={{ width: "100%" }}
    //         />
    //         <Button
    //           type="submit"
    //           fullWidth
    //           variant="contained"
    //           color="primary"
    //           className={classes.submit}
    //           onClick={() => submit()}
    //         >
    //           Sign In
    //         </Button>
    //         <Grid container style={{ textAlign: "left" }}>
    //           <Grid item xs>
    //             <Link href="#" variant="body2">
    //               Forgot password?
    //             </Link>
    //           </Grid>
    //           <Grid item>
    //             <Link href="#" variant="body2">
    //               {"Don't have an account? Sign Up"}
    //             </Link>
    //           </Grid>
    //         </Grid>
    //         <Box mt={5}>
    //           <Copyright />
    //         </Box>
    //       </form>
    //     </div>
    //   </Grid>
    // </Grid>
  );
}

function isEmail(username: string) {
  throw new Error('Function not implemented.');
}
