import React, { FC } from 'react'
import Helmet from 'react-helmet'
import {  graphql } from 'gatsby'

import Layout from '../components/Layout'
import Hero from '../components/sections/Hero'
import Projects from '../components/sections/Projects'
import Blogs from '../components/sections/Blogs'

import PageProps from '../models/PageProps'
import config from '../../config/SiteConfig'

const IndexPage: FC<PageProps> = ({ data }) => {
  const { edges } = data.allMarkdownRemark

  return (
    <Layout>
      <Helmet title={`Homepage | ${config.siteTitle}`} />
      <div className="shadow border-b border-gray-100 relative px-8">
        <div className="max-w-xl m-auto pt-6">
          <Hero />
        </div>
      </div>
      <div className="bg-gray-100 px-8">
        <div className="max-w-xl m-auto py-12">
          <Projects />
          <Blogs edges={edges} />
        </div>
      </div>
    </Layout>
  )
}

export const IndexBlogsQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD.MM.YYYY")
            category
          }
          timeToRead
        }
      }
    }
  }
`

export default IndexPage
