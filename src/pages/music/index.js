import React from 'react'

import Layout from '../../components/Layout'
import MusicRoll from '../../components/MusicRoll'
import YoutubeBackground from 'react-youtube-background'

export default class MusicIndexPage extends React.Component {
  
  render() {
    return (
      <Layout>
        <a target={"_blank"} href={"https://www.youtube.com/watch?v=tjv_8akjVEU"}>
             <YoutubeBackground 
            videoId={'tjv_8akjVEU'}     // default -> "jssO8-5qmag"
            overlay={"rgba(0,0,0,.5)"}       // defaults -> null | e.g. "rgba(0,0,0,.4)"
            
          >
        <div
          className="full-width-image-container margin-top-0"
  
        >
     
            {/* YOUR CONTENT */}
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow: '0.5rem 0 0 #000, -0.5rem 0 0 #000',
              backgroundColor: '#000',
              color: 'white',
              padding: '1rem',
            }}
          >
            Music
          </h1>

        </div>

        </YoutubeBackground>
        </a>

        <section className="section">
          <div className="container">
            <div className="content">
          
              <MusicRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
