import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {TapGestureHandler} from 'react-native-gesture-handler';

const ItemFoto = ({photo, size, onPress, index}) => {
  const escala = useSharedValue(1);
  const opacidade = useSharedValue(1);
  const escalaPreview = useSharedValue(1);

  const estiloAnimado = useAnimatedStyle(() => {
    return {
      transform: [{scale: escala.value * escalaPreview.value}],
      opacity: opacidade.value,
    };
  });


  const aoPressionar = () => {
    escala.value = withSpring(0.95, {damping: 15}, () => {
      escala.value = withSpring(1, {damping: 15});
    });
    runOnJS(onPress)();
  };


  return (
    <Animated.View style={[estilos.container, {width: size, height: size}, estiloAnimado]}>
      <TapGestureHandler onActivated={aoPressionar}>
        <Animated.View style={estilos.containerGesto}>
          <View style={estilos.containerImagem}>
            <Image
              source={{uri: photo.uri}}
              style={[estilos.imagem, {width: size, height: size}]}
              resizeMode="cover"
            />
          </View>
        </Animated.View>
      </TapGestureHandler>
    </Animated.View>
  );
};

const estilos = StyleSheet.create({
  container: {
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  containerGesto: {
    flex: 1,
  },
  containerImagem: {
    position: 'relative',
  },
  imagem: {
    borderRadius: 8,
  },
});

export default ItemFoto;


