import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { StoreState } from "../../redux/store";
import { inProgressSlice  } from "../../redux/slice/inProgressSlice";
import ColumnLayout from "../ColumnLayout";

export function InProgressColumn() {
    const { inProgress } = useSelector((state: StoreState) => state);

    const {
         action :  { completeStatus, remove, add, updateTextShowed },
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
                updateTextShowed={updateTextShowed}
            />
        </>
    )
}