import React from 'react'
import Task from './Task'

const ShowTasks = ({tasks, deleteTask}) => {
  return (
    <div>

        {tasks.map((task,index)=> <Task task={task} key={index} deleteTask={deleteTask} />) }


        

    </div>
  )
}

export default ShowTasks