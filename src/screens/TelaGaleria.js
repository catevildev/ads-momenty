import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icone from 'react-native-vector-icons/MaterialIcons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import ItemFoto from '../components/ItemFoto';
import VisualizadorFoto from '../components/VisualizadorFoto';
import AnimacaoCarregamento from '../components/AnimacaoCarregamento';

const {width: larguraTela} = Dimensions.get('window');
const numColunas = 3;
const tamanhoItem = (larguraTela - 40) / numColunas;

const TelaGaleria = () => {
  const [fotos, setFotos] = useState([]);
  const [fotoSelecionada, setFotoSelecionada] = useState(null);
  const [estaCarregando, setEstaCarregando] = useState(false);
  const [mostrarVisualizador, setMostrarVisualizador] = useState(false);

  // Animações
  const opacidadeCabecalho = useSharedValue(1);
  const escalaGrade = useSharedValue(1);

  useEffect(() => {
    carregarFotosExemplo();
  }, []);

  const carregarFotosExemplo = () => {
    setEstaCarregando(true);
    // Simulando carregamento de fotos
    setTimeout(() => {
      const fotosExemplo = [
        {
          id: '1',
          uri: 'https://picsum.photos/400/400?random=1',
          width: 400,
          height: 400,
        },
        {
          id: '2',
          uri: 'https://picsum.photos/400/600?random=2',
          width: 400,
          height: 600,
        },
        {
          id: '3',
          uri: 'https://picsum.photos/600/400?random=3',
          width: 600,
          height: 400,
        },
        {
          id: '4',
          uri: 'https://picsum.photos/400/400?random=4',
          width: 400,
          height: 400,
        },
        {
          id: '5',
          uri: 'https://picsum.photos/500/500?random=5',
          width: 500,
          height: 500,
        },
        {
          id: '6',
          uri: 'https://picsum.photos/400/300?random=6',
          width: 400,
          height: 300,
        },
        {
          id: '7',
          uri: 'https://picsum.photos/300/400?random=7',
          width: 300,
          height: 400,
        },
        {
          id: '8',
          uri: 'https://picsum.photos/400/400?random=8',
          width: 400,
          height: 400,
        },
        {
          id: '9',
          uri: 'https://picsum.photos/450/450?random=9',
          width: 450,
          height: 450,
        },
      ];
      setFotos(fotosExemplo);
      setEstaCarregando(false);
    }, 1500);
  };

  const selecionarImagem = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!resultado.canceled && resultado.assets && resultado.assets[0]) {
      const novaFoto = {
        id: Date.now().toString(),
        uri: resultado.assets[0].uri,
        width: resultado.assets[0].width || 400,
        height: resultado.assets[0].height || 400,
      };
      setFotos(anterior => [novaFoto, ...anterior]);
    }
  };


  const fecharVisualizador = () => {
    setMostrarVisualizador(false);
    setFotoSelecionada(null);
    
    // Animações de saída
    opacidadeCabecalho.value = withTiming(1, {duration: 300});
    escalaGrade.value = withSpring(1, {damping: 15});
  };

  const estiloAnimadoCabecalho = useAnimatedStyle(() => {
    return {
      opacity: opacidadeCabecalho.value,
      transform: [
        {
          translateY: interpolate(opacidadeCabecalho.value, [0, 1], [-50, 0]),
        },
      ],
    };
  });

  const estiloAnimadoGrade = useAnimatedStyle(() => {
    return {
      transform: [{scale: escalaGrade.value}],
    };
  });

  const aoPressionarFoto = (foto) => {
    setFotoSelecionada(foto);
    setMostrarVisualizador(true);
    
    // Animações de entrada
    opacidadeCabecalho.value = withTiming(0, {duration: 300});
    escalaGrade.value = withSpring(0.95, {damping: 15});
  };


  const renderizarFoto = ({item, index}) => (
    <ItemFoto
      photo={item}
      size={tamanhoItem}
      onPress={() => aoPressionarFoto(item)}
      index={index}
    />
  );

  if (estaCarregando) {
    return <AnimacaoCarregamento />;
  }

  return (
    <View style={estilos.container}>
      <Animated.View style={[estilos.cabecalho, estiloAnimadoCabecalho]}>
        <Text style={estilos.titulo}>Momenty</Text>
        <TouchableOpacity style={estilos.botaoAdicionar} onPress={selecionarImagem}>
          <Icone name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[estilos.containerGrade, estiloAnimadoGrade]}>
        <FlatList
          data={fotos}
          renderItem={renderizarFoto}
          keyExtractor={item => item.id}
          numColumns={numColunas}
          contentContainerStyle={estilos.grade}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>

      {mostrarVisualizador && fotoSelecionada && (
        <VisualizadorFoto
          photo={fotoSelecionada}
          onClose={fecharVisualizador}
          photos={fotos}
          currentIndex={fotos.findIndex(p => p.id === fotoSelecionada.id)}
        />
      )}
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
  },
  botaoAdicionar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerGrade: {
    flex: 1,
  },
  grade: {
    padding: 10,
  },
});

export default TelaGaleria;


