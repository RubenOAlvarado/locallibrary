const Author = require('../models/author');
const Book = require('../models/book');
const async = require('async');

//Muestra la lista de todos los autores
exports.author_list = (req, res, next) => {
    Author.find()
        .sort([
            ['family_name', 'ascending']
        ])
        .exec((err, list_authors) => {
            if (err) return next(err);
            console.log(list_authors);
            res.render('author_list', { title: 'Author List', author_list: list_authors });
        });
}

//Muestra la pagina de detalle de cada author
exports.author_detail = (req, res, next) => {
    async.parallel({
        author: (callback) => Author.findById(req.params.id).exec(callback),
        author_books: (callback) => Book.find({ 'author': req.params.id }, 'title summary').exec(callback),
    }, (err, results) => {
        if (err) return next(err);
        if (results.author == null) { // No results.
            let err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.author_books });
    });
}

//Muestra el formulario para crear un autor en get
exports.author_create_get = (req, res) => res.send('NOT IMPLEMENTED: Author create GET');

//Maneja la creacion de un autor en POST
exports.author_create_post = (req, res) => res.send('NOT IMPLEMENTED: Author created on post');

//Muestra el formulario para eliminar en un get
exports.author_delete_get = (req, res) => res.send('NOT IMPLEMENTED: Author delete GET');

//Maneja la eliminacion de un author en post
exports.author_delete_post = (req, res) => res.send('NOT IMPLEMENTED: Author delete POST');

//Muestra el formulario para actualizar un autor
exports.author_update_get = (req, res) => res.send('NOT IMPLEMENTED: Author update GET');

// Maneja la actualizacion de un autor en POST
exports.author_update_post = (req, res) => res.send('NOT IMPLEMENTED: Author update POST');