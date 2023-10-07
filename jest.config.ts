module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@/tests/(.+)': '<rootDir>/tests/$1',
  },
};