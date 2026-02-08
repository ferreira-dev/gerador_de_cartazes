# Guia de Ajuste Manual de Tamanhos de Fonte - Temas

## 📍 Onde ajustar os tamanhos de fonte

Os tamanhos de fonte são controlados centralmente no arquivo **`src/data/theme-layouts.json`**.

Agora, cada **layout** dentro de um tema tem sua própria configuração de fontes.

### Estrutura do arquivo:

```json
{
    "nome-do-tema": {
        "layouts": {
            "nome-do-layout": {
                "config": {
                    "fontSize": {
                        "productName": "18cqw",      // Tamanho do nome do produto
                        "productDetail": "7cqw",     // Tamanho dos detalhes (marca/tipo)
                        "priceCurrency": "18cqw",    // Tamanho do símbolo monetário (R$)
                        "priceInteger": "50cqw",     // Tamanho do preço (inteiro)
                        "priceDecimal": "18cqw"      // Tamanho dos centavos
                    }
                }
            }
        }
    }
}
```

## 🎯 Valores Atuais (Exemplo)

### Tema Clean
- `productName`: **12cqw**
- `priceInteger`: **35cqw**

### Temas Padrão, Hortifruti e Açougue (Layout Oferta Destaque)
- `productName`: **18cqw**
- `priceInteger`: **50cqw** or **45cqw**

## ⚙️ Como aumentar/diminuir fontes

1. Abra `src/data/theme-layouts.json`
2. Localize o **tema** desejado (ex: `padrao`)
3. Localize o **layout** desejado (ex: `oferta-destaque`)
4. Dentro de `config` > `fontSize`, ajuste os valores:

   - **Nome do produto maior?** → Aumente `productName` (ex: de 18cqw para 20cqw)
   - **Preço maior?** → Aumente `priceInteger` (ex: de 50cqw para 55cqw)
   - **R$ maior?** → Aumente `priceCurrency` (ex: de 18cqw para 20cqw)

### Exemplo de ajuste:

```json
"padrao": {
    "layouts": {
        "oferta-destaque": {
            "config": {
                "fontSize": {
                    "productName": "20cqw",      // Aumentado
                    "productDetail": "8cqw",
                    "priceCurrency": "20cqw",    // Aumentado
                    "priceInteger": "55cqw",     // Aumentado
                    "priceDecimal": "20cqw"
                }
            }
        }
    }
}
```

## 📐 Unidade `cqw` (Container Query Width)

- `cqw` = Container Query Width (percentual da largura do container)
- **1cqw** = 1% da largura do cartaz
- Valores maiores = texto maior

## ⚠️ Importante

- **Layouts Independentes**: Agora você pode ter fontes grandes no "Oferta Destaque" e fontes pequenas no "Atacado/Varejo" dentro do mesmo tema.
- **Preview**: O preview atualiza automaticamente ao salvar o arquivo.

