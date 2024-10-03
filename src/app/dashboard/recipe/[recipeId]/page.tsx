'use client'

import { api } from '~/trpc/react'
import type { Prisma } from '@prisma/client'
import { Riple } from 'react-loading-indicators'

export default function RecipePage({
    params,
}: {
    params: { recipeId: string }
}) {
    const {
        data: recipe,
        isLoading,
        error,
    } = api.recipe.getOne.useQuery(
        { id: parseInt(params.recipeId) },
        {
            enabled: !!params.recipeId,
        },
    )

    if (isLoading) {
        return (
            <div className='flex h-screen w-screen items-center justify-center'>
                <Riple color='white' size='medium' />
            </div>
        )
    }

    if (error) {
        return <div>Error fetching recipe: {error.message}</div>
    }

    const calculatedPrice = (): number => {
        let total = 0

        if (recipe) {
            for (const ingredient of recipe.ingredients) {
                total += parseInt(ingredient.price)
            }
        }
        return total
    }

    return (
        <div className='h-full w-full'>
            {recipe && (
                <div>
                    <img
                        src={
                            recipe.imageURL || '/path/to/placeholder-image.png'
                        }
                        alt={`Image of ${recipe.title}`}
                        className='absolute inset-0 top-16 z-0 h-[50vh] w-screen rounded object-cover'
                    />
                    <div className='absolute inset-0 top-16 z-10 h-[50vh] bg-gradient-to-t from-base-100 to-transparent' />
                    <div className='relative z-10 flex h-[50vh] flex-col justify-end p-4 text-white'>
                        <h1 className='pb-1 text-2xl font-bold'>
                            {recipe.title}
                        </h1>
                        <p className='text-sm'>{recipe.description}</p>
                    </div>
                    <div className='flex gap-2 px-4 pt-1'>
                        <div className='rounded-xl bg-base-300 p-2'>
                            <p className='text-xs'>{calculatedPrice()}</p>
                        </div>
                        {recipe.tags.map(
                            (tag: Prisma.TagUncheckedCreateInput) => (
                                <div
                                    key={tag.id}
                                    className='rounded-xl bg-base-300 p-2'
                                >
                                    <p className='text-xs'>{tag.name}</p>
                                </div>
                            ),
                        )}
                    </div>
                    <div className='flex w-full flex-row justify-between px-8 py-6 text-white'>
                        <ol className='list-decimal'>
                            {recipe.steps.split('|').map((step, index) => (
                                <li className='list-item' key={index}>
                                    {step}
                                </li>
                            ))}
                        </ol>
                        <div className='flex flex-col items-end justify-start'>
                            <h2 className='font-bold'>Ingredients</h2>
                            <div className='flex flex-col items-end'>
                                {recipe.ingredients.map((ingredient) => (
                                    <p className='text-sm' key={ingredient.id}>
                                        {ingredient.name}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
