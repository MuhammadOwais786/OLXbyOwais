import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom"
import { registerUser } from '../../config/firebase'
import './Login.css'
import emailIcon from '../../images/email.png'
import olxImg from '../../images/olx.png'
import { BrowserRouter as Router,Route,Link } from "react-router-dom";
import firebase from 'firebase'
export const EmailSignUp = () => {

  const history = useHistory()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [fileUrl, setFileUrl] = useState(null)

  // const [confirmPassword, setConfirmPassword] = useState('')

  const onFileChange = function (e) {
    const file = e.target.files[0] //files target using this
    const storageRef = firebase.storage().ref(`Users/${file.name}`); // store in var
    // const storageRef = firebase.storage().ref(`Users`).child(file.name); // store in var
    storageRef.put(file).then(function (res) {
      console.log('res****', res)
      res.ref.getDownloadURL().then(function (url) {
        console.log('url--->', url)
        setFileUrl(url)
        console.log('file url fromstate', fileUrl)
      })
    })
  }
  console.log('URLL STATE**************************', fileUrl)


  const register = async function () {
    registerUser({fullName, email, password, phone, fileUrl})
  history.replace('/emailLogin')

  }
  
  

  return (
    <div className="container email">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="card shadow mt-5">
            <div className="card-header text-center">
              <img src={olxImg} width="60" alt=""/>
            </div>
            <div className="card-body">
              <input className="enterEmail" required type="text" placeholder="Full name"
              onChange={e => setFullName(e.target.value)}
              /><br/><br/>
              <input className="enterEmail" required type="text" placeholder="Email"
              onChange={e => setEmail(e.target.value)}
              /><br/><br/>
              <input className="enterEmail" required type="number" placeholder="Phone number"
              onChange={e => setPhone(e.target.value)}
              /><br/><br/>
              <input className="enterPass" required type="password" placeholder="Create password"
              onChange={e => setPassword(e.target.value)}
              />
                <div className="cardChild p-3" required style={{ width: '20rem' }}
                onChange={onFileChange}>
                  <h5 style={{textAlign:"left", fontSize:14, color:'grey'}}>UPLOAD PHOTO</h5>
                  <SingleImageUploadComponent/>
                </div>

              <button className="login" onClick={register}>sign up</button>
              <Link to="emailLogin"><p>Signed In?</p></Link>
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
      imgPreview = <img src={this.state.file} style={{width:'6.1rem', height:'5.3rem', position:"absolute", top:'65%',left:'9%', opacity:0.7}} alt='' />;
    }

    return (
      <form>
        <div className="row form-group">
        <div className="icons card p-4 button-wrapper" style={{ width: '6rem', marginLeft:15 }}>
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