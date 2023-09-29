import React from 'react'
import PropTypes from "prop-types"
import colours from '../common/colours'
import * as actions from './action'
import {connect} from "react-redux"

class Notification extends React.Component {

    static propTypes = {
        message: PropTypes.string.isRequired,
        severity: PropTypes.string.isRequired,
        updateNavHeight: PropTypes.func.isRequired
    }

    state = {
        visible: true
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({visible: false})
            this.props.updateNavHeight()
        }, 5000)

        this.props.updateNavHeight()
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    render() {
        return this.state.visible ? (
            <div style={messageStyle(true, this.props.severity)}>
                {this.props.message}
            </div>
        ) : null
    }

}

const messageStyle = (isVisible, severity) => ({
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: severity === 'error' ? colours.secondary.main : 'orange',
    color: '@fff',
    padding: '6px',
    textAlign: 'center',
    transition: 'transform 0.3s ease-in-out',
    visibility: isVisible ? 'visible' : 'hidden'
    // transform: isVisible ?
    //     'translateY(0)' : 'translateY(-100%)',
})

export default connect((state) => ({
}), actions)(Notification)