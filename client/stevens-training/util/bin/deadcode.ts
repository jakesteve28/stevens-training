// const useStyles = makeStyles((theme) => ({
//   paper: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: "30px",
//     maxHeight: "65%", 
//     overflow: "auto",
//     textAlign: "center",
//     "&::-webkit-scrollbar": {
//       width: 20,
//     },
//     "&::-webkit-scrollbar-track": {
//       boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.6)`,
//     },
//     "&::-webkit-scrollbar-thumb": {
//       backgroundColor: "#303030",
//       outline: `1px solid #191919`,
//       borderRadius: "15px"
//     }
//   },
//   avatar: {
//     backgroundColor: theme.palette.primary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//     position: "fixed", 
//     bottom: 50, 
//     left: "66vw", 
//     width: "30vw",
//     padding: 15,
//     fontSize: "18pt",
//     opacity: 1.0,
//     '.Mui-disabled' : {
//       backgroundColor: "#191919",
//       color: "#DDDDDD"
//     },
//     borderRadius: "20px"
//   },
// image: {
//     backgroundImage: 'url(https://www.building-muscle101.com/wp-content/uploads/2019/06/light-weight-or-heavy-weight-main.jpg)',
//     backgroundRepeat: 'no-repeat',
//     backgroundColor:
//        theme.palette.grey[900],
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     filter: "brightness(0.6)"
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
//     }
//   },
//   grid: {
//     backgroundColor: "#191919",
//      color: "#DDDDDD"
//   }, 
//   input: {
// height: "30px",
// '&:hover': {
//   backgroundColor: "#202020"
//  },
//  '&:focus': {
//   backgroundColor: "#202020"
//  },
//  '&:active': {
//   backgroundColor: "#202020"
//  } }
// }));

  //   <Grid container component="main" className={classes.root}>
  //     <CssBaseline />
  //     <Grid item xs={false} sm={4} md={7} className={classes.image} />
  //     <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.grid}>
  //       <div className={classes.paper} >
  //         <Avatar className={classes.avatar}>
  //           <AccountCircleIcon />
  //         </Avatar>
  //         <Typography component="h1" variant="h5" style={{ marginTop: "15px", marginBottom: "10px" }}>
  //           Sign Up For a Stevens Account
  //         </Typography>
  //         <form className={classes.form} noValidate>
  //           <Tooltip title="Enter your first name">
  //             <TextField
  //                 autoComplete="fname"
  //                 name="firstName"
  //                 variant="outlined"
  //                 required
  //                 size='medium'
  //                 margin="none"
  //                 id="firstName"
  //                 label="First Name"
  //                 autoFocus
  //                 InputLabelProps={{ style: { color: "#DDDDDD" }}}
  //                 InputProps={{ style: { color: "#DDDDDD" }, classes: { input: classes.input }}}
  //                 inputProps={{ classes: classes.input} }
  //                 style={{ margin: 5 }}
  //               />
  //           </Tooltip>
  //           <Tooltip title="Enter your last name">
  //             <TextField
  //                 variant="outlined"
  //                 required
  //                 size='medium'
  //                 id="lastName"
  //                 label="Last Name"
  //                 name="lastName"
  //                 autoComplete="lname"
  //                 InputLabelProps={{ style: { color: "#DDDDDD" }}}
  //                 InputProps={{ style: { color: "#DDDDDD" }, classes: { input: classes.input }}}
  //                 inputProps={{ classes: classes.input} }
  //                 style={{ margin: 5 }}
  //             />
  //           </Tooltip>
  //           <Tooltip title="Enter a valid email address">
  //            <TextField
  //               variant="outlined"
  //               required
  //               fullWidth
  //               id="email"
  //               label="Email Address"
  //               name="email"
  //               autoComplete="email"
  //               InputLabelProps={{ style: { color: "#DDDDDD" }}}
  //               InputProps={{ style: { color: "#DDDDDD" }, classes: { input: classes.input }}}
  //               inputProps={{ classes: classes.input} }
  //               style={{ margin: 5 }}

  //             />
  //             </Tooltip>
  //             <Tooltip title="Enter username (8-20, letters+numbers only)">
  //              <TextField
  //                 variant="outlined"
  //                 required
  //                 fullWidth
  //                 id="username"
  //                 label="Username"
  //                 name="username"
  //                 autoComplete="username"
  //                 InputLabelProps={{ style: { color: "#DDDDDD" }}}
  //                 InputProps={{ style: { color: "#DDDDDD" }, classes: { input: classes.input }}}
  //                 inputProps={{ classes: classes.input} }
  //                 style={{ margin: 5 }}
  //             />
  //           </Tooltip>
  //           <Tooltip title="Enter password (8-24 chars*, numbers*, specials*)">
  //             <TextField
  //                 variant="outlined"
  //                 required
  //                 fullWidth
  //                 name="password"
  //                 label="Password"
  //                 type="password"
  //                 id="password"
  //                 autoComplete="current-password"
  //                 InputLabelProps={{ style: { color: "#DDDDDD" }}}
  //                 InputProps={{ style: { color: "#DDDDDD" }, classes: { input: classes.input }}}
  //                 inputProps={{ classes: classes.input} }
  //                 style={{ margin: 5 }}

  //             />
  //           </Tooltip>
  //           <Tooltip title="Confirm your password">
  //             <TextField
  //               variant="outlined"
  //               required
  //               fullWidth
  //               name="password"
  //               label="Confirm Password"
  //               type="password"
  //               id="password"
  //               autoComplete="current-password"
  //               InputLabelProps={{ style: { color: "#DDDDDD" }}}
  //               InputProps={{ style: { color: "#DDDDDD" }, classes: { input: classes.input }}}
  //               inputProps={{ classes: classes.input} }
  //               style={{ margin: 5, outlineColor: "black" }}
  //             />
  //             </Tooltip>
  //             <FormControlLabel
  //               style={{ color: "#DDDDDD", opacity: 0.87, marginTop: 10, marginBottom: "200px" }}
  //               control={<Checkbox value="allowExtraEmails" color="primary" />}
  //               label="I want to receive updates via email."
  //             />
  //         </form>
  //       </div>
  //       </Grid>
  //       <Button
  //         type="submit"
  //         variant="contained"
  //         color="primary"
  //         className={classes.submit}
  //         disabled={true}
  //       >
  //         Sign Up
  //       </Button>
  //     </Grid>

  // );
//}



export function RegisterScreen() {
  //   const [fName, setFName] = useState("");
  //   const [lName, setLName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [pw1, setPW1] = useState("");
  //   const [pw2, setPw2] = useState("");
  //   const [socketConnected, setSocketConnected] = useState(false); 
  //   const [username, setUsername] = useState(""); 
  //   const [pw, setPW] = useState("");  
  //   const dispatch = useDispatch(); 
  //   const user = useSelector(selectUser);
  //   const socketOptions = {
  //     transportOptions: {
  //         polling: {
  //             extraHeaders: {
  //                 credentials: "include"
  //             }
  //         }
  //     },
  //     reconnectionAttempts: 5
  //   }
  //   const attemptLogin = async (userName: string, pw: string) => {
  //     const res = await fetch(`https://localhost:3000/signon/login`, {
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify( {
  //             userName: username, 
  //             password: pw
  //         })
  //     })
  //     if(res) {
  //         const user = await res.json(); 
  //         console.log("Successfully logged in user", user); 
  //         console.log(`Attemping socket io login`)
  //         socket = io(`https://localhost:3000/notifications`, socketOptions); 
  //         if(!socket) {
  //           console.log("Socket not going"); 
  //           return;
  //         }
  //         dispatch(login(user)); 
  //         socket.emit("test", { msg: "" }, () => {
  //           setSocketConnected(true);
  //         });
  //     }
  //   }
  //   const onChangeText = (text: string) => {
  //       setUsername(text)
  //   }
  //   const onChangePWText = (text: string) => {
  //     setPW(text)
  //   }
  //   const onPressLogin = () => {
  //       attemptLogin(username, pw); 
  //   }
  //   return (
  //     <SignUp></SignUp>
  //   );
  
  // }
  
  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     backgroundColor: "transparent"
  //   },
  //   title: {
  //     fontSize: 20,
  //     fontWeight: 'bold',
  //     color: "#DDDDDD"
  //   },
  //   separator: {
  //     marginVertical: 30,
  //     height: 1,
  //     width: '80%',
  //   },
    
  // });