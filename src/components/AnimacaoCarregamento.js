import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  interpolate,
} from 'react-native-reanimated';

const AnimacaoCarregamento = () => {
  const rotacao = useSharedValue(0);
  const escala = useSharedValue(1);
  const opacidade = useSharedValue(1);

  // Animação de rotação contínua
  rotacao.value = withRepeat(
    withTiming(360, {duration: 2000}),
    -1,
    false
  );

  // Animação de pulsação
  escala.value = withRepeat(
    withSequence(
      withTiming(1.2, {duration: 800}),
      withTiming(1, {duration: 800})
    ),
    -1,
    true
  );

  // Animação de fade
  opacidade.value = withRepeat(
    withSequence(
      withTiming(0.5, {duration: 1000}),
      withTiming(1, {duration: 1000})
    ),
    -1,
    true
  );

  const estiloAnimado = useAnimatedStyle(() => {
    return {
      transform: [
        {rotate: `${rotacao.value}deg`},
        {scale: escala.value},
      ],
      opacity: opacidade.value,
    };
  });

  const estiloAnimadoTexto = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        opacidade.value,
        [0.5, 1],
        [0.7, 1],
        'clamp'
      ),
    };
  });

  return (
    <View style={estilos.container}>
      <Animated.View style={[estilos.containerCarregamento, estiloAnimado]}>
        <View style={estilos.spinner}>
          <View style={estilos.spinnerInterno} />
        </View>
      </Animated.View>
      
      <Animated.Text style={[estilos.textoCarregamento, estiloAnimadoTexto]}>
        Carregando fotos...
      </Animated.Text>
      
      <View style={estilos.containerPontos}>
        {[0, 1, 2].map((indice) => (
          <Animated.View
            key={indice}
            style={[
              estilos.ponto,
              {
                opacity: interpolate(
                  opacidade.value,
                  [0.5, 1],
                  [0.3, 1],
                  'clamp'
                ),
                transform: [
                  {
                    scale: interpolate(
                      opacidade.value,
                      [0.5, 1],
                      [0.8, 1.2],
                      'clamp'
                    ),
                  },
                ],
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  containerCarregamento: {
    marginBottom: 30,
  },
  spinner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#e9ecef',
    borderTopColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerInterno: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#007bff',
  },
  textoCarregamento: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 20,
  },
  containerPontos: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ponto: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007bff',
    marginHorizontal: 4,
  },
});

export default AnimacaoCarregamento;


