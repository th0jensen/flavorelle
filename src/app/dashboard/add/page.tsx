'use client'

import { type ChangeEvent, type FormEvent } from 'react'
import { useState, useEffect } from 'react'
import { api } from '~/trpc/react'
import { FloppyDiskIcon } from 'hugeicons-react'
import type { Ingredient, Prisma, Tag } from '@prisma/client'

export default function AddView() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [tags, setTags] = useState<Tag[]>([])
    const [steps, setSteps] = useState<string[]>([''])
    const recipeMutation = api.recipe.create.useMutation()
    const [ingredientSearch, setIngredientSearch] = useState('')
    const [tagSearch, setTagSearch] = useState('')
    const [ingredientResults, setIngredientResults] = useState<Ingredient[]>([])
    const [tagResults, setTagResults] = useState<Tag[]>([])

    const searchIngredients = api.recipe.searchIngredients.useQuery(
        ingredientSearch,
        {
            enabled: ingredientSearch.length > 0,
        },
    )

    const searchTags = api.recipe.searchTags.useQuery(tagSearch, {
        enabled: tagSearch.length > 0,
    })

    useEffect((): void => {
        if (ingredientSearch.length === 0 || !searchIngredients.data) {
            setIngredientResults([])
        } else if (ingredientSearch.length > 0) {
            setIngredientResults(
                searchIngredients.data.filter(
                    (ingredient) =>
                        !ingredients.some((ing) => ing.id === ingredient.id),
                ),
            )
        }

        if (tagSearch.length === 0 || !searchTags.data) {
            setTagResults([])
        } else if (tagSearch.length > 0) {
            setTagResults(
                searchTags.data.filter(
                    (tag) => !tags.some((t) => t.id === tag.id),
                ),
            )
        }
    }, [ingredientSearch, searchIngredients.data, searchTags.data, tagSearch])

    const handleStepChange = (index: number, value: string): void => {
        const updatedSteps: string[] = [...steps]
        updatedSteps[index] = value
        setSteps(updatedSteps)
    }

    const addStep = (): void => {
        setSteps([...steps, ''])
    }

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        e.preventDefault()
        const concatenatedSteps: string = steps
            .filter((step: string): boolean => step.trim() !== '')
            .join('|')

        await recipeMutation.mutateAsync({
            title,
            description,
            imageURL: image,
            ingredients,
            steps: concatenatedSteps,
            tags,
        })
    }

    const handleAddNewIngredient = (ingredient: Ingredient): void => {
        setIngredients([...ingredients, ingredient])
        setIngredientSearch('')
    }

    const handleAddNewTag = (tag: Tag): void => {
        setTags([...tags, tag])
        setTagSearch('')
    }

    return (
        <div className='h-full w-full pb-48'>
            <form onSubmit={handleSubmit}>
                {image && (
                    <img
                        src={image || '/path/to/placeholder.img'}
                        className='absolute inset-0 top-16 z-0 h-[50vh] w-screen rounded object-cover md:pl-16'
                    />
                )}
                <div className='absolute inset-0 top-16 z-10 h-[50vh] bg-gradient-to-t from-base-100 to-transparent' />
                <div className='relative z-20 flex h-[50vh] flex-col justify-end p-4'>
                    <div className='flex w-full flex-col items-center justify-center gap-2 text-white'>
                        <input
                            style={{
                                width: `${title.length + 15}ch`,
                                maxWidth: '50vw',
                            }}
                            className='input input-bordered px-0 text-center'
                            placeholder='Title'
                            name='title'
                            type='text'
                            onChange={(
                                e: ChangeEvent<HTMLInputElement>,
                            ): void => setTitle(e.target.value)}
                            value={title}
                            required
                        />

                        <input
                            style={{
                                width: `${description.length + 15}ch`,
                                maxWidth: '50vw',
                            }}
                            className='input input-bordered text-center'
                            placeholder='Description'
                            name='description'
                            type='text'
                            onChange={(
                                e: ChangeEvent<HTMLInputElement>,
                            ): void => setDescription(e.target.value)}
                            value={description}
                            required
                        />
                    </div>
                </div>

                <div className='relative'>
                    <div className='flex justify-evenly p-4 pt-1'>
                        <div className='flex flex-wrap gap-2'>
                            {tags.map((tag: Tag) => (
                                <div
                                    key={tag.id}
                                    className='rounded-xl bg-base-300 p-2'
                                >
                                    <p className='text-xs'>{tag.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <div className='relative'>
                            <input
                                className='input input-bordered'
                                placeholder='Search tags'
                                name='tags'
                                type='text'
                                onChange={(e) => setTagSearch(e.target.value)}
                                value={tagSearch}
                            />
                            {tagSearch && (
                                <div className='absolute mt-2 w-full max-w-xs rounded-lg bg-base-300 shadow-lg'>
                                    {tagResults.length > 0 ? (
                                        tagResults.map((tag: Tag) => (
                                            <div
                                                key={tag.id}
                                                className='cursor-pointer p-2 hover:bg-base-200'
                                                onClick={() =>
                                                    handleAddNewTag(tag)
                                                }
                                            >
                                                {tag.name}
                                            </div>
                                        ))
                                    ) : (
                                        <button
                                            className='cursor-pointer p-2 hover:bg-base-200'
                                            // onClick={() =>
                                            //     handleAddNewTag(tagSearch)
                                            // }
                                        >
                                            Add new tag
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='p-4'>
                    <div className='flex items-center justify-center align-middle'>
                        <input
                            className='input input-bordered'
                            placeholder='Image URL'
                            name='image'
                            type='url'
                            onChange={(e) => setImage(e.target.value)}
                            value={image}
                        />
                    </div>
                    <div className='flex w-full flex-col items-center gap-8 px-8 py-6 pt-10 md:flex-row md:items-start md:justify-evenly'>
                        <div>
                            <h1 className='pb-2 text-xl'>Instructions</h1>
                            <ol className='flex list-decimal flex-col gap-4'>
                                {steps.map((step, index) => (
                                    <li
                                        key={index}
                                        className='flex flex-col gap-4'
                                    >
                                        <div className='flex flex-row items-center justify-center gap-2'>
                                            <div className='relative'>
                                                <input
                                                    className='input input-bordered pl-8'
                                                    name={`step-${index}`}
                                                    type='text'
                                                    onChange={(e) =>
                                                        handleStepChange(
                                                            index,
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={step}
                                                />
                                                <span className='absolute left-2 top-1/2 -translate-y-1/2 transform pl-2 font-bold'>
                                                    {index + 1}.
                                                </span>
                                            </div>
                                        </div>
                                        {index === steps.length - 1 && (
                                            <button
                                                type='button'
                                                className='btn input-bordered bg-gray-800'
                                                onClick={addStep}
                                            >
                                                Add Step
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </div>
                        <div>
                            <div className='flex flex-col justify-start md:items-end'>
                                <h1 className='text-xl'>Ingredients</h1>
                                {ingredients.map((ing: Ingredient) => (
                                    <p className='text-sm' key={ing.id}>
                                        {ing.name}
                                    </p>
                                ))}
                            </div>
                            <div className='relative pt-2'>
                                <input
                                    className='input input-bordered'
                                    placeholder='Search Ingredients'
                                    name='ingredients'
                                    type='text'
                                    onChange={(e) =>
                                        setIngredientSearch(e.target.value)
                                    }
                                    value={ingredientSearch}
                                />
                                {ingredientSearch && (
                                    <div className='absolute mt-2 w-full max-w-xs rounded-lg bg-base-300 shadow-lg'>
                                        {ingredientResults.length > 0 ? (
                                            ingredientResults.map(
                                                (ingredient) => (
                                                    <div
                                                        key={ingredient.id}
                                                        className='cursor-pointer p-2 hover:bg-base-200'
                                                        onClick={() =>
                                                            handleAddNewIngredient(
                                                                ingredient,
                                                            )
                                                        }
                                                    >
                                                        {ingredient.name} -{' '}
                                                        {ingredient.price}
                                                    </div>
                                                ),
                                            )
                                        ) : (
                                            <button
                                                className='cursor-pointer p-2 hover:bg-base-200'
                                                // onClick={() => handleAddNewIngredient(ingredientSearch)}
                                            >
                                                Add new ingredient
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='fixed right-2 top-[4.5rem] z-30 flex'>
                        <button
                            className='btn input-bordered bg-gray-800 text-white'
                            type='submit'
                        >
                            <FloppyDiskIcon />
                            Save Recipe
                        </button>
                    </div>
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
