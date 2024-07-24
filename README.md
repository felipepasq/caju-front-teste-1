
  

# Caju Front End Teste
  
Esse é um teste técnico para a vaga de Desenvolvedor Front End Sênior para a empresa Caju.

## Principais tecnologias utilizadas
  

- [React](https://react.dev/)

- [React Hook Form](https://www.react-hook-form.com/)

- [Axios](https://axios-http.com/ptbr/)

- [Zod](https://zod.dev/)

- [React Toastify](https://www.npmjs.com/package/react-toastify)

- [TanStack Query](https://tanstack.com/query/latest)

- [Styled Components](https://styled-components.com/)

- [Jest](https://jestjs.io/pt-BR/)

- [Vite](https://vitejs.dev/)
- [Radix UI](https://www.radix-ui.com/primitives)

## Estrutura de pastas
```
.
├── public
├── src
│   ├── components
│   │   ├── NavBar
│   │   │   ├── index.tsx
│   │   │   └── index.test.tsx
│   │   └── index.tsx
│   ├── hooks
│   │   ├── useGetRegistrations
│   │   │   ├── index.test.tsx
│   │   │   └── index.tsx
│   │   └── index.tsx
│   ├── pages
│   │   ├── Dashboard
│   │   │   └── components
│   │   │       ├── RegistrationCard
│   │   │       │   ├── index.test.tsx
│   │   │       │   ├── styles.ts
│   │   │       │   └── index.tsx
│   │   │       ├── index.test.tsx
│   │   │       └── index.tsx
│   │   └── index.tsx
│   ├── router
│   │   ├── index.tsx
│   │   └── routes.ts       
│   ├── services
│   │   ├── api
│   │   │   └── index.tsx
│   │   ├── registrations
│   │   │   └── index.tsx
│   │   └── index.tsx
│   ├── types
│   │   └── index.tsx
│   ├── utils
│   │   ├── maskCpf
│   │   ├── index.test.tsx
│   │   │   └── index.tsx
│   │   └── index.tsx
│   ├── App.tsx
│   ├── main.tsx
│   ├── theme.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── README.md
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── .....

```
 ## Testes
 O projeto apresenta alta cobertura de testes sendo os mesmos tanto unitários como de integração.
 ![Testes](https://github.com/felipepasq/caju-front-teste-1/blob/main/public/assets/testes.png)
Além disso foi adicionado também um novo script de teste para ser rodado durante a pipeline.
```
"test:prod":  "jest --coverage --no-watchAll"
```

## Deploy CI/CD
Além disso o desafio também conta com deploy automatizado que roda todos os testes dentro da aplicação antes de realizar o deploy da aplicação na [Vercel](https://vercel.com/).  Apesar da aplicação estar sem funcionamento por conta de ausência de servidor é possivel acessar a mesma através do link [Caju teste](https://caju-front-teste-1-1xbj9m7ci-felipepasqs-projects.vercel.app/#/dashboard).
![Deploy](https://github.com/felipepasq/caju-front-teste-1/blob/main/public/assets/deploy_1.png)

![Deploy](https://github.com/felipepasq/caju-front-teste-1/blob/main/public/assets/deploy_2.png)



## Requisitos
Todos os requisitos mencionados no desafio foram cumpridos e todas as sugestões e dicas acatadas durante o desenvolvimento.

## Desenvolvimento

  

```shell

git  clone  https://github.com/felipepasq/caju-front-teste-1.git

cd  caju-front-test-1

yarn

yarn  dev

```

  

Abra outro terminal e execute:

```shell

yarn  init:db

```

  

Para os testes

  

```shell

yarn  test:dev

```

Se tudo tiver dado certo as seguintes portas estarão disponiveis:

<br/>

  

Aplicação http://localhost:3001/

<br/>

Json Web Server http://localhost:3000/

  

