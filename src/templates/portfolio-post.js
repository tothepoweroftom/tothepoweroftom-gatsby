import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Img from 'gatsby-image'

export const PortfolioPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  headerimage,
  image,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content
  return (
    <section className="section">
  
      {helmet || ''}
      <div className="container content">
      <div
        className="full-width-image-container margin-top-0"
        style={{
          backgroundImage: `url(${
            !!headerimage.childImageSharp ? headerimage.childImageSharp.fluid.src : headerimage
          })`,
          backgroundPosition: "center"
        }}
      >
      </div>
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                {/* <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul> */}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

PortfolioPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const PortfolioPost = ({ data }) => {
  const { markdownRemark: post } = data
  return (
    <Layout>

      <PortfolioPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Music">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        headerimage={post.frontmatter.headerimage}

      />
    </Layout>
  )
}

PortfolioPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default PortfolioPost

export const pageQuery = graphql`
  query PortfolioPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        headerimage {
          childImageSharp {
            fluid(maxWidth: 2000, quality: 100) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
        tags
      }
    }
  }
`
