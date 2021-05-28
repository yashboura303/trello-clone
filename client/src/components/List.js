import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, makeStyles, InputBase, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import Card from './Card'
import InputCard from './InputCard'
import { createNewCard } from '../actions/actionCreators/cardActions'
import midString from '../ordering/ordering'
import AddItem from './AddItem'
import { deleteListById } from '../actions/actionCreators/listActions'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '272px',
    backgroundColor: '#EBECF0',
    marginLeft: theme.spacing(1),
    wordWrap: 'break-word',
  },
  scroll: {
    maxHeight: '500px',
    overflow: 'auto',
    overflowX: 'hidden',
    // overflowY: 'auto',
    margin: 0,
    padding: 0,
    listStyle: 'none',
    height: '100%',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid green',
    },
  },
  title: {
    padding: theme.spacing(1, 1, 1, 1),
    minWidth: '100px',
    marginLeft: theme.spacing(1.5),
    fontWeight: 'bold',
  },
  wrapper: {
    marginTop: theme.spacing(10.3),
  },
  editable: {
    marginLeft: theme.spacing(-1),
    wordWrap: 'break-word',
    padding: theme.spacing(0, 1, 0, 1),
    boxShadow: 'inset 0 0 0 2px #0079bf',
    width: '210px',
    borderRadius: 4,
  },
}))

export default function Column({ column, tasks, index }) {
  const classes = useStyles()
  const [cardTitle, setCardTitle] = useState('')
  const [addCardFlag, setAddCardFlag] = useState(false)
  const [list, setList] = useState(true)
  const [showDelete, setShowDelete] = useState(false)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    e.preventDefault()
    setCardTitle(e.target.value)
  }

  const submitHandler = () => {
    if (cardTitle === '') return
    const text = cardTitle.trim()
    setCardTitle(text)
    const totalTasks = tasks.length
    const postCardReq = {
      name: text,
      boardId: column.boardId,
      listId: column._id,
      order:
        totalTasks === 0 ? 'n' : midString(tasks[totalTasks - 1].order, ''),
    }
    dispatch(createNewCard(postCardReq))
    setCardTitle('')
  }
  const handleAddition = () => {
    setAddCardFlag(true)
  }
  const closeButtonHandler = () => {
    setAddCardFlag(false)
    setCardTitle('')
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      submitHandler()
    }
  }
  const getListStyle = (isDragging) => ({
    background: isDragging ? '#c5c6c9' : '#EBECF0 ',
  })

  return (
    <div className={classes.wrapper}>
      {list && (
        <Draggable draggableId={column._id} index={index}>
          {(provided, snapshot) => (
            <div {...provided.draggableProps} ref={provided.innerRef}>
              <Paper
                elevation={0}
                onMouseEnter={() => setShowDelete(true)}
                onMouseLeave={() => setShowDelete(false)}
                className={classes.root}
                {...provided.dragHandleProps}
                style={getListStyle(snapshot.isDragging)}
              >
                <div className={classes.title}>
                  <div style={{ position: 'relative' }}>
                    <div>{column.name}</div>
                    {showDelete && (
                      <IconButton
                        size="small"
                        style={{
                          right: 0,
                          top: 0,
                          position: 'absolute',
                          backgroundColor: '#EBECF0',
                          zIndex: 100,
                        }}
                        onClick={() => {
                          setList(false)
                          dispatch(deleteListById(column._id))
                        }}
                      >
                        <DeleteIcon
                          fontSize="small"
                          style={{ backgroundColor: '#EBECF0' }}
                        />
                      </IconButton>
                    )}
                  </div>
                </div>
                <Droppable droppableId={column._id} type="card">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <div className={classes.scroll}>
                        {tasks.map((task, index) => (
                          <Card key={task._id} task={task} index={index} />
                        ))}
                        {addCardFlag && (
                          <InputCard
                            value={cardTitle}
                            changedHandler={handleChange}
                            itemAdded={submitHandler}
                            closeHandler={closeButtonHandler}
                            keyDownHandler={handleKeyDown}
                            type="card"
                            btnText="Add Card"
                            placeholder="Enter a title for this card..."
                            width="230px"
                          />
                        )}
                        {provided.placeholder}
                      </div>
                      {!addCardFlag && (
                        <AddItem
                          handleClick={handleAddition}
                          icon={<AddIcon />}
                          btnText="Add another card"
                          color="grey"
                        />
                      )}
                    </div>
                  )}
                </Droppable>
              </Paper>
            </div>
          )}
        </Draggable>
      )}
    </div>
  )
}
