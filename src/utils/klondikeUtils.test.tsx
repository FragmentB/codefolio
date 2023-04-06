import React from 'react';
import { beatAces, compareHands, KlondikeBets } from './klondikeUtils';

describe('klondikeutils' , () =>{

    describe('beatAces', ()=>{
        test.each`
        playerHand     | expected
        ${[1,1,3,2,6]} | ${false}
        ${[2,3,5,1,4]} | ${false}
        ${[1,3,3,2,6]} | ${false}
        ${[2,1,2,1,0]} | ${true}
        ${[4,1,3,4,4]} | ${true}
        ${[3,3,2,3,2]} | ${true}
        ${[1,1,1,4,1]} | ${true}
        ${[2,2,2,2,2]} | ${true}
        `('works as expected', ({playerHand, expected})=>{
            
            const result = beatAces(playerHand);

            expect(result).toEqual(expected);
        });
        
    })

    describe('compareHands', ()=>{

        test.each`
        playerHand       | dealerHand       | expected
        ${[2,1,1,1,0,0]} | ${[2,1,1,1,0,0]} | ${'losing'}
        ${[1,2,1,1,0,0]} | ${[2,1,1,1,0,0]} | ${'losing'}
        ${[1,1,2,1,0,0]} | ${[2,1,1,1,0,0]} | ${'losing'}
        ${[0,1,1,2,1,0]} | ${[2,1,1,1,0,0]} | ${'losing'}
        ${[0,1,1,1,2,0]} | ${[2,1,1,1,0,0]} | ${'losing'}
        ${[0,1,1,1,0,2]} | ${[2,1,1,1,0,0]} | ${'losing'}
        `('dealer aces works for winning bets', ({playerHand, dealerHand, expected})=>{
            
            const result = compareHands(playerHand, dealerHand, KlondikeBets.Win);

            expect(result).toEqual(expected);
        });

        test.each`
        dealerHand       | playerHand       | expected
        ${[2,1,1,0,0,1]} | ${[2,1,1,1,0,0]} | ${'losing'}
        ${[1,2,1,1,0,0]} | ${[2,1,1,1,0,0]} | ${'winning'}
        ${[1,1,2,1,0,0]} | ${[2,1,1,1,0,0]} | ${'winning'}
        ${[0,1,1,2,1,0]} | ${[2,1,1,1,0,0]} | ${'winning'}
        ${[0,1,1,1,2,0]} | ${[2,1,1,1,0,0]} | ${'winning'}
        ${[0,1,1,1,0,2]} | ${[2,1,1,1,0,0]} | ${'winning'}
        `('player aces works for winning bets', ({dealerHand, playerHand, expected})=>{
            
            const result = compareHands(playerHand, dealerHand, KlondikeBets.Win);

            expect(result).toEqual(expected);
        });

        test.each`
        playerHand       | dealerHand       | expected
        ${[2,1,1,1,0,0]} | ${[2,1,1,1,0,0]} | ${'losing'}
        ${[1,2,1,1,0,0]} | ${[2,1,1,1,0,0]} | ${'losing'}
        ${[1,1,2,1,0,0]} | ${[2,1,1,1,0,0]} | ${'losing'}
        ${[0,1,1,2,1,0]} | ${[2,1,1,1,0,0]} | ${'losing'}
        ${[0,1,1,1,2,0]} | ${[2,1,1,1,0,0]} | ${'losing'}
        ${[0,1,1,1,0,2]} | ${[2,1,1,1,0,0]} | ${'losing'}
        ${[0,1,2,0,0,2]} | ${[2,1,1,1,0,0]} | ${'winning'}
        ${[0,1,3,0,0,1]} | ${[2,1,1,1,0,0]} | ${'winning'}
        ${[0,3,0,0,0,2]} | ${[2,1,1,1,0,0]} | ${'winning'}
        ${[0,1,0,4,0,0]} | ${[2,1,1,1,0,0]} | ${'winning'}
        ${[5,0,0,0,0,0]} | ${[2,1,1,1,0,0]} | ${'winning'}
        `('beat 2 aces works as expected', ({playerHand, dealerHand, expected})=>{
            
            const result = compareHands(playerHand, dealerHand, KlondikeBets['Beat 2 Aces']);

            expect(result).toEqual(expected);
        });
        
        test.each`
        playerHand       | dealerHand       | expected
        ${[2,1,1,1,0,0]} | ${[2,1,1,1,0,0]} | ${'losing'}
        ${[1,2,1,1,0,0]} | ${[2,1,1,1,0,0]} | ${'winning'}
        ${[1,1,2,1,0,0]} | ${[2,1,1,1,0,0]} | ${'winning'}
        ${[0,1,1,2,1,0]} | ${[2,1,1,1,0,0]} | ${'winning'}
        ${[0,1,1,1,2,0]} | ${[2,1,1,1,0,0]} | ${'winning'}
        ${[0,1,1,1,0,2]} | ${[2,1,1,1,0,0]} | ${'winning'}
        ${[0,1,2,0,0,2]} | ${[2,1,1,1,0,0]} | ${'losing'}
        ${[0,1,3,0,0,1]} | ${[2,1,1,1,0,0]} | ${'losing'}
        ${[0,3,0,0,0,2]} | ${[2,1,1,1,0,0]} | ${'losing'}
        ${[0,1,0,4,0,0]} | ${[2,1,1,1,0,0]} | ${'losing'}
        ${[5,0,0,0,0,0]} | ${[2,1,1,1,0,0]} | ${'losing'}
        `('losing bet works as expected', ({playerHand, dealerHand, expected})=>{
            
            const result = compareHands(playerHand, dealerHand, KlondikeBets.Lose);

            expect(result).toEqual(expected);
        });
        
        test.each`
        playerHand       | dealerHand       | expected
        ${[1,1,2,1,0,0]} | ${[1,2,1,1,0,0]} | ${'winning'}
        ${[1,2,2,0,0,0]} | ${[2,1,1,1,0,0]} | ${'winning'}
        ${[1,3,0,1,0,0]} | ${[2,2,0,1,0,0]} | ${'winning'}
        ${[3,0,0,2,1,0]} | ${[0,3,1,1,0,0]} | ${'winning'}
        ${[0,0,0,3,2,0]} | ${[3,0,1,1,0,0]} | ${'winning'}
        ${[0,2,3,1,0,0]} | ${[2,3,0,1,0,0]} | ${'winning'}
        ${[4,0,0,0,1,0]} | ${[0,3,2,0,0,0]} | ${'winning'}
        ${[4,0,0,0,1,0]} | ${[0,1,0,0,4,0]} | ${'winning'}
        ${[0,0,0,0,1,4]} | ${[0,1,0,0,4,0]} | ${'winning'}
        ${[5,0,0,0,0,0]} | ${[0,0,0,0,5,0]} | ${'winning'}
        ${[0,5,0,0,0,0]} | ${[0,1,0,0,4,0]} | ${'winning'}
        ${[3,0,0,0,1,1]} | ${[0,1,0,0,3,1]} | ${'winning'}
        ${[0,0,0,0,1,5]} | ${[0,1,0,0,5,1]} | ${'winning'}
        ${[1,0,0,0,0,4]} | ${[4,1,0,0,0,0]} | ${'losing'}
        ${[1,0,4,0,0,0]} | ${[0,1,0,0,4,0]} | ${'losing'}
        ${[0,0,0,0,0,5]} | ${[5,0,0,0,0,0]} | ${'losing'}
        ${[1,0,0,0,1,3]} | ${[3,1,1,0,0,0]} | ${'losing'}
        ${[1,2,1,1,0,0]} | ${[1,1,1,0,2,0]} | ${'losing'}
        ${[6,1,1,1,0,0]} | ${[1,6,1,0,1,0]} | ${'losing'}
        ${[0,1,1,3,0,0]} | ${[1,0,1,0,3,0]} | ${'losing'}
        ${[0,1,1,5,0,0]} | ${[1,0,1,0,5,0]} | ${'losing'}
        `('hand hierarchy works as expected', ({playerHand, dealerHand, expected})=>{
            
            const result = compareHands(playerHand, dealerHand, KlondikeBets.Win);
            
            expect(result).toEqual(expected);
        });
        
        test.each`
        playerHand       | dealerHand       | expected
        ${[3,2,0,0,0,0]} | ${[2,0,0,0,0,3]} | ${'winning'}
        ${[0,2,0,3,0,0]} | ${[0,2,3,0,0,0]} | ${'winning'}
        ${[2,0,0,3,0,0]} | ${[0,0,2,3,0,0]} | ${'winning'}
        ${[0,0,0,3,0,2]} | ${[0,0,2,3,0,0]} | ${'winning'}
        ${[0,0,0,3,2,0]} | ${[3,0,1,1,0,0]} | ${'winning'}
        ${[0,2,3,1,0,0]} | ${[2,1,1,1,0,0]} | ${'winning'}
        ${[0,2,3,0,0,0]} | ${[2,0,0,0,0,3]} | ${'losing'}
        ${[0,2,0,3,0,0]} | ${[3,2,0,0,0,0]} | ${'losing'}
        ${[0,2,0,3,0,0]} | ${[2,0,0,3,0,0]} | ${'losing'}
        ${[0,2,0,3,0,0]} | ${[0,0,2,3,0,0]} | ${'losing'}
        ${[0,0,0,3,1,1]} | ${[3,0,2,0,0,0]} | ${'losing'}
        ${[3,1,0,1,0,0]} | ${[2,3,0,0,0,0]} | ${'losing'}
        `('full house logic as expected', ({playerHand, dealerHand, expected})=>{
            
            const result = compareHands(playerHand, dealerHand, KlondikeBets.Win);
            
            expect(result).toEqual(expected);
        });

        test.each`
        playerHand       | dealerHand       | expected
        ${[2,2,0,0,0,1]} | ${[0,2,0,1,1,1]} | ${'winning'}
        ${[2,2,0,1,0,0]} | ${[0,2,2,1,0,0]} | ${'winning'}
        ${[0,0,0,1,2,2]} | ${[0,2,2,1,0,0]} | ${'winning'}
        ${[0,0,0,2,1,2]} | ${[0,0,2,1,0,2]} | ${'winning'}
        ${[1,2,0,2,0,1]} | ${[0,2,0,2,0,1]} | ${'losing'}
        ${[1,2,0,0,0,1]} | ${[0,2,0,2,0,1]} | ${'losing'}
        ${[2,2,0,1,0,0]} | ${[2,0,2,1,0,0]} | ${'losing'}
        ${[0,2,2,1,0,0]} | ${[0,0,2,1,2,0]} | ${'losing'}
        ${[0,0,0,2,1,2]} | ${[0,0,0,1,2,2]} | ${'losing'}
        `('two pair logic as expected', ({playerHand, dealerHand, expected})=>{
            
            const result = compareHands(playerHand, dealerHand, KlondikeBets.Win);
            
            expect(result).toEqual(expected);
        });
       
    })
})