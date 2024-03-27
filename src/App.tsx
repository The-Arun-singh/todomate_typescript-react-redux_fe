import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { ToDoColumn } from "./components/columns/ToDo";
import { InProgressColumn } from "./components/columns/InProgress";
import { DoneColumn } from "./components/columns/Done";

function App() {
  return (
    <Container>
      <Typography
        textAlign='center'
        variant="h3"
        mt={3}
        mb={5}
      >
        This App is created with typescript, React and Redux.
      </Typography>
      <Grid container spacing={3} justifyContent='center'>
        <Grid item md={4}>
          <ToDoColumn />
        </Grid>
        <Grid item md={4}>
          <InProgressColumn />
        </Grid>
        <Grid item md={4}>
          <DoneColumn />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
