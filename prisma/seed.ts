import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
    // Create a test user
    const hashedPassword = await bcrypt.hash('testuser', 10)
    const user = await prisma.user.create({
        data: {
            firstName: 'Test',
            lastName: 'User',
            email: 'test@test.com',
            password: hashedPassword,
        },
    })
    console.log('User created:', user)

    // Create two tags
    const tag1 = await prisma.tag.create({
        data: {
            name: 'Vegetarian',
            color: 'green',
        },
    })

    const tag2 = await prisma.tag.create({
        data: {
            name: 'Quick & Easy',
            color: 'blue',
        },
    })

    console.log('Tags created:', tag1, tag2)

    // Create two ingredients
    const ingredient1 = await prisma.ingredient.create({
        data: {
            name: 'Tomato',
            store: 'Grocery Store A',
            price: '1.99',
            link: 'https://example.com/tomato',
        },
    })

    const ingredient2 = await prisma.ingredient.create({
        data: {
            name: 'Pasta',
            store: 'Grocery Store B',
            price: '3.99',
            link: 'https://example.com/pasta',
        },
    })

    console.log('Ingredients created:', ingredient1, ingredient2)

    // Create two recipes and link the ingredients and tags
    const recipe1 = await prisma.recipe.create({
        data: {
            title: 'Spaghetti with Tomato Sauce',
            description: 'A classic pasta dish with fresh tomato sauce.',
            imageURL:
                'https://www.giallozafferano.com/images/228-22832/spaghetti-with-tomato-sauce_1200x800.jpg',
            steps: 'Boil pasta.|Make tomato sauce.|Combine and serve.',
            ingredients: {
                connect: [{ id: ingredient1.id }, { id: ingredient2.id }],
            },
            tags: {
                connect: [{ id: tag1.id }],
            },
        },
    })

    const recipe2 = await prisma.recipe.create({
        data: {
            title: 'Vegetarian Salad',
            description: 'A fresh and healthy vegetarian salad.',
            imageURL:
                'https://www.eatingwell.com/thmb/H8ldmJ7nz2tNtBsYHNYLTpGbRKc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/kale-and-quinoa-salad-with-lemon-dressing-50e7ff379b924df8ab3dd665e2efefb5.jpg',
            steps: 'Chop vegetables.|Toss with dressing.',
            ingredients: {
                connect: [{ id: ingredient1.id }],
            },
            tags: {
                connect: [{ id: tag1.id }, { id: tag2.id }],
            },
        },
    })

    console.log('Recipes created:', recipe1, recipe2)
}

main()
    .then(async () => {
        await prisma.$disconnect()
        process.exit(1)
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
