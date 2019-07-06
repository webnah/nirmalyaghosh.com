import * as React from 'react'
import styled from '@emotion/styled'

const StyledFooterSection = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #030d1f;
  color: #a8b2d1;
  padding: 20px;
  font-size: 14px;
  font-weight: lighter;

  a {
    color: #03a9f4;
    text-decoration: none;

    &:hover {
      color: #65cfff;
    }
  }
`

const FooterSection: React.FC = () => (
  <StyledFooterSection>
    <p>
      Designed &amp; developed by{' '}
      <a href="https://github.com/ghoshnirmalya/nirmalyaghosh.com/" rel="noopener noreferrer" target="_blank">
        Nirmalya Ghosh
      </a>
    </p>
  </StyledFooterSection>
)

export default FooterSection
