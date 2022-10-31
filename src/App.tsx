import React, {useEffect, useState} from 'react';
import styles from './App.module.scss';
import ipadHorisontal from './images/ipad-mini-horizontal.png'
import ipadVertical from './images/ipad-mini-vertifical.png'
import iphoneHorizontal from './images/iphone5-horizontal.png'
import iphoneVertical from './images/iphone5-vertical.png'
import {restoreState, saveState} from "./LocalStorageForComponent";
import {Clock} from "./Components/Clock";
import {arrApl, arrApl2, arrApl3, arrApl4, arrayForFooter} from "./Components/Array";
import {FirstPage} from "./Components/FirstPage";


export type AppListType = {
    id: string,
    name: string,
    thumb: string
}

function App() {
    let [arrList, setArrList] = useState<Array<AppListType>>(arrApl)
    let [nameList, setNameList] = useState('arrApl')

    const [element, setElement] = useState<any>()
    useEffect(() => {
        const listEl = document.getElementById('list')
        if (listEl) {
            setElement(listEl)
        }
        restoreState1()
    }, [])
    const list: any = {
        arrApl,
        arrApl2,
        arrApl3,
        arrApl4
    }
    useEffect(() => {
        restoreState1()
    }, [nameList])

    function restoreState1() {
        let page = restoreState('page', 'arrApl');
        let stateFromLocalStorage1 = restoreState(page, list[page]);
        setArrList(stateFromLocalStorage1)
    }


    const handleClick = (nameList: string) => {
        let state = restoreState(nameList, list[nameList as any]);
        setNameList(nameList)
        setArrList(state)
        saveState('page', nameList)
    }

    return (
        <div className={styles.App}>
            <div className={styles.deviceWrapper}>
                <img src={ipadHorisontal} className={styles.ipadHorisontal}/>
                <img src={ipadVertical} className={styles.ipadVertical}/>
                <img src={iphoneHorizontal} className={styles.iphoneHorizontal}/>
                <img src={iphoneVertical} className={styles.iphoneVertical}/>
                <div className={`${styles.screenWrapper}`}>
                    <div className={styles.clock}>
                        <Clock/>
                    </div>
                    <FirstPage arrApl={arrList} nameList={nameList} setArrList={setArrList}/>
                    <div className={styles.pagination}>
                        <span onClick={() => handleClick('arrApl')}></span>
                        <span onClick={() => handleClick('arrApl2')}></span>
                        <span onClick={() => handleClick('arrApl3')}></span>
                        <span onClick={() => handleClick('arrApl4')}></span>
                    </div>
                    <div className={styles.footer}>
                        {arrayForFooter.map(el => {
                            return <img className={styles.FooterAplications} alt={el.name}
                                        src={require(`./images/icons/${el.thumb}`)}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

