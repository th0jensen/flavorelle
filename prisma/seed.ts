import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
    const hashedPassword = await bcrypt.hash('testuser', 10)
    const user = await prisma.user.create({
        data: {
            firstName: 'Test',
            lastName: 'User',
            email: 'test@test.com',
            password: hashedPassword,
        },
    })
    console.log(user)

    return user
}

main()
    .then(async () => {
        prisma
            .$disconnect()
            .then(() => process.exit(1))
            .catch(console.error)
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
