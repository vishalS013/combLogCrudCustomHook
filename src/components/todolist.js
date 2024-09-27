import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deletetask, updateTask } from '../feautures/todoSlice'; 
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Modal } from '@mui/material';
import '../index.css';
import useCounter from '../contexts/authContext/UseCounter';


const TodoList = () => {
  const [inputValue, setInputValue] = useState('');
  const [edit, setEdit] = useState(null);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const todos = useSelector((state) => state.todos.todos); 
  const deletedTodos = useSelector((state) => state.todos.deletedTodos);
  const { count, increment, decrement, reset } = useCounter(0);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      dispatch(updateTask({ id: edit, text: inputValue }));
      setEdit(null);
    } else {
      dispatch(addTask({ id: Date.now(), text: inputValue }));
    }
    setInputValue('');
  };

  const handleEdit = (todo) => {
    setInputValue(todo.text);
    setEdit(todo.id);
  };

  const openModal = (id) => {
    setTodoToDelete(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTodoToDelete(null);
  };

  const confirmDelete = () => {
    if (todoToDelete) {
      dispatch(deletetask(todoToDelete));
      closeModal();
    }
  };

  const handleView = () => {
    setShow(!show);
  };

  return (
    <div className='p-10'>
      <div className='space-x-2'>
        <Typography variant='h3' className='text-white text-lg'>Using Custom Hooks Example</Typography>
        <Typography variant='h2' className='text-white text-lg'>Count: {count}</Typography>
        <Button onClick={increment} variant='outlined' className='text-white !bg-white !font-bold'>Increment</Button>
        <Button onClick={decrement} variant='outlined' className='!bg-white text-lg !font-bold'>Decrement</Button>
        <Button onClick={reset} variant='contained' className='!bg-teal-900 shadow-2xl'>Reset</Button>
      </div>

      <Typography variant="h4" className='text-white !mt-4' gutterBottom>Task</Typography>
      <Button variant="contained" onClick={handleView} className='!mt-2'>Click to add task</Button>
     

      {show && (
        <>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add a new task"
              required
              sx={{ marginRight: '20px', marginTop: '20px', color: 'black', backgroundColor: 'white' }}
            />
            <Button variant="contained" color={edit ? "secondary" : "info"} className='!mt-[20px]' type="submit">
              {edit ? 'Update' : 'Add'}
            </Button>
          </form>

          <TableContainer component={Paper} sx={{ marginTop: '20px', width: '50%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className='!text-xl font-bold'>Task</TableCell>
                  <TableCell align="right" className='!text-xl font-bold'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todos.map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell>{todo.text}</TableCell>
                    <TableCell align="right" className='space-x-2'>
                      <Button onClick={() => handleEdit(todo)} color="primary" variant='outlined'>Edit</Button>
                      <Button onClick={() => openModal(todo.id)} color="secondary" variant='outlined'>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Modal open={showModal} onClose={closeModal}>
            <div className='p-[10px] bg-slate-600 !w-[400px] mt-[20%] m-auto space-x-8 !space-y-8 !h-[25%]'>
              <Typography variant="h6" className='!ml-6 text-white'>Confirm ??</Typography>
              <Typography className='text-white'>Are you sure you want to delete this task?</Typography>
              <Button variant="outlined" onClick={closeModal} className='m-3 !bg-white'>Cancel</Button>
              <Button variant="contained" color="error" className='flex justify-end' onClick={confirmDelete}>Delete</Button>
            </div>
          </Modal>

          <Typography variant="h4" sx={{ marginTop: '20px' }} className='text-white'>Deleted Tasks</Typography>
          <TableContainer component={Paper} sx={{ marginTop: '20px', width: '50%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className='!text-xl'>Deleted Task Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deletedTodos.map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell>{todo.text}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default TodoList;
