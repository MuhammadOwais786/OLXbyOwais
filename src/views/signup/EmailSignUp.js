import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { registerUser } from '../../config/firebase'
import './Login.css'
import olxImg from '../../images/olx.png'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import firebase from 'firebase'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      // margin: theme.spacing(0),
      width: '25ch',
    },
  },
}));


export const EmailSignUp = () => {

  const history = useHistory()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [fileUrl, setFileUrl] = useState(null)
  const classes = useStyles();

  const onFileChange = function (e) {
    const file = e.target.files[0]
    const storageRef = firebase.storage().ref(`Users/${file.name}`);
    storageRef.put(file).then(function (res) {
      console.log('res****', res)
      res.ref.getDownloadURL().then(function (url) {
        console.log('url Downloaded', url)
        setFileUrl(url)
        console.log('file url fromstate', fileUrl)
      })
    })
  }
  console.log('URL', fileUrl)


  const register = async function () {
    try {
      const userRegis = await registerUser({ fullName, email, password, phone, fileUrl })
      history.replace('/emailLogin')
      swal("Good job!", "You are Registred sucessfully!", "success");
    } catch (error) {
      swal("Oops!", "Something wents wrong!", "warning");

    }
  }



  return (
    <div className="container email">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="card shadow mt-5">
            <div className="card-header text-center" style={{ padding: "17px" }}>
              <img src={olxImg} width="60" alt="" />
            </div>
            <div className="card-body" className={classes.root} style={{ padding: "20px" }}>
              <TextField label="Full Name" variant="outlined" style={{ width: "18rem" }} className="enterEmail" required type="text"
                onChange={e => setFullName(e.target.value)}
              /><br /><br />
              <TextField label="Email" variant="outlined" style={{ width: "18rem" }} className="enterEmail" required type="email"
                onChange={e => setEmail(e.target.value)}
              /><br /><br />
              <TextField label="Phone Number" variant="outlined" style={{ width: "18rem" }} className="enterEmail" required type="number"
                onChange={e => setPhone(e.target.value)}
              /><br /><br />
              <TextField label="Password" variant="outlined" style={{ width: "18rem" }} className="enterPass" required type="password"
                onChange={e => setPassword(e.target.value)}
              />
              <div className="cardChild p-3" required style={{ width: '20rem' }}
                onChange={onFileChange}>
                <h5 style={{ textAlign: "left", fontSize: 14, color: 'grey' }}>UPLOAD PHOTO</h5>
                <SingleImageUploadComponent />
              </div>

              <Button
                variant="contained" color="primary"
                style={{ marginLeft: "50px", width: '12rem' }}
                className="login" onClick={register}>sign up</Button>
              <br /><br /><Link to="emailLogin"><p>I have an account?</p></Link>
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  )
}



class SingleImageUploadComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null
    }
    this.uploadSingleFile = this.uploadSingleFile.bind(this)
    this.upload = this.upload.bind(this)
  }

  uploadSingleFile(e) {
    this.setState({
      file: URL.createObjectURL(e.target.files[0])
    })
  }

  upload(e) {
    e.preventDefault()
    console.log(this.state.file)
  }

  render() {
    let imgPreview;
    if (this.state.file) {
      imgPreview = <img src={this.state.file} style={{ width: '6.1rem', height: '5.3rem', position: "absolute", top: '65%', left: '9%', opacity: 0.7 }} alt='' />;
    }

    return (
      <form>
        <div className="row form-group">
          <div className="icons card p-4 button-wrapper" style={{ width: '6rem', marginLeft: 15 }}>
            <span class="label"><i className="fa fa-camera" onClick={this.upload}></i></span>
            <input type="file" name="upload" id="upload" class="upload-box form-control" onChange={this.uploadSingleFile} placeholder="Upload File" />
          </div>
        </div>

        <div className="form-group preview">
          {imgPreview}
        </div>
      </form >
    )
  }
}