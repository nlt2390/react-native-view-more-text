import React from 'react';
import { Text, View } from 'react-native';

export default ViewMoreText = React.createClass({
  propTypes: {
    renderViewMore: React.PropTypes.func,
    renderViewLess: React.PropTypes.func,
    numberOfLines: React.PropTypes.number.isRequired
  },
  isTruncated: false,
  originalHeight: 0,

  getInitialState(){
    this.resetData();
    return {
      shouldShowMore: false,
      numberOfLines: null,
      opacity: 0
    }
  },

  resetData(){
    this.isTruncated = false;
    this.originalHeight = 0;
  },

  onLayout(event){
    const {x, y, width, height} = event.nativeEvent.layout;

    if(height === 0 || this.state.opacity === 1) return false;

    this.setOriginalHeight(height);
    this.checkTextTruncated(height);
    if(this.state.numberOfLines === this.props.numberOfLines){
      this.setState({
        opacity: 1
      })
    }
  },
  
  setOriginalHeight(height){
    if(this.originalHeight === 0){
      this.originalHeight = height;
      this.setState({
        numberOfLines: this.props.numberOfLines
      })
    }
  },

  checkTextTruncated(height){
    if(height < this.originalHeight){
      this.setState({
        shouldShowMore: true,
        opacity: 1
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
      <View onLayout={this.onLayout} style={{opacity: this.state.opacity}}>
        <Text
          numberOfLines={this.state.numberOfLines}>
          {this.props.children}
        </Text>

        {this.renderFooter()}
      </View>
    )
  }

})

