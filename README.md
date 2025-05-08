# LikeMe

Aplicativo móvel desenvolvido com React Native e Expo para gerenciamento de documentos e marketplace.

## 🚀 Tecnologias

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [NativeWind](https://www.nativewind.dev/)
- [React Navigation](https://reactnavigation.org/)

## 📱 Funcionalidades

- Gerenciamento de documentos
- Marketplace integrado
- Interface moderna e responsiva
- Suporte a múltiplos formatos de arquivo
- Sistema de navegação intuitivo

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/jrbj001/LikeMe.git
cd LikeMe
```

2. Instale as dependências:
```bash
yarn install
```

3. Inicie o projeto:
```bash
yarn start
```

## 📋 Scripts Disponíveis

- `yarn start` - Inicia o projeto normalmente
- `yarn android` - Inicia o projeto no Android
- `yarn ios` - Inicia o projeto no iOS
- `yarn web` - Inicia o projeto na web
- `yarn tunnel` - Inicia o projeto com tunnel
- `yarn clear` - Limpa o cache e inicia o projeto

## 📦 Dependências Principais

- expo: ^53.0.7
- react: 19.0.0
- react-native: 0.79.2
- nativewind: 2.0.11
- @react-navigation/native: ^7.1.6
- @react-navigation/native-stack: ^7.3.10

## 🔧 Configuração do Ambiente

1. Instale o [Node.js](https://nodejs.org/) (versão 18.x)
2. Instale o [Yarn](https://yarnpkg.com/) (versão 1.22.x)
3. Instale o [Expo CLI](https://docs.expo.dev/get-started/installation/) globalmente:
```bash
yarn global add expo-cli
```
4. Instale o [Expo Go](https://expo.dev/client) no seu dispositivo móvel

## 📱 Executando o Projeto

1. Certifique-se de que todas as dependências estão instaladas:
```bash
yarn install
```

2. Limpe o cache:
```bash
yarn clear
```

3. Inicie o projeto:
```bash
yarn start
```

4. Se encontrar problemas, tente:
```bash
yarn tunnel
```

## 🎨 Estrutura do Projeto

```
LikeMe/
├── src/              # Código fonte
├── assets/           # Recursos estáticos
├── App.tsx           # Componente principal
├── index.ts          # Ponto de entrada
├── babel.config.js   # Configuração do Babel
├── tailwind.config.js # Configuração do Tailwind
└── package.json      # Dependências e scripts
```

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **José Roberto** - [jrbj001](https://github.com/jrbj001)

## 📞 Suporte

Para suporte, envie um email para [seu-email@exemplo.com] ou abra uma issue no GitHub.

# LikeMe App - Fluxo de Navegação

## Fluxo de telas
1. **Abre** (Tela Inicial) - Tela splash com o logo "like me"
   - Navegação: Toque na tela → Welcome

2. **Welcome** (Tela de Boas-vindas) - Tela com a mensagem principal do app
   - Navegação: Toque na tela → Abre_documents

3. **Abre_documents** (Tela de Apresentação dos Documentos) - Tela informativa sobre os documentos
   - Navegação: Botão "Upload documents" → Documents_Home

4. **Documents_Home** (Tela Home de Documentos) - Tela principal de gestão de documentos
   - Navegação: Botão "+" → Documents_Upload

5. **Documents_Upload** (Seleção de Arquivos) - Tela para seleção de arquivos
   - Navegação: Opção "Upload New File" → Documents_Uploading

6. **Documents_Uploading** (Upload em Progresso) - Tela mostrando o progresso de upload
   - Navegação: Automática após conclusão → Documents_Complete

7. **Documents_Complete** (Upload Concluído) - Tela mostrando que o upload foi concluído
   - Navegação: Botão "+" → Documents_Home

## Estrutura de Arquivos
- `src/navigation/AppNavigator.tsx` - Configuração de navegação
- `src/types/navigation.ts` - Tipos para a navegação
- `src/screens/` - Diretório com todas as telas
  - `Abre/` - Tela inicial splash
  - `Welcome/` - Tela de boas-vindas
  - `Abre_documents/` - Tela de apresentação de documentos
  - `Documents/` - Telas do fluxo de documentos
    - `Documents_Home.tsx` - Tela principal de documentos
    - `Documents_Upload.tsx` - Tela de seleção de arquivos
    - `Documents_Uploading.tsx` - Tela de progresso de upload
    - `Documents_Complete.tsx` - Tela de conclusão de upload

## Assets
- `assets/abre_documents/` - Assets para a tela Abre_documents
- `assets/welcome/` - Assets para a tela Welcome
- `assets/images/` - Imagens gerais
- `assets/img/` - Ícones e imagens do layout Figma
- `assets/icons/` - Ícones utilizados

## Design
Este aplicativo foi desenvolvido de acordo com o design do Figma, implementando fielmente:
- A paleta de cores adequada
- Tipografia e estilos de texto
- Posicionamento preciso dos elementos
- Ícones e elementos visuais
- Comportamento de navegação entre telas

Algumas características do design incluem:
- Fundo escuro (#0A1D23) para todas as telas
- Uso do verde (#B4E48E) para elementos de destaque
- Botão flutuante circular amarelo (#D9ED93) com ícone "+"
- Barra de navegação superior com "My Documents" centralizado
- Dropdown "for data" no canto superior direito
- Modais brancos para diálogos e formulários
- Barra de progresso azul (#128AAC) para indicar upload

## ⚠️ Requisitos Específicos

- Node.js versão 18.x ou superior
- Yarn versão 1.22.x ou superior
- Expo CLI versão 6.x
- iOS 13.0 ou superior
- Android 5.0 (API 21) ou superior

## ⚠️ Troubleshooting

### Problemas Comuns e Soluções

1. **Erro de NativeWind**
   - Execute `yarn add nativewind@2.0.11`
   - Verifique se o `babel.config.js` contém o plugin do NativeWind
   - Limpe o cache: `yarn clear`

2. **Erro de Reanimated**
   - Execute `yarn add react-native-reanimated@3.6.1`
   - Adicione o plugin no `babel.config.js`
   - Limpe o cache: `yarn clear`

3. **Erro de Splash Screen**
   - Verifique se o arquivo `splash.png` existe em `assets/`
   - Atualize o `app.json` com o caminho correto
   - Limpe o cache: `yarn clear`

4. **Erro de Metro Bundler**
   - Pare o servidor
   - Execute `yarn clear`
   - Reinicie com `yarn start`

5. **Erro de Dependências**
   - Delete a pasta `node_modules`
   - Delete o arquivo `yarn.lock`
   - Execute `yarn install`
   - Execute `yarn clear`

### Comandos Úteis

```bash
# Limpar cache e node_modules
yarn clear

# Reinstalar dependências
rm -rf node_modules
rm yarn.lock
yarn install

# Verificar versões
node -v
yarn -v
expo --version

# Atualizar Expo CLI
yarn global add expo-cli@latest
``` 