const Book = require('./book.model');

// All logic for books
const postAbook = async (req, res) => {
  try {
    const newBook =  await Book({...req.body});
    await newBook.save();
    res.status(201).send({message: 'Book created successfully', book: newBook});
  } catch (error) {
    console.log('Error in creating book', error);
    res.status(500).send({message: 'Internal server error'});
          
  }
};



const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({createdAt: -1});
    res.status(200).send({books});

  } catch (error) {
    console.log('Error in fetching book', error);
    res.status(500).send({message: 'Internal server error'});
        
  }
};


const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      console.log('No ID provided');
      return res.status(400).send({message: 'Book ID is required'});
    }

    const book = await Book.findById(id);

    if(!book) {
      console.log('No book found with id:', id);
      return res.status(404).send({message: 'Book not found'});
    }

    return res.status(200).send(book);
  } catch (error) {
    console.log('Error in fetching book:', error.message);
    if (error.name === 'CastError') {
      return res.status(400).send({message: 'Invalid book ID format'});
    }
    return res.status(500).send({message: 'Internal server error'});
  }
};

const updateBook = async (req, res) => {
  try {
    const {id} = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new: true});
    if(!updatedBook) {
      res.status(404).send({message: 'Book not found'});
    }
    res.status(200).send({message: 'Book updated successfully', book: updatedBook});

       
  } catch (error) {
    console.error('Error in updating book', error);
    res.status(500).send({message: 'Internal server error'});
        
  }
};

const deleteBook = async (req, res) => {
  try {
    const {id} = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if(!deletedBook) {
      res.status(404).send({message: 'Book not found'});
    }
    res.status(200).send({message: 'Book deleted successfully', book: deletedBook});
  } catch (error) {
    console.error('Error in deleting book', error);
    res.status(500).send({message: 'Internal server error'});
  }
};   


module.exports = {postAbook, getAllBooks, getSingleBook, updateBook, deleteBook};




