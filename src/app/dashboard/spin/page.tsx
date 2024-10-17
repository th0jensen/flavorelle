'use client'

import Wheel from '~/app/dashboard/spin/_components/Wheel'
import { recipesAtom } from '~/app/atoms/data'
import { api } from '~/trpc/react'
import { useEffect } from 'react'
import { useAtom } from 'jotai'

export default function WheelPage() {
    const [recipes, setRecipes] = useAtom(recipesAtom)
    const { data: serverRecipes } = api.recipe.getAll.useQuery()

    const randomizeRecipes = () => {
        const shuffled = [...recipes].sort(() => Math.random() - 0.5)
        setRecipes(shuffled)
    }

    useEffect(() => {
        if (!recipes && serverRecipes) {
            setRecipes(serverRecipes)
            console.log('Server recipes: ', serverRecipes)
        }
    })

    return (
        <div>
            {serverRecipes && <Wheel recipes={serverRecipes} />}
            <button onClick={randomizeRecipes}>Randomize</button>
        </div>
    )
}
