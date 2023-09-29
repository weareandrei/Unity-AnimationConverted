import React from 'react'
import Notification from './notification'
import {connect} from "react-redux"
import * as actions from "../navigation/action"
import PropTypes from "prop-types"

class NotificationContainer extends React.Component {

    static propTypes = {
        notifications: PropTypes.array.isRequired
    }

    componentDidUpdate(prevProps) {
        if (this.props.notifications !== prevProps.notifications) {
            this.forceUpdate()
        }
    }

    render() {
        const { notifications } = this.props

        return (
            <div>
                {notifications.map((notification) => (
                    <Notification
                        key={notification.id}
                        message={notification.message}
                        severity={notification.severity}
                        id={notification.id}
                    />
                ))}
            </div>
        );

    }

}

export default connect((state) => ({
    notifications: state.application.notifications
}), actions)(NotificationContainer)

