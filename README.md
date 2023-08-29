<!-- Co zrobię jutro: -->
Przeczytać jeszcze raz o BEM i ABEM. Może w organiźmie Headera dodać klasy
wg ABEM zeby był jakiś prosty przykład

<!-- Co zrobię pojutrze: -->

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

<!-- dalszy workflow iteracyjnie:
1. Tworzysz ficzer tak jak umiesz. Czy ma wszystkie funkcjonalności, które chcesz mieć?
(Ikony: https://pictogrammers.com/library/mdi/
Pinia:
Router:
Vee-validate:
Yup:)

2, Czy jest git responsywny?
(Ma się dobrze wyświetlać od 300px)

3. Poprawiasz strukturę: Atomic?
(https://medium.com/@vuefront/finding-the-perfect-component-file-structure-for-out-vuejs-app-b808a69dacac
struktura wzorować się na tym:
https://github.com/vuefront/vuefront
https://github.com/DariaYeremina/comments-app/blob/master/src/components/molecules/VAddComment.vue)
WNIOSKI:
a) atomy:
niepodzielny najmniejszy komponent
mają 1 poziom folderów
nie ma biznesowej logiki, może mieć logikę dotyczącą wyglądu (różne warianty)
każdy komponent vuetify rozbijam na Atomic Design (robię wrappery)
(https://dev.to/timothyokooboh/vue-js-how-to-maintain-atomic-design-principles-when-using-vendor-components-2hf0)
b) molekuły
mała kombinacja atomów i innych molekułów
mogą mieć logikę dotyczącą wyglądu, ale nie mają logiki biznesowej
mają 1 poziom folderów
c) organizmy
kombinacja atomów, molekułów i innych organizmów
może zacząć mieć logikę biznesową
1 poziom folderów
mogą zacząć mieć pobieranie danych (GraphQL/korzystanie z endpointów)
d) templatki
nie mają jeszcze właściwych danych. Layout dla page'a

4. Uzupełniasz o typescripta (+yup)?
(wzoruje się na: https://github.com/PiotrWasak/public-api/tree/master/src/types i vuefront z pkt3)

5. Poprawiasz klasy: ABEM?
( https://imarc-boilerplate.netlify.app/pattern-library/docs/abem.html
https://css-tricks.com/abem-useful-adaptation-bem/ )

6. Dodajesz Unit testy?
Unit testy zrobimy z vitestem (polecane i utrzymywane przez vue team). (for components or composables that render headlessly (e.g. the useFavicon function in VueUse). Components and DOM can be tested using @vue/test-utils.) To co testujesz: helpery/komponenty/composables stworzysz podfoldery na ficzery i tam będę wrzucał testy
End to end zrobimy w cypressie na końcu. Docelowa struktura wtedy będzie zaprojektowana
Możesz też zrobić przykładowy jeden unit test w cypress
Docelowo chcę mieć testy na:
helpery,
komponenty,
composables,
pinia store,

7. Storybook?
https://storybook.js.org/ (czy może współgrać z cypressem?)

8. Prettier
9. Koniec ficzera, można brać kolejny: idziemy do pkt 1 -->

<!-- Po jednym/dwóch ficzerach plan co dalej:
1. Wnioski po dotychczasowej pracy- coś do ToDo? -->

<!-- dodać theme do vuetify -->
<!-- na koniec pracy pousuwać Old pliki -->
<!-- konfiguracja eslinta, czy coś zmieniamy -->
<!-- co można zrobić z prettier -->
<!-- na końcu dependabota -->
<!-- dodanie i konfiguracja Sentry? -->
<!-- przykład css i Bema -->
<!-- ogarnąć ładne Readmi -->
pouczyć się pug

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
