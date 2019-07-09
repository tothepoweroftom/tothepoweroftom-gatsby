import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import StackGrid, { transitions, easings } from 'react-stack-grid';
import { Card, Icon, Image } from 'semantic-ui-react'


const transition = transitions.scaleDown;



class PortfolioRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="">
          <StackGrid
            monitorImagesLoaded
            columnWidth={350}
            duration={200}
            gutterWidth={10}
            gutterHeight={10}
            easing={easings.cubicOut}
            appearDelay={100}
            appear={transition.appear}
            appeared={transition.appeared}
            enter={transition.enter}
            entered={transition.entered}
            leaved={transition.leaved}
          >
        {posts &&
          posts.map(({ node: post }) => (
            
            <div key={post.id} className={`blog-list-item tile is-child box notification ${
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
                  ) : console.log(post)}
                    {/* <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} /> */}
                    <Card.Content>
                      <div className="post-meta">
                          <h3
                            className="album-title has-text-primary "
                            to={post.fields.slug}
                          >
                            {post.frontmatter.title}
                          </h3>
                          {/* <span className="subtitle is-size-10 is-block">
                            {post.frontmatter.date}
                          </span> */}
                        </div>
                    </Card.Content>
              </Link>

          </div>
          ))
        }
        </StackGrid>
      </div>
    )
  }
}

PortfolioRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query PortfolioRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "portfolio-post" } } }
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
                    fluid(maxWidth: 300, quality: 100) {
                      ...GatsbyImageSharpFluid_tracedSVG
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <PortfolioRoll data={data} count={count} />}
  />
)
