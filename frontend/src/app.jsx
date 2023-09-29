import React from 'react'
import {connect, Provider} from 'react-redux'
import {CookiesProvider} from 'react-cookie/lib'
import {PersistGate} from 'redux-persist/integration/react'
import {persistor} from './core/combinedReducer'
import PropTypes from 'prop-types'
import loadable from "@loadable/component"
import get from 'lodash/get'

import * as actions from './action'

import Head from './core/head'
import Navigation from "./navigation/navigation"
import SpritesheetPage from "./spritesheet/spritesheet"
import Main from "./main/main"

const Footer = loadable(() => import(/*webpackChunkName: "order"*/'./core/footer'))

class App extends React.Component {

    static propTypes = {
        store: PropTypes.object.isRequired,
        currentPage: PropTypes.string.isRequired,
        navigationHeight: PropTypes.number.isRequired
    }

    static defaultProps = {}

    componentDidUpdate(prevProps) {
        if (this.props.currentPage !== prevProps.currentPage) {
            this.forceUpdate()
        }
    }

    render() {
        return (
            <CookiesProvider>
                {this.renderProvider()}
            </CookiesProvider>
        )
    }

    renderProvider = () =>
        <Provider store={this.props.store}>
            <PersistGate loading={null} persistor={persistor}>
                <React.Suspense fallback={<div />}>
                    {this.renderApp()}
                </React.Suspense>
            </PersistGate>
        </Provider>

    renderApp = () => (
        <div style={style.container}>
            <Head/>

            <Navigation/>

            <div style={style.mainContainer(this.props)}>
                {this.renderPage(this.props.currentPage)}
            </div>

            <Footer/>
        </div>
    )

    renderPage = (currentPage) => {
        switch (currentPage) {
            case 'Main':
                return <Main/>
            case 'SpriteSheet':
                return <SpritesheetPage/>
            default:
                return null
        }
    }


}

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

const style = {
    container: {
        background: '#fff'
    },
    mainContainer: ({navigationHeight}) => ({
        minHeight: isMobile() ? '3220px' : '800px',
        paddingTop: navigationHeight
    })
}

export default connect((state) => ({
    currentPage: state.navigationReducer.currentPage,
    navigationHeight: get(state.navigationReducer, 'navigationHeight', 0)
}), actions)(App)
