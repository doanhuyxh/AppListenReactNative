import { Image, StatusBar, View, StyleSheet, Dimensions } from "react-native";
import Video from "react-native-video";
import video from "../../Asset/Video/LoadAppVideo.mp4";
import { useEffect } from "react";

function LoadAppScreen({navigation}) {
  useEffect(() => {
      setTimeout(()=>{
          navigation.navigate("HomeScreen")
      }, 3000)
  }, []);
  return (
    <View style={styles.container}>
      <Video
        source={video}
        style={styles.video}
        paused={false}
        repeat={true}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Đảm bảo phần tử cha (View) chiếm toàn bộ màn hình
    justifyContent: 'center', // Căn giữa theo chiều dọc
    alignItems: 'center', // Căn giữa theo chiều ngang
  },
  video: {
    flex:1,
    width: Dimensions.get('window').width, // Độ rộng của video bằng độ rộng màn hình
    height: Dimensions.get('window').height, // Độ cao của video bằng độ cao màn hình
  },
});
export default LoadAppScreen;
