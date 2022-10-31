import React, {useEffect, useState} from "react";
import styles from './Clock.module.scss'

export const Clock = (props:any)=>{
    let [date, setState]=useState(new Date())

    useEffect(()=>{
        setTimeout(()=>{
            setState(new Date())

        },1000)
    })

    const get2DigitString = (num:number)=> num < 10? '0'+ num:num

const getMinString = get2DigitString(date.getMinutes())
const getHoursString = get2DigitString(date.getHours())

    return <div className={styles.clockk}>
        <span>{getHoursString}</span>
        :
        <span>{getMinString}</span>

    </div>
}