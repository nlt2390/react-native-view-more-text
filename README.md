## react-native-view-more-text

A super lightweight plugin to expand/collapse text in React-Native. Truncated text is ended with dotdotdot.

Working on IOS/Android

![ios](https://raw.githubusercontent.com/nlt2390/react-native-view-more-text/master/ios.gif)
![android](https://raw.githubusercontent.com/nlt2390/react-native-view-more-text/master/android.gif)

### Installation

```
npm install --save react-native-view-more-text 

```

### Usage

- **numberOfLines**(number)(*required): Number of lines to be displayed.
- **renderViewMore**(object): Render view-more component 
- **renderViewLess**(object): Render view-less component 
- **afterCollapse**(func): Callback after collapsing
- **afterExpand**(func): Callback after expanding

- **textStyle**([object, array]): Styles is passed to `Text` inside `ViewMoreText`
(Refer to this [PR#8](https://github.com/nlt2390/react-native-view-more-text/pull/8))

```javascript
  import ViewMoreText from 'react-native-view-more-text';
  
  let Example = React.createClass({
    renderViewMore(onPress){
      return(
        <Text onPress={onPress}>View more</Text>
      )
    },
    renderViewLess(onPress){
      return(
        <Text onPress={onPress}>View less</Text>
      )
    },
    render(){
      return(
        <ViewMoreText
          numberOfLines={3}
          renderViewMore={this.renderViewMore}
          renderViewLess={this.renderViewLess}
          textStyle={{textAlign: 'center'}}
        >
          <Text>
            Lorem ipsum dolor sit amet, in quo dolorum ponderum, nam veri molestie constituto eu. Eum enim tantas sadipscing ne, ut omnes malorum nostrum cum. Errem populo qui ne, ea ipsum antiopam definitionem eos.
          </Text>
        </ViewMoreText>
      )
    }
  })

```

#### Donation
<img src="https://www.cardanohub.org/wp-content/uploads/2017/07/cardano-symbol-150x150.png" width="70"/>
Help to make cryptocurrency world bigger :))

My <a href="https://www.cardanohub.org/en/home/" target="_blank">ADA</a> wallet: 

DdzFFzCqrht7vQmuSYrjn6PKDxW3on4cFznU4Jjjycp1bqVTvXngM8wN7sop1Haq7msc5NanULU8TyAG9UuLLZMynfroiHKr2aiiTaMM
