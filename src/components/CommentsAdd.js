import React, { Component } from 'react';
import axios from 'axios';

class CommentsAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  addComment(e){
    e.preventDefault();
    console.log(this.props.post);
    console.log(this.refs.newComment.value);
    axios.post(`http://10.2.17.209:7000/api/posts/${this.props.post.id}/comments`, { content: this.refs.newComment.value})
      .then((res) => {
        console.log('posted!', res);
        this.props.updateComments(this.props.post);
        this.refs.newComment.value = '';
      })
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.addComment.bind(this)}>
        <div className="form-group">
          <input className="form-control" ref="newComment" name="newComment"/>
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-primary" />
        </div>
      </form>
    );
  }
}

export default CommentsAdd;
