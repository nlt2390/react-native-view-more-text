import * as React from 'react';
import { ViewProperties, StyleProp, TextStyle } from 'react-native';
  
declare module 'react-native-view-more-text' {

  export interface ViewMoreTextProps extends ViewProperties {
    numberOfLines: number;
    renderViewMore?: (handlePress: () => void) => JSX.Element;
    renderViewLess?: (handlePress: () => void) => JSX.Element;
    afterCollapse?: () => void
    afterExpand?: () => void
    textStyle?: StyleProp<TextStyle>;
  }
  
  export default class ViewMoreText extends React.Component<ViewMoreTextProps> {}
}
