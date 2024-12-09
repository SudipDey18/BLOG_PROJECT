const db = require('../config/db');

const UsersTableCreate = async ()=>{
    const createTable = `CREATE TABLE IF NOT EXISTS Users (
        Name VARCHAR(50),
        Email VARCHAR(25),
        Password VARCHAR(15)
    )`

    await db.query(createTable);
}

const createUser = async (user) => {
    const Create_query = `INSERT INTO Users
    (Name, Email, Password)
    VALUES
    (?, ?, ?)`;
    await UsersTableCreate();
    try{
        db.query(Create_query, [user.Name, user.Email, user.Password])
        console.log("A");
        const allUsers = await getAllUser();
        console.log("D");
        console.log(allUsers);
        return allUsers;
    }catch(err){ return err};
};

const getAllUser = async() => {
    console.log("B");
    const allUserQuery = `SELECT * FROM Users`
    console.log("C");
    const [users] = await db.query(allUserQuery);
    console.log(users);
    return users;
};


module.exports = { createUser, getAllUser };