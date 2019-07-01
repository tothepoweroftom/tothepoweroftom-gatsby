import React from 'react'
import PropTypes from 'prop-types'
import { MusicPageTemplate } from '../../templates/music-page'

const MusicPagePreview = ({ entry, getAsset }) => {
  const entryBlurbs = entry.getIn(['data', 'intro', 'blurbs'])
  const blurbs = entryBlurbs ? entryBlurbs.toJS() : []
  const lhommemoyenAlbums = entry.getIn(['data', 'lhommemoyen', 'albums'])
  const albumsLhomme = lhommemoyenAlbums ? lhommemoyenAlbums.toJS() : []
  const entryTestimonials = entry.getIn(['data', 'testimonials'])
  const testimonials = entryTestimonials ? entryTestimonials.toJS() : []

  const entryPricingPlans = entry.getIn(['data', 'pricing', 'plans'])
  const pricingPlans = entryPricingPlans ? entryPricingPlans.toJS() : []

  return (
    <MusicPageTemplate
      image={entry.getIn(['data', 'image'])}
      title={entry.getIn(['data', 'title'])}
      lhommemoyen = {albumsLhomme}
    />
  )
}

MusicPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default MusicPagePreview
