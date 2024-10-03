import Link from 'next/link'
import type { Prisma } from '@prisma/client'

type Recipe = Prisma.RecipeGetPayload<{
    include: {
        ingredients: true
        tags: true
    }
}>

export default function RecipeListItem({ recipe }: { recipe: Recipe }) {
    return (
        <Link href={`/dashboard/recipe/${recipe.id}`}>
            <div className='card relative flex h-48 w-96 justify-end overflow-hidden bg-base-300 p-4 shadow-2xl'>
                <img
                    src={recipe.imageURL || '/path/to/placeholder-image.png'}
                    alt={`Image of ${recipe.title}`}
                    className='absolute inset-0 z-0 object-cover transition-transform duration-300 ease-in-out'
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

export function RecipeListItemPlaceholder() {
    return (
        <div className='card relative flex h-48 w-96 animate-pulse justify-end overflow-hidden bg-base-300 p-4'>
            <div className='absolute inset-0 z-0 bg-gray-300' />{' '}
            <div className='absolute inset-0 z-10 bg-gradient-to-t from-gray-700 to-transparent' />
            <div className='relative z-20 flex h-full flex-col justify-end text-gray-300'>
                <div className='mb-1 h-6 w-3/4 rounded bg-gray-300' />{' '}
                <div className='h-4 w-full rounded bg-gray-300' />{' '}
                <div className='flex gap-2 pt-2'>
                    <div className='h-5 w-20 rounded bg-gray-300' />{' '}
                    <div className='h-5 w-20 rounded bg-gray-300' />{' '}
                </div>
            </div>
        </div>
    )
}
