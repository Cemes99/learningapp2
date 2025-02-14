import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Image, ScrollView } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';
import RadioButtonRN from 'radio-buttons-react-native';
import Video from 'react-native-video';
import Swiper from 'react-native-swiper';

var hobbies = [
    {label: "2", value: 0},
    {label: "II", value: 1},
    {label: "Hai", value: 2},
];

const datas = [
    {
        des: 'Mục tiêu bài học\n\n1. Mục tiêu bài học:\n\nTrong bài học này chúng ta sẽ tìm hiểu về hai loại giới hạn đặc biệt 0/0 hoặc  và quy tắc L’Hospital để tính hai loại giới hạn đó.\n\nNgoài ra sinh viên sẽ xem thêm nội dung tại đây\n\n2. Những điểm lưu ý về bài học: N/A\n\n3. Thời gian cần thiết để học bài này: 189 phút',
        til: 'Đây Là Lý Thuyết',
      },
      {
        vide: "https://www.w3schools.com/html/mov_bbb.mp4",
        til: 'Đây Là Video',
      },
      {
          til: 'Đây Là Bài tập',
          ques: 'Một cộng một bằng?',
      }
    ]

const Tab = ({ tab, page, isTabActive, onPressHandler, onTabLayout, styles }) => {
  const { label } = tab;
  const style = {
    marginHorizontal: 20,
    paddingVertical: 10,
  };
  const containerStyle = {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: styles.backgroundColor,
    opacity: styles.opacity,
    transform: [{ scale: styles.opacity }],
  };
  const textStyle = {
    color: styles.textColor,
    fontWeight: '600',
  };
  const iconStyle = {
    tintColor: styles.textColor,
    resizeMode: 'contain',
    width: 22,
    height: 22,
    marginLeft: 10,
  };
  return (
    <TouchableOpacity style={style} onPress={onPressHandler} onLayout={onTabLayout} key={page}>
      <Animated.View style={containerStyle}>
        <Animated.Text style={textStyle}>{label}</Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

class DetailCourse extends Component {
    constructor(props) {
        super();
    }
    goBack = () => {
        this.props.navigation.pop();
    }
    _scrollX = new Animated.Value(0);
    // 6 is a quantity of tabs
    interpolators = Array.from({ length: 6 }, (_, i) => i).map(idx => ({
        scale: this._scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: [1, 1.2, 1],
        extrapolate: 'clamp',
        }),
        opacity: this._scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: [0.9, 1, 0.9],
        extrapolate: 'clamp',
        }),
        textColor: this._scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: ['#000', '#fff', '#000'],
        }),
        backgroundColor: this._scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: ['rgba(0,0,0,0.1)', '#000', 'rgba(0,0,0,0.1)'],
        extrapolate: 'clamp',
        }),
    }));
    render() {
        const PageLyThuyet = ({e}) => (
            <ScrollView style={styles.container}>
                <Text style = {formatText}> {e.til} </Text>
                <Text style = {formatText}>{e.des}</Text>
            </ScrollView>
          );
          
          const PageVideo = ({e}) => (
              <ScrollView style={styles.container}>
               <Text style = {formatText}> {e.til} </Text>
                <Video
                    source={{uri: e.vide}}
                    ref={(ref) => {
                        this.player = ref
                    }}  
                    paused={true}
                    controls={true}                                   
                    onBuffer={this.onBuffer}                
                    onError={this.videoError} 
                    style={video}
                />
              </ScrollView>
          );
          
          const PageBaiTap = ({e}) => (
              <ScrollView style={styles.container}>
                <Text style = {formatText}> {e.til} </Text>
                <Text style = {formatText}> {e.ques} </Text>
                <RadioButtonRN
					data={hobbies}
					initial={1}
                    circleSize={16}
                    style={radioBtn}
				/>
                <TouchableOpacity style={btnMark}>
                    <Text style = {{color: '#fff'}}>Gửi</Text>
                </TouchableOpacity>
              </ScrollView>
          );
        const {
            container, row1, titleStyle, iconStyle, video,
            wrapper, formatText, btnMark, radioBtn, 
        } = styles;
        return (
        <View style={ container }>
            <View style={row1}>
                <TouchableOpacity onPress={this.goBack.bind(this)}>
                    <Image source={icBack} style={iconStyle} />
                </TouchableOpacity>
                <Text style={titleStyle}>Giới thiệu chung</Text>
                <Image source={icLogo} style={iconStyle} />
            </View>
            <ScrollableTabView
            renderTabBar={() => (
                <TabBar
                underlineColor="#000"
                tabBarStyle={{ backgroundColor: "#666363", borderTopColor: '#d2d2d2', borderTopWidth: 1 }}
                renderTab={(tab, page, isTabActive, onPressHandler, onTabLayout) => (
                    <Tab
                    key={page}
                    tab={tab}
                    page={page}
                    isTabActive={isTabActive}
                    onPressHandler={onPressHandler}
                    onTabLayout={onTabLayout}
                    styles={this.interpolators[page]}
                    />
                )}
                />
            )}
            onScroll={(x) => this._scrollX.setValue(x)}
            >
            {datas.map( e => (
                (typeof e.des !== "undefined") ? <PageLyThuyet tabLabel={{label: e.til}} e = {e}/>
                    : (typeof e.vide !== "undefined") ? <PageVideo tabLabel={{label: e.til}} e = {e}/>
                    : <PageBaiTap tabLabel={{label: e.til}} e = {e}/>
                
            ))}
            </ScrollableTabView>
        </View>
    );
  }
}

export default DetailCourse;

const styles = StyleSheet.create({
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
      fontSize: 28,
    },
    wrapper: {
        margin: 20,
        backgroundColor: '#666363',
        borderRadius: 25,
    },
    btnMark: {
        marginLeft: 220,
        margin: 10,
        height: 40,
        backgroundColor: '#262525',
        borderRadius: 20,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formatText: {
        margin: 10,
        fontSize: 20,
        color: '#fff',
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    paginationText: {
        fontSize: 30
    },
    row1: { 
        backgroundColor: '#666363',
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
    },
    titleStyle: { color: '#FFF', fontFamily: 'Avenir', fontSize: 30 },
    iconStyle: { width: 30, height: 30, margin: 5 },
    container: {
        flex: 1,
        backgroundColor: '#262525',
    },
    productImage: {
        margin: 5,
        borderRadius: 10,
        width: 90,
        height: (90 * 450) / 400
    },
    productContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',
        borderTopColor: '#F0F0F0',
        borderBottomColor: '#FFF',
        borderLeftColor: '#FFF',
        borderRightColor: '#FFF',
        borderWidth: 1
    },
    txtName: {
        fontFamily: 'Avenir',
        color: '#007bff',
        fontSize: 25,
        fontWeight: '700',
    },
    txtDel: {
        fontFamily: 'Avenir',
        color: '#BCBCBC',
        fontSize: 20,
        fontWeight: '700',
    },
    txtTitle: {
        backgroundColor: '#FFF',
        fontFamily: 'Avenir',
        color: '#BCBCBC',
        fontSize: 25,
        fontWeight: '700',
    },
    video: {
        borderColor: 'black',
        borderWidth: 3,
        marginLeft: 35,
        marginTop: 50,
        height: 180,
        width: 300,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    radioBtn: {
        width: 300,
        marginLeft: 35,
    },
  });
