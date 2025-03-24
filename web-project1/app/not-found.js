'use client'
import { usePathname } from "next/navigation"

export default function NotFound() {
    const pathname = usePathname()
    return (
        <main className="not-found">
            <h1>Not Found</h1>
            <p>Unfortunately, we could not find the requested resource: {pathname}</p>
        </main>
    )
}
