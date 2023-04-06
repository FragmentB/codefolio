import React from 'react';
import { containsRepeats, countOccurance, getDiceArray, getFirstPair, roll } from './diceUtils';

describe('DiceUtils', ()=>{
    test.each`
    face | expected
    ${1} | ${2}
    ${2} | ${1}
    ${3} | ${3}
    ${4} | ${2}
    ${5} | ${1}
    ${6} | ${0}
    `('count occurances returns expected', ({face,expected})=>{
        const raw = [1,1,2,3,4,3,4,3,5];
        const result = countOccurance(raw, face);

        expect(result).toEqual(expected);
    })

    test('getDiceArray returns expected', ()=>{
        const expected = [2,1,3,2,1,0];
        const raw = [1,1,2,3,4,3,4,3,5];

        const result = getDiceArray(raw);

        expect(result.length).toEqual(expected.length)
        expected.forEach((value,i)=>{
            expect(result[i]).toEqual(value);
        })

    } )


    test('getFirstPair returns expected', ()=>{
        const expected = 2;
        const raw= [0,0,2,0,2.0];

        const result = getFirstPair(raw,2);

        expect(result).toEqual(expected);
    })

    test('getFirstPair no pair returns expected', ()=>{
        const expected = -1;
        const raw= [1,3,4,5,6.1];

        const result = getFirstPair(raw,2);

        expect(result).toEqual(expected);
    })

    test('containsRepeats returns expected', ()=>{
        const expected = {pos:4, count:2};
        const raw= [0,0,2,0,2.0];

        const result = containsRepeats(raw,2);

        expect(result).toEqual(expected);
    })

    test('roll returns expected array size',()=>{
        const expectedLength = 2
        const result = roll(expectedLength);

        expect(result.length).toEqual(expectedLength)
    })

    test('roll default rolls one die',()=>{
        const expectedLength = 1
        const result = roll();

        expect(result.length).toEqual(expectedLength)
    })

    test('roll returns valid numbers',()=>{
        const expectedLength = 500
        const result = roll(expectedLength);

        result.forEach(die=>{
            expect(die).toBeLessThanOrEqual(6);
            expect(die).toBeGreaterThanOrEqual(1);
        })
        
    })

})