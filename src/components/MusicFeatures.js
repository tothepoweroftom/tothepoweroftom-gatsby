import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from './PreviewCompatibleImage'

import SpotifyPlayer from 'react-spotify-player';
const size = {
  width: '100%',
  height: 350,
};
const view = 'list'; // or 'coverart'
const theme = 'white'; // or 'white'


const MusicGrid = ({ gridItems }) => (
  <div className="columns is-multiline">
    {gridItems.map(item => (
      <div key={item.text} className="column is-6">
        <section className="section">
          <div className="has-text-centered full-width-image-container">
            <div
              // style={{
              //   width: '350px',
              //   // display: 'inline-block',
              // }}
            >
              <SpotifyPlayer
                uri={item.uri}
                size={size}
                view={view}
                theme={theme}
              />
            </div>
          </div>
        </section>
      </div>
    ))}
  </div>
)

MusicGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      uri: PropTypes.string,

    })
  ),
}

export default MusicGrid
