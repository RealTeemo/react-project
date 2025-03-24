import { getMeal } from "@/lib/meals"
import Image from "next/image"
import classes from "./page.module.css"
import { notFound } from "next/navigation"

export async function generateMetadata({params}) {
    const meal = await getMeal(params.mealSlug)
    if(!meal) {
        return notFound()
    }
    return { title: meal.title,
        description: meal.summary
    }
}

export default async function MealDetails({params}) {
    const meal = await getMeal(params.mealSlug)
    if(!meal) {
        notFound()
    }

    meal.instructions = meal.instructions.replaceAll('\n', '<br>')
    return (
        <> 
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image fill alt={meal.title} src={meal.image} />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p className={classes.instructions} 
                    dangerouslySetInnerHTML={{__html: meal.instructions}} 
                />  
            </main>
        </>
    )
}
