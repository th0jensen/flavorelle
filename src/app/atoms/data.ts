import { atom } from 'jotai'
import type { Ingredient, Tag } from '@prisma/client'
import type { RecipeWithNested } from '~/app/dashboard/_components/RecipeListItem'

export const recipesAtom = atom<RecipeWithNested[]>([])
export const ingredientsAtom = atom<Ingredient[]>([])
export const tagsAtom = atom<Tag[]>([])
