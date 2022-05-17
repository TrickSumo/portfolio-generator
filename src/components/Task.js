import React from 'react'

const Task = ({task,index,deleteTask}) => {
  return (
    <div className='task'>

 <ul key={`${index}-${Date.now()}`}>  {task.text }  <span> <button onClick={() => (deleteTask(task.id))}>❌</button>  </span>
 
 </ul>

    </div>
  )
}

export default Task


// key= {`${index}-${Date.now()}`}