import React, { useState, useEffect } from 'react'
import logo from '../../images/olx.png'
import firebase from 'firebase'
import banner from '../../images/banner-1.jpg'
import { BrowserRouter as Router,Link} from "react-router-dom";
import { signOut } from '../../config/firebase'
import swal from 'sweetalert';
import './header.css'

function Header(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDp, setUserDp] = useState([]);
    const [check, setCheck] = useState(false)

    let userId = localStorage.getItem('userId')
    useEffect(() => {
        fetchDp()
        checkUser()
    }, [check])

    const fetchDp = async () => {
        if (userId != null) {
            const db = firebase.firestore();
            const myUid = localStorage.getItem('userId')
            const data = await db.collection("users").doc(myUid).get()
            console.log("ušerId from Heaqder pageeeeee", myUid)
            setUserDp(data.data());
            setCheck(true)
        }
    }
    console.log("ušerId from detail pageeeeee", userDp)

    const logOut = async function () {
        try {
            const user = await signOut()
            localStorage.removeItem('userId')
            // alert("signout sucecsfully")
            swal("Oops!", "You are Sign Out sucessfully!", "success");
        } catch (e) {
            alert(e.message)
        }
        setIsLoggedIn(true)
    }
    const checkUser = () => {
        let userId = localStorage.getItem('userId')
        if (userId != null) {
            setIsLoggedIn(true)
        }
    }
    return (
        <div className="container-fluid header">

            <div className="row">

                <div className="img">
                    <img src={logo} />
                </div>

                <div className="search-city">
                    <i className="fa fa-search"></i>
                    <input type="text" placeholder="Search city area or location" />
                    <i className="fa fa-angle-down"></i>
                </div>

                <div className="search-things">
                    <input type="text" placeholder="Find Cars, Mobile phones and more.." onChange={e => props.filterAdsMethod(e.target.value)}/>
                </div>

                <div className="search-icon">
                    <i className="fa fa-search"></i>
                </div>

                <div className="icons">
                    <Link to="/chats"><i className="fa fa-comment-o"></i></Link>
                    <i className="fa fa-bell-o"></i>


                    {/* {!isLoggedIn && userId === null */}
                    {!isLoggedIn
                        ?
                        <Link to="/EmailLogin"><a className="login" style={{ fontWeight: 700, marginRight: 12, position: 'relative', top: -6 }}>Login</a></Link>
                        :
                        // <a  onClick={logOut}  style={{marginLeft:10, padding:10}}>LogOut</a> 
                        <React.Fragment>
                            <img className="rounded-circle" src={userDp.fileUrl} width="30px" />
                            <div className="dropdown">
                                <span className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-angle-down"></i>
                                </span>
                                <div className="dropdown-menu">
                                    <a onClick={logOut} style={{ marginLeft: 10, padding: 10 }}>LogOut</a>
                                    {/* <a  onClick={() => firebase.auth().signOut()}  style={{marginLeft:10, padding:10}}>LogOut</a> */}
                                </div>
                            </div>
                        </React.Fragment>
                    }

                    <button>
                        <Link to="/sell">
                            <i className="fa fa-plus" style={{ color: 'black' }}></i><span style={{ color: 'black' }}>SELL</span>
                        </Link>
                    </button>
                </div>

            </div>

        </div>

    )
}



class ChildHeader extends React.Component {

    Hello = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
    }

    render() {
        return (
            <div className="container-fluid ChildHeader" style={{cursor:"pointer"}}>
                <div className="row">

                    <div className="categories">ALL CATEGORIES
                            <i className="fa fa-angle-down"></i>
                    </div>

                    <div className="divCategory">
                        <span className="catagry"> Mobile Phones </span>
                        <span className="catagry"> Cars </span>
                        <span className="catagry"> Motorcycles </span>
                        <span className="catagry"> Houses </span>
                        <span className="catagry"> TV - Video-Audio </span>
                        <span className="catagry"> Tablets </span>
                        <span className="catagry"> Land & Plots </span>
                    </div>

                    <div className="divCategory1">
                        <span> M.. </span>
                        <span> Cars </span>
                        <span> M.. </span>
                        <span> H.. </span>
                        <span> TV. </span>
                        <span> T.. </span>
                        <span > L.. </span>
                    </div>

                </div>

            </div>
        )
    }
}

class Banner extends React.Component {
    render() {
        return (
            <div>
                <img src={banner} width='100%' alt="" />
            </div>
        )
    }
}

export {
    Header,
    ChildHeader,
    Banner,
};