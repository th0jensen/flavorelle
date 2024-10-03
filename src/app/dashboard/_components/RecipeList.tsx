import { api } from '~/trpc/react'
import type { Prisma } from '@prisma/client'
import Link from 'next/link'
import RecipeListItem, {
    RecipeListItemPlaceholder,
} from '~/app/dashboard/_components/RecipeListItem'

export default function RecipeList() {
    const { data: recipes, isLoading } = api.recipe.getAll.useQuery()

    return (
        <div className='flex flex-wrap justify-evenly gap-4'>
            {isLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                      <div key={index}>
                          <RecipeListItemPlaceholder />
                      </div>
                  ))
                : recipes?.map((recipe) => (
                      <div key={recipe.id}>
                          <RecipeListItem recipe={recipe} />
                      </div>
                  ))}
        </div>
    )
}
