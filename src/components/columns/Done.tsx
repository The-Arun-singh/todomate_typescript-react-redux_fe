import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { StoreState } from "../../redux/store";
import { doneSlice } from "../../redux/slice/done";
import ColumnLayout from "../ColumnLayout";

export function DoneColumn() {
    const { done } = useSelector((state: StoreState) => state);
    const {
        action: { completeStatus, remove, add, updateTextShowed },
    } = doneSlice;

    return (
        <>
            <Typography mb={3}>All Done Tasks: {done.length}</Typography>
            <ColumnLayout 
                droppableId="done"
                labelText="Type 'Done' Item"
                completeHandler={completeStatus}
                removeHandler={remove}
                addHandler={add}
                selectorState={done}
                updateTextShowed={updateTextShowed} 
            />
        </>
    )
}