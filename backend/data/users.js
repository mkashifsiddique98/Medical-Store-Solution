
import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'alshifa@admin.com',
        password : bcrypt.hashSync('123456', 10),
        isAdmin : true
    },
    {
        name: 'kashif Siddique',
        email: 'kashif@example.com',
        password :  bcrypt.hashSync('123456', 10)
    },
    {
        name: 'abu bakar',
        email: 'bakar@example.com',
        password :  bcrypt.hashSync('123456', 10)
    }
]

export default users