import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

class ViewMoreText extends React.Component {
  constructor(props) {
    super(props);
    this.resetData();

    this.state = {
      numberOfLines: null,
      opacity: 0,
      isRendering: true,
    };
  }

  componentWillReceiveProps() {
    this.resetData();

    this.setState({
      numberOfLines: null,
      opacity: 0,
      isRendering: true,
    });
  }

  componentDidUpdate() {
    if (this.state.numberOfLines === null) {
      this.props.afterExpand();
    } else {
      this.props.afterCollapse();
    }
  }

  onLayout = (event) => {
    const {
      height,
    } = event.nativeEvent.layout;

    if (height === 0 || !this.state.isRendering) return false;

    this.setOriginalHeight(height);
    this.checkTextTruncated(height);
    if (this.state.numberOfLines === this.props.numberOfLines) {
      setTimeout(() => {
        this.setState({
          isRendering: false,
        });
      }, 200);
    }
    return null;
  }

  onPressMore = () => {
    this.setState({
      numberOfLines: null,
    });
  }

  onPressLess = () => {
    this.setState({
      numberOfLines: this.props.numberOfLines,
    });
  }

  setOriginalHeight = (height) => {
    if (this.originalHeight === 0) {
      this.originalHeight = height;

      this.setState({
        numberOfLines: this.props.numberOfLines,
      });
    }
  }

  resetData = () => {
    this.isTruncated = false;
    this.originalHeight = 0;
    this.shouldShowMore = false;
    this.isInit = false;
  }

  checkTextTruncated = (height) => {
    if (height < this.originalHeight) {
      this.shouldShowMore = true;
    }
  }

  getWrapperStyle = () => {
    const style = {
      ...this.props.containerStyle,
      opacity: this.state.opacity,
    };

    Object.assign(
      style,
      this.state.isRendering ? { position: 'absolute', top: 0, left: 0 } : null,
    );

    this.removeOpacityAfterRendering();

    return style;
  }

  removeOpacityAfterRendering = () => {
    if (!this.state.isRendering) {
      setTimeout(() => {
        this.setState({
          opacity: 1,
        });
      }, 100);
    }
  }

  renderViewMore = () => (
    <Text onPress={this.onPressMore}>
      View More
    </Text>
  )

  renderViewLess = () => (
    <Text onPress={this.onPressLess}>
      View Less
    </Text>
  )

  renderFooter = () => {
    const {
      numberOfLines,
    } = this.state;

    if (this.shouldShowMore === true) {
      if (numberOfLines > 0) {
        return (this.props.renderViewMore || this.renderViewMore)(this.onPressMore);
      }
      return (this.props.renderViewLess || this.renderViewLess)(this.onPressLess);
    }
    return null;
  }

  render() {
    return (
      <View>
        <View onLayout={this.onLayout} style={this.getWrapperStyle()}>
          <Text
            style={this.props.textStyle}
            numberOfLines={this.state.numberOfLines}
          >
            {this.props.children}
          </Text>
          {this.renderFooter()}

          {
            this.state.numberOfLines &&
            <View style={{ width: 1, height: 1 }} />
          }
        </View>
      </View>
    );
  }
}

ViewMoreText.propTypes = {
  renderViewMore: PropTypes.func,
  renderViewLess: PropTypes.func,
  afterCollapse: PropTypes.func,
  afterExpand: PropTypes.func,
  numberOfLines: PropTypes.number.isRequired,
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

ViewMoreText.defaultProps = {
  afterCollapse: () => {},
  afterExpand: () => {},
  textStyle: {},
};

export default ViewMoreText;
