const connection = require('../config/connection');
const { User, Thought } = require('../models');

console.time('seeding');

const userData = [
    {
        username: "john_doe",
        email: "john.doe@example.com",
        thoughts: [],
        friends: []
    },
    {
        username: "jane_smith",
        email: "jane.smith@example.com",
        thoughts: [],
        friends: []
    },
    {
        username: "alex_jones",
        email: "alex.jones@example.com",
        thoughts: [],
        friends: []
    }
];

// Function to seed data
connection.once('open', async () => {
    // Delete the collections if they exist
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }

    await User.insertMany(userData);
    
    console.log("Database seeded!");

    console.table(userData);
    console.timeEnd('Seeding Complete 🌱');
    process.exit(0);
});
