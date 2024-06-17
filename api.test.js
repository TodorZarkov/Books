const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Book API', () => {
    let bookId;
    it('should POST a book', (done) => {
        const book = {
            id: "1",
            title: "Test Title",
            author: "Test Author"
        };
        chai.request(server)
            .post('/books')
            .send(book)
            .end((err,res)=> {
                expect(res).to.have.status(201);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('author');
                bookId = res.body.id;
                done();
            });
    })

    it('should GET all books', (done) => {
        chai.request(server)
            .get('/books')
            .end((err,res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                done();
            });
    });

    it('shoud get a single book', (done) => {
        //const bookId = 1;
        chai.request(server)
            .get(`/books/${bookId}`)
            .end((err,res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('author');
                done();
            });
    });

    it('should PUT an existing book', done => {
        //const bookId = 1;
        const updatedBook = {
            id: bookId,
            title: "Updated Title",
            author: "Updated Author"
        };
        chai.request(server)
            .put(`/books/${bookId}`)
            .send(updatedBook)
            .end((err,res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.title).to.equal(updatedBook.title);
                expect(res.body.author).to.equal(updatedBook.author);
                done();
            });
    });

    it('should DELETE an existing book', done => {
        //const bookId = 1;
        chai.request(server)
            .delete(`/books/${bookId}`)
            .end((err, res) => {
                expect(res).to.have.status(204);
                done();
            });
    });

    it('should return 404 when trying to GET, PUT or DELETE non-existing book', (done) => {
        let nonExistingBookId = "9999";
        const nonExistingBook = {
            id: nonExistingBookId,
            title: "Test Title",
            author: "Test Author"
        };

        chai.request(server)
        .get(`/books/${nonExistingBookId}`)
        .end((err,res) => {
            expect(res).to.have.status(404);
        });
        chai.request(server)
        .put(`/books/${nonExistingBookId}`)
        .end((err, res) => {
            expect(res).to.have.status(404);
        });
        chai.request(server)
        .delete(`/books/${nonExistingBookId}`)
        .end((err, res) => {
            expect(res).to.have.status(404);
            done();
        });
    });
});