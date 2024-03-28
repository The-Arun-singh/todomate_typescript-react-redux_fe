import { useSelector } from "react-redux";
import { StoreState } from "../../redux/store";
import { Typography } from "@mui/material";
import { todoSlice } from '../../redux/slice/todo';
import ColumnLayout from "../ColumnLayout";

export function ToDoColumn() {
    const { todo } = useSelector((state: StoreState) => state);
    const {
        action: {completeStatus, remove, add, updateTextShowed},
    } = todoSlice;

    return (
        <>
            <Typography mb={3}>All Todo Tasks: { todo.length }</Typography>
            <ColumnLayout
                droppableId="todo"
                labelText="Type 'to do' item"
                completeHandler={completeStatus}
                removeHandler={remove}
                addHandler={add}
                selectorState={todo}
                updateTextShowed={updateTextShowed}
            />
        </>
    )
}