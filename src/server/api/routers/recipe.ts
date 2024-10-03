import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { z } from 'zod'

export const recipeSchema = z.object({
    title: z.string(),
    description: z.string(),
    imageURL: z.string(),
    steps: z.string(),
    ingredients: z.array(
        z.object({
            id: z.number().optional(),
            name: z.string(),
            store: z.string().nullable(),
            price: z.string(),
            link: z.string().nullable(),
        }),
    ),
    tags: z.array(
        z.object({
            id: z.number().optional(),
            name: z.string(),
            color: z.string(),
        }),
    ),
})

export const recipeRouter = createTRPCRouter({
    create: publicProcedure
        .input(recipeSchema)
        .mutation(async ({ ctx, input }) => {
            const newRecipe = await ctx.db.recipe.create({
                data: {
                    title: input.title,
                    description: input.description,
                    imageURL: input.imageURL,
                    steps: input.steps,
                    ingredients: {
                        create: input.ingredients,
                    },
                    tags: {
                        connectOrCreate: input.tags.map((tag) => ({
                            where: { name: tag.name },
                            create: tag,
                        })),
                    },
                },
            })
            return newRecipe
        }),

    getAll: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.recipe.findMany({
            include: {
                ingredients: true,
                tags: true,
            },
        })
    }),

    getOne: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.recipe.findUnique({
                where: { id: input.id },
                include: {
                    ingredients: true,
                    tags: true,
                },
            })
        }),

    update: publicProcedure
        .input(
            z.object({
                id: z.number(),
                data: recipeSchema,
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const updatedRecipe = await ctx.db.recipe.update({
                where: { id: input.id },
                data: {
                    ...input.data,
                    ingredients: {
                        set: [], // Reset ingredients
                        create: input.data.ingredients,
                    },
                    tags: {
                        set: [], // Reset tags
                        connectOrCreate: input.data.tags.map((tag) => ({
                            where: { name: tag.name },
                            create: tag,
                        })),
                    },
                },
            })
            return updatedRecipe
        }),

    delete: publicProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.recipe.delete({
                where: { id: input.id },
            })
        }),
})
