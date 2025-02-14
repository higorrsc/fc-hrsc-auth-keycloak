# Keycloak

## 📌 O que é o Keycloak?

Keycloak é uma solução de **gerenciamento de identidade e acesso (IAM - Identity and Access Management)** de código aberto, desenvolvida pela Red Hat. Ele fornece **autenticação e autorização** para aplicações e serviços modernos, suportando padrões como **OAuth 2.0, OpenID Connect (OIDC) e SAML 2.0**.

## 🎯 Principais Funcionalidades

- **Single Sign-On (SSO)** – Permite que usuários acessem múltiplos sistemas com um único login.
- **Autenticação Multifator (MFA)** – Suporta autenticação via SMS, e-mail, OTP, etc.
- **Gerenciamento de Usuários** – Criação, modificação e deleção de usuários via UI, API ou LDAP/Active Directory.
- **Autorização baseada em papéis (RBAC)** – Controle de permissões com base em grupos e funções.
- **Administração via UI ou API REST** – Interface web intuitiva e endpoints para automação.
- **Integração com Provedores de Identidade** – Suporte para logins sociais (Google, Facebook, etc.) e identidade federada.

## 🚀 Como Instalar

### Usando Docker

```sh
docker run -d --name keycloak \
  -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak start-dev
```

### Instalação Manual

1. Baixe o [Keycloak](https://www.keycloak.org/downloads)
2. Extraia os arquivos e navegue até a pasta do Keycloak
3. Inicie o servidor:

```sh
bin/kc.sh start-dev
```

## 🛠 Configuração Inicial

1. Acesse `http://localhost:8080`
2. Faça login com `admin / admin`
3. Crie um **Realm**, **Client** e configure permissões conforme necessário

## 📌 Casos de Uso

✅ Aplicações web e mobile que precisam de autenticação segura.\
✅ Microsserviços que exigem um **Identity Provider (IdP)** centralizado.\
✅ Empresas que querem um **SSO** entre diversos serviços internos e externos.\
✅ Plataformas que precisam de controle granular de permissões de usuários.

## 📚 Documentação Oficial

Para mais detalhes, consulte a [documentação oficial](https://www.keycloak.org/documentation).

## 📜 Licença

Este projeto é distribuído sob a licença [Apache License 2.0](https://github.com/keycloak/keycloak/blob/main/LICENSE).
