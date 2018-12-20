import { combineTextResponses } from '../textResponses';

describe('Combine Text', () => {
  test('Combine 2 strings', () => {
    const string1 = 'hello';
    const string2 = 'everyone';
    const expectedResponse = [string1, string2];
    expect(combineTextResponses(string1, string2)).toEqual(expectedResponse);
  });

  test('Combine 2 arrays', () => {
    const a1: [string, string] = ['hello', 'everyone'];
    const a2: [string, string] = ['hello', 'everyone'];
    const expectedResponse = ['hello\n\neveryone', 'hello\n\neveryone'];
    expect(combineTextResponses(a1, a2)).toEqual(expectedResponse);
  });

  test('Combine array and string', () => {
    const a1: [string, string] = ['hello', 'everyone'];
    const a2 = 'hello';
    const expectedResponse = ['hello\n\neveryone', 'hello'];
    expect(combineTextResponses(a1, a2)).toEqual(expectedResponse);
  });

  test('Combine string and array', () => {
    const a1 = 'hello';
    const a2: [string, string] = ['hello', 'everyone'];
    const expectedResponse = ['hello', 'hello\n\neveryone'];
    expect(combineTextResponses(a1, a2)).toEqual(expectedResponse);
  });
});
