'use client'

import { type ChangeEvent, type FormEvent } from 'react'
import { useState } from 'react'

export default function AddView() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [steps, setSteps] = useState('')
    const [tags, setTags] = useState('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Here you'll handle the form submission logic, like saving the recipe
    }

    return (
        <div className='h-full w-full p-4'>
            <form
                className='flex h-fit flex-wrap items-center justify-center gap-4'
                onSubmit={handleSubmit}
            >
                <Input
                    label='Title'
                    name='title'
                    type='text'
                    onChange={setTitle}
                    value={title}
                />
                <Input
                    label='Description'
                    name='description'
                    type='text'
                    onChange={setDescription}
                    value={description}
                />
                <Input
                    label='Image URL'
                    name='image'
                    type='url'
                    onChange={setImage}
                    value={image}
                />
                <Input
                    label='Ingredients (comma separated)'
                    name='ingredients'
                    type='text'
                    onChange={setIngredients}
                    value={ingredients}
                />
                <Input
                    label='Steps (comma separated)'
                    name='steps'
                    type='text'
                    onChange={setSteps}
                    value={steps}
                />
                <Input
                    label='Tags (comma separated)'
                    name='tags'
                    type='text'
                    onChange={setTags}
                    value={tags}
                />
                <div className='flex flex-col'>
                    <label className='label label-text text-transparent'>
                        Submit
                    </label>
                    <input
                        className='btn btn-primary'
                        type='submit'
                        value='Add Recipe'
                    />
                </div>
            </form>
        </div>
    )
}

type InputProps = {
    label: string
    name: string
    type: string
    onChange: (value: string) => void
    value: string
}

const Input = (props: InputProps): JSX.Element => {
    const { label, name, type, onChange, value } = props
    return (
        <div className='flex flex-col'>
            <label className='label label-text' htmlFor={name}>
                {label}
            </label>
            <input
                className='input input-bordered'
                name={name}
                type={type}
                onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                    onChange(e.target.value)
                }
                value={value}
                required
            />
        </div>
    )
}
