#!/usr/bin/env python3
import os
import glob

# Dicionário de substituições
CORRECOES = {
    's intempéries': 'às intempéries',
    's intempries': 'às intempéries',
    's variações': 'às variações',
    's variaes': 'às variações',
    's variaões climáticas': 'às variações climáticas',
    's variaes climticas': 'às variações climáticas',
    'formulao': 'formulação',
    'proteo': 'proteção',
    'aplicao': 'aplicação',
    'Aplicao': 'Aplicação',
    'mecnica': 'mecânica',
    'Disponveis': 'Disponíveis',
    'disponveis': 'disponíveis',
    'Avaliaes': 'Avaliações',
    'avaliaes': 'avaliações',
    'Avaliação': 'Avaliação',
    'resistncia': 'resistência',
    'Resistncia': 'Resistência',
}

def corrigir_arquivo(caminho):
    try:
        with open(caminho, 'r', encoding='utf-8', errors='replace') as f:
            conteudo_original = f.read()
        
        conteudo_corrigido = conteudo_original
        
        for errado, correto in CORRECOES.items():
            if errado in conteudo_corrigido:
                conteudo_corrigido = conteudo_corrigido.replace(errado, correto)
        
        if conteudo_corrigido != conteudo_original:
            with open(caminho, 'w', encoding='utf-8') as f:
                f.write(conteudo_corrigido)
            return True
        return False
    except Exception as e:
        print(f"Erro em {caminho}: {str(e)}")
        return False

arquivos_processados = 0
arquivos_alterados = 0

for arquivo in glob.glob('**/*.html', recursive=True):
    if '.git' not in arquivo:
        arquivos_processados += 1
        if corrigir_arquivo(arquivo):
            arquivos_alterados += 1
            print(f"Corrigido: {arquivo}")

print(f"\n✅ Script 1.3 concluído:")
print(f"   Total de arquivos HTML processados: {arquivos_processados}")
print(f"   Arquivos com correção aplicada: {arquivos_alterados}")
