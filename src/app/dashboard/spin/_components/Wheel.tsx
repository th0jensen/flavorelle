'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Application, Container, Graphics, Text } from 'pixi.js'
import type { RecipeWithNested } from '~/app/dashboard/_components/RecipeListItem'

const COLORS = [
    0xff6b6b, 0x4ecdc4, 0x45b7d1, 0xffa07a, 0x98d8c8, 0xf67280, 0xc06c84,
    0x6c5b7b, 0x355c7d, 0xf8b195,
]

interface WheelProps {
    recipesProps: RecipeWithNested[]
}

const Wheel: React.FC<WheelProps> = ({ recipesProps }) => {
    const wheelRef = useRef<HTMLDivElement>(null)
    const appRef = useRef<Application | null>(null)
    const wheelContainerRef = useRef<Container | null>(null)
    const tickerRef = useRef<Graphics | null>(null)
    const [winningItem, setWinningItem] = useState<string | null>(null)
    const [isSpinning, setIsSpinning] = useState(false)
    const [recipes, setRecipes] = useState<RecipeWithNested[]>(recipesProps)

    const randomizeRecipes = () => {
        const shuffled = [...recipes].sort(() => Math.random() - 0.5)
        setRecipes(shuffled)
    }

    const createWheel = useCallback(() => {
        if (!appRef.current || recipes.length < 2 || recipes.length > 100)
            return

        // Clear existing wheel if any
        if (wheelContainerRef.current) {
            appRef.current.stage.removeChild(wheelContainerRef.current)
        }

        const wheel = new Container()
        wheelContainerRef.current = wheel
        appRef.current.stage.addChild(wheel)

        const radius = 200
        const centerX = 250
        const centerY = 250

        recipes.forEach((recipe, index) => {
            const slice = new Graphics()
            const startAngle = (index / recipes.length) * Math.PI * 2
            const endAngle = ((index + 1) / recipes.length) * Math.PI * 2

            slice.beginFill(COLORS[index % COLORS.length]!)
            slice.moveTo(0, 0)
            slice.arc(0, 0, radius, startAngle, endAngle)
            slice.lineTo(0, 0)
            slice.endFill()

            const text = new Text(recipe.title, {
                fontFamily: 'Arial',
                fontSize: 12,
                fill: 0xffffff,
                align: 'center',
            })
            text.anchor.set(0.5)
            text.position.set(
                Math.cos((startAngle + endAngle) / 2) * (radius / 2),
                Math.sin((startAngle + endAngle) / 2) * (radius / 2),
            )

            const sliceContainer = new Container()
            sliceContainer.addChild(slice)
            sliceContainer.addChild(text)
            wheel.addChild(sliceContainer)
        })

        wheel.position.set(centerX, centerY)

        // Create ticker only if it doesn't exist
        if (!tickerRef.current) {
            const ticker = new Graphics()
            ticker.beginFill(0x000000)
            ticker.drawPolygon([10, 20, 20, 0, 0, 0])
            ticker.endFill()
            ticker.position.set(centerX, centerY - radius - 10)
            appRef.current.stage.addChild(ticker)
            tickerRef.current = ticker
        }
    }, [recipes])

    useEffect(() => {
        if (!wheelRef.current) return

        const initApp = async () => {
            if (!appRef.current) {
                const app = new Application()
                await app.init({
                    width: 500,
                    height: 500,
                    backgroundAlpha: 0,
                })
                appRef.current = app
                wheelRef.current?.appendChild(appRef.current.canvas)
            }
            createWheel()
        }

        initApp().catch((err) => {
            console.error(err)
        })

        return () => {
            if (appRef.current) {
                appRef.current.destroy(true)
                appRef.current = null
            }
        }
    }, [createWheel])

    const getWinningItem = useCallback(
        (finalRotation: number) => {
            if (recipes.length === 0) return null

            const normalizedRotation =
                ((finalRotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
            const sliceAngle = (Math.PI * 2) / recipes.length
            const topPosition = (3 * Math.PI) / 2
            const slicesFromTop = Math.floor(
                ((topPosition - normalizedRotation + Math.PI * 2) %
                    (Math.PI * 2)) /
                sliceAngle,
            )
            const winningIndex = slicesFromTop % recipes.length

            return recipes[winningIndex]?.title ?? null
        },
        [recipes],
    )

    const spin = useCallback(() => {
        if (
            !wheelContainerRef.current ||
            !tickerRef.current ||
            recipes.length === 0 ||
            isSpinning
        )
            return

        setIsSpinning(true)
        setWinningItem(null)

        const wheel = wheelContainerRef.current
        const spinDuration = 10000 // 10 seconds
        const maxRotations = 10 + Math.random() // Random number of full rotations plus a partial rotation
        const startTime = Date.now()

        const animate = () => {
            const elapsedTime = Date.now() - startTime
            const progress = Math.min(elapsedTime / spinDuration, 1)
            const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
            const rotation = maxRotations * Math.PI * 2 * easeOut(progress)
            wheel.rotation = rotation

            if (progress < 1) {
                requestAnimationFrame(animate)
            } else {
                const winner = getWinningItem(rotation)
                setWinningItem(winner)
                setIsSpinning(false)
            }
        }

        animate()
    }, [recipes, isSpinning, getWinningItem])

    return (
        <div className='flex w-full flex-col items-center justify-center'>
            <div ref={wheelRef}></div>
            <div className='flex gap-4'>
                <button className='btn input-bordered'
                    onClick={randomizeRecipes}>Randomize
                </button>
                <button
                    className='btn input-bordered'
                    onClick={spin}
                    disabled={isSpinning || recipes?.length === 0}
                >
                    {isSpinning ? 'Spinning...' : 'Spin'}
                </button>
            </div>
            <br />
            {winningItem && <p className='text-xl font-bold'>Winning item: {winningItem}</p>}
        </div>
    )
}

export default Wheel
