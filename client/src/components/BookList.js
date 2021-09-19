import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getBooksQuery } from '../queries/queries';

// import components
import BookDetails from './BookDetails';

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookId: null
    };
  }

  displayBooks() {
    const data = this.props.data;
    
    if (data.loading) {
      return (<div>Loading Books ...</div>);
    }
    else {
      return data.books.map(book => (
        <li
          key={book.id}
          onClick={e => this.setState({bookId: book.id})}
        >
          { book.name }
        </li>
      ));
    }
  }

  render() {
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
        <BookDetails bookId={this.state.bookId} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);