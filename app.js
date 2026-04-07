const express = require(`express`)
const app = express();
const port = 3000;

app.use(express.json());

let books = [
    {
        id: 1,
        title: 'Cien años de soledad',
        author: 'Grabriel Garcia Márquez'
    },
      {
        id: 2,
        title: 'Don Quijote',
        author: 'Miguel de Cervantes'
    }
];



//todos los libros
app.get('/api/books', (req,res) => {
    res.json(books);
});

//todos los libros por ID
app.get('/api/books/:id', (req,res) => {
    
    const id = parseInt(req.params.id);

    const book = books.find(b => b.id === id);

    if(!book) {
        return res.status(404).json({
            message: 'Libro no encontrado'
        });
    }

    res.json(book);
});

//crear un nuevo libro
app.post('/api/books', (req,res) => {

const {title, author} = req.body;

if (!title || !author) {
    return res.status(400).json({
        message: 'Datos obliigatorios'
    });
}

const newBook = {
    id: books.length > 0 ? books [books.length - 1].id + 1 : 1,
    title,
    author
}

books.push(newBook);

res.status(201).json(newBook);

});


app.get (`/`, (req, ress) => {
    ress.send(`Hello Amigos!`);
});

app.listen(port, () => {
    console.log(`Servidor corriendo em http://localhost:${port}`);
});