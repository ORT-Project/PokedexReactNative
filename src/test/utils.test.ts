import {strUcFirst, removeAfterDash} from '../utils/utils';

describe('strUcFirst', () => {
    it('should capitalize the first letter of a string', () => {
        expect(strUcFirst('hello')).toBe('Hello');
    });

    it('should return an empty string when input is an empty string', () => {
        expect(strUcFirst('')).toBe('');
    });

    it('should handle single character strings', () => {
        expect(strUcFirst('a')).toBe('A');
    });

    it('should not change already capitalized strings', () => {
        expect(strUcFirst('Hello')).toBe('Hello');
    });

    it('should handle strings with multiple words', () => {
        expect(strUcFirst('hello world')).toBe('Hello world');
    });

    it('should handle numbers', () => {
        expect(strUcFirst('123')).toBe('123');
    });
});

describe('removeAfterDash', () => {
    it('should remove everything after the dash', () => {
        expect(removeAfterDash('hello-world')).toBe('hello');
    });

    it('should return the same string when there is no dash', () => {
        expect(removeAfterDash('hello')).toBe('hello');
    });

    it('should return an empty string when input is an empty string', () => {
        expect(removeAfterDash('')).toBe('');
    });

    it('should handle strings with multiple dashes', () => {
        expect(removeAfterDash('hello-world-again')).toBe('hello');
    });

    it('should handle strings with no characters after the dash', () => {
        expect(removeAfterDash('hello-')).toBe('hello');
    });
});