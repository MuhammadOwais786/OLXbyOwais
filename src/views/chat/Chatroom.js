import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { sendMessageToDb, getMessages, joinRoom,getFriendData } from '../../config/firebase'
import firebase from 'firebase';


export default function Chatroom() {
   const { chatId } = useParams()
   const userId = localStorage.getItem('userId')
   const [message, setMessage] = useState('')
   const [messages, setMessages] = useState([])
   const [userData, setUserData] = useState([])
   const [friendData, setFriendData] = useState([])
   const { friendId } = useParams()
   const friend = localStorage.getItem('friend')

   useEffect(() => {
      renderMessages()
      fetchUserData();
      fetchDp();
   }, [])

   const renderMessages = async () => {
      const response = await getMessages(chatId)
      const tempMessages = []
      response.forEach(doc => {
         tempMessages.push(doc.data())
      })
      setMessages(tempMessages)
      // setMessage('')
   }



   const sendMessage = async () => {
      await sendMessageToDb(message, chatId)
      renderMessages()
   }

   const fetchDp = async () => {
      if (friend != null) {
         const db = firebase.firestore();
         //   const friendUid = localStorage.getItem('friend')
         const data = await db.collection("users").doc(friend).get()
         console.log("ušerId from Heaqder pageeeeee", friend)
         setFriendData(data.data());
      }
   }

   const fetchUserData = async () => {
      try {
         const response = await getFriendData()
         const tempUsers = []
         response.forEach(doc => {
            tempUsers.push({ ...doc.data(), id: doc.id })
         })
         setUserData(tempUsers)
      } catch (e) {
         alert(e.message)
      }
   }
   console.log("userData**** from chatroom", userData)
   console.log("Friend ID**** from chatroom", userData)

   return (

      <div>
         <div className="right-card" style={{ maxhHeight: "100%" }}>
            <div className="card-header sticky-top" style={{ maxHeight: "10%", background: "#ededed" }}>
               <div className="row">
                  <div className="col-md-1">
                     {friendData &&
                        <img src={friendData.fileUrl} width="41px" className="rounded-circle" alt="" />
                     }
                  </div>
                  <div className="col-md-11">
                     <span className="d-none d-md-block " style={{ position: 'absolute', top: 8, fontWeight: 700, color: "#142e2e" }}>{friendData.fullName}</span>
                  </div>
               </div>
            </div>
            <div style={{ maxHeight: "80%" }}>
               <div className="card-bodyy" style={{ maxHeight: '80%', paddingBottom: 43, paddingLeft: 25, paddingRight: 25, paddingTop: 18 }} >
                  {messages.map(item => {
                     return <div style={{
                        textAlign: userId === item.userId ? 'right' : 'left',
                     }}
                     // key={item.timeStamp}
                     >
                        <p style={{
                           background: userId === item.userId
                              ? 'linear-gradient(to right, #16bffd, #cb3066)'
                              : 'linear-gradient(to right, #eecda3, #ef629f)',
                           color: 'white',
                           display: 'inline',
                           padding: '5px 15px 15px 15px',
                           borderRadius: '7px',
                        }}
                        >
                           {item.message}
                        </p>
                        <p className="pl-1 pr-1" style={{ fontSize: 8.7, color: 'lightgrey', marginTop: -1 }}>
                           {item.timeStamp}
                        </p>
                     </div>
                  })}
               </div>
            </div>

            <div className="card-footerr pb-3" style={{ maxHeight: "8%", position: "fixed", width: "100%", bottom: 0, background: "white" }}>
               <div className="row">
                  <div className="inp" style={{ width: "89%" }}>
                     <input type="text" placeholder="Type Here" className="form-control form-rounded"
                        style={{ border: 'none', backgroundColor: "#ededed", borderRadius: "7px", marginLeft: '4%', border: "2px solid lightgrey" }}
                        onChange={e => setMessage(e.target.value)}
                     />
                  </div>
                  <div className="icon" style={{ width: "9%" }}>
                     <i className="fa fa-send-o" style={{ fontSize: 20, marginTop: 6, marginLeft: "52%" }} onClick={() => sendMessage()} id="button"></i>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
