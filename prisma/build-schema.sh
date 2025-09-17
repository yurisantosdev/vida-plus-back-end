#!/bin/bash

# Script para construir o schema completo do Prisma a partir dos módulos

echo "Construindo schema completo do Prisma..."

# Criar o arquivo de saída
output_file="schema_complete.prisma"

# Limpar arquivo de saída se existir
> "$output_file"

# Concatenar os arquivos na ordem correta
cat schema.prisma >> "$output_file"
echo "" >> "$output_file"
echo "// ========================================" >> "$output_file"
echo "// MÓDULOS IMPORTADOS" >> "$output_file"
echo "// ========================================" >> "$output_file"
echo "" >> "$output_file"

# Adicionar enums primeiro (são referenciados por outros módulos)
if [ -f "modules/enums.prisma" ]; then
    echo "// Enums do Sistema" >> "$output_file"
    cat modules/enums.prisma >> "$output_file"
    echo "" >> "$output_file"
fi

# Adicionar módulo de usuários (base para outros módulos)
if [ -f "modules/usuarios.prisma" ]; then
    echo "// Módulo de Usuários" >> "$output_file"
    cat modules/usuarios.prisma >> "$output_file"
    echo "" >> "$output_file"
fi

# Adicionar outros módulos
modules=("finance" "garage" "checklists" "tarefas")

for module in "${modules[@]}"; do
    if [ -f "modules/${module}.prisma" ]; then
        echo "// Módulo $module" >> "$output_file"
        cat "modules/${module}.prisma" >> "$output_file"
        echo "" >> "$output_file"
    fi
done

echo "Schema completo gerado em: $output_file"
echo "Agora você pode usar este arquivo para migrações:"
echo "npx prisma migrate dev --schema=./schema_complete.prisma" 