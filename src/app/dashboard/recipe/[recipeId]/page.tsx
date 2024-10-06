'use client'

import { api } from '~/trpc/react'
import type { Prisma } from '@prisma/client'
import { Riple } from 'react-loading-indicators'
import { ArrowLeft02Icon } from 'hugeicons-react'
import Link from 'next/link'

export default function RecipePage({
    params,
}: {
    params: { recipeId: string }
}) {
    const {
        data: recipe,
        isLoading,
        error,
    } = api.recipe.getOne.useQuery({ id: parseInt(params.recipeId) })

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
                <>
                    <div className='relative left-0 top-0 z-30 p-2'>
                        <Link className='btn btn-neutral' href='/dashboard'>
                            <ArrowLeft02Icon />
                        </Link>
                    </div>
                    <img
                        src={
                            recipe.imageURL || '/path/to/placeholder-image.png'
                        }
                        alt={`Image of ${recipe.title}`}
                        className='absolute inset-0 top-16 z-0 h-[50vh] w-screen rounded object-cover md:pl-16'
                    />
                    <div className='absolute inset-0 top-16 z-10 h-[50vh] bg-gradient-to-t from-base-100 to-transparent' />
                    <div className='relative z-20 flex h-[50vh] flex-col justify-end p-4'>
                        <div className='flex w-full flex-col items-center justify-center text-white'>
                            <h1 className='pb-1 text-2xl font-bold'>
                                {recipe.title}
                            </h1>
                            <p className='text-sm'>{recipe.description}</p>
                        </div>
                    </div>
                    <div className='flex justify-evenly px-4 pt-1'>
                        <div className='flex flex-wrap gap-2'>
                            <div className='rounded-xl bg-base-300 p-2'>
                                <p className='text-xs'>${calculatedPrice()}</p>
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
                    </div>
                    <div className='mx-auto flex w-full flex-row justify-evenly py-6 text-white'>
                        <ol className='list-decimal'>
                            {recipe.steps.split('|').map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                        <div className='flex flex-col items-end justify-start'>
                            <h2 className='font-bold'>Ingredients</h2>
                            {recipe.ingredients.map((ingredient) => (
                                <p className='text-sm' key={ingredient.id}>
                                    {ingredient.name}
                                </p>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
