import React, { useState } from 'react'
import { Header, ChildHeader, Banner } from '../header/Header'
import HomeAdds from '../home/Home'
import { Footer, FooterEnd } from '../footer/footer'

function MainOLX() {
  let [filterAds, setFilterAds] = useState("")

  return (
    <div>
      < Header filterAdsMethod={setFilterAds} />
      < ChildHeader />
      <br />

      < Banner />

      <br />
      <br />
      <br />

      < HomeAdds filterAdsVal={filterAds} />
      < Footer />
      < FooterEnd />
    </div>
  )
}

export default MainOLX;