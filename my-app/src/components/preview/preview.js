import React from 'react';
import { useHistory } from 'react-router';

import './preview.sass';

const Preview = () => {
    const history = useHistory()
    const ready = () => {
        setTimeout(() => history.push(`/list/page${1}/?limit=10&skip=${0}`), 2000)
    }

    document.addEventListener("DOMContentLoaded", ready);

    return (
        <h2 className="preview">Wellcome to : FicusTest</h2>
    )
}

export default Preview;