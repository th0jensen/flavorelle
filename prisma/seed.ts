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

    // Create 5 tags
    const tags = await Promise.all([
        prisma.tag.create({ data: { name: 'Vegetarian', color: 'green' } }),
        prisma.tag.create({ data: { name: 'Quick & Easy', color: 'blue' } }),
        prisma.tag.create({ data: { name: 'Italian', color: 'red' } }),
        prisma.tag.create({ data: { name: 'Healthy', color: 'teal' } }),
        prisma.tag.create({ data: { name: 'Breakfast', color: 'yellow' } }),
    ])
    console.log('Tags created:', tags)

    // Create 5 recipes with ingredients and real image URLs
    const recipes = await Promise.all([
        prisma.recipe.create({
            data: {
                title: 'Spaghetti Carbonara',
                description:
                    'Classic Italian pasta dish with eggs, cheese, and pancetta.',
                imageURL:
                    'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
                steps: 'Cook spaghetti.|Fry pancetta.|Mix eggs and cheese.|Combine all ingredients.',
                ingredients: {
                    create: [
                        {
                            name: 'Barilla Spaghetti',
                            store: 'Walmart',
                            price: '1.48',
                            currency: 'USD',
                            link: 'https://www.walmart.com/ip/Barilla-Spaghetti-Pasta-16-oz/10309185',
                        },
                        {
                            name: 'Great Value Large Eggs',
                            store: 'Walmart',
                            price: '2.76',
                            currency: 'USD',
                            link: 'https://www.walmart.com/ip/Great-Value-Large-White-Eggs-12-Count/145051970',
                        },
                        {
                            name: 'Parmigiano Reggiano Cheese',
                            store: 'Walmart',
                            price: '7.98',
                            currency: 'USD',
                            link: 'https://www.walmart.com/ip/Parmigiano-Reggiano-Cheese-Wedge-8-oz/46491850',
                        },
                        {
                            name: 'Pancetta',
                            store: 'Walmart',
                            price: '4.98',
                            currency: 'USD',
                            link: 'https://www.walmart.com/ip/Citterio-Pancetta-Cubetti-Diced-4-oz/46491847',
                        },
                    ],
                },
                tags: { connect: [{ id: tags[2].id }, { id: tags[1].id }] },
            },
        }),
        prisma.recipe.create({
            data: {
                title: 'Greek Salad',
                description: 'Fresh and healthy Mediterranean salad.',
                imageURL:
                    'https://images.unsplash.com/photo-1515516969-d4008cc6241a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
                steps: 'Chop vegetables.|Mix olive oil and vinegar for dressing.|Combine all ingredients and toss.',
                ingredients: {
                    create: [
                        {
                            name: 'Cucumber',
                            store: 'Walmart',
                            price: '0.68',
                            currency: 'USD',
                            link: 'https://www.walmart.com/ip/Fresh-Cucumber-Each/44390948',
                        },
                        {
                            name: 'Tomatoes',
                            store: 'Walmart',
                            price: '1.48',
                            currency: 'USD',
                            link: 'https://www.walmart.com/ip/Fresh-Roma-Tomato-1-lb/44390949',
                        },
                        {
                            name: 'Red Onion',
                            store: 'Walmart',
                            price: '0.98',
                            currency: 'USD',
                            link: 'https://www.walmart.com/ip/Fresh-Red-Onion-Each/44390950',
                        },
                        {
                            name: 'Feta Cheese',
                            store: 'Walmart',
                            price: '3.98',
                            currency: 'USD',
                            link: 'https://www.walmart.com/ip/Athenos-Traditional-Crumbled-Feta-Cheese-6-oz/10448266',
                        },
                        {
                            name: 'Kalamata Olives',
                            store: 'Walmart',
                            price: '4.98',
                            currency: 'USD',
                            link: 'https://www.walmart.com/ip/Mario-Camacho-Pitted-Kalamata-Olives-6-oz/10448267',
                        },
                    ],
                },
                tags: { connect: [{ id: tags[0].id }, { id: tags[3].id }] },
            },
        }),
        prisma.recipe.create({
            data: {
                title: 'Avocado Toast',
                description: 'Simple and nutritious breakfast option.',
                imageURL:
                    'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80',
                steps: 'Toast bread.|Mash avocado.|Spread avocado on toast.|Add toppings as desired.',
                ingredients: {
                    create: [
                        {
                            name: 'Whole Wheat Bread',
                            store: 'Walmart',
                            price: '2.48',
                            currency: 'USD',
                            link: 'https://www.walmart.com/ip/Nature-s-Own-100-Whole-Wheat-Bread-20-oz-Loaf/10535103',
                        },
                        {
                            name: 'Avocado',
                            store: 'Walmart',
                            price: '0.98',
                            currency: 'USD',
                            link: 'https://www.walmart.com/ip/Fresh-Hass-Avocado-Each/44390951',
                        },
                        {
                            name: 'Lemon',
                            store: 'Walmart',
                            price: '0.54',
                            currency: 'USD',
                            link: 'https://www.walmart.com/ip/Fresh-Lemon-Each/44390952',
                        },
                        {
                            name: 'Red Pepper Flakes',
                            store: 'Walmart',
                            price: '1.98',
                            currency: 'USD',
                            link: 'https://www.walmart.com/ip/Great-Value-Crushed-Red-Pepper-1-5-oz/10315300',
                        },
                    ],
                },
                tags: {
                    connect: [
                        { id: tags[1].id },
                        { id: tags[3].id },
                        { id: tags[4].id },
                    ],
                },
            },
        }),
        prisma.recipe.create({
            data: {
                title: 'Vegetable Stir Fry',
                description: 'Quick and healthy vegetable stir fry.',
                imageURL:
                    'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80',
                steps: 'Chop vegetables.|Heat oil in a wok.|Stir fry vegetables.|Add sauce and serve.',
                ingredients: {
                    create: [
                        {
                            name: 'Mixed Vegetables',
                            store: 'Walmart',
                            price: '2.98',
                            currency: 'USD',
                            link: 'https://www.walmart.com/ip/Great-Value-Mixed-Vegetables-12-oz/10451475',
                        },
                        {
                            name: 'Soy Sauce',
                            store: 'Walmart',
                            price: '1.98',
                            currency: 'USD',
                            link: 'https://www.walmart.com/ip/Great-Value-Soy-Sauce-15-fl-oz/10451476',
                        },
                        {
                            name: 'Sesame Oil',
                            store: 'Walmart',
                            price: '3.98',
                            currency: 'USD',
                            link: 'https://www.walmart.com/ip/Kadoya-Pure-Sesame-Oil-5-5-fl-oz/10451477',
                        },
                        {
                            name: 'Garlic',
                            store: 'Walmart',
                            price: '0.98',
                            currency: 'USD',
                            link: 'https://www.walmart.com/ip/Fresh-Garlic-Each/44390953',
                        },
                    ],
                },
                tags: {
                    connect: [
                        { id: tags[0].id },
                        { id: tags[1].id },
                        { id: tags[3].id },
                    ],
                },
            },
        }),
        prisma.recipe.create({
            data: {
                title: 'Banana Pancakes',
                description:
                    'Fluffy banana pancakes for a delicious breakfast.',
                imageURL:
                    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80',
                steps: 'Mash bananas.|Mix with other ingredients.|Cook on griddle.|Serve with maple syrup.',
                ingredients: {
                    create: [
                        {
                            name: 'Bananas',
                            store: 'Walmart',
                            price: '0.58',
                            currency: 'USD',
                            link: 'https://www.walmart.com/ip/Fresh-Banana-Each/44390954',
                        },
                        {
                            name: 'All-Purpose Flour',
                            store: 'Walmart',
                            price: '1.98',
                            currency: 'USD',
                            link: 'https://www.walmart.com/ip/Great-Value-All-Purpose-Flour-5-lb/10315162',
                        },
                        {
                            name: 'Milk',
                            store: 'Walmart',
                            price: '2.78',
                            currency: 'USD',
                            link: 'https://www.walmart.com/ip/Great-Value-Whole-Vitamin-D-Milk-1-Gallon-128-fl-oz/10450114',
                        },
                        {
                            name: 'Maple Syrup',
                            store: 'Walmart',
                            price: '4.98',
                            currency: 'USD',
                            link: 'https://www.walmart.com/ip/Great-Value-100-Pure-Maple-Syrup-12-5-fl-oz/10315169',
                        },
                    ],
                },
                tags: { connect: [{ id: tags[1].id }, { id: tags[4].id }] },
            },
        }),
    ])
    console.log('Recipes created:', recipes)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
