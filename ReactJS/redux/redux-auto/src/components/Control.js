import React, { Component, PropTypes } from 'react';
const propTypes = {
  onPlus: PropTypes.func,
  onSubstract:PropTypes.func,
  onRandomizeColor:PropTypes.func
};

function createWarning(funcName){
  return () => console.warn(funcName +' is not defined');
}

const defaultProps = {
  onPlus : createWarning('onPlus'),
  onSubstract : createWarning('onSubstract'),
  onRandomizeColor : createWarning('onRandomizeColor')
};
class Control extends Component {

    render() {
        return(
            <div>
              <button onClick={this.props.onPlus}>+</button>
              <button onClick={this.props.onSubstract}>-</button>
              <button onClick={this.props.onRandomizeColor}>Random color</button>
            </div>
        );
    }
}
Control.propTypes = propTypes;
Control.defaultProps = defaultProps;
export default Control;
