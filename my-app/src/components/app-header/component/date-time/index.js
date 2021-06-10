import React, { useEffect, useState } from 'react'

import './index.sass'

const DateAndTime = () => {

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    const setDay = (day) => {
        if (day === 0) {
            return 'Sunday'
        }
        if (day === 1) {
            return 'Monday'
        }
        if (day === 2) {
            return 'Tuesday'
        }
        if (day === 3) {
            return 'Wednesday'
        }
        if (day === 4) {
            return 'Thursday'
        }
        if (day === 5) {
            return 'Friday'
        }
        if (day === 6) {
            return 'Saturday'
        }
    }

    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        setInterval(() => {
            let day = setDay(new Date().getDay())
            let date = getZero(new Date().getDate()); //Current Date
            let month = getZero(new Date().getMonth() + 1); //Current Month
            let year = new Date().getFullYear(); //Current Year
            let hours = getZero(new Date().getHours()); //Current Hours
            let min = getZero(new Date().getMinutes()); //Current Minutes
            let sec = getZero(new Date().getSeconds()); //Current Seconds
            setCurrentDate(
                day + ' ' + date + '/' + month + '/' + year
                + ' ' + hours + ':' + min + ':' + sec
            );
        }, 1000)
    }, []);

    if (currentDate.length === 0) {
        return <p className='spinner-date'>...</p>
    }

    return (
        <div className={'Date-Time'}>
            <div className='Time'>
                {currentDate}
            </div>
        </div >
    )
}

export default DateAndTime