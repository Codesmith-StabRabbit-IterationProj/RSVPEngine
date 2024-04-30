module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/backend/**/*.js', // Only run backend tests matching this pattern
  ],
  setupFilesAfterEnv: ['./testSetup'], // Continue using your test setup file if needed
};
