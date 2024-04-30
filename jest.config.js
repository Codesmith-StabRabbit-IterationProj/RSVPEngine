export default {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/backend/**/*.js'],
  setupFilesAfterEnv: ['./testSetup'],
  testEnvironment: 'node',
  transform: {},
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
