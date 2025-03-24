import fs from "fs"
import sql from "better-sqlite3"
import slugify from "slugify"
import xss from "xss"

const db = sql("meals.db")

export async function getMeals() {
    //fetch all meals from the database
    await new Promise(resolve => setTimeout(resolve, 2000))
    return db.prepare("SELECT * FROM meals").all()
}

export async function getMeal(slug) {
    //fetch a single meal from the database
    
    return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug)
}

export async function saveMeal(mealData) {
    // 1. Create a URL-friendly slug from the meal title
    mealData.slug = slugify(mealData.title, { lower: true});
    
    // 2. Sanitize the instructions to prevent XSS attacks
    mealData.instructions = xss(mealData.instructions)

    // 3. Extract the file extension from the uploaded image
    const extension = mealData.image.name.split('.').pop();
    // 4. Create a new filename using the slug and original extension
    const filename = `${mealData.slug}.${extension}`

    // 5. Define the path where the image will be saved
    const imagePath = `public/images/${filename}`
    // 6. Create a write stream to save the image
    const stream = fs.createWriteStream(imagePath)
    // 7. Convert the image data to an array buffer
    const bufferImage = await mealData.image.arrayBuffer()

    // 8. Write the image to the filesystem
    stream.write(Buffer.from(bufferImage), (error) => {
        if(error) {
            throw new Error("Failed to save image")
        }
    })

    // 9. Update the image path in the meal data to be the public URL
    mealData.image = `/images/${filename}`
    
    // 10. Insert all the meal data into the database
    db.prepare("INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug) VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)").run(mealData)
    
    // 11. Return a success message
    return { message: "Meal created successfully"}
}
