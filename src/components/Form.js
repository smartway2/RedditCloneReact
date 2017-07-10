import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  addPost(e){
    e.preventDefault();
    console.log(this.refs);
    axios.post('http://10.2.17.209:7000/api/posts', {
      author: this.refs.author.value,
      body: this.refs.body.value,
      image_url: this.refs.image_url.value,
      title: this.refs.title.value
    }).then((res) => {
      console.log(res);
      this.refs.author.value = '';
      this.refs.body.value = '';
      this.refs.image_url.value = '';
      this.refs.title.value = '';
      this.props.toggleForm();
      this.props.updateAllPosts();
    })
  }
  render() {
    return (
      <div className="container-fluid">
        <form ref="forma" onSubmit={this.addPost.bind(this)}>
          <div>
            <label htmlFor="title">Title</label>
            <input ref="title" className="form-control" required="required" />
            <br />
          </div>
          <div>
            <label htmlFor="body">Body</label>
            <textarea ref="body" className="form-control" required="required"></textarea>
            <br />
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <input ref="author" className="form-control" required="required" />
            <br />
          </div>
          <div>
            <label htmlFor="image_url">Image URL</label>
            <input ref="image_url" className="form-control" required="required" />
            <br />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Create Post
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
