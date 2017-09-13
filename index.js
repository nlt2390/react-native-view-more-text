import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const emptyFunc = ()=>{};

export default ViewMoreText = React.createClass({
  propTypes: {
    style: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.array,
      React.PropTypes.object,
    ]),
    renderViewMore: React.PropTypes.func,
    renderViewLess: React.PropTypes.func,
    afterCollapse: React.PropTypes.func,
    afterExpand: React.PropTypes.func,
    numberOfLines: React.PropTypes.number.isRequired
  },
  isTruncated: false,
  originalHeight: 0,
  shouldShowMore: false,
  contentHeight: 0,
  isInit: false,

  getInitialState(){
    this.resetData();
    return {
      numberOfLines: null,
      opacity: 0
    }
  },

  componentDidUpdate(){
    if(this.state.numberOfLines === null){
      (this.props.afterExpand || emptyFunc)();
    } else {
      (this.props.afterCollapse || emptyFunc)();
    }
  },

  resetData(){
    this.isTruncated = false;
    this.originalHeight = 0;
    this.shouldShowMore = false;
    this.isInit = false;
  },

  componentWillReceiveProps(){
    this.resetData();

    this.setState({
      numberOfLines: null,
      opacity: 0
    })
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
      this.shouldShowMore = true;
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
      numberOfLines
    } = this.state;

    if(numberOfLines > 0) {
      return (this.props.renderViewMore || this.renderViewMore)(this.onPressMore);
    } else {
      return (this.props.renderViewLess || this.renderViewLess)(this.onPressLess);
    }
  },

  renderContent() {
    const {
      numberOfLines,
    } = this.state;

    const onTextPress = numberOfLines > 0 ? this.onPressMore : this.onPressLess;

    if (this.shouldShowMore) {
      return (
        <TouchableOpacity
          onLayout={this.onLayout}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={onTextPress}
        >
          <Text
            style={{maxWidth: '90%'}}
            numberOfLines={this.state.numberOfLines}>
            {this.props.children}
          </Text>
          <View>
            {this.renderFooter()}
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <Text
        numberOfLines={this.state.numberOfLines}>
        {this.props.children}
      </Text>
    );
  },

  render(){
    return (
      <View
        onLayout={this.onLayout}
        style={this.props.style}
      >
      { this.renderContent() }

      </View>
    )
  }

})
