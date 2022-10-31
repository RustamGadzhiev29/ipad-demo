import React, {useState} from "react";
import styles from "./Footer.module.scss";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {arrayForFooter} from "./Array";

export const Footer = ()=>{
    const [footerList, setfooterList] = useState<Array<any>>(arrayForFooter)
    const items = Array.from(footerList)
    const handleOnDragEnd = (result:any) => {
        if (!result.destination) return
        // const items = Array.from(iconsList)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        setfooterList(items)
        // saveState1()
    }
    return (
            <div>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId='footer'>
                            {(provided) => (
                                    <div
                                         {...provided.droppableProps} ref={provided.innerRef}>
                                        {footerList.map((el, index) =>
                                            <Draggable key={el.id} draggableId={el.id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        className={styles.footer}                                                        {...provided.draggableProps}
                                                         {...provided.dragHandleProps}
                                                         ref={provided.innerRef}>
                                                        <img alt={el.name} className={styles.applications}
                                                             src={require(`./../images/icons/${el.thumb}`)}/>
                                                    </div>
                                                )}
                                            </Draggable>
                                        )}
                                    </div>

                            )}
                        </Droppable>
                    </DragDropContext>

                </div>



    )
}