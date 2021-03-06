import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from '../queries/queries';

class AddBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      genre: '',
      authorId: ''
    };
  }

  submitForm(e) {
    e.preventDefault();
    if (this.state.name === '') {
      alert('Name is required!');
      return;
    }
    if (this.state.genre === '') {
      alert('Genre is required!');
      return;
    }
    if (this.state.authorId === '') {
      alert('Author is required!');
      return;
    }
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{query: getBooksQuery}]
    }).then(data => {
      this.setState({
        name: '',
        genre: '',
        authorId: ''
      })
    });
  }

  displayAuthors() {
    const data = this.props.getAuthorsQuery;
    if (data.loading) {
      return (<option disabled>Loading Authors ...</option>)
    }
    else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }

  render() {
    const {
      name, genre, authorId
    } = this.state;
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            onChange={(e) => {this.setState({name: e.target.value})}}
            value={name}
          />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={(e) => {this.setState({genre: e.target.value})}}
            value={genre}
          />
        </div>

        <div className="field">
          <label>Author:</label>
          <select
            onChange={(e) => {this.setState({authorId: e.target.value})}}
            value={authorId}
          >
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button><span>+</span></button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, {name: 'getAuthorsQuery'}),
  graphql(addBookMutation, {name: 'addBookMutation'})
)(AddBook);