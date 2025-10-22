import React, { useState, useRef } from 'react';
import { Modal, View, PanResponder, StyleSheet, Dimensions, Animated, Image } from 'react-native';

const { height } = Dimensions.get('window');

const SwipeDownModal = ({ visible, onCloseModal, children }) => {
  const panY = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      // Only allow downward swiping
      if (gestureState.dy > 0) {
        panY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > height * 0.1) {
        Animated.timing(panY, {
          toValue: height,
          duration: 100,
          useNativeDriver: true,
        }).start(onCloseModal);
      } else {
        Animated.spring(panY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCloseModal}
    >
      <View style={styles.modalContainer}>
      {children}
        <Animated.View
          {...panResponder.panHandlers}
        >
          <Image
            style={{height:40, width:40}}
            source={require('../assets/icons/swipe2.png')}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SwipeDownModal;
