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