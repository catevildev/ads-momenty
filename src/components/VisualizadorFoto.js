import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icone from 'react-native-vector-icons/MaterialIcons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {
  PinchGestureHandler,
  PanGestureHandler,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler';
import {Image} from 'react-native';

const {width: larguraTela, height: alturaTela} = Dimensions.get('window');

const VisualizadorFoto = ({photo, onClose, photos, currentIndex}) => {
  const [indiceFotoAtual, setIndiceFotoAtual] = useState(currentIndex);
  const escala = useSharedValue(1);
  const translacaoX = useSharedValue(0);
  const translacaoY = useSharedValue(0);
  const opacidade = useSharedValue(1);

  const referenciaPinch = useRef();
  const referenciaPan = useRef();
  const referenciaTap = useRef();

  const fotoAtual = photos[indiceFotoAtual];

  const estiloAnimado = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: escala.value},
        {translateX: translacaoX.value},
        {translateY: translacaoY.value},
      ],
      opacity: opacidade.value,
    };
  });

  const estiloFundo = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        escala.value,
        [1, 1.5],
        [1, 0.3],
        Extrapolate.CLAMP
      ),
    };
  });

  const aoEventoZoom = (evento) => {
    escala.value = evento.nativeEvent.scale;
  };

  const aoMudarEstadoZoom = (evento) => {
    if (evento.nativeEvent.oldState === State.ACTIVE) {
      if (escala.value < 0.8) {
        // Fechar se zoom muito pequeno
        runOnJS(onClose)();
      } else if (escala.value > 3) {
        // Limitar zoom máximo
        escala.value = withSpring(3);
      } else if (escala.value < 1) {
        // Resetar para zoom normal
        escala.value = withSpring(1);
        translacaoX.value = withSpring(0);
        translacaoY.value = withSpring(0);
      }
    }
  };

  const aoEventoArrastar = (evento) => {
    if (escala.value > 1) {
      // Se estiver com zoom, permitir mover a foto
      translacaoX.value = evento.nativeEvent.translationX;
      translacaoY.value = evento.nativeEvent.translationY;
    } else {
      // Se não estiver com zoom, permitir navegação lateral
      translacaoX.value = evento.nativeEvent.translationX;
    }
  };

  const aoMudarEstadoArrastar = (evento) => {
    if (evento.nativeEvent.oldState === State.ACTIVE) {
      if (escala.value <= 1) {
        // Se não estiver com zoom, verificar direção do arrasto
        const translacaoX = evento.nativeEvent.translationX;
        const translacaoY = evento.nativeEvent.translationY;
        
        // Navegação lateral (esquerda/direita)
        if (Math.abs(translacaoX) > 100 && Math.abs(translacaoY) < 100) {
          if (translacaoX > 0) {
            // Arrastou para direita - foto anterior
            runOnJS(navegarParaFoto)(-1);
          } else {
            // Arrastou para esquerda - próxima foto
            runOnJS(navegarParaFoto)(1);
          }
        } else if (Math.abs(translacaoY) > 100) {
          // Arrastou para baixo - fechar
          runOnJS(onClose)();
        } else {
          // Resetar posição
          translacaoX.value = withSpring(0);
          translacaoY.value = withSpring(0);
        }
      } else {
        // Se estiver com zoom, resetar posição
        translacaoX.value = withSpring(0);
        translacaoY.value = withSpring(0);
      }
    }
  };

  const aoDuploToque = () => {
    if (escala.value > 1) {
      // Resetar zoom
      escala.value = withSpring(1);
      translacaoX.value = withSpring(0);
      translacaoY.value = withSpring(0);
    } else {
      // Aplicar zoom
      escala.value = withSpring(2);
    }
  };

  const navegarParaFoto = (direcao) => {
    const novoIndice = indiceFotoAtual + direcao;
    if (novoIndice >= 0 && novoIndice < photos.length) {
      setIndiceFotoAtual(novoIndice);
      // Resetar zoom e posição
      escala.value = withSpring(1);
      translacaoX.value = withSpring(0);
      translacaoY.value = withSpring(0);
    }
  };

  return (
    <View style={estilos.container}>
      <StatusBar hidden />
      
      <Animated.View style={[estilos.fundo, estiloFundo]} />
      
      <TapGestureHandler
        ref={referenciaTap}
        numberOfTaps={2}
        onActivated={aoDuploToque}
      >
        <Animated.View style={estilos.containerGesto}>
          <PanGestureHandler
            ref={referenciaPan}
            onGestureEvent={aoEventoArrastar}
            onHandlerStateChange={aoMudarEstadoArrastar}
            minPointers={1}
            maxPointers={1}
          >
            <Animated.View style={estilos.containerGesto}>
              <PinchGestureHandler
                ref={referenciaPinch}
                onGestureEvent={aoEventoZoom}
                onHandlerStateChange={aoMudarEstadoZoom}
              >
                <Animated.View style={estilos.containerImagem}>
                  <Animated.Image
                    source={{uri: fotoAtual.uri}}
                    style={[estilos.imagem, estiloAnimado]}
                    resizeMode="contain"
                  />
                </Animated.View>
              </PinchGestureHandler>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </TapGestureHandler>

      {/* Controles */}
      <View style={estilos.controles}>
        <TouchableOpacity style={estilos.botaoFechar} onPress={onClose}>
          <Icone name="close" size={20} color="#ffffff" />
        </TouchableOpacity>
        
        <View style={estilos.navegacao}>
          <TouchableOpacity
            style={[
              estilos.botaoNavegacao,
              indiceFotoAtual === 0 && estilos.botaoNavegacaoDesabilitado,
            ]}
            onPress={() => navegarParaFoto(-1)}
            disabled={indiceFotoAtual === 0}
          >
            <Icone name="chevron-left" size={24} color="#ffffff" />
          </TouchableOpacity>
          
          <View style={estilos.infoFoto}>
            <Text style={estilos.contadorFoto}>
              {indiceFotoAtual + 1} / {photos.length}
            </Text>
            <Text style={estilos.dicaArrastar}>
              ← Arraste para navegar →
            </Text>
          </View>
          
          <TouchableOpacity
            style={[
              estilos.botaoNavegacao,
              indiceFotoAtual === photos.length - 1 && estilos.botaoNavegacaoDesabilitado,
            ]}
            onPress={() => navegarParaFoto(1)}
            disabled={indiceFotoAtual === photos.length - 1}
          >
            <Icone name="chevron-right" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    zIndex: 1000,
  },
  fundo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
  },
  containerGesto: {
    flex: 1,
  },
  containerImagem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagem: {
    width: larguraTela,
    height: alturaTela,
  },
  controles: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  botaoFechar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navegacao: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoFoto: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  botaoNavegacao: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  botaoNavegacaoDesabilitado: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  contadorFoto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dicaArrastar: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginTop: 2,
  },
});

export default VisualizadorFoto;


