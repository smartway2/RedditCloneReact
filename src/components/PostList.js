import React, { Component } from 'react';
import axios from 'axios';
import Comments from './Comments';
import CommentsAdd from './CommentsAdd';
import Form from './Form';

import { Nav as Nav2, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Moment from 'react-moment';


class PostList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allPosts: [],
      sort: 'Votes',
      showForm: false,
      allPostsFull: []
    }
  }

  componentWillMount() {
    axios.get('http://10.2.17.209:7000/api/posts').then((res) => {
      console.log('axios', res);
      this.setState({ allPosts: res.data});
      this.setState({allPostsFull: res.data});
      this.sortPosts();
    });
  }

  updateAllPosts(){
    axios.get('http://10.2.17.209:7000/api/posts').then((res) => {
      this.setState({allPosts: res.data});
      this.sortPosts();
      this.setState({allPostsFull: res.data});
    })
  }

  toggleForm(){
    console.log('toggle', this);
    this.setState({ showForm: !this.state.showForm});
  }

  toggleComments(post, e){
    let newState = this.state.allPosts;
    newState[newState.indexOf(post)].showComments = !newState[newState.indexOf(post)].showComments;
    this.setState({ allPosts: newState });
    console.log('e', e);
  }

  updateComments(post){
    let newState = this.state.allPosts;
    axios.get(`http://10.2.17.209:7000/api/posts/${post.id}/comments`)
      .then((res) => {
        console.log(res)
        newState[newState.indexOf(post)].comments = res.data;
        this.setState({ allPosts: newState });
      })
  }

  downVote(id){
    axios.delete(`http://10.2.17.209:7000/api/posts/${id}/votes`)
      .then((res) => {
        console.log('downvote', res);
        this.updateAllPosts();
      })
  }

  upVote(id){
    axios.post(`http://10.2.17.209:7000/api/posts/${id}/votes`, {})
      .then((res) => {
        console.log('UPVOTE!!', res);
        this.updateAllPosts();
      })
  }

  addPost(newPost) {
    let newArr = this.state.allPosts;
    newArr.push(newPost);
  }

  toggleSort(key){
    this.setState({ sort: key}, function(){this.sortPosts()});
  }

  sortPosts(){
    let newOrder = this.state.allPosts;
    if(this.state.sort === 'Votes'){
      newOrder = newOrder.sort((a, b) => {
        console.log(a.vote_count - b.vote_count);
        return b.vote_count - a.vote_count;
      });
      this.setState({ allPosts: newOrder});
    } else if(this.state.sort === 'Date'){
      newOrder = newOrder.sort((a, b) => {
        a = new Date(a.created_at).getTime();
        b = new Date(b.created_at).getTime();
        return a - b;
      });
      this.setState({ allPosts: newOrder});
    } else {
      newOrder = newOrder.sort((a, b) => {
        if(a.title.toUpperCase() > b.title.toUpperCase()){
          return 1;
        } else if(a.title.toUpperCase() < b.title.toUpperCase()){
          return -1;
        } else {
          return 0;
        }
      })
      this.setState({ allPosts: newOrder});
    }
  }

  titleFilter(){
    let filteredList = this.state.allPostsFull.filter((x) => {
      return x.title.toLowerCase().search(this.refs.filter.value.toLowerCase()) > -1;
    })
    this.setState({ allPosts: filteredList}, function(){this.sortPosts()});
  }

  render() {
    return (
      <main className="container-fluid">
        <div className="pull-right">
          <p><a className="btn btn-info" onClick={this.toggleForm.bind(this)}>New Post</a></p>
        </div>
        <div className="row">
          <div className="col-md-2">
            <input type="search" ref="filter" onChange={this.titleFilter.bind(this)} className="form-control input-sm search-form" placeholder="Filter" />
          </div>
          <div className="col-md-2">
            <Nav2>
              <NavDropdown className="d-inline-block" title={`Sort By ${this.state.sort}`} id="nav-dropdown" onSelect={this.toggleSort.bind(this)}>
                <MenuItem eventKey="Date">Sort By Date</MenuItem>
                <MenuItem eventKey="Title">Sort By Title</MenuItem>
                <MenuItem eventKey="Votes">Sort By Votes</MenuItem>
              </NavDropdown>
            </Nav2>
          </div>
        </div>
        {
          function(){
            if (this.state.showForm){
              return <Form updateAllPosts={this.updateAllPosts.bind(this)} toggleForm={this.toggleForm.bind(this)} />
            }
          }.bind(this)()
        }
        {this.state.allPosts.map((x) => {
          return (
            <div className="row" key={x.id}>
              <div className="col-md-12">
                <div className="well">
                  <div className="media-left">
                    <img src={x.image_url} className="media-object" style={{width:200, height:200}} alt='' />
                    <Link to={`/edit/${x.id}`}>edit</Link>
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">
                      {x.title}
                      |
                      <a onClick={this.upVote.bind(this, x.id)}><i className="glyphicon glyphicon-arrow-up"></i></a>
                      <a onClick={this.downVote.bind(this, x.id)}><i className="glyphicon glyphicon-arrow-down"></i></a>
                      {+x.vote_count}
                    </h4>
                    <div className="text-right">
                      {x.author}
                    </div>
                    <p>
                      {x.body}
                    </p>
                    <div>
                      <Moment toNow ago>{x.created_at}</Moment> ago
                      |
                      <i className="glyphicon glyphicon-comment" onClick={this.toggleComments.bind(this, x)}></i>
                      <a onClick={this.toggleComments.bind(this, x, event)}>
                        {x.comments.length} {x.comments.length === 1 ? 'Comment' : 'Comments'}
                      </a>
                    </div>
                    {
                      function(){
                        if(x.showComments){
                          return(
                            <div>
                              <Comments comments={x.comments} />
                              <CommentsAdd post={x} updateComments={this.updateComments.bind(this)}/>
                            </div>
                          );
                        }
                      }.bind(this)()
                    }
                  </div>
                </div>
              </div>
            </div>
          )
        })
        }
      </main>
          );
  }
}

export default PostList;
