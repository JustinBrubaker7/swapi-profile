// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        // Handle module aliases (if you have any in your project)
        '^@components/(.*)$': '<rootDir>/components/$1',

        // Mock CSS modules
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    // Add any patterns to the list below to exclude files from being tested
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};
