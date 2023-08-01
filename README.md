<!-- Co zrobię jutro: -->
Dalsza praca nad TemplateView (proste menu, przełączanie języka, przełączenie themy, zbudować custom theme z nowym custom colorem), który będzie miał jakiś nagłówek i Footer
Wstawię do niego komponent Home View i About View
<!-- Co zrobię pojutrze: -->
Dopracowanie template View:
- testy jednostkowe
- atomic design
- CSSy i ABEM
- Typescript
- Storybook

Trzeba doczytać o unit testach komponentów view: view test utils
Zastanowić się czy nie chcę spróbować robic TDD.
<!--  -->

Ctr + shift + P: Typescript: restart TS server
docker compose up -d --build
docker exec -it vite_docker sh
yarn run dev
https://dev.to/ysmnikhil/how-to-build-with-react-or-vue-with-vite-and-docker-1a3l
dodano Vuetify
dodano plugin-legacy support for legacy browsers that do not support those features when building for production.
dodano i18n-vue do langów
dodano zmienne środowiskowe .env
Dodano vee-validate z customowymi komunikatami błędów.
Dodano axiosa
https://enetoolveda.medium.com/how-to-use-axios-typescript-like-a-pro-7c882f71e34a
Unit testy zrobimy z vitestem (polecane i utrzymywane przez vue team). (for components or composables that render headlessly (e.g. the useFavicon function in VueUse). Components and DOM can be tested using @vue/test-utils.) To co testujesz: helpery/komponenty/composables stworzysz podfoldery na ficzery i tam będę wrzucał testy
End to end zrobimy w cypressie na końcu. Docelowa struktura wtedy będzie zaprojektowana
Możesz też zrobić przykładowy jeden unit test w cypress
Docelowo chcę mieć testy na:
helpery,
komponenty,
composables,
pinia store,
na types wzorować się będę na tym:
https://github.com/PiotrWasak/public-api/tree/master/src/types
struktura wzorować się na tym:
https://github.com/vuefront/vuefront
https://github.com/DariaYeremina/comments-app/blob/master/src/components/molecules/VAddComment.vue

czyli folder na typy i tam rozbite na pliki
Ten mały przykład zrobię na bazie:
Atomic design: 
https://medium.com/@vuefront/finding-the-perfect-component-file-structure-for-out-vuejs-app-b808a69dacac
przykład: https://github.com/vuefront/vuefront/blob/master/src/components/atoms/textarea/textarea.vue
CSS zrobię na ABEM:
https://imarc-boilerplate.netlify.app/pattern-library/docs/abem.html
https://css-tricks.com/abem-useful-adaptation-bem/
Doczytać o storybook, jak się ma (czy może współgrać z cypressem), wprowadzić w życie
https://storybook.js.org/
Ogarnąć pug i dodać do projektu!

Icons: https://pictogrammers.com/library/mdi/
<!-- dalszy workflow iteracyjnie:
1. Tworzysz pierwszy ficzer tak jak umiesz
1*. Może wymagać doczytania/poprawy/dorobienia: PINIA, ROUTER, VEE-Validate
2. Poprawiasz strukturę: Atomic
3. Uzupełniasz o typescripta
4. Poprawiasz klasy: ABEM
5. Dodajesz Unit testy 
6. Storybook
7. Koniec ficzera, można brać kolejny: idziemy do pkt 1 -->

<!-- Po jednym/dwóch ficzerach plan co dalej:
1. Wnioski po dotychczasowej pracy- coś do ToDo?
2. Może dorobienie stories? Może już tu trzeba doczytać jak to się ma do Cypressa -->

<!-- dodać theme do vuetify -->
<!-- na koniec pracy pousuwać Old pliki -->
<!-- konfiguracja eslinta, czy coś zmieniamy -->
<!-- co można zrobić z prettier -->
<!-- na końcu dependabota -->
<!-- dodanie i konfiguracja Sentry? -->
<!-- przykład css i Bema -->
<!-- ogarnąć ładne Readmi -->

<!-- aplikacja właściwa: -->
<!-- obsługa 429 too many requests w public apis -->
<!-- zacnie zrobione komponenty Ikonek OldIcon ze względu na prostotę sterowania kolorem, choć może można by zrobić je jeszcze zacniej ;) Stwórz komponenty ikonek biorąc najlepsze doświadczenia stąd i z dotychczasowych projektów i z vuetifajowych ikonek-->
# dashboard-public-api

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
