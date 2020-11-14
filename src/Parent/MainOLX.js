import React, {useState} from 'react'
import {Header, ChildHeader, Banner} from './Header'
import HomeAdds from './Home'
import {Footer , FooterEnd} from './footer'

function MainOLX() {
let [filterAds, setFilterAds] = useState("")

  return(
   <div>
    < Header filterAdsMethod={setFilterAds}/>
    < ChildHeader />
    <br />

    < Banner />

    <br />
    <br />
    <br />

    < HomeAdds filterAdsVal={filterAds}/>
    < Footer />
    < FooterEnd />
   </div>
  )
}

export default MainOLX;