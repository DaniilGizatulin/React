import React, { Component } from 'react';
import Error from '../error';

export default class ErrorBoundry extends Component {
    constructor(props) {
        super(props)
        this.state = { error: false }
    }
    //state = {
    //    error: false
    //}

    static getDerivedStateFromError(error) {
        // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
        return { error: true };
    }

    componentDidCatch() {
        this.setState({ error: true })
        //logErrorToMyService(error, errorInfo);
    }

    render() {
        if (this.state.error) {
            return <Error />
        }

        return this.props.children;
    }
}