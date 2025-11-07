# 📱 Momenty

**Momenty** - Um aplicativo de galeria de fotos desenvolvido em React Native com foco em **animações performáticas** e **gestos intuitivos**.

## ✨ Funcionalidades

- 🖼️ **Galeria de fotos** com grid responsivo
- 🔍 **Zoom e pan** com gestos de pinça e arrastar
- 👆 **Toque duplo** para zoom rápido
- 📱 **Navegação entre fotos** com gestos
- 🎨 **Animações suaves** com React Native Reanimated
- ⚡ **Gestos performáticos** com Gesture Handler
- 🎭 **Loading animado** personalizado
- 📸 **Adicionar fotos** da galeria do dispositivo

## 🚀 Tecnologias Utilizadas

- **React Native** - Framework principal
- **React Native Reanimated** - Animações performáticas
- **React Native Gesture Handler** - Gestos avançados
- **React Native Image Picker** - Seleção de imagens
- **React Native Safe Area Context** - Área segura
- **React Native Vector Icons** - Ícones

## 📦 Instalação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd ads-mobile
```

2. **Instale as dependências:**
```bash
npm install
# ou
yarn install
```

3. **Para iOS (apenas no macOS):**
```bash
cd ios && pod install && cd ..
```

4. **Execute o projeto:**
```bash
# Android
npm run android
# ou
yarn android

# iOS
npm run ios
# ou
yarn ios
```

## 🎯 Gestos Implementados

### 📱 Galeria Principal
- **Toque simples**: Abrir foto em tela cheia
- **Botão +**: Adicionar nova foto

### 🔍 Visualizador de Fotos
- **Pinça**: Zoom in/out
- **Arrastar**: Mover foto (quando com zoom) ou fechar (sem zoom)
- **Toque duplo**: Zoom rápido (2x) ou reset
- **Botões de navegação**: Anterior/Próxima foto
- **Botão X**: Fechar visualizador

## 🎨 Animações

- **Transições suaves** entre telas
- **Micro-interações** nos botões
- **Loading animado** com rotação e pulsação
- **Animações de entrada/saída** do visualizador
- **Feedback visual** em todos os gestos

## 📱 Compatibilidade

- **Android**: API 21+ (Android 5.0+)
- **iOS**: iOS 11.0+
- **React Native**: 0.72.6+

## 🛠️ Estrutura do Projeto

```
src/
├── components/
│   ├── PhotoItem.js          # Item da galeria
│   ├── PhotoViewer.js        # Visualizador com gestos
│   └── LoadingAnimation.js   # Animação de loading
├── screens/
│   └── GalleryScreen.js      # Tela principal
└── App.js                    # Componente raiz
```

## 🎓 Conceitos Demonstrados

### React Native Reanimated
- `useSharedValue` - Valores animados
- `useAnimatedStyle` - Estilos animados
- `withSpring` - Animações com mola
- `withTiming` - Animações temporizadas
- `interpolate` - Interpolação de valores

### React Native Gesture Handler
- `PinchGestureHandler` - Gestos de pinça
- `PanGestureHandler` - Gestos de arrastar
- `TapGestureHandler` - Gestos de toque
- `State` - Estados dos gestos

## 🚀 Próximos Passos

- [ ] Implementar animações Lottie
- [ ] Adicionar filtros de imagem
- [ ] Implementar compartilhamento
- [ ] Adicionar modo escuro
- [ ] Implementar favoritos
- [ ] Adicionar busca de fotos

## 📄 Licença

Este projeto é para fins educacionais e demonstração de conceitos de desenvolvimento mobile com React Native.

