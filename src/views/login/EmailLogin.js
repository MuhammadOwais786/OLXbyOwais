import React, { useState, useEffect } from 'react'
import './Login.css'
import { useHistory } from "react-router-dom"
import olxImg from '../../images/olx.png'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { loginUser } from '../../config/firebase'
import swal from 'sweetalert';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      // margin: theme.spacing(0),
      width: '25ch',
    },
  },
}));


export default function Email(isLoggedIn) {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const classes = useStyles();


  const onLogin = async function () {
    try {
      const user = await loginUser(email, password)
      history.push('/MainOLX')
      swal("Good job!", "You are logged in sucessfully!", "success");
      console.log('user logged In', user)
      localStorage.setItem("userId", user.user.uid)

    } catch (error) {
      // setMessage(error.message)
      swal("Oops!", "Something wents wrong!", "warning");

    }
  }

  return (

    <div className="container email">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 mt-5">
          <div className="card shadow mt-5">
            <div className="card-header text-center" style={{ padding: '17px' }}>
              <img src={olxImg} width="60" alt="" />
            </div>
            <div className="card-body" className={classes.root} style={{ padding: "20px" }}>
              <TextField label="Email" variant="outlined" style={{ width: "18rem" }} className="enterEmail"
                onChange={e => setEmail(e.target.value)}
              /><br /><br />

              <TextField label="Password" variant="outlined" style={{ width: "18rem" }} type="password" className="enterPassword" onChange={e => setPassword(e.target.value)}
              /><br /><br />

              <Button variant="contained" color="primary" style={{ marginLeft: "50px", width: '12rem' }} className="login" onClick={onLogin}>Login</Button>
              <br /><br /><Link to="emailSignUp"><p>I Dont have an account?</p></Link>
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  )
}
