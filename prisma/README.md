# Estrutura Modular do Schema Prisma

Este diretório contém o schema do Prisma organizado em módulos separados para melhor manutenção e organização do código.

## Estrutura de Arquivos

```
prisma/
├── schema.prisma          # Arquivo principal (configuração básica)
├── modules/
│   ├── enums.prisma       # Enums do sistema
│   ├── usuarios.prisma    # Módulo de usuários
│   ├── finance.prisma     # Módulo financeiro
│   ├── garage.prisma      # Módulo de veículos
│   ├── checklists.prisma  # Módulo de checklists
│   └── tarefas.prisma     # Módulo de tarefas
└── migrations/            # Migrações do banco
```

## Como Usar

### Para Desenvolvimento

1. **Editar módulos**: Cada módulo pode ser editado independentemente em seu arquivo correspondente
2. **Manter consistência**: Certifique-se de que as relações entre módulos estejam corretas
3. **Enums compartilhados**: Os enums estão centralizados em `modules/enums.prisma`

### Para Gerar o Schema Completo

Como o Prisma não suporta imports nativos, você precisa concatenar os arquivos manualmente ou usar um script:

```bash
# Exemplo de script para concatenar (criar se necessário)
cat schema.prisma modules/enums.prisma modules/usuarios.prisma modules/finance.prisma modules/garage.prisma modules/checklists.prisma modules/tarefas.prisma > schema_complete.prisma
```

### Para Migrações

1. Gere o schema completo concatenando os módulos
2. Execute as migrações normalmente:
   ```bash
   npx prisma migrate dev
   ```

## Vantagens da Estrutura Modular

- **Organização**: Cada módulo funcional tem seu próprio arquivo
- **Manutenibilidade**: Mais fácil de encontrar e editar modelos específicos
- **Colaboração**: Diferentes desenvolvedores podem trabalhar em módulos diferentes
- **Reutilização**: Módulos podem ser facilmente copiados para outros projetos

## Módulos Disponíveis

### Enums (`modules/enums.prisma`)

- `UrgenciasEnum`: Níveis de urgência para tarefas
- `TiposContasEnum`: Tipos de contas financeiras
- `CategoriasDespesasEnum`: Categorias de despesas de veículos

### Usuários (`modules/usuarios.prisma`)

- `Usuarios`: Modelo principal de usuários
- `CodigosRecuperarSenha`: Códigos para recuperação de senha
- `Notificacoes`: Sistema de notificações

### Finance (`modules/finance.prisma`)

- `Contas`: Contas bancárias
- `CategoriasTransacoes`: Categorias de transações
- `Transacoes`: Transações financeiras
- `Bens`: Bens do usuário
- `DespesasFinance`: Despesas financeiras gerais

### Garage (`modules/garage.prisma`)

- `Veiculos`: Veículos do usuário
- `Abastecimentos`: Registro de abastecimentos
- `Despesas`: Despesas relacionadas a veículos
- `Manutencoes`: Manutenções de veículos

### Checklists (`modules/checklists.prisma`)

- `Checklists`: Listas de verificação
- `ItensChecklists`: Itens individuais dos checklists

### Tarefas (`modules/tarefas.prisma`)

- `Tarefas`: Tarefas do usuário
- `Subtarefas`: Subtarefas relacionadas

## Notas Importantes

- As relações entre módulos devem ser mantidas consistentes
- Ao adicionar novos modelos, considere em qual módulo eles se encaixam melhor
- Enums compartilhados devem ser adicionados ao arquivo `enums.prisma`
- Sempre teste as migrações após alterações nos módulos
