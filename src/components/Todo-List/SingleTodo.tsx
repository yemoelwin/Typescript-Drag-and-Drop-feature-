import React, { useEffect, useRef, useState } from 'react';
import { CiEdit } from 'react-icons/ci';

import { MdDeleteForever, MdDone } from 'react-icons/md';

import { Todo } from '../../model';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  index: number;
  singleTodo: Todo;
  todos: Todo[];
  setOutput: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ index, singleTodo, todos, setOutput }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);

  const [editTodo, setEditTodo] = useState<string>(singleTodo.task);

  const handleDone = (id: number) => {
    setOutput(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setOutput(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setOutput(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task: editTodo } : todo,
      ),
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={singleTodo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
          onSubmit={(e) => handleEdit(e, singleTodo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single__text"
            />
          ) : (
            <div>
              {singleTodo.isDone ? (
                <s className="todos__single__text" style={{ color: 'pink' }}>
                  {singleTodo.task}
                </s>
              ) : (
                <span
                  className="todos__single__text"
                  style={{ color: 'white' }}
                >
                  {singleTodo.task}
                </span>
              )}
            </div>
          )}

          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !singleTodo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <CiEdit />
            </span>
            <span className="icon">
              <MdDeleteForever onClick={() => handleDelete(singleTodo.id)} />
            </span>
            <span className="icon">
              <MdDone onClick={() => handleDone(singleTodo.id)} />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
