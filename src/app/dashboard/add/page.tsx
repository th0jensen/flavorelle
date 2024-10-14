'use client'

import { type ChangeEvent, type FormEvent } from 'react'
import { useState, useEffect } from 'react'
import { api } from '~/trpc/react'
import { FloppyDiskIcon } from 'hugeicons-react'
import type { Ingredient, Tag } from '@prisma/client'
import Image from 'next/image'
import CreateTag from '~/app/dashboard/add/_components/CreateTagForm'
import CreateIngredient from '~/app/dashboard/add/_components/CreateIngredientForm'

export default function AddView() {
    const recipeMutation = api.recipe.create.useMutation()
    const { data: allIngredients } = api.recipe.getAllIngredients.useQuery()
    const { data: allTags } = api.recipe.getAllTags.useQuery()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState<string>('')
    const [steps, setSteps] = useState<string[]>([''])
    const [tags, setTags] = useState<Tag[]>([])
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    // Search
    const [tagResults, setTagResults] = useState<Tag[]>([])
    const [ingredientResults, setIngredientResults] = useState<Ingredient[]>([])
    const [tagSearch, setTagSearch] = useState('')
    const [ingredientSearch, setIngredientSearch] = useState('')
    // Display creation forms
    const [showCreateTagForm, setShowCreateTagForm] = useState(false)
    const [showCreateIngredientForm, setShowCreateIngredientForm] =
        useState(false)

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

    const handleAddNewTag = (tag: Tag): void => {
        setTags([...tags, tag])
        setTagSearch('')
        setShowCreateTagForm(false)
    }

    const handleAddNewIngredient = (ingredient: Ingredient): void => {
        setIngredients([...ingredients, ingredient])
        setIngredientSearch('')
        setShowCreateIngredientForm(false)
    }

    useEffect((): void => {
        if (!allIngredients || !allTags) {
            setIngredientResults([])
            setTagResults([])
            return
        }

        setIngredientResults(
            allIngredients.filter((ingredient: Ingredient): boolean =>
                ingredient.name
                    .toLowerCase()
                    .includes(ingredientSearch.toLowerCase()),
            ),
        )

        setTagResults(
            allTags.filter((tag: Tag): boolean =>
                tag.name.toLowerCase().includes(tagSearch.toLowerCase()),
            ),
        )
    }, [allIngredients, allTags, ingredientSearch, tagSearch])

    return (
        <div className='h-full w-full pb-48'>
            {showCreateTagForm && (
                <CreateTag
                    handleAddNewTag={handleAddNewTag}
                    isOpen={setShowCreateTagForm}
                    searchValue={tagSearch}
                />
            )}
            {showCreateIngredientForm && (
                <CreateIngredient
                    handleAddNewIngredient={handleAddNewIngredient}
                    isOpen={setShowCreateIngredientForm}
                    searchValue={ingredientSearch}
                />
            )}
            <form onSubmit={handleSubmit}>
                {image && (
                    <Image
                        src={image || '/path/to/placeholder.img'}
                        alt={`Image of ${title}`}
                        className='absolute inset-0 top-16 z-0 h-[50vh] w-screen rounded object-cover md:pl-16'
                        fill
                    />
                )}
                <div className='absolute inset-0 top-16 z-10 h-[50vh] bg-gradient-to-t from-base-100 to-transparent' />
                <div className='relative z-20 flex h-[50vh] flex-col justify-end p-4'>
                    <div className='flex w-full flex-col items-center justify-center gap-2 text-white'>
                        {/*<input*/}
                        {/*    className='input input-bordered px-0 text-center'*/}
                        {/*    placeholder='Upload image'*/}
                        {/*    name='image'*/}
                        {/*    type='file'*/}
                        {/*    onChange={(e): void => setImage(e.target.files![0])}*/}
                        {/*    value={title}*/}
                        {/*    required*/}
                        {/*/>*/}
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
                            {tags.map((tag: Tag, index) => (
                                <div
                                    key={index}
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
                                                className='w-full cursor-pointer p-2 hover:bg-base-200'
                                                onClick={() =>
                                                    handleAddNewTag(tag)
                                                }
                                            >
                                                {tag.name}
                                            </div>
                                        ))
                                    ) : (
                                        <button
                                            className='w-full cursor-pointer p-2 hover:bg-base-200'
                                            onClick={() =>
                                                setShowCreateTagForm(true)
                                            }
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
                                {ingredients.map((ing: Ingredient, index) => (
                                    <p className='text-sm' key={index}>
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
                                                        className='w-full cursor-pointer p-2 hover:bg-base-200'
                                                        onClick={() =>
                                                            handleAddNewIngredient(
                                                                ingredient,
                                                            )
                                                        }
                                                    >
                                                        {ingredient.name}
                                                        {' - '}
                                                        {ingredient.price}
                                                    </div>
                                                ),
                                            )
                                        ) : (
                                            <button
                                                className='w-full cursor-pointer p-2 hover:bg-base-200'
                                                onClick={() =>
                                                    setShowCreateIngredientForm(
                                                        true,
                                                    )
                                                }
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
