import React from 'react';
import { Text, View } from 'react-native';

export default ViewMoreText = React.createClass({
  propTypes: {
    renderViewMore: React.PropTypes.func,
    renderViewLess: React.PropTypes.func,
    numberOfLines: React.PropTypes.number.isRequired,
    truncatedHeight: React.PropTypes.number.isRequired
  },

  getInitialState(){
    return {
      shouldShowMore: false,
      numberOfLines: this.props.numberOfLines
    }
  },

  onLayout(event){
    const {x, y, width, height} = event.nativeEvent.layout;
    
    if(height > this.props.truncatedHeight){
      this.setState({
        shouldShowMore: true
      })
    }
  },

  onPressMore(){
    this.setState({
      numberOfLines: null
    });
  },

  onPressLess(){
    this.setState({
      numberOfLines: this.props.numberOfLines
    })
  },

  renderViewMore(){
    return (
      <Text onPress={this.onPressMore}>
        View More
      </Text>
    )
  },
  
  renderViewLess(){
    return (
      <Text onPress={this.onPressLess}>
        View Less
      </Text>
    )
  },

  renderFooter(){
    let {
      shouldShowMore,
      numberOfLines
    } = this.state;

    if (shouldShowMore === true){
      if(numberOfLines > 0) {
        return (this.props.renderViewMore || this.renderViewMore)(this.onPressMore);
      } else {
        return (this.props.renderViewLess || this.renderViewLess)(this.onPressLess);
      }
    }
  },

  render(){
    return (
      <View onLayout={this.onLayout}>
        <Text
          numberOfLines={this.state.numberOfLines}>
          {this.props.children}
        </Text>

        {this.renderFooter()}
      </View>
    )
  }

})

