import { useState } from 'react';
import Select from '../components/Select';
import button from '../styles/Buttons.module.scss'
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns'

export default function AddTodo({ setTodos, categories, setAddTodoModalVisible  }) {
    const [formTitle, setFormTitle] = useState('')
    const [formDescription, setFormDescription] = useState('')
    const [selectedFormCategory, setSelectedFormCategory] = useState(0)

    const handleAddTodo = (event) => {
        event.preventDefault();

        setTodos(oldArray => [...oldArray,{
            id: uuidv4(),
            title: formTitle,
            description: formDescription,
            date: format(new Date, 'yyyy-MM-d'),
            time: format(new Date, 'HH:mm'),
            completed: false,
            categoryId: selectedFormCategory
        }])

        setFormTitle('')
        setFormDescription('')
        setSelectedFormCategory(0)
        setAddTodoModalVisible(false)
    }

    const handleFormCategory = (event) => {
        setSelectedFormCategory(Number(event))
    }

    return (  
        <form onSubmit={handleAddTodo}>
          <div className='form-inputs'>
            <div className='form-control'>
              <label htmlFor='add-title'>Title</label>
              <input type='text' value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder='Task name' id='add-title' required />
            </div>
            <div className='form-control'>
              <label htmlFor='add-description'>Description</label>
              <textarea value={formDescription} onChange={(e) => setFormDescription(e.target.value)} placeholder='Description text' id='add-description' rows='5' />
            </div>
            <div className='form-control'>
              <label htmlFor='add-description'>Category</label>
              {categories && 
                <Select
                  value={selectedFormCategory}
                  onChange={e => handleFormCategory(e.target.value)}
                >
                  <option style={{display: 'none'}} disabled defaultValue value='0'>Choose a category</option>
                  {categories.map(o => (
                    <option key={uuidv4()} value={o.id}>
                      {o.title}
                    </option>
                  ))}
                </Select>
              }
            </div>
          </div>
          <div className={button.grid}>
            <button onClick={() => setAddTodoModalVisible(false)} type='button' className={`${button.button} ${button.ghost} ${button.full}`}>Cancel</button>
            <button className={`${button.button} ${button.full}`}>Create</button>
          </div>
        </form>
    )
}
