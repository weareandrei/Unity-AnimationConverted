/* eslint-disable max-lines */
import React from 'react'
import PropTypes from 'prop-types'
import * as actions from './action'
import {connect} from 'react-redux'
import get from 'lodash/get'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import NotificationContainer from '../util/notificationContainer'
import {AppBar} from "@mui/material"

class Navigation extends React.Component {

    static propTypes = {
        currentPage: PropTypes.string,
        isMobile: PropTypes.bool.isRequired,
        navigateToPage: PropTypes.func.isRequired
    }

    static defaultProps = {
        currentPage: 'Main'
    }

    componentDidMount() {
        // TODO : highlight active nav button
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('component update')
        if (prevProps !== this.props) {
            console.log('change height calc')
            this.props.changeNavHeight(this.calculateNavHeight())
        }
    }

    render() {
        return this.renderNavigation()
    }

    renderNavigation = () =>
        <AppBar style={style.navigationContainer} id="navigationBar">
            <NotificationContainer/>

            <Grid
                container
                alignItems="center"
                style={style.headerContainer(this.props)}>

                {this.renderMenu()}
            </Grid>
        </AppBar>

    renderMenu = () => (
        <Stack direction="row" spacing={2}>
            <Button
                variant="outlined"
                style={style.headerButton}
                onClick={() => this.props.navigateToPage("Main")}>
                Main Page
            </Button>
            <Button
                variant="outlined"
                style={style.headerButton}
                onClick={() => this.props.navigateToPage("SpriteSheet")}>
                SpriteSheet Animation
            </Button>
        </Stack>
    )

}

const style = {
    navigationContainer: {
        position: 'fixed',
        zIndex: 1000,
        width: '100%'
    },
    headerContainer: ({isMobile}) =>
        isMobile ? {
            ...headerContainer,
            height: '50px'
        } : headerContainer,
    headerButton: {
        color: '#fff'
    }
}

const headerContainer = {
    width: '100%',
    height: '64px',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '8px',
    background: '#3f50b5'
}

export default connect((state) => ({
    currentPage: get(state.application, 'currentPage', 'Main'),
    isMobile: false
}), actions)(Navigation)
