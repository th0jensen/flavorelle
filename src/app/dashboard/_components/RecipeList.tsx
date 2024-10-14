import { api } from '~/trpc/react'
import RecipeListItem from '~/app/dashboard/_components/RecipeListItem'
import { Riple } from 'react-loading-indicators'

export default function RecipeList() {
    const { data: recipes, isLoading } = api.recipe.getAll.useQuery()

    return (
        <div className='flex flex-wrap justify-center gap-4'>
            {isLoading ? (
                <div className='flex h-screen w-screen items-center justify-center'>
                    <Riple color='white' size='medium' />
                </div>
            ) : (
                recipes?.map((recipe) => (
                    <div key={recipe.id}>
                        <RecipeListItem recipe={recipe} />
                    </div>
                ))
            )}
        </div>
    )
}
