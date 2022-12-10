import React, { useState } from 'react'
import s from './TodoList.module.css'

function TodoList ({ todo, setTodo }) {

    const [edit, setEdit] = useState(null)
    const [task, setTask] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState()
    const dayjs = require('dayjs')

    function statusTodo(id) {
        let newTodo = [...todo].filter(item => {
            if (item.id == id) {
                item.status = !item.status
            }
            return item
        })
        setTodo(newTodo)
    }

    function editTodo(id, task, date, description, file) {
        setEdit(id)
        setTask(task)
        setDate(date)
        setDescription(description)
        setFile(file)
    }

    function saveTodo(id) {
        let newTodo = [...todo].map( item => {
            if (item.id == id) {
                item.task = task
                item.date = date
                item.description = description
                item.file = file
            }
            return item
        })
        setTodo(newTodo)
        setEdit(null)
    }

    function deleteTodo(id) {
        let newTodo = [...todo].filter(item => item.id!=id)
        setTodo(newTodo)
    }

    return (
        <div className={s.list}>
            {
                todo.map( item => (
                    <div key={item.id} className={s.items}>
                        {
                            edit == item.id ? 
                                <div>
                                    <div>
                                        <div>Задача:</div>
                                        <input value={task} onChange={ e => setTask(e.target.value)}/>
                                    </div>
                                    <div>
                                        <div>Дата завершения:</div>
                                        <input placeholder='ММ-ДД-ГГГГ' value={date} onChange={ e => setDate(e.target.value)}/>
                                    </div>
                                    <div>
                                        <div>Описание:</div>
                                        <input value={description} onChange={ e => setDescription(e.target.value)}/>
                                    </div>
                                    <div>
                                        <div>Прикрепленный файл:</div>
                                        <div>{ item.file }</div>
                                        <div>Заменить:</div>
                                        <input type="file" onChange={ e => setFile(e.target.value)}/>
                                    </div>
                                </div> :
                                <div>
                                    <div className={ (!item.status || (dayjs(item.date).isBefore()) ) ? s.close : s.open}>Задача:</div>
                                    <div className={ (!item.status || (dayjs(item.date).isBefore()) ) ? s.close : s.open}>{ item.task }</div>
                                    <div className={ (!item.status || (dayjs(item.date).isBefore()) ) ? s.close : s.open}>Дата завершения:</div>
                                    <div className={ (!item.status || (dayjs(item.date).isBefore()) ) ? s.close : s.open}>{ dayjs(item.date).format('MMMM D, YYYY') }</div>
                                    <div className={ (!item.status || (dayjs(item.date).isBefore()) ) ? s.close : s.open}>Описание:</div>
                                    <div className={ (!item.status || (dayjs(item.date).isBefore()) ) ? s.close : s.open}>{ item.description }</div>
                                    <div className={ (!item.status || (dayjs(item.date).isBefore()) ) ? s.close : s.open}>Прикрепленный файл:</div>
                                    <div className={ (!item.status || (dayjs(item.date).isBefore()) ) ? s.close : s.open}>{ item.file }</div>
                                </div>
                        }
                        {
                            edit == item.id ? 
                                <div className={s.addButtons}>
                                    <button onClick={() => saveTodo(item.id)}>Сохранить</button>
                                </div> :
                                <div className={s.addButtons}>
                                    <button size='10' onClick={() => statusTodo(item.id)}>
                                        {
                                            item.status ? 'Выполнено' : 'Не выполнено'
                                        }
                                    </button>
                                    <button size='10' onClick={() => editTodo(item.id, item.task, item.date, item.description, item.file)}>Редактировать</button>
                                    <button size='10' onClick={() => deleteTodo(item.id)}>Убрать</button>
                                </div>
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default TodoList