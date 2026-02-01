# Guia de Ajuste Manual de Tamanhos de Fonte - Temas

## 📍 Onde ajustar os tamanhos de fonte

Os tamanhos de fonte são controlados centralmente no arquivo `src/data/themes.json`.

### Estrutura de cada tema:

```json
{
    "id": "nome-do-tema",
    "name": "Nome Exibido",
    "fontSize": {
        "productName": "18cqw",      // Tamanho do nome do produto
        "productDetail": "7cqw",      // Tamanho dos detalhes (marca/tipo)
        "priceInteger": "50cqw",      // Tamanho do preço (inteiro E centavos)
        "priceDecimal": "18cqw"       // Tamanho do R$ (símbolo)
    }
}
```

## 🎯 Valores Atuais

### Tema Clean (mantém original)
- `productName`: **12cqw**
- `productDetail`: **5cqw**
- `priceInteger`: **35cqw**
- `priceDecimal`: **12cqw** (R$)

### Temas Padrão, Hortifruti e Açougue (maiores)
- `productName`: **18cqw**
- `productDetail`: **7cqw**
- `priceInteger`: **50cqw**
- `priceDecimal`: **18cqw** (R$)

## ⚙️ Como aumentar/diminuir fontes

### Para aumentar as fontes dos temas (exceto Clean):

1. Abra `src/data/themes.json`
2. Localize o tema desejado (padrao, hortifruti ou acougue)
3. Na seção `fontSize`, aumente os valores:
   - **Nome do produto maior?** → Aumente `productName` (ex: de 18cqw para 20cqw)
   - **Preço maior?** → Aumente `priceInteger` (ex: de 50cqw para 55cqw)
   - **R$ maior?** → Aumente `priceDecimal` (ex: de 18cqw para 20cqw)

### Exemplo de ajuste:

```json
{
    "id": "padrao",
    "fontSize": {
        "productName": "20cqw",    // Era 18cqw, agora maior
        "productDetail": "8cqw",    // Era 7cqw
        "priceInteger": "55cqw",    // Era 50cqw, agora maior
        "priceDecimal": "20cqw"     // Era 18cqw
    }
}
```

## 📐 Unidade `cqw` (Container Query Width)

- `cqw` = Container Query Width (percentual da largura do container)
- **1cqw** = 1% da largura do cartaz
- **50cqw** = 50% da largura do cartaz
- Valores maiores = texto maior

## ⚠️ Importante

- **Não altere o tema Clean** se quiser manter o layout original
- **Todos os 3 temas** (Padrão, Hortifruti, Açougue) devem ter os mesmos tamanhos
- Se quiser que o preço seja maior que o nome do produto, `priceInteger` deve ser > `productName`
- Após alterar, salve o arquivo e o preview atualiza automaticamente

## 🔄 Layout do Preço

O preço agora está configurado para exibir **todos os dígitos na mesma linha**:
- R$ 4,99 (tudo alinhado horizontalmente)
- O `priceInteger` controla o tamanho tanto do inteiro quanto dos centavos
- O `priceDecimal` controla apenas o tamanho do símbolo R$
