import React, { useState } from 'react';
import { Button, Icon } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useDispatch } from 'react-redux';
import { StoreDispatch } from '../redux/store';
import { IColumnLayoutProps } from '../types';

const ColumnLayout: React.FC<IColumnLayoutProps> = ({
    labelText,
    addHandler,
    removeHandler,
    completeHandler,
    selectorState,
    droppableId
}) => {
    const [isError, setIsError ] = useState({
        isShow: false,
        text: ''
    })
    const [textDescription, setTextDescription] = useState('')
    const dispatch = useDispatch<StoreDispatch>();

    const handleOnChange = ({ target: {value}, } : React.ChangeEvent<HTMLInputElement>) => {
        setTextDescription(value);
        setIsError({
            isShow: value.length > 200,
            text: value.length > 200 ? "The Input value cannot be more than 200 characters" : ''
        });
    };

    const handleOnBlur = () => {
        setIsError({ ...isError, isShow: false });
    }

    const handleOnClick = () => {
        if (!isError) {
            dispatch(addHandler(textDescription));
            setTextDescription("")
        }
    };

    const handleInputKeyDown = ({target, key,} : React.KeyboardEvent<HTMLInputElement>) => {
        if (key === 'Enter') {
            if ((target as HTMLInputElement).value.length > 0 && 
            (target as HTMLInputElement).value.length <= 200) {
                handleOnClick();
            } else {
                setIsError({
                    isShow: true,
                    text: 'The Input balue cannot be Empty'
                })
            }
        }
    }

    return (
        <Box borderRadius={1} width='100%' sx={{ boxShadow: 2, p: 3}}>
            <TextField 
                fullWidth
                label={labelText}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                onKeyDown={handleInputKeyDown}
                value={textDescription}
                variant='outlined'
                size='small'
            />

            <Collapse in={isError.isShow}>
                <Alert severity='error' sx={{my : 1}}>
                    {isError.text}
                </Alert>
            </Collapse>

            <Box width='100%' display="flex"  justifyContent='center'>
                <Button
                    size='medium'
                    sx={{ my: 1 ,  maxWidth: 200}}
                    variant='outlined'
                    color="primary"
                    fullWidth
                    onClick={handleOnClick}
                    disabled={
                        textDescription.length === 0 || textDescription.length > 200
                    }
                >
                    Add Item
                </Button>
            </Box>

            <List sx={{ minHeight: '300px'}} >
                {selectorState.map(
                    ({id, text, isFinished, createdAt, updatedAt }, index: number) => {
                        return (
                            <ListItem
                                sx={{
                                    position: 'relative',
                                    border: '1px solid #989898',
                                    bgcolor: '#fff',
                                    my: 1,
                                    borderRadius: '3px',
                                    '& .MuiTypography-root': {
                                        display: 'flex',
                                        alignItems: 'center',
                                    },
                                }}
                            >
                                <IconButton sx={{ p: 1, mr:1}}>
                                    <ArrowDownwardIcon />
                                </IconButton>

                                <Box
                                    component='span'
                                    width='100%'
                                    position='absolute'
                                    top='0'
                                    fontSize='.7rem'
                                >
                                    {updatedAt ? 'Updated' : 'CreatedAt'} at: {' '} {updatedAt || createdAt}
                                </Box>

                                <Box component='span' width='100%'>
                                    {text}
                                </Box>

                                <Box display='flex' component='span'>
                                    <IconButton onClick={() => dispatch(removeHandler(id))}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <Checkbox 
                                        edge='end'
                                        value={isFinished}
                                        checked={isFinished}
                                        inputProps={{ 'aria-label': "controlled"}}
                                        onChange={() => dispatch(
                                            completeHandler({
                                                isFinished: !isFinished,
                                                id,
                                                createdAt: new Date().toLocaleDateString(),
                                                updatedAt: new Date().toLocaleDateString(),
                                            })
                                        )}
                                    />
                                </Box>
                            </ListItem>
                        )
                    })}
            </List>
        </Box>
    )
}

export default ColumnLayout;