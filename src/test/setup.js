import '@testing-library/jest-dom';

// Mock TensorFlow.js for unit tests that don't need actual tensor operations
// This speeds up tests and avoids GPU/WebGL issues in test environment
