## WanderGuide.IA

WanderGuide.IA é um aplicativo que cria roteiros de viagem personalizados com base na cidade e no número de dias de estadia informados pelo usuário. 
O aplicativo utiliza inteligência artificial para sugerir lugares turísticos e atividades personalizadas para cada dia da viagem.

## Funcionalidades:

• Escolha da cidade de destino.

• Definição do tempo de estadia.

• Geração automática de roteiros personalizados utilizando a API da OpenAI.

• Exibição de sugestões detalhadas para cada dia da estadia.

## Tecnologias Utilizadas

• React Native: Framework para desenvolvimento de aplicativos móveis.

• Expo: Plataforma de execução para React Native.

• OpenAI API: Inteligência artificial responsável por gerar os roteiros.

• TypeScript: Linguagem usada para garantir tipagem estática e segurança de código.

## Pré-requisitos

• Node.js

• Expo CLI (npm install -g expo-cli)

• Conta na [OpenAI](https://platform.openai.com/signup) com acesso à API

## Instalação

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/usuario/WanderGuide.IA.git

2. **Instale as dependências**:

   ```bash
   npm install

3. **Configure as variáveis de ambiente**:

   • Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

   ```bash
   OPENAI_API_KEY=your_openai_api_key

4. **Execute o app no Expo**:

   ```bash
   npx expo start

## Uso

1. Abra o aplicativo e insira a cidade e a quantidade de dias da viagem.
   
2. Pressione o botão "Gerar roteiro".
  
3. O app utilizará a OpenAI API para gerar um roteiro completo baseado nas informações fornecidas.


