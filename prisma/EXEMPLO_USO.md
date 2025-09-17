# Guia Prático - Estrutura Modular do Prisma

## Como Usar a Nova Estrutura

### 1. Desenvolvimento Diário

**Para editar um módulo específico:**

```bash
# Editar módulo de usuários
code prisma/modules/usuarios.prisma

# Editar módulo financeiro
code prisma/modules/finance.prisma

# Editar enums
code prisma/modules/enums.prisma
```

### 2. Comandos NPM Disponíveis

```bash
# Construir o schema completo
npm run prisma:build

# Gerar migração
npm run prisma:migrate

# Gerar cliente Prisma
npm run prisma:generate

# Abrir Prisma Studio
npm run prisma:studio
```

### 3. Fluxo de Trabalho

1. **Editar módulos** em `prisma/modules/`
2. **Construir schema** com `npm run prisma:build`
3. **Gerar migração** com `npm run prisma:migrate`
4. **Testar** com `npm run prisma:studio`

### 4. Exemplo: Adicionar Novo Campo

**Passo 1:** Editar o módulo apropriado

```prisma
// Em prisma/modules/usuarios.prisma
model Usuarios {
  uscodigo    String   @id
  usnome      String
  usemail     String   @unique
  usfoto      String
  ussenha     String
  usativo     Boolean  @default(true)  // ← Novo campo
  createdAt   DateTime @default(now())
  updatedAt   DateTime @default(now())
  // ... resto do modelo
}
```

**Passo 2:** Construir e migrar

```bash
npm run prisma:migrate
```

### 5. Exemplo: Adicionar Novo Enum

**Passo 1:** Editar enums

```prisma
// Em prisma/modules/enums.prisma
enum StatusEnum {
  ATIVO
  INATIVO
  PENDENTE
}
```

**Passo 2:** Usar em um modelo

```prisma
// Em qualquer módulo
model Exemplo {
  id     String      @id
  status StatusEnum  @default(ATIVO)
}
```

### 6. Estrutura de Arquivos Final

```
prisma/
├── schema.prisma              # Configuração básica
├── schema_complete.prisma     # Schema completo (gerado automaticamente)
├── build-schema.sh           # Script de construção
├── README.md                 # Documentação
├── EXEMPLO_USO.md           # Este arquivo
├── modules/
│   ├── enums.prisma         # Enums compartilhados
│   ├── usuarios.prisma      # Módulo de usuários
│   ├── finance.prisma       # Módulo financeiro
│   ├── garage.prisma        # Módulo de veículos
│   ├── checklists.prisma    # Módulo de checklists
│   └── tarefas.prisma       # Módulo de tarefas
└── migrations/              # Migrações do banco
```

### 7. Vantagens da Nova Estrutura

✅ **Organização**: Cada módulo tem seu próprio arquivo
✅ **Manutenibilidade**: Fácil de encontrar e editar
✅ **Colaboração**: Múltiplos desenvolvedores podem trabalhar em módulos diferentes
✅ **Reutilização**: Módulos podem ser copiados para outros projetos
✅ **Escalabilidade**: Fácil adicionar novos módulos

### 8. Dicas Importantes

- **Sempre** execute `npm run prisma:build` antes de migrações
- **Mantenha** as relações entre módulos consistentes
- **Use** o arquivo `enums.prisma` para enums compartilhados
- **Teste** as migrações em ambiente de desenvolvimento primeiro
- **Documente** mudanças significativas nos módulos

### 9. Troubleshooting

**Erro: "Type X is neither a built-in type, nor refers to another model"**

- Verifique se o modelo está definido no módulo correto
- Execute `npm run prisma:build` para regenerar o schema completo

**Erro: "Enum X is not defined"**

- Adicione o enum ao arquivo `modules/enums.prisma`
- Execute `npm run prisma:build`

**Erro: "Relation X does not exist"**

- Verifique se as relações estão definidas corretamente
- Certifique-se de que os modelos estão no schema completo
