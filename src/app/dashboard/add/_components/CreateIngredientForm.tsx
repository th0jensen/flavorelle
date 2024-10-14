import { z } from 'zod'
import type { Ingredient } from '@prisma/client'
import { useState } from 'react'
import { Cancel01Icon } from 'hugeicons-react'
import { api } from '~/trpc/react'

const ingredientSchema = z.object({
    name: z.string().min(1, 'Ingredient name is required'),
    store: z.string().nullable(),
    price: z.string().min(1, 'Price is required'),
    currency: z.string().min(1, 'Currency is required'),
    link: z.string().nullable(),
})

export default function CreateIngredient(props: {
    handleAddNewIngredient: (ing: Ingredient) => void
    isOpen: (value: boolean) => void
    searchValue?: string
}): JSX.Element {
    const ingredientMutation = api.recipe.createIngredient.useMutation()
    const [name, setName] = useState(props.searchValue ?? '')
    const [store, setStore] = useState('')
    const [price, setPrice] = useState('')
    const [currency, setCurrency] = useState('')
    const [link, setLink] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            ingredientSchema.parse({ name, store, price, currency, link })
            const newIngredient = await ingredientMutation.mutateAsync({
                name,
                store,
                price,
                currency,
                link,
            })
            props.handleAddNewIngredient(newIngredient)
            setName('')
            setStore('')
            setPrice('')
            setCurrency('')
            setLink('')
            props.isOpen(false)
        } catch (error) {
            console.error('Validation or mutation error:', error)
        }
    }

    return (
        <div className='fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center backdrop-blur'>
            <div className='w-fit rounded-2xl bg-base-200 p-24'>
                <button
                    className='btn relative bottom-16 left-56'
                    onClick={() => props.isOpen(false)}
                >
                    <Cancel01Icon />
                </button>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col justify-center gap-5 rounded'
                >
                    <input
                        className='input input-bordered'
                        type='text'
                        placeholder='Ingredient Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        className='input input-bordered'
                        type='text'
                        placeholder='Store'
                        value={store}
                        onChange={(e) => setStore(e.target.value)}
                    />
                    <input
                        className='input input-bordered'
                        type='text'
                        placeholder='Price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <input
                        className='input input-bordered'
                        type='text'
                        placeholder='Currency'
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        required
                    />
                    <input
                        className='input input-bordered'
                        type='text'
                        placeholder='Link'
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                    <button className='btn input-bordered' type='submit'>
                        Create Ingredient
                    </button>
                </form>
            </div>
        </div>
    )
}
