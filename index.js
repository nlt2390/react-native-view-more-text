import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  viewMoreTouchableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewMoreText: { maxWidth: '90%' },
});

const emptyFunc = () => {};

export default class ViewMoreText extends React.Component {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.array,
      PropTypes.object,
    ]),
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    renderViewMore: PropTypes.func,
    renderViewLess: PropTypes.func,
    afterCollapse: PropTypes.func,
    afterExpand: PropTypes.func,
    numberOfLines: PropTypes.number.isRequired,
  }

  static defaultProps = {
    style: {},
    children: undefined,
    renderViewMore: emptyFunc,
    renderViewLess: emptyFunc,
    afterCollapse: emptyFunc,
    afterExpand: emptyFunc,
    numberOfLines: null,
  }

  isTruncated = false
  originalHeight = 0
  shouldShowMore = false
  contentHeight = 0
  isInit = false

  constructor(props) {
    super(props);
    this.state = {
      numberOfLines: null,
      opacity: 0,
    };
  }

  componentDidUpdate() {
    if (this.state.numberOfLines === null) {
      (this.props.afterExpand || emptyFunc)();
    } else {
      (this.props.afterCollapse || emptyFunc)();
    }
  }

  resetData() {
    this.isTruncated = false;
    this.originalHeight = 0;
    this.shouldShowMore = false;
    this.isInit = false;
  }

  componentWillReceiveProps() {
    this.resetData();

    this.setState({
      numberOfLines: 0,
      opacity: 0,
    });
  }

  onLayout(event) {
    const { height } = event.nativeEvent.layout;
    if (height === 0 || (this.state && this.state.opacity === 1)) return false;
    this.setOriginalHeight(height);
    this.checkTextTruncated(height);
    if (this.state.numberOfLines === this.props.numberOfLines) {
      this.setState({
        opacity: 1,
      });
    }
    return true;
  }

  setOriginalHeight(height) {
    if (this.originalHeight === 0) {
      this.originalHeight = height;

      this.setState({
        numberOfLines: this.props.numberOfLines,
      });
    }
  }

  checkTextTruncated(height) {
    if (height < this.originalHeight) {
      this.shouldShowMore = true;
    }
  }

  onPressMore() {
    this.setState({
      numberOfLines: 0,
    });
  }

  onPressLess() {
    this.setState({
      numberOfLines: this.props.numberOfLines,
    });
  }

  renderViewMore(onPress) {
    return (
      <Text onPress={onPress}>
        View More
      </Text>
    );
  }

  renderViewLess(onPress) {
    return (
      <Text onPress={onPress}>
        View Less
      </Text>
    );
  }

  renderFooter() {
    const numberOfLines = this.state.numberOfLines;

    if (numberOfLines > 0) {
      return (this.props.renderViewMore || this.renderViewMore)(this.onPressMore.bind(this));
    }
    return (this.props.renderViewLess || this.renderViewLess)(this.onPressLess.bind(this));
  }

  renderContent() {
    const numberOfLines = this.state.numberOfLines;

    const onTextPress = numberOfLines > 0 ? this.onPressMore.bind(this) : this.onPressLess.bind(this);

    if (this.shouldShowMore) {
      return (
        <TouchableOpacity
          style={styles.viewMoreTouchableContainer}
          onPress={onTextPress}
        >
          <Text
            style={styles.viewMoreText}
            numberOfLines={this.state.numberOfLines}
          >
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
        numberOfLines={this.state.numberOfLines}
      >
        {this.props.children}
      </Text>
    );
  }

  render() {
    return (
      <View
        onLayout={this.onLayout.bind(this)}
        style={this.props.style}
      >
        { this.renderContent() }

      </View>
    );
  }
}
