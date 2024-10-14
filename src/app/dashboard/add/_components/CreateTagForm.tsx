import { z } from 'zod'
import type { Tag } from '@prisma/client'
import { useState } from 'react'
import { Cancel01Icon } from 'hugeicons-react'
import { api } from '~/trpc/react'

const tagSchema = z.object({
    name: z.string().min(1, 'Tag name is required'),
    color: z.string().optional(),
})

export default function CreateTag(props: {
    handleAddNewTag: (tag: Tag) => void
    isOpen: (value: boolean) => void
    searchValue?: string
}) {
    const tagMutation = api.recipe.createTag.useMutation()
    const [name, setName] = useState(props.searchValue ?? '')
    const [color, setColor] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            tagSchema.parse({ name, color })
            const newTag = await tagMutation.mutateAsync({
                name,
                color,
            })
            props.handleAddNewTag(newTag)
            setName('')
            setColor('')
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
                        placeholder='Tag Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        className='input input-bordered'
                        type='text'
                        placeholder='Color'
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    <button className='btn input-bordered' type='submit'>
                        Create Tag
                    </button>
                </form>
            </div>
        </div>
    )
}
