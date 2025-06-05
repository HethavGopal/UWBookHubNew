module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // Error prevention
    'no-console': 'warn',
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    'no-undef': 'error',
    
    // Code style
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    
    // Best practices
    'eqeqeq': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    
    // Security
    'no-new-func': 'error',
    'no-script-url': 'error',
    
    // Node.js specific
    'no-process-exit': 'warn',
    'no-path-concat': 'error'
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    'logs/',
    'uploads/',
    '*.min.js'
  ]
}; 