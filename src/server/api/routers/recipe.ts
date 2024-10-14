import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { z } from 'zod'

export const recipeSchema = z.object({
    title: z.string(),
    description: z.string(),
    imageURL: z.string(),
    steps: z.string(),
    ingredients: z.array(
        z.object({
            name: z.string(),
            store: z.string().nullable(),
            price: z.string(),
            currency: z.string(),
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

const ingredientSchema = z.object({
    name: z.string().min(1),
    store: z.string().nullable(),
    price: z.string().min(1),
    currency: z.string().min(1),
    link: z.string().nullable(),
})

const tagSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    color: z.string(),
})

export const recipeRouter = createTRPCRouter({
    create: publicProcedure
        .input(recipeSchema)
        .mutation(async ({ ctx, input }) => {
            let imagePath = ''

            // if (input.imageFile) {
            // const { createReadStream, filename } = await input.imageFile
            //     const stream = createReadStream()
            //     const uploadDir = path.join(process.cwd(), 'public', 'uploads')
            //     const filePath = path.join(uploadDir, filename)
            //
            //     await writeFile(filePath, stream)
            // imagePath = `/uploads/${filename}`
            // }

            return ctx.db.recipe.create({
                data: {
                    title: input.title,
                    description: input.description,
                    imageURL: imagePath,
                    steps: input.steps,
                    ingredients: {
                        connectOrCreate: input.ingredients.map(
                            (ingredient) => ({
                                where: { name: ingredient.name },
                                create: ingredient,
                            }),
                        ),
                    },
                    tags: {
                        connectOrCreate: input.tags.map((tag) => ({
                            where: { name: tag.name },
                            create: tag,
                        })),
                    },
                },
            })
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
            return ctx.db.recipe.update({
                where: { id: input.id },
                data: {
                    ...input.data,
                    ingredients: {
                        set: [],
                        connectOrCreate: input.data.ingredients.map(
                            (ingredient) => ({
                                where: { name: ingredient.name },
                                create: ingredient,
                            }),
                        ),
                    },
                    tags: {
                        set: [],
                        connectOrCreate: input.data.tags.map((tag) => ({
                            where: { name: tag.name },
                            create: tag,
                        })),
                    },
                },
            })
        }),

    delete: publicProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.recipe.delete({
                where: { id: input.id },
            })
        }),

    createIngredient: publicProcedure
        .input(ingredientSchema)
        .mutation(async ({ ctx, input }) => {
            const ingredient = await ctx.db.ingredient.create({
                data: {
                    ...input,
                },
            })
            return {
                ...ingredient,
            }
        }),

    createTag: publicProcedure
        .input(tagSchema)
        .mutation(async ({ ctx, input }) => {
            const tag = await ctx.db.tag.create({
                data: {
                    ...input,
                },
            })
            return {
                ...tag,
            }
        }),

    getAllIngredients: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.ingredient.findMany({})
    }),

    getAllTags: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.tag.findMany({})
    }),

    searchIngredients: publicProcedure
        .input(z.string())
        .query(async ({ ctx, input }) => {
            return ctx.db.ingredient.findMany({
                where: {
                    name: {
                        contains: input,
                    },
                },
            })
        }),

    searchTags: publicProcedure
        .input(z.string())
        .query(async ({ ctx, input }) => {
            return ctx.db.tag.findMany({
                where: {
                    name: {
                        contains: input,
                    },
                },
            })
        }),
})
