import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import books from './data/books.js'
import User  from './models/userModel.js'
import Book  from './models/bookModel.js'
import Order from './models/order.js'
import connectDB from './models/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Order.deleteMany()
        await Book.deleteMany()
        await User.deleteMany()

        const createdUsers= await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleBooks = books.map(book => {
            return {...book, user: adminUser}
        })

        await Book.insertMany (sampleBooks)
        console.log ('Data Imported')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
        
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Book.deleteMany()
        await User.deleteMany()

        
        console.log ('Data Destroyed')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
        
    }
}
if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}