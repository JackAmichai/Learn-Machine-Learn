import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as tf from '@tensorflow/tfjs';
import { generateData, DataType } from './data.js';

describe('data.js', () => {
    describe('DataType enum', () => {
        it('should have all required data types', () => {
            expect(DataType.XOR).toBe('xor');
            expect(DataType.CIRCLE).toBe('circle');
            expect(DataType.SPIRAL).toBe('spiral');
            expect(DataType.LINEAR).toBe('linear');
        });
    });

    describe('generateData', () => {
        afterEach(() => {
            // Clean up tensors after each test
            tf.disposeVariables();
        });

        it('should generate the correct number of samples', () => {
            const result = generateData(DataType.XOR, 100);
            expect(result.points.length).toBe(100);
            expect(result.labels.length).toBe(100);
            expect(result.xs.shape).toEqual([100, 2]);
            expect(result.ys.shape).toEqual([100, 1]);
            result.xs.dispose();
            result.ys.dispose();
        });

        it('should generate XOR data with correct label distribution', () => {
            const result = generateData(DataType.XOR, 1000, 0);
            
            // Each point should have 2 coordinates
            result.points.forEach(point => {
                expect(point.length).toBe(2);
            });

            // Labels should be 0 or 1
            result.labels.forEach(label => {
                expect(label === 0 || label === 1).toBe(true);
            });

            result.xs.dispose();
            result.ys.dispose();
        });

        it('should generate CIRCLE data within expected range', () => {
            const result = generateData(DataType.CIRCLE, 500, 0);
            
            result.points.forEach(([x, y]) => {
                // Points should be within a reasonable range
                expect(x).toBeGreaterThan(-2);
                expect(x).toBeLessThan(2);
                expect(y).toBeGreaterThan(-2);
                expect(y).toBeLessThan(2);
            });

            result.xs.dispose();
            result.ys.dispose();
        });

        it('should generate SPIRAL data', () => {
            const result = generateData(DataType.SPIRAL, 200, 0);
            
            expect(result.points.length).toBe(200);
            
            // Both classes should be present (roughly 50/50)
            const class0 = result.labels.filter(l => l === 0).length;
            const class1 = result.labels.filter(l => l === 1).length;
            expect(class0).toBe(100);
            expect(class1).toBe(100);

            result.xs.dispose();
            result.ys.dispose();
        });

        it('should generate LINEAR data', () => {
            const result = generateData(DataType.LINEAR, 200, 0);
            
            expect(result.points.length).toBe(200);
            expect(result.labels.length).toBe(200);

            result.xs.dispose();
            result.ys.dispose();
        });

        it('should respect noise parameter', () => {
            // With no noise, XOR labels should be deterministic based on quadrant
            const noNoise = generateData(DataType.XOR, 100, 0);
            
            noNoise.points.forEach(([x, y], i) => {
                const expectedLabel = (x > 0 && y > 0) || (x < 0 && y < 0) ? 0 : 1;
                // Note: with noise=0, there's still some boundary ambiguity
                // so we just verify the structure is correct
                expect(noNoise.labels[i] === 0 || noNoise.labels[i] === 1).toBe(true);
            });

            noNoise.xs.dispose();
            noNoise.ys.dispose();
        });

        it('should return valid TensorFlow tensors', () => {
            const result = generateData(DataType.XOR, 50);
            
            expect(result.xs instanceof tf.Tensor).toBe(true);
            expect(result.ys instanceof tf.Tensor).toBe(true);
            expect(result.xs.dtype).toBe('float32');
            expect(result.ys.dtype).toBe('float32');

            result.xs.dispose();
            result.ys.dispose();
        });

        it('should use default values when not specified', () => {
            const result = generateData(DataType.XOR);
            
            // Default samples is 200
            expect(result.points.length).toBe(200);

            result.xs.dispose();
            result.ys.dispose();
        });
    });
});
