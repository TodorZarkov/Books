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
        const bookId = 1;
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
});