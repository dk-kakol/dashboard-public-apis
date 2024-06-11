https://api.publicapis.org/
https://pictogrammers.com/library/mdi/
<!-- Co zrobię dziś/jutro: -->
Filtrowanie (resourcy i kolejne endpointy zrobię z composablem (patrz resource na swd)):

+nowy composable/serwis na wysyłkę requestów (z użyciem vue-use) +unit testy
+store na resourcy (+unit testy)
-przeczytać i przekmninić vee-validate
-Atom inputa (testy + storybook)
-Atom Selecta (testy + storybook)
-Molekuła FormInpu: atom inputa z walidacją (testy + storybook)
-Molekuła FormSelect: atom selecta z walidacją (testy + storybook)
-Molekuła filtrów (test + storybook)
-Wstawić filtry do Organizmu listy (+ updejt test i storybook)
-obsługa filtrów w storze pobierania public apis (+unit testy)

<!-- Co zrobię pojutrze: -->
Upgrejd yarn
Storybook todo:
- uzupełnić storybook dla komponentów które ich nie mają
- opublikować storybook w chromecast?
- pokminić z vue-router, bo gdy dodaje ten plugin do storybooka to ButtonAtom się wywala
About Page - opisać technologie i health check (opis technologii za pomocą AI)
Update readme
Deploy
Zrobić jakieś proste gh actions
Dodać dependabota
CR i fixy
Zrobienie drugiego posprzątanego projektu w gh pokazowego

Ew. dalszy rozwój projektu:
- autoryzacja i authentykacja
- websockety? https://www.udemy.com/course/angular-2-and-nodejs-the-practical-guide/learn/lecture/10523172#questions/11161631/
https://blog.logrocket.com/build-real-time-vue-app-websockets/
- image upload (+ może obróbka?) do zakładania konta
- dodać jakieś tradycyjne transition?
- pokminić animacje i technologie kreatywne: GSAP, ThreeJS, Framer Motion, PixiJS, WebGL
(patrz https://p-programisci.pl/)
- narzędzia typu: https://www.tabnine.com/, https://www.sonarsource.com?
- dodać sentry
- dodać dependabota
- wariacja na temat nuxt
- gtm i analytics? 
- vite bundle analyzer?
- pug?
- dodać cypressa?
- zakładanie konta,
- formularz dodawania public apis
- panel admina do sterowania kontami
- nadawanie uprawnien przez admina
- potwierdzanie konta (wysyłka maila)
- Jakiś sprytny health check and mock backend if unavailable

Backend - opis funkcjonalności:
-autentykacja
-autoryzacja (uprawnienia): na dodawanie publicApi, na usuwanie, zarządzanie uprawnieniami
-publicApi ma zapisanego creatora i status ApiVerified (boolean)
--ApiVerified: oczekujące na zatwierdzenie (false)/ zatwierdzone (true)
-user: ma limit na dodawanie publicApi oczekujących, np 1
-po dodaniu publicApi: zmniejszamy limit userowi dodającemu
-jeśli weryfikacja jest pozytywna: zmieniamy status na zatwierdzony i zwiększamy limit userowi dodającemu o 1.
-requesty:
--user: dodawanie, logowanie, pobieranie wszystkich, usuwanie, edytowanie usera- 1 req (dodanie uprawnienia, usunięcie uprawnienia, edytowanie danych, zmiana limitu etc)
--public api: pobieranie zatwierdzonych, pobieranie oczekujących, dodawanie, usuwanie, zatwierdzanie
--resources: pobieranie możliwych kategorii i opcji. Uproszczenie: kategorii nie można dodawać nowych, tylko dostępna lista.
--websocket na dodane public api przez innego usera
-Ewentualny dalszy rozwój:
-- uwierzytelnienie - https://github.com/dk-kakol/dashboard-public-apis-backend/blob/master/controllers/user.js#L56 - brak algorytmu jwt, kiedyś była to dosyć częsta podatność - podpis bez algorytmu
-- dodałbym linter i podstawowe testy jednostkowe, żeby pokazać że wiesz że istnieją i powinno się je pisać
-- dodałbym checki przy pull requeście, jakiś workflow githubowy (przy publicznym repo nie masz limitów użycia github actions) wykonujący testy i builda aplikacji
-- rozważ typescript i składnię es6, to sztuka dla sztuki, ale jeśli chcesz zaprezentować umiejętności, to wrzucasz/używasz wszystkiego co umiesz, to aplikacja pokazowa
-- skonfigurowałbym dockera, tak żeby po pierwsze pokazać że umiesz się nim posługiwać, a po drugie jeśli ktoś będzie chciał sobie to sprawdzić, to może odpalić całe środowisko jedną komendą
-- jakieś screeny w readme, żeby pokazać o co chodzi w aplikacji

<!--  -->

Ctr + shift + P: Typescript: restart TS server
docker compose up -d --build
docker exec -it dashboard-public-apis sh
yarn run dev
https://dev.to/ysmnikhil/how-to-build-with-react-or-vue-with-vite-and-docker-1a3l
dodano Vuetify
dodano plugin-legacy support for legacy browsers that do not support those features when building for production.
dodano i18n-vue do langów
dodano zmienne środowiskowe .env
Dodano vee-validate z customowymi komunikatami błędów.
Dodano axiosa
https://enetoolveda.medium.com/how-to-use-axios-typescript-like-a-pro-7c882f71e34a
Dodano storybooka
Dodano huskyego. Przed każdym commitem lint, stylelint, unit testy, prettier i type-check

Jak będziesz potrzebował pierwornych plików to masz projekt test z postawionym środowiskiem.
<!-- dalszy workflow iteracyjnie:
1. Tworzysz ficzer tak jak umiesz. Czy ma wszystkie funkcjonalności, które chcesz mieć?
(Ikony: https://pictogrammers.com/library/mdi/
Pinia:
Router:
Vee-validate:
Zod:)

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

4. Uzupełniasz o typescripta (+zod)?
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
https://test-utils.vuejs.org/

7. Storybook?
https://storybook.js.org/ (czy może współgrać z cypressem?)

8. Commit z husky, sprawdzenie czy zrobiło zmiany i recommit (lint, stylelint, unit testy, prettier i type-check)

9. Koniec ficzera, można brać kolejny: idziemy do pkt 1 -->

<!-- Po jednym/dwóch ficzerach plan co dalej:
1. Wnioski po dotychczasowej pracy- coś do ToDo? -->

<!-- Wnioski różne -->
- z.enum() jest prostsze do użycia (w komponencie można od razu do property przypisać string i jest git)
z.nativeEnum(MyEnum) umożliwia użycie wprost jakiegoś enuma, ale ma minus że żeby przypisać do property 
musisz użyć tego enuma MyEnum.val. Uporządkować/udokumentować schemę Entry którą wersję przyjąć
-obsługa 429 too many requests w public apis
- helper function na znajdowanie data-tests
-zacnie zrobione komponenty Ikonek OldIcon ze względu na prostotę sterowania kolorem, choć może można by zrobić je jeszcze zacniej ;) Stwórz komponenty ikonek biorąc najlepsze doświadczenia stąd i z dotychczasowych projektów i z vuetifajowych ikonek
-z useI18n można wyciągnąć wszystko z Composer Instance
// const { t, d, n, tm, locale, availableLocales, getLocaleMessages } = useI18n();

<!--  -->
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
