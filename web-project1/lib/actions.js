'use server'
import { redirect } from 'next/navigation'
import { saveMeal } from './meals'

function isInvalid(text) {
    return !text || text.trim() === ''
}

export async function shareMealHandler(prevState, formData) {
    const data = {
        creator: formData.get('name'),
        creator_email: formData.get('email'),
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
    }
    if( isInvalid(data.creator) || 
        isInvalid(data.creator_email) || 
        isInvalid(data.title) || 
        isInvalid(data.summary) || 
        isInvalid(data.instructions) || 
        !data.creator_email.includes('@') ||
        !data.image || data.image.size === 0
        ) {
        return { message: "Invalid data"}
    }
    await saveMeal(data)
    revalidatePath('/meals')
    redirect('/meals')
}