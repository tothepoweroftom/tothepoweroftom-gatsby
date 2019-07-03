import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import { Card, Icon, Image } from 'semantic-ui-react'


class MusicRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            <div className="is-parent column is-one-quarter" key={post.id}>
              {/* <article
                className={`blog-list-item tile is-child box notification ${
                  post.frontmatter.featuredpost ? 'is-featured' : ''
                }`}
              >
                <header>
                  {post.frontmatter.featuredimage ? (
                    
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${
                            post.title
                          }`,
                        }}
                      />
                    </div>
                  ) : null}
                  <p className="post-meta">
                    <Link
                      className="title has-text-primary is-size-4"
                      to={post.fields.slug}
                    >
                      {post.frontmatter.title}
                    </Link>
                    <span> &bull; </span>
                    <span className="subtitle is-size-5 is-block">
                      {post.frontmatter.date}
                    </span>
                  </p>
                </header>
                <p>
                  {post.excerpt}
                  <br />
                  <br />
                  <Link className="button" to={post.fields.slug}>
                    Keep Reading →
                  </Link>
                </p>
              </article> */}

              <Card className={`blog-list-item tile is-child box notification ${
                  post.frontmatter.featuredpost ? 'is-featured' : ''
                }`}>
              <Link to={post.fields.slug}>
              {post.frontmatter.featuredimage ? (
                    
                    <div className="featured-album" style={{padding: "0px"}}>
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${
                            post.title
                          }`,
                        }}
                      />
                    </div>
                  ) : null}
                    {/* <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} /> */}
                    <Card.Content>
                      <p className="post-meta">
                          <h4
                            className="album-title has-text-primary "
                            to={post.fields.slug}
                          >
                            {post.frontmatter.title}
                          </h4>
                          <span className="subtitle is-size-10 is-block">
                            {post.frontmatter.date}
                          </span>
                        </p>
                    </Card.Content>
              </Link>

              </Card>
            </div>
          ))}
      </div>
    )
  }
}

MusicRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query MusicRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "music-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <MusicRoll data={data} count={count} />}
  />
)
