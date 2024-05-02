require('dotenv').config(); // Load environment variables

const config = {
  verbose: true,
};

module.exports = async () => {
  if (process.env.TEST_ENV === 'frontend') {
    return {
      ...config,
      testEnvironment: 'jest-environment-jsdom', // jsdom environment for frontend tests
      testMatch: ['<rootDir>/__tests__/frontend/**/*.js'], // Glob pattern to include all JS files in the frontend tests directory
    };
  } else if (process.env.TEST_ENV === 'backend') {
    return {
      ...config,
      testEnvironment: 'node', // Node environment for backend tests
      testMatch: ['<rootDir>/__tests__/backend/**/*.js'], // Glob pattern to include all JS files in the backend tests directory
      setupFilesAfterEnv: ['<rootDir>/backendTestSetup.cjs'], // Points to a setup file that will run before the tests
    };
  }

  return config; // Default config if no specific environment is set
};
