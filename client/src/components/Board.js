import React, { useEffect, useState, useRef } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import _ from 'lodash'
import { makeStyles, InputBase } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import {
  fetchBoardById,
  fetchListsFromBoard,
  fetchsCardsFromBoard,
} from '../actions/actionCreators/boardActions'
import List from './List'
import midString from '../ordering/ordering'
import { updateCardById } from '../actions/actionCreators/cardActions'
import {
  createNewList,
  updateListById,
} from '../actions/actionCreators/listActions'
import InputCard from './InputCard'
import AddItem from './AddItem'
import Header from './Header'
import BoardHeader from './BoardHeader'
import Background from '../images/pexels-peter-crosby-632075.jpg'
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    overflowY: 'auto',
  },
  listContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: theme.spacing(0.5),
  },
  wrapper: {
    marginTop: theme.spacing(10.3),
  },
  editable: {
    marginLeft: theme.spacing(1),
    height: '38px',
    padding: theme.spacing(0, 1, 0, 1),
    boxShadow: 'inset 0 0 0 2px #0079bf',
    borderRadius: 6,
    backgroundColor: '#EBECF0',
    width: '290px',
    position: 'fixed',
    marginTop: theme.spacing(4.5),
  },
}))

export default function Board() {
  const classes = useStyles()
  let id = '60a1767f743f9023c07be847'
  // var { name } = useParams()
  const { loading, currBoard, error } = useSelector((state) => state.boards)
  const { listLoading, lists } = useSelector((state) => state.lists)
  const { cardLoading, cards } = useSelector((state) => state.cards)
  const [initialData, setInitialData] = useState({})
  const [initDone, setInitDone] = useState(false)
  const addFlag = useRef(true)
  const [addListFlag, setAddListFlag] = useState(false)
  const [listTitle, setListTitle] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (!error) {
      if (id.length === 24) {
        dispatch(fetchBoardById(id))
        dispatch(fetchListsFromBoard(id))
        dispatch(fetchsCardsFromBoard(id))
      }
    }
  }, [dispatch, id, error])

  useEffect(() => {
    if (!listLoading && !cardLoading) {
      const prevState = { tasks: {}, columns: {}, columnOrder: [] }
      const getTaskIds = (id) => {
        const filteredTasks = _.filter(cards, { listId: id })
        const sortedTasks = _.orderBy(filteredTasks, ['order'], ['asc'])
        const taskIds = []
        sortedTasks.forEach((task) => taskIds.push(task._id))
        return taskIds
      }

      const setContent = () => {
        cards.forEach((card) => (prevState.tasks[card._id] = card))
        const sortedLists = _.orderBy(lists, ['order'], ['asc'])
        sortedLists.forEach((list) => {
          prevState.columns[list._id] = {
            ...list,
            taskIds: getTaskIds(list._id),
          }
          prevState.columnOrder.push(list._id)
        })
      }
      setContent()
      setInitialData({ ...prevState })
      setInitDone(true)
    }
  }, [setInitDone, listLoading, cardLoading, setInitialData, cards, lists])

  const onDragEnd = (result) => {
    let newOrder
    const { destination, source, draggableId, type } = result
    if (!destination) return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

    if (type === 'list') {
      const listOrder = initialData.columnOrder
      if (destination.index === 0) {
        newOrder = midString('', initialData.columns[listOrder[0]].order)
      } else if (destination.index === listOrder.length - 1) {
        newOrder = midString(
          initialData.columns[listOrder[destination.index]].order,
          '',
        )
      } else if (destination.index < source.index) {
        newOrder = midString(
          initialData.columns[listOrder[destination.index - 1]].order,
          initialData.columns[listOrder[destination.index]].order,
        )
      } else {
        newOrder = midString(
          initialData.columns[listOrder[destination.index]].order,
          initialData.columns[listOrder[destination.index + 1]].order,
        )
      }
      dispatch(updateListById(draggableId, { order: newOrder }))
      const newListOrder = Array.from(initialData.columnOrder)
      const destinationColumn = initialData.columns[draggableId]
      destinationColumn.order = newOrder
      newListOrder.splice(source.index, 1)
      newListOrder.splice(destination.index, 0, draggableId)
      const newData = {
        ...initialData,
        columnOrder: newListOrder,
        columns: {
          ...initialData.columns,
          draggableId: destinationColumn,
        },
      }
      setInitialData(newData)
      return
    }
    const startList = initialData.columns[source.droppableId]
    const endList = initialData.columns[destination.droppableId]

    if (startList === endList) {
      const column = startList
      if (destination.index === 0)
        newOrder = midString('', initialData.tasks[column.taskIds[0]].order)
      else if (destination.index === column.taskIds.length - 1)
        newOrder = midString(
          initialData.tasks[column.taskIds[destination.index]].order,
          '',
        )
      else if (destination.index < source.index)
        newOrder = midString(
          initialData.tasks[column.taskIds[destination.index - 1]].order,
          initialData.tasks[column.taskIds[destination.index]].order,
        )
      else
        newOrder = midString(
          initialData.tasks[column.taskIds[destination.index]].order,
          initialData.tasks[column.taskIds[destination.index + 1]].order,
        )

      dispatch(updateCardById(draggableId, { order: newOrder }))
      const newTaskIds = Array.from(column.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)
      const destinationTask = initialData.tasks[draggableId]
      destinationTask.order = newOrder
      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      }
      const newData = {
        ...initialData,
        columns: {
          ...initialData.columns,
          [newColumn._id]: newColumn,
        },
        tasks: {
          ...initialData.tasks,
          draggableId: destinationTask,
        },
      }
      setInitialData(newData)
      return
    }

    // Move from one list to another
    if (endList.taskIds.length === 0) newOrder = 'n'
    else if (destination.index === 0) {
      newOrder = midString('', initialData.tasks[endList.taskIds[0]].order)
    } else if (destination.index === endList.taskIds.length)
      newOrder = midString(
        initialData.tasks[endList.taskIds[destination.index - 1]].order,
        '',
      )
    else
      newOrder = midString(
        initialData.tasks[endList.taskIds[destination.index - 1]].order,
        initialData.tasks[endList.taskIds[destination.index]].order,
      )
    dispatch(
      updateCardById(draggableId, { order: newOrder, listId: endList._id }),
    )

    const startTaskIds = Array.from(startList.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStartList = {
      ...startList,
      taskIds: startTaskIds,
    }
    const destinationTask = initialData.tasks[draggableId]
    destinationTask.order = newOrder
    const endTaskIds = Array.from(endList.taskIds)
    endTaskIds.splice(destination.index, 0, draggableId)
    const newEndList = {
      ...endList,
      taskIds: endTaskIds,
    }
    const newData = {
      ...initialData,
      columns: {
        ...initialData.columns,
        [newStartList._id]: newStartList,
        [newEndList._id]: newEndList,
      },
      tasks: {
        ...initialData.tasks,
        draggableId: destinationTask,
      },
    }
    setInitialData(newData)
  }

  const handleChange = (e) => {
    e.preventDefault()
    setListTitle(e.target.value)
  }

  const submitHandler = () => {
    if (listTitle === '') return
    const text = listTitle.trim().replace(/\s+/g, ' ')
    if (text === '') {
      setListTitle(listTitle)
      return
    }
    const totalLists = initialData.columnOrder.length
    const postListReq = {
      name: text,
      boardId: currBoard._id,
      order:
        totalLists === 0
          ? 'n'
          : midString(
              initialData.columns[initialData.columnOrder[totalLists - 1]]
                .order,
              '',
            ),
    }
    dispatch(createNewList(postListReq))
    setListTitle('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      submitHandler()
    }
  }

  const closeButtonHandler = () => {
    setAddListFlag(false)
    addFlag.current = true
    setListTitle('')
  }

  const handleAddition = () => {
    setAddListFlag(true)
    addFlag.current = false
  }

  return (
    <>
      <div
        className={classes.root}
        style={{
          background: `linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)),url(${Background})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Header loggedIn />

        <BoardHeader title={currBoard.name} />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="list"
          >
            {(provided) => (
              <div
                className={classes.listContainer}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {initDone &&
                  initialData.columnOrder.map((columnId, index) => {
                    const column = initialData.columns[columnId]
                    const tasks = column.taskIds.map(
                      (taskId) => initialData.tasks[taskId],
                    )
                    return (
                      <List
                        key={column._id}
                        column={column}
                        tasks={tasks}
                        index={index}
                      />
                    )
                  })}
                {provided.placeholder}
                <div className={classes.wrapper}>
                  {addFlag.current && (
                    <AddItem
                      handleClick={handleAddition}
                      btnText="Add another list"
                      icon={<AddIcon />}
                      color="white"
                    />
                  )}
                  {addListFlag && (
                    <InputCard
                      value={listTitle}
                      changedHandler={handleChange}
                      itemAdded={submitHandler}
                      closeHandler={closeButtonHandler}
                      keyDownHandler={handleKeyDown}
                      type="list"
                      btnText="Add List"
                      placeholder="Enter list title..."
                      width="230px"
                      marginLeft="1"
                    />
                  )}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  )
}
