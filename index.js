import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  fullTextWrapper: {
    opacity: 0,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  viewMoreText: {
    color: 'blue',
  },
  transparent: {
    opacity: 0,
  },
});

class ViewMoreText extends React.Component {
  trimmedTextHeight = null;
  fullTextHeight = null;
  shouldShowMore = false;

  state = {
    isFulltextShown: true,
    numberOfLines: this.props.numberOfLines,
  }

  hideFullText = () => {
    if (
      this.state.isFulltextShown &&
      this.trimmedTextHeight &&
      this.fullTextHeight
    ) {
      this.shouldShowMore = this.trimmedTextHeight < this.fullTextHeight;
      this.setState({
        isFulltextShown: false,
      });
    }
  }

  onLayoutTrimmedText = (event) => {
    const {
      height,
    } = event.nativeEvent.layout;

    this.trimmedTextHeight = height;
    this.hideFullText();
  }

  onLayoutFullText = (event) => {
    const {
      height,
    } = event.nativeEvent.layout;

    this.fullTextHeight = height;
    this.hideFullText();
  }

  onPressMore = () => {
    this.setState({
      numberOfLines: null,
    }, () => {
      this.props.afterExpand();
    });
  }

  onPressLess = () => {
    this.setState({
      numberOfLines: this.props.numberOfLines,
    }, () => {
      this.props.afterCollapse();
    });
  }

  getWrapperStyle = () => {
    if (this.state.isFulltextShown) {
      return styles.transparent;
    }
    return {};
  }

  renderViewMore = () => (
    <Text
      style={this.props.viewMoreStyle}
      onPress={this.onPressMore}
    >
      {this.props.viewMoreText}
    </Text>
  )

  renderViewLess = () => (
    <Text
      style={this.props.viewLessStyle}
      onPress={this.onPressLess}
    >
      {this.props.viewLessText}
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

  renderFullText = () => {
    if (this.state.isFulltextShown) {
      return (
        <View onLayout={this.onLayoutFullText} style={styles.fullTextWrapper}>
          <Text style={this.props.textStyle}>{this.props.children}</Text>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={this.getWrapperStyle()}>
        <View onLayout={this.onLayoutTrimmedText}>
          <Text
            style={this.props.textStyle}
            numberOfLines={this.state.numberOfLines}
          >
            {this.props.children}
          </Text>
          {this.renderFooter()}
        </View>

        {this.renderFullText()}
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
  viewMoreStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  viewLessStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  viewMoreText: PropTypes.string,
  viewLessText: PropTypes.string,
};

ViewMoreText.defaultProps = {
  afterCollapse: () => {},
  afterExpand: () => {},
  textStyle: {},
  viewMoreStyle: styles.viewMoreText,
  viewLessStyle: styles.viewMoreText,
  viewMoreText: "View More",
  viewLessText: "View Less",
};

export default ViewMoreText;
