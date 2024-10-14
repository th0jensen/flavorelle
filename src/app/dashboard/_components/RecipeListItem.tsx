import Link from 'next/link'
import type { Prisma } from '@prisma/client'
import { api } from '~/trpc/react'
import { Delete02Icon } from 'hugeicons-react'
import Image from 'next/image'

type Recipe = Prisma.RecipeGetPayload<{
    include: {
        ingredients: true
        tags: true
    }
}>

export default function RecipeListItem({ recipe }: { recipe: Recipe }) {
    const recipeDeletion = api.recipe.delete.useMutation()

    const handleDeletion = () => {
        recipeDeletion.mutate({ id: recipe.id })
    }

    return (
        <Link href={`/dashboard/recipe/${recipe.id}`}>
            <div className='group card relative flex h-48 w-96 justify-end overflow-hidden bg-base-300 p-4 shadow-2xl'>
                <button
                    className='btn input-bordered absolute right-2 top-2 z-20 hidden bg-gray-800 hover:btn-error group-hover:block'
                    onClick={handleDeletion}
                >
                    <Delete02Icon />
                </button>
                <Image
                    src={recipe.imageURL || '/path/to/placeholder-image.png'}
                    alt={`Image of ${recipe.title}`}
                    className='absolute inset-0 z-0 object-cover transition-transform duration-300 ease-in-out'
                    fill
                />
                <div className='absolute inset-0 z-10 bg-gradient-to-t from-gray-800 to-transparent' />
                <div className='relative z-10 flex h-full flex-col justify-end text-white'>
                    <h2 className='mb-1 line-clamp-2 break-words text-xl font-bold leading-tight'>
                        {recipe.title}
                    </h2>
                    <p className='overflow-hidden overflow-ellipsis whitespace-nowrap text-sm'>
                        {recipe.description}
                    </p>
                    <div className='flex gap-2 pt-2'>
                        {recipe.tags.map(
                            (tag: Prisma.TagUncheckedCreateInput) => (
                                <div
                                    key={tag.id}
                                    className='rounded-xl bg-base-100 p-2'
                                >
                                    <p className='text-xs'>{tag.name}</p>
                                </div>
                            ),
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}
