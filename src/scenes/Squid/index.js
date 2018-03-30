// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createProject } from 'actions';
import { Button } from 'components';

type Props = {
  createProject: Function
};

class SquidPage extends Component<Props> {
  constructor(props) {
    super(props);
    const _this: any = this;
    _this.createProject = this.createProject.bind(this);
  }

  createProject() {
    // this.props.createProject('');
  }

  render() {
    return (
      <div>
        {/* <Button onClick={this.createProject}>Create new project</Button> */}
        {/* <input type="file" onChange={this.onFileChange} /> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    createProject: bindActionCreators(createProject, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(SquidPage));
