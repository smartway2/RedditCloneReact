import React, { Component } from 'react';

class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {
          this.props.comments.map((y,z) => {
            return(
              <div key={z}>
                <div>
                  <div className="col-md-offset-1">
                    <br />
                    <p>
                      {y.content}
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
}


export default Comments;
