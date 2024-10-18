import { api } from '~/trpc/react'
import RecipeListItem from '~/app/dashboard/_components/RecipeListItem'
import { Riple } from 'react-loading-indicators'
import { useEffect, useState } from 'react'
import type { RecipeWithNested } from '~/app/dashboard/_components/RecipeListItem'
import { useAtom } from 'jotai'
import { recipesAtom } from '~/app/atoms/data'

export default function RecipeList() {
    const [recipes, setRecipes] = useAtom(recipesAtom)
    const { data: serverRecipes, isLoading } = api.recipe.getAll.useQuery()
    const [deletedRecipe, setDeletedRecipe] = useState<RecipeWithNested>()

    useEffect(() => {
        if (!recipes.length && serverRecipes) {
            setRecipes(serverRecipes)
        }
        recipes?.filter(recipe => recipe !== deletedRecipe)
    }, [deletedRecipe, recipes, serverRecipes, setRecipes])

    return (
        <div className='flex flex-wrap gap-4'>
            {isLoading ? (
                <div className='flex h-screen w-screen items-center justify-center'>
                    <Riple color='white' size='medium' />
                </div>
            ) : (
                recipes?.map((recipe) => (
                    <div className='flex-1' key={recipe.id}>
                        <RecipeListItem recipe={recipe} setDeletedRecipe={setDeletedRecipe} />
                    </div>
                ))
            )}
        </div>
    )
}
