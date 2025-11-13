import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import stylisticJs from '@stylistic/eslint-plugin'
export default defineConfig([
  pluginReact.configs.flat.recommended,
  js.configs.recommended,
  { 
    files: ["**/*.{js,mjs,cjs,jsx}"],
    
    
    plugins: { js,
      '@stylistic/js' : stylisticJs,
      pluginReact
     }, 
     rules: { 
      'react/prop-types': 'off',
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      sourceType: 'module',
      ecmaVersion: 'latest',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {...globals.node, ...globals.browser} } 
  },
  {
    ignores: ['dist/**','node_modules/**','*.config.js'],
  },
  {
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  },
]);
