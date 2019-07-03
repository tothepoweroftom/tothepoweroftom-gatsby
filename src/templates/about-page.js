import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import SpotifyFollows from '../components/SpotifyFollow'
import Img from 'gatsby-image'
import GitHubButton from 'react-github-btn'

export const AboutPageTemplate = ({ title, image, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-8 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <PageContent className="content" content={content} />
             
            </div>
          </div>
          <div className="column is-2" style={{paddingTop:"120px"}}>

          {/* <img src={"/img/lhommemoyen.jpg"}  ></img> */}
          <SpotifyFollows url={"https://open.spotify.com/follow/1/?uri=spotify:artist:6Bp6VKHxaWKD4fE7kZzSLN&size=detail&theme=dark"}></SpotifyFollows>
          <SpotifyFollows url={"https://open.spotify.com/follow/1/?uri=spotify:artist:6fSktQPfbhoRyhAs5RzVF8&size=detail&theme=dark"}></SpotifyFollows>

          <GitHubButton href="https://github.com/tothepoweroftom" data-size="large" aria-label="Follow @tothepoweroftom on GitHub">Follow @tothepoweroftom</GitHubButton>
          </div>
        </div>
      </div>
    </section>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        image={post.frontmatter.image}
        content={post.html}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
