import { renderHook, act } from '@testing-library/react';
import { useNeuralNetwork } from './useNeuralNetwork';
import { describe, it, expect, vi } from 'vitest';

// Mock TensorFlow.js to avoid WebGL errors and speed up tests
vi.mock('@tensorflow/tfjs', () => ({
  sequential: () => ({
    add: vi.fn(),
    compile: vi.fn(),
    layers: [{ units: 10 }, { units: 1 }], // Mock layers
    dispose: vi.fn(),
    predict: vi.fn(() => ({ dataSync: () => new Float32Array([0.5]) })),
    fit: vi.fn(() => Promise.resolve({})),
    getWeights: vi.fn(() => []),
    setWeights: vi.fn(),
  }),
  layers: {
    dense: vi.fn(() => ({ apply: vi.fn(), getWeights: vi.fn(() => []) })),
    batchNormalization: vi.fn(),
    dropout: vi.fn(),
  },
  train: {
    sgd: vi.fn(),
    adam: vi.fn(),
  },
  tensor: vi.fn(),
  tensor2d: vi.fn(() => ({ dispose: vi.fn() })),
  tidy: (fn) => fn(),
}));

describe('useNeuralNetwork Security Vulnerability', () => {
  it('should sanitize malicious code in hyperparameters', () => {
    const { result } = renderHook(() => useNeuralNetwork());

    const maliciousPayload = {
      version: 1,
      structure: [2, 4, 1],
      hyperparams: {
        // Malicious string injection
        optimizer: "adam'); console.log('pwned'); //",
        activation: "relu",
        learningRate: 0.1
      }
    };

    act(() => {
      result.current.importModelJSON(maliciousPayload);
    });

    // Vulnerability fixed: The optimizer state is sanitized to default 'adam'
    expect(result.current.hyperparams.optimizer).toBe('adam');
  });

  it('should sanitize malicious dataset size in imported JSON', () => {
    const { result } = renderHook(() => useNeuralNetwork());

    const maliciousPayload = {
      version: 1,
      structure: [2, 4, 1],
      datasetParams: {
        type: 'xor',
        size: 1000000000, // Malicious size
        noise: 0.1
      }
    };

    act(() => {
      result.current.importModelJSON(maliciousPayload);
    });

    expect(result.current.datasetParams.size).toBe(5000); // Should be clamped
  });
});
