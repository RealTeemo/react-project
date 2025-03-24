'use client'
import { useParams } from "next/navigation"

export default function NotFound() {
    const params = useParams()
    return (  
        <main className="not-found">
            <h1>Not Found</h1>
            <p>Unfortunately, we could not find the requested resource: {params.mealSlug}</p>
        </main>
    )
}
