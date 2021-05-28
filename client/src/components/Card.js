import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Paper, makeStyles, InputBase, IconButton } from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { deleteCardById } from '../actions/actionCreators/cardActions'

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1, 1, 1, 1),
    margin: theme.spacing(1),
    width: '230px',
    wordWrap: 'break-word',
    zIndex: '-100',
    '&:hover': {
      backgroundColor: '#EBECF0',
    },
  },
  delete: {
    position: 'absolute',
    right: 0,
    zIndex: 1000,
    top: 0,
    backgroundColor: '#EBECF0',
  },
  cardImg: {
    width: '100%',
  },
}))

export default function Card({ task, index }) {
  const [card, setCard] = useState(true)
  const [showDelete, setShowDelete] = useState(false)
  const classes = useStyles()
  const dispatch = useDispatch()
  const getListStyle = (isDragging) => ({
    background: isDragging ? '#aeafb0' : '#EBECF0 ',
  })
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {card && (
            <Paper
              className={classes.card}
              onMouseEnter={() => setShowDelete(true)}
              onMouseLeave={() => setShowDelete(false)}
              style={getListStyle(snapshot.isDragging)}
            >
              <div style={{ position: 'relative' }}>
                <div>
                  <img
                    className={classes.cardImg}
                    src="https://picsum.photos/250"
                  />
                </div>
                <div>{task.name}</div>
                {showDelete && (
                  <IconButton
                    className={classes.delete}
                    size="small"
                    onClick={() => {
                      setCard(false)
                      dispatch(deleteCardById(task._id))
                    }}
                  >
                    <DeleteForeverIcon
                      fontSize="small"
                      style={{ backgroundColor: '#EBECF0' }}
                    />
                  </IconButton>
                )}
              </div>
            </Paper>
          )}
        </div>
      )}
    </Draggable>
  )
}
