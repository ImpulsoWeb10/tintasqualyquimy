# Gerenciador de Senhas Seguro (criptografado)
# Uso: python secure_password_manager.py
# Você precisará definir uma senha mestra na primeira execução.

import os
import base64
import getpass
from cryptography.fernet import Fernet, InvalidToken

ARQUIVO_SENHAS = "senhas_seguranca.bin"
ARQUIVO_CHAVE = "chave.key"

def gerar_chave(senha_mestra):
    # Deriva uma chave a partir da senha mestra
    return base64.urlsafe_b64encode(senha_mestra.ljust(32, '0').encode('utf-8'))

def salvar_chave(chave):
    with open(ARQUIVO_CHAVE, 'wb') as f:
        f.write(chave)

def carregar_chave():
    with open(ARQUIVO_CHAVE, 'rb') as f:
        return f.read()

def criptografar_senhas(senhas, chave):
    f = Fernet(chave)
    return f.encrypt(senhas.encode('utf-8'))

def descriptografar_senhas(dados, chave):
    f = Fernet(chave)
    return f.decrypt(dados).decode('utf-8')

def inicializar():
    if not os.path.exists(ARQUIVO_CHAVE):
        senha_mestra = getpass.getpass('Defina uma senha mestra: ')
        chave = gerar_chave(senha_mestra)
        salvar_chave(chave)
        print('Chave criada com sucesso!')
    else:
        print('Chave já existe.')

def adicionar_senha():
    chave = carregar_chave()
    f = Fernet(chave)
    try:
        with open(ARQUIVO_SENHAS, 'rb') as fsenhas:
            dados = fsenhas.read()
            senhas = descriptografar_senhas(dados, chave)
    except (FileNotFoundError, InvalidToken):
        senhas = ""
    servico = input('Serviço: ')
    usuario = input('Usuário: ')
    senha = getpass.getpass('Senha: ')
    nova = f"{servico}|{usuario}|{senha}\n"
    senhas += nova
    dados_cript = criptografar_senhas(senhas, chave)
    with open(ARQUIVO_SENHAS, 'wb') as fsenhas:
        fsenhas.write(dados_cript)
    print('Senha salva com segurança!')

def listar_senhas():
    chave = carregar_chave()
    try:
        with open(ARQUIVO_SENHAS, 'rb') as fsenhas:
            dados = fsenhas.read()
            senhas = descriptografar_senhas(dados, chave)
            print('\nSenhas salvas:')
            for linha in senhas.strip().split('\n'):
                servico, usuario, senha = linha.split('|')
                print(f"Serviço: {servico} | Usuário: {usuario} | Senha: {senha}")
    except (FileNotFoundError, InvalidToken):
        print('Nenhuma senha encontrada ou chave incorreta.')

def main():
    print('1 - Inicializar/cofre')
    print('2 - Adicionar senha')
    print('3 - Listar senhas')
    opcao = input('Escolha: ')
    if opcao == '1':
        inicializar()
    elif opcao == '2':
        adicionar_senha()
    elif opcao == '3':
        listar_senhas()
    else:
        print('Opção inválida.')

if __name__ == "__main__":
    main()
