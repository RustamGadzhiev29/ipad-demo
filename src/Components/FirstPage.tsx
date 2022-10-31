import React, {useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import styles from "../App.module.scss";
import {saveState} from "../LocalStorageForComponent";
import Modal from 'react-modal'
import {AppListType} from "../App";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
type FirstPageType ={
    setArrList:(items:any)=>void
    arrApl:Array<AppListType>
    nameList:string
}

export const FirstPage = (props: FirstPageType) => {

    let [open, setIsOpen] = useState(false)
    const [modalIsOpen, setIsOpen2] = React.useState(false);

    function closeModal() {
        setIsOpen2(false);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        setTimeout(() => {
            setIsOpen2(false)
        }, 2000)
    }

    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return
        const items = Array.from(props.arrApl)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        props.setArrList(items)
        saveState1(items)
    }
    /////////*********LOCAL STARAGE***********/////////////
    const saveState1 = (items:Array<AppListType>) => {
        saveState(props.nameList, items)
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='screen'>
                {(provided) => (
                    <div className={styles.screenBlock}>
                        <div id={'list'} className={styles.screen}
                             {...provided.droppableProps} ref={provided.innerRef}>

                            {props.arrApl.map((el: any, index: number) =>
                                <Draggable key={el.id} draggableId={el.id} index={index}>
                                    {(provided) => (
                                        <div {...provided.draggableProps}
                                             {...provided.dragHandleProps}
                                             ref={provided.innerRef}
                                             className={styles.iconsNew}
                                        >
                                            <img key={el.id} onClick={() => {
                                                setIsOpen(el.thumb)
                                                setIsOpen2(true)
                                            }}
                                                 className={styles.Applicons} alt={el.name}
                                                 src={require(`./../images/icons/${el.thumb}`)}/>
                                            <p className={styles.appName}>{el.thumb.slice(0, -4)}</p>


                                        </div>
                                    )}
                                </Draggable>
                            )}
                            <Modal
                                isOpen={modalIsOpen}
                                onAfterOpen={afterOpenModal}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >

                                <div className={styles.info}>{open}</div>

                            </Modal>
                        </div>

                    </div>

                )}

            </Droppable>
        </DragDropContext>
    )
}
