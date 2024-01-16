import React from 'react';
import { Todo } from '../../model';
import './tasklist.css';
import SingleTodo from './SingleTodo';

import { Droppable } from 'react-beautiful-dnd';

interface Props {
  todos: Todo[];
  setOutput: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TaskList: React.FC<Props> = ({
  todos,
  setOutput,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <>
      <div className="container">
        <Droppable droppableId="dropable-1">
          {(provided, snapshot) => (
            <div
              className="todos"
              ref={provided.innerRef}
              style={{
                backgroundColor: snapshot.isDraggingOver
                  ? 'rgb(182, 193, 169)'
                  : 'white',
              }}
              {...provided.droppableProps}
            >
              <span className="todos__heading">Active Tasks</span>
              {todos.map((singleTodo, index) => (
                <SingleTodo
                  index={index}
                  singleTodo={singleTodo}
                  key={singleTodo.id}
                  todos={todos}
                  setOutput={setOutput}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="dropable-2">
          {(provided, snapshot) => (
            <div
              className="todos remove"
              ref={provided.innerRef}
              style={{
                backgroundColor: snapshot.isDraggingOver
                  ? 'rgb(182, 193, 169)'
                  : 'white',
              }}
              {...provided.droppableProps}
            >
              <span className="todos__heading">Completed Tasks</span>
              {completedTodos.map((singleTodo, index) => (
                <SingleTodo
                  index={index}
                  singleTodo={singleTodo}
                  key={singleTodo.id}
                  todos={completedTodos}
                  setOutput={setCompletedTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
};

export default TaskList;
