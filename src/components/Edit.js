import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }

  componentWillMount(){
    console.log(this.props.router)
    console.log(this.props.match.params.id);
    this.populate();
  }

  populate(){
    axios.get(`http://10.2.17.209:7000/api/posts/${this.props.match.params.id}`).then((res) => {
      console.log('axios', res);
      console.log(this.state);
      this.setState({ postData: res.data});
      this.setState({ postDataFull: res.data});
      this.refs.author.value = res.data.author;
      this.refs.body.value = res.data.body;
      this.refs.image_url.value = res.data.image_url;
      this.refs.title.value = res.data.title;
    });
  }

  submitIt(e){
    e.preventDefault();
    axios.post(`http://10.2.17.209:7000/api/posts/${this.props.match.params.id}`, {
      author: this.refs.author.value,
      body: this.refs.body.value,
      image_url: this.refs.image_url.value,
      title: this.refs.title.value
    }).then((res) => {
      console.log('axios', res);
      this.setState({ redirect: true });
    });
  }

  render() {
    if(this.state.redirect){
      return (<Redirect to={{pathname: '/'}}/>);
    }

    return (
      <div className="container-fluid">
        <form ref="forma" onSubmit={this.submitIt.bind(this)}>
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
              Confirm Changes
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Edit;
