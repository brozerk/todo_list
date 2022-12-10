import React, { useState } from 'react'
import uuid from 'react-uuid'
import s from './AddTodo.module.css'

function AddTodo ({todo, setTodo}) {

    const [task, setTask] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState()
    const dayjs = require('dayjs')

    function saveTodo () {
        if (task!='') {
            setTodo([...todo, {
                        id: uuid(),
                        task: task,
                        date: date,
                        description: description,
                        file: file,
                        status: true
                    }]
            )
            setTask('')
            setDate('')
            setDescription('')
            setFile(null)
        }
    }

    return (
        <div className={s.margin_top}>
            <div className={s.margin_top}>
                <div>Введите задачу:</div>
                <input value={task} onChange={ e => setTask(e.target.value)}/>
            </div>
            <div className={s.margin_top}>
                <div>Дата завершения:</div>
                <input placeholder='ММ-ДД-ГГГГ' value={date} onChange={ e => setDate(e.target.value)}/>
            </div>
            <div className={s.margin_top}>
                <div>Опишите задачу:</div>
                <input value={description} onChange={ e => setDescription(e.target.value)}/>
            </div>
            <div className={s.margin_top}>
                <div>Прикрепить файл:</div>
                <input type='file' onChange={ e => setFile(e.target.value)}/>
            </div>
            <div className={s.margin_top}>
                <button onClick={saveTodo}>Добавить</button>
            </div>
        </div>
    )
}

export default AddTodo