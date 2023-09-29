/* eslint-disable max-len,max-lines-per-function */
import Helmet from 'react-helmet/lib/Helmet'
import React from 'react'

const Head = () =>
    <Helmet>
        <title>Fairmart - Boost Foot Traffic to Your Retail Store</title>
        <meta name='theme-color'
              content='#4854a2'/>
        <meta name='application-name'
              content='Fairmart'/>
        <meta property='og:site_name'
              content='Fairmart'/>

        <meta name='google-site-verification'
              content='xmAv2qd06wZKcOok5yXNtkcW_BJAINXIqy793AjTfBI'/>
        <meta name='msapplication-config'
              content='https://admin201046-dev.s3.ap-southeast-2.amazonaws.com/static/image/browserconfig.xml'/>

        <meta property='og:locale'
              content='en_US'/>

        <meta content='Fairmart lists your products online instantly and gives your customers the ability to preorder from your store.'
              name='description'/>
        <meta content='Fairmart'
              property='og:title'/>

        <meta content='Fairmart lists your products online instantly and gives your customers the ability to preorder from your store.'
              property='og:description'/>
        <meta content='https://www.fairmart.app/'
              property='og:url'/>
        <meta content='https://uploads-ssl.webflow.com/5f28e1101f617e35864eeda8/5f4888677c762925ae9365ca_favicon-256x256.png'
              property='og:image'/>

        <meta property='og:type'
              content='website'/>

        <meta content='Fairmart - Boost Foot Traffic to Your Retail Store'
              property='twitter:title'/>
        <meta content='Fairmart lists your products online instantly and gives your customers the ability to preorder from your store.'
              property='twitter:description'/>
        <meta content='https://uploads-ssl.webflow.com/5f28e1101f617e35864eeda8/5f4888677c762925ae9365ca_favicon-256x256.png'
              property='twitter:image'/>
        <meta content='summary_large_image'
              name='twitter:card'/>
        {/*whatsapp image*/}
        <meta property='og:image'
              content='https://uploads-ssl.webflow.com/5f28e1101f617e35864eeda8/5f4888677c762925ae9365ca_favicon-256x256.png'/>
        <meta property='og:image:type'
              content='image/png'/>
        <meta property='og:image:width'
              content='256'/>
        <meta property='og:image:height'
              content='256'/>

        {/*favicon*/}
        <link rel='apple-touch-icon'
              sizes='180x180'
              href='https://admin201046-dev.s3.ap-southeast-2.amazonaws.com/static/image/apple-touch-icon.png'/>
        <link rel='shortcut icon'
              type='image/x-icon'
              href='https://admin201046-dev.s3.ap-southeast-2.amazonaws.com/static/image/favicon.ico'/>
        <link rel='shortcut icon'
              type='image/png'
              sizes='32x32'
              href='https://admin201046-dev.s3.ap-southeast-2.amazonaws.com/static/image/favicon-32x32.png'/>
        <link rel='shortcut icon'
              type='image/png'
              sizes='16x16'
              href='https://admin201046-dev.s3.ap-southeast-2.amazonaws.com/static/image/favicon-16x16.png'/>

        <link rel='canonical'
              href={window.location.href}/>
    </Helmet>

export default Head
