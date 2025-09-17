# API do Módulo Financeiro - Vida Plus

## Visão Geral

O módulo financeiro oferece funcionalidades completas para gestão financeira pessoal, incluindo contas, transações, categorias, transferências, bens e metas financeiras.

## Autenticação

Todos os endpoints (exceto os públicos) requerem autenticação JWT. Inclua o token no header:

```
Authorization: Bearer <seu_token_jwt>
```

## Endpoints

### 📊 Contas

#### Criar Conta

```http
POST /contas/create
Content-Type: application/json

{
  "ctconta": "Conta Principal",
  "ctinstituicao": "uuid-da-instituicao",
  "ctsaldo": 1000.00,
  "ctsaldoInicial": 1000.00,
  "cttipoconta": "CORRENTE",
  "ctstatus": "ATIVA",
  "ctlimiteCredito": 5000.00,
  "ctdataVencimento": "2024-02-15T00:00:00.000Z",
  "ctobservacao": "Conta principal do banco",
  "ctcor": "#3B82F6"
}
```

#### Atualizar Conta

```http
PUT /contas/update
Content-Type: application/json

{
  "ctcodigo": "uuid-da-conta",
  "ctconta": "Conta Principal Atualizada",
  "ctsaldo": 1500.00,
  "cttipoconta": "CORRENTE"
}
```

#### Listar Contas

```http
GET /contas
```

#### Buscar Conta Específica

```http
GET /contas/:codigo
```

#### Desativar Conta

```http
DELETE /contas/:codigo
```

### 💰 Transações

#### Criar Transação

```http
POST /transacoes/create
Content-Type: application/json

{
  "tstitulo": "Salário",
  "tsdescricao": "Salário do mês",
  "tsconta": "uuid-da-conta",
  "tsvalor": 5000.00,
  "tstipo": "RECEITA",
  "tsstatus": "CONFIRMADA",
  "tsquando": "2024-02-01T00:00:00.000Z",
  "tscategoria": "uuid-da-categoria",
  "tssubcategoria": "uuid-da-subcategoria",
  "tsrecorrente": false,
  "tsfrequencia": "MENSAL",
  "tsdataInicio": "2024-02-01T00:00:00.000Z",
  "tsdataFim": "2024-12-31T00:00:00.000Z",
  "tscomprovante": "url-do-comprovante",
  "tsnotas": "Observações adicionais"
}
```

#### Atualizar Transação

```http
PUT /transacoes/update
Content-Type: application/json

{
  "tscodigo": "uuid-da-transacao",
  "tstitulo": "Salário Atualizado",
  "tsvalor": 5500.00,
  "tstipo": "RECEITA"
}
```

#### Listar Transações

```http
GET /transacoes
```

Com filtros opcionais:

```http
GET /transacoes?conta=uuid-da-conta&tipo=RECEITA&dataInicio=2024-01-01&dataFim=2024-01-31
```

#### Buscar Transação Específica

```http
GET /transacoes/:codigo
```

#### Excluir Transação

```http
DELETE /transacoes/:codigo
```

### 📂 Categorias de Transações

#### Criar Categoria

```http
POST /categorias-transacoes/create
Content-Type: application/json

{
  "ctcategoria": "Alimentação",
  "ctcor": "#EF4444",
  "ctativo": true
}
```

#### Atualizar Categoria

```http
PUT /categorias-transacoes/update
Content-Type: application/json

{
  "ctcodigo": "uuid-da-categoria",
  "ctcategoria": "Alimentação e Restaurantes",
  "ctcor": "#DC2626"
}
```

#### Listar Categorias

```http
GET /categorias-transacoes
```

#### Buscar Categoria Específica

```http
GET /categorias-transacoes/:codigo
```

#### Desativar Categoria

```http
DELETE /categorias-transacoes/:codigo
```

## Tipos de Dados

### Enums Disponíveis

#### TiposContasEnum

- `CORRENTE`
- `POUPANCA`
- `SALARIO`
- `INVESTIMENTO`
- `CARTAO_CREDITO`
- `CARTAO_DEBITO`
- `DINHEIRO`
- `OUTRO`

#### TiposTransacaoEnum

- `RECEITA`
- `DESPESA`
- `TRANSFERENCIA`
- `INVESTIMENTO`
- `RETIRADA`

#### StatusTransacaoEnum

- `PENDENTE`
- `CONFIRMADA`
- `CANCELADA`
- `ESTORNADA`

#### StatusContaEnum

- `ATIVA`
- `INATIVA`
- `BLOQUEADA`
- `FECHADA`

#### FrequenciaRecorrenciaEnum

- `UMA_VEZ`
- `DIARIA`
- `SEMANAL`
- `QUINZENAL`
- `MENSAL`
- `BIMESTRAL`
- `TRIMESTRAL`
- `SEMESTRAL`
- `ANUAL`

## Funcionalidades Especiais

### Atualização Automática de Saldo

O sistema atualiza automaticamente o saldo das contas quando:

- Uma transação é criada
- Uma transação é atualizada
- Uma transação é excluída

### Transações Recorrentes

Suporte para transações recorrentes com:

- Frequência configurável
- Período de vigência
- Status de confirmação

### Filtros Avançados

As transações podem ser filtradas por:

- Conta específica
- Tipo de transação
- Período de datas
- Categoria
- Status

## Respostas

### Sucesso

```json
{
  "status": true,
  "message": "Operação realizada com sucesso!",
  "data": { ... }
}
```

### Erro

```json
{
  "status": false,
  "error": "Mensagem de erro específica"
}
```

## Exemplos de Uso

### Fluxo Completo de Gestão Financeira

1. **Criar Categoria**

```bash
curl -X POST /categorias-transacoes/create \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"ctcategoria": "Alimentação", "ctcor": "#EF4444"}'
```

2. **Criar Conta**

```bash
curl -X POST /contas/create \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"ctconta": "Conta Principal", "cttipoconta": "CORRENTE", "ctsaldo": 1000.00}'
```

3. **Registrar Transação**

```bash
curl -X POST /transacoes/create \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"tstitulo": "Supermercado", "tsconta": "uuid-conta", "tsvalor": 150.00, "tstipo": "DESPESA", "tsquando": "2024-02-01T00:00:00.000Z", "tscategoria": "uuid-categoria"}'
```

4. **Consultar Saldo**

```bash
curl -X GET /contas \
  -H "Authorization: Bearer <token>"
```

## Notas Importantes

- Todos os valores monetários são tratados como `Float`
- Datas devem ser enviadas no formato ISO 8601
- IDs são gerados automaticamente como UUIDs
- O sistema mantém histórico de todas as operações
- Transações excluídas revertem automaticamente o saldo da conta
