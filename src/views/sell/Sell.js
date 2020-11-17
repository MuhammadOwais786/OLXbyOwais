import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FooterEnd } from '../footer/footer'
import logo from '../../images/olx.png'
import './sell.css'
import firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

class Selling extends React.Component {
  myfunc() {
    console.log(this.props)
  }
  render() {
    return (
      <>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <img src={logo} width="70" alt="" />
        </div>
        <SellingAdd />
      </>
    )
  }
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
      imgPreview = <img src={this.state.file} style={{ width: '6.1rem', height: '5.2rem', position: "absolute", top: '51%', opacity: 0.7 }} alt='' />;
    }

    return (
      <form>
        <div className="row form-group">
          <div className="icons card p-4 button-wrapper" style={{ width: '6rem' }}>
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

export default function SellingAdd() {
  const history = useHistory();
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [name, setName] = useState('')
  const [place, setPlace] = useState('')
  const [number, setNumber] = useState('')
  const [fileUrl, setFileUrl] = useState(null)
  const [userProfile, setUserProfile] = useState([]);

  useEffect(() => {
    fetchProfile()
  }, [])

  const onFileChange = function (e) {
    const file = e.target.files[0]
    const storageRef = firebase.storage().ref(`Adds/${file.name}`);
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
  console.log('user profile', userProfile)

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date(),
      // date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + '-' + today.getSeconds() + ':' + today.getMinutes();
      date = new Date().toLocaleDateString(); // 11/16/2015
    firebase.firestore().collection("posts")
      .add({
        category,
        title,
        description,
        price,
        name,
        place,
        number,
        addsURL: fileUrl,
        date,
        userProfile,
      }).then(() => {
        swal("Good job!", "Data Has Been sucessfully!", "success");
      }).catch((error) => {
        alert(error.message);
        swal("Oops!", "Something wents wrong!", "warning");
      })

    setCategory('')
    setTitle('')
    setDescription('')
    setPrice('')
    setName('')
    setPlace('')
    setNumber('')
  }

  const fetchProfile = async () => {
    const db = firebase.firestore();
    const myUid = localStorage.getItem('userId')
    const data = await db.collection("users").doc(myUid).get()
    console.log("ušerId from sellllll pageeeeee", myUid)
    setUserProfile(data.data());
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="sellCard card shadow" style={{ width: "43rem", margin: "0 auto", padding: "30px", marginTop: "20px" }}>

          <div>
            <span style={{ fontSize: '18px', fontWeight: 600, display: "block", color: 'grey' }}>POST YOU ADD</span>

            <TextField id="standard-secondary" label="TITLE" color=" #8b65bf" required style={{ width: "430px", marginTop: "10px" }} onChange={(e) => setTitle(e.target.value)} value={title} />
            <br />
            <TextField id="standard-secondary" label="PRICE" color=" #8b65bf" required style={{ width: "430px", marginTop: "10px" }} onChange={(e) => setPrice(e.target.value)} value={price} />
            <br />
            <hr />
            <span style={{ fontSize: '18px', fontWeight: 600, display: "block", color: 'grey' }}>ADD DESCRIPTION</span><br />
            <textarea rows="4" cols="60" required onChange={(e) => setDescription(e.target.value)} value={description} placeholder='DESCRIPTION'
              onChange={(e) => setDescription(e.target.value)} value={description}
            ></textarea>
            <br />
            <hr />

            <div onChange={onFileChange}>
              <span style={{ fontSize: '18px', fontWeight: 600, display: "block", color: 'grey' }}>UPLOAD IMAGES</span>
              <SingleImageUploadComponent />
            </div>
            <hr />
            <span style={{ fontSize: '18px', fontWeight: 600, display: "block", color: 'grey' }}>CONFIRM YOUR LOCATION</span>
            <TextField id="standard-secondary" required label="LOCATION" color=" #8b65bf" style={{ width: "430px", marginTop: "10px" }} onChange={(e) => setPlace(e.target.value)} value={place} />
            <hr />

            <span style={{ fontSize: '18px', fontWeight: 600, display: "block", color: 'grey' }}>REVIEW YOUR DETAILS</span>
            <TextField id="standard-secondary" required label="YOUR NAME" color=" #8b65bf" style={{ width: "430px", marginTop: "10px" }} onChange={(e) => setName(e.target.value)} value={name} />
            <TextField id="standard-secondary" required label="YOUR NUMBER" color=" #8b65bf" style={{ width: "430px", marginTop: "10px" }} onChange={(e) => setNumber(e.target.value)} value={number} />
            <hr />
            <Button variant="contained" color="primary" style={{ broder: 'none', width: '10rem', backgroundColor: "#8b65bf", color: 'white', padding: "5px 5px 5px 5px", fontSize: '16px' }} type="submit" >
              Post
            </Button>
          </div>

        </div>
      </form>
      <br />
      <br />
      <br />

      <FooterEnd />
    </>
  )
}

export {
  Selling,
  SellingAdd
}