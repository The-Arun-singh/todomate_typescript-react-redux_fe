import { Typography } from "@mui/material";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import { StoreState } from "../../redux/store";
import { todoSlice } from '../../redux/slice/todo';
import ColumnLayout from "../ColumnLayout";
import { useSelector } from "react-redux";

export function ToDoColumn() {
    const { todo } = useSelector((state: StoreState) => state);
    const {
        action: {completeStatus, remove, add, updatedTextShowed},
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
                updatedTextShowed={updatedTextShowed}
            />
        </>
    )
}