import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity
} from 'react-native';
import styles from './styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ImageCarouselProps {
  images: string[];
  imageHeight?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  imageHeight = 300
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewIndex = Math.round(contentOffset.x / SCREEN_WIDTH);
    setCurrentIndex(viewIndex);
  };

  const goToSlide = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * SCREEN_WIDTH,
        animated: true
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((imageUrl, index) => (
          <View key={index} style={{ width: SCREEN_WIDTH }}>
            <Image
              source={{ uri: imageUrl }}
              style={[styles.image, { height: imageHeight, width: SCREEN_WIDTH - 40 }]}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>

      {/* Pagination Indicators */}
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot
            ]}
            onPress={() => goToSlide(index)}
          />
        ))}
      </View>
    </View>
  );
};


export default ImageCarousel;