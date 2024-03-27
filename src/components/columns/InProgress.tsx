import { Typography } from "@mui/material";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import { StoreState } from "../../redux/store";
import { inProgressSlice } from "../../redux/slice/inProgressSlice";
import ColumnLayout from "../ColumnLayout";
import { useSelector } from "react-redux";

export function InProgressColumn() {
    const { inProgress } = useSelector((state: StoreState) => state);

    const {
         action :  { completeStatus, remove, add, updatedTextShowed },
    } = inProgressSlice;

    return (
        <>
            <Typography mb={3}>All inProgress Task: {inProgress.length}</Typography>
            <ColumnLayout
                droppableId="inProgress"
                labelText="Type 'in Progress' Item"
                completeHandler={completeStatus}
                removeHandler={remove}
                addHandler={add}
                selectorState={inProgress}
                updatedTextShowed={updatedTextShowed}
            />
        </>
    )
}