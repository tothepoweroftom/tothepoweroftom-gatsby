import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

const Iframe = ({ url }) => (
  <div>
        <iframe src={url} height={"56"} width={"300"} scrolling={"no"} frameBorder={"0"} style={{border:"none", overflow:"hidden"}} allowtransparency={"true"}/>         
  </div>
)

Iframe.propTypes = {

      url: PropTypes.string,
 

}

export default Iframe
