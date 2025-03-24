import classes from "./page.module.css"
import Link from "next/link"
import { getMeals } from "@/lib/meals"
import MealsGrid from "@/components/meals/meals-grid"
import { Suspense } from "react"

async function Meals(){
    const meals = await getMeals()
    return (
        <MealsGrid meals={meals} />
    )
}
export default function MealsPage() {
    
    return (
        <>
            <header className={classes.header}>
                <h1 className={classes.highlight}>Meals</h1>
                <p>
                    choose your favorite meal from our broad selection of available meals
                </p>
                <p className={classes.cta}>
                    <Link href="/meals/share">Create your own meal</Link>
                </p>
            </header>
        <main className={classes.main}>
            <Suspense fallback={<p className={classes.loading}>Loading...</p>}>
                <Meals />
            </Suspense>
            </main>
        </>
    )
}