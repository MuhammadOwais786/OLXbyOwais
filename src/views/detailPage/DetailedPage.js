import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header, ChildHeader } from '../header/Header'
import './detail.css'
import firebase from 'firebase';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { FooterEnd } from '../footer/footer';

function DetailPage() {

    const { adsID } = useParams()
    const [adsData, setAdsData] = useState([])
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetchAdsData()
    }, [])

    const fetchAdsData = async () => {
        const db = firebase.firestore()
        const results = await db.collection("posts").doc(adsID).get()
        console.log('uadsDataa *****===', adsData)
        setAdsData(results.data())
        setUserData(results.data().userProfile)
    }
    console.log("userData*********************** detail page", userData)
    // const moment = require('moment');
    // const todayy = moment().format('LLLL');;
    // alert(today.format());
    // adsData.today = todayy
    // console.log('AdsData*******************************************************', todayy)
    // console.log('AdsData*******************************************************', setAdsData)


    return (
        <div>
            < Header />
            < ChildHeader />

            <div className=" detail container-fluid p-5">
                {adsData &&
                    <div className="row">

                        <div className="col-md-7">
                            <div className="card shadow" style={{ padding: '12px' }}>
                                <div className="card-body">
                                    <p style={{ position: "absolute", top: "2%", right: "2%", fontSize: 12, color: "grey" }}>{adsData.date}</p>

                                    <p style={{ color: '#042121', fontSize: 30 }} className="price">RS {adsData.price}</p>
                                    <p style={{ fontSize: 23, color: 'black', fontWeight: 600 }} className="title">{adsData.title}</p>
                                    <hr />
                                    <p className="Seller-Desc">Seller Description</p>
                                    {userData &&
                                        <img src={userData.fileUrl} className="dp rounded-circle" width="70" />}
                                    <p className="Name">{adsData.name}</p>
                                    <Link to="/chats">
                                        <button className="btn w-100 chatting">Chat with seller</button>
                                    </Link>
                                    <i className="fa fa-phone"></i>
                                    <p className="phone">{adsData.number}</p>
                                    <hr />
                                    <p className="place">Posted In</p>
                                    <p className="state">{adsData.place}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-5">
                            <div className="card shadow ml-3 " style={{ border: '1px solid lightgrey', padding: 20, backgroundColor: "lightgrey" }}>
                                <img className="card-img-top" src={adsData.addsURL} alt="Post Image" />
                            </div>
                        </div>

                    </div>
                }
                <br />
                {adsData &&
                    <div className="row">
                        <div className="col-md-12 card shadow " style={{ padding: '12px 12px 12px 12px', marginLeft: 8 }}>
                            <p style={{ fontSize: 27, fontWeight: 600, color: 'black' }}>DESCRIPTION</p>
                            <p style={{ fontSize: 14, color: 'grey' }}>{adsData.description}</p>
                        </div>
                    </div>
                }
            </div>
            <FooterEnd />
        </div>
    )
}
export default DetailPage;
