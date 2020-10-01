import express from 'express';
import { connect, disconnect } from "./database";
import Books from "./models/bookModel";

connect();

const server = express();
const PORT = 5000;

server.get('/books', async (req, res) => {
    try {
        const books = await Books.find({});
        console.log(books);
        return res.json(books);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
})

server.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
})