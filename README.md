# Node Typescript Lint and Formatting Base

If you just want to install this project, just clone it and run `npm i`

If you want to know each step:

```
git init
npm init -y
npm i -D typescript
npm i -D --save-exact prettier
npm init @eslint/config
npm i -D eslint-config-prettier
```

Eslint questions:

```
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · standard-with-typescript
✔ What format do you want your config file to be in? · JSON
```

Install eslint dependencies when asked.

**.gitignore** taken from https://github.com/microsoft/TypeScript-Node-Starter/blob/master/.gitignore

**.tsconfig** taken from https://www.totaltypescript.com/tsconfig-cheat-sheet