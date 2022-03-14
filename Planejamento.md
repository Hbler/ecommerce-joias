# Planejamento E-Commerce - Hbler
## Tema: Jóias

### Fluxograma
> Página Inicial:
- Pesquisa produto
  - utilizando campo de busa
    - por nome
      - Nomes
        - Serpenti Viper Colar
        - Serpenti Viper Pulseira
        - Serpenti Viper Anel
  - Utilizando tags:
    - Tags:
      - Tipo de porduto
        - Pulseira
        - Colar
        - Anel
      - “Banho” do produto (banhado à):
        - Ouro
        - Prata
        - Bronze
      - Pedraria
        - Sem Pedras
        - Pedraria Sutil
        - Pedraria Nobre
- Mouse sobre o porduto
- CLicar no produto
- Adicionar ao carrinho
- Remover do Carrinho
- Adicionar a lista de desejos
- Remover da lista de desejos

### Componentes
- Header
  - Logo
  - Navegacão
  - Filtro de tags
- Main (container principal)
  - Section (Galeria)
    - Article (Cards dos Produtos)
      - Imagem
      - Tags
      - Nome
      - Descrição
      - Preço (apenas com o mouse sobre o produto -> :hover)
      - Adicionar ao carrinho
      - Adicionar lista desejos (apenas com mouse sobre o produto -> :hover)
  - Aside (Pesquisa, Carrinho, Lista de Desejos)
    - Form (Pesquisa)
      - Input
      - Button
    - Section (Carrinho)
      - H2 (Header carrinho)
      - Div (Card Produto)
        - Imagem
        - Nome
        - Preços
        - Remover do carrinho
      - Div (Resumo Pedido)
        - Quantidade de itens
        - Valor Total
        - Esvaziar Carrinho
    - Section (Lista de Desejos)
      - Div (Card Produto)
        - Image
        - Nome
        - Remover da lista
      - Esvaziar lista

### JavaScript
> Algoritimo:
- Criar lista de tags de filtração a partir do Objeto “Product”
  - Verificar cada lista de tags 
  - Remover repetidas
  - Adicionar event listener nas demais -> ``` .addEventListener('click', displayProducts(“nome da tag”)) ```
  - Adicionar tag “Todos” com event listener -> ``` .addEventListener('click', displayProducts(“all”)) ```
- Carregar produtos a partir do objeto “Products” -> ```displayProducts(“all”) ```
  - Para cada item do objeto:
    - Criar tags HTML: 
      - article (card)
      - img (foto)
      - small (tags produto)
      - h3 (nome)
      - p (descrição)
      - h4 (preço)
      - button (carrinho) -> ``` .addEventListener('click', addToCart()) ```
      - button (desejos) -> ``` .addEventListener('click', addWishList()) ```
    - Adicionar à Section #Galeria
- Atualizar carrinho: -> ```updateCart() ```
  - Verificar se tem itens no objeto “Cart”
    - Se tiver
      - Exibir cards
      - Exibir resumo pedido
    - Se não
      - Exibir “Carrinho Vazio”
- Atualizar lista desejos:  -> ```updateWhishList() ```
  - Verificar se tem itens no objeto "WhishList"
    - Se tiver
      - Exbir cards
      - Exibir “esvaziar lista”
    - Se não tiver
      - Ocultar lista


> Listas:
- productInfo 
Uma matriz contendo listas com nome, preço, descrição, tags, e imagem (src), de cada produto

> Classes:
- Product - Cada instancia é um objeto com os atributos:
  - ID - Código definido na instanciação
  - Nome - fornecido na instanciação
  - Preço - fornecido na instanciação
  - Descrição - fornecido na instanciação
  - TagsList - fornecido na instanciação
  - Fonte da imagem - fornecida na instanciação

> Objetos:
- Products - Todos os objetos product
- Cart - Produtos no carrinho
- WishList - Producto na lista de desejos

> Funções:
- ``` function displayProducts(“all”) ```
- ``` function updateCart() ```
- ``` function updateWishList() ```
- ``` function addToCart() ``` -> também chama ``` function updateCart() ```
- ``` function addToWhishList() ``` -> também chama ``` function updateWishList() ```
- ``` function filterProducts(“tag”) ``` -> chama ``` function displayProducts(“tag escolhida”) ```
- ``` function updateProducts(“tag”) ``` -> usa a matriz productInfo e a classe Product, para preencher o objeto Products

### Estrutura de Arquivos
> Root
- index.html -> link para style.css e main.js
- README.md
- Planejamento.md
- Planejamento.txt
- Assets
  - Style
  - Script   
> Style
- style.css
> Script
- main.js -> importa tudo e organiza a execução das funcões
- support.js -> exporta objetos e classe
- functions.js -> exporta funções

### Paleta de Cores
> Background
- #FFF
> Header
- #F8f8f8
> Botão Pesquisar + Header Carrinho
- #523F02
> Header Lista de Desejos
- #ffd0d0
> Background Listas + Barra pesquisa + Filtro Tags + Texto Descrição
- #c8c8c8
> Cores Tags
- Tipo Produto
  - #a8a8a8
- Banho Produto
  - #9e5c43 - Bronze
  - #9e9e9e - Prata
  - #9e7a03 - Ouro
- Pedraria
  - #c8e8e8
> Preço + Botão Adiconar ao Carrinho
- #000
> Hover ->  boão pesquisar e Adicionar ao carrinho invertem as cores
- #000 -> #523F02
- #523F02 -> #000
