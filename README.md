## react-native-view-more-text

A super lightweight plugin to expand/collapse text in React-Native. Truncated text is ended with dotdotdot.

Working on IOS/Android

![ios](https://raw.githubusercontent.com/nlt2390/react-native-view-more-text/master/ios.gif)
![android](https://raw.githubusercontent.com/nlt2390/react-native-view-more-text/master/android.gif)

### Installation

```
npm install --save react-native-view-more-text || yarn add react-native-view-more-text

```

### Usage

- **numberOfLines**(number)(*required): Number of lines to be displayed.
- **renderViewMore**(object): Render view-more component 
- **renderViewLess**(object): Render view-less component 
- **afterCollapse**(func): Callback after collapsing
- **afterExpand**(func): Callback after expanding

- **onTextLayout**(func): onTextLayout function is passed to `Text` inside `ViewMoreText`
(Refer to this [PR#56](https://github.com/nlt2390/react-native-view-more-text/pull/56))
- **textStyle**([object, array]): Styles is passed to `Text` inside `ViewMoreText`
(Refer to this [PR#8](https://github.com/nlt2390/react-native-view-more-text/pull/8))

```jsx
  ...redacted
  import ViewMoreText from 'react-native-view-more-text';

  const Screen = () => {
    const renderViewMore = (onPress) =>  <Text onPress={onPress}>View more</Text>;
    const renderViewLess = (onPress) =>  <Text onPress={onPress}>View less</Text>;

    return (
       //...  
        <ViewMoreText
          numberOfLines={3}
          renderViewMore={renderViewMore}
          renderViewLess={renderViewLess}
          textStyle={{textAlign: 'center'}}
        >
          <Text>
            Lorem ipsum dolor sit amet, in quo dolorum ponderum, nam veri molestie constituto eu. Eum enim tantas sadipscing ne, ut omnes malorum nostrum cum. Errem populo qui ne, ea ipsum antiopam definitionem eos.
          </Text>
        </ViewMoreText>
        //... 
    );
  }
```
