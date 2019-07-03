import React from 'react'

import Layout from '../../components/Layout'
import MusicRoll from '../../components/MusicRoll'

export default class MusicIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
  
        >
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
