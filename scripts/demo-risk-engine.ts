
import { decisionEngine } from '../src/core/decision-engine';
import { logger } from '../src/utils/logger';

// Use existing logger

async function runDemo() {
    console.log('--- KOK RISK ENGINE V2: SIMULATION DEMO ---\n');

    // Scenario 1: The Good Borrower
    console.log('▶ Evaluating Scenario 1: Good Borrower (Salaried, Utilities Paid)');
    try {
        const resultGood = await decisionEngine.evaluate(
            'GHA-GOOD-001',
            1000,
            30,
            3000,
            'SALARIED'
        );
        printResult(resultGood);
    } catch (e) {
        console.error(e);
    }

    console.log('\n-----------------------------------\n');

    // Scenario 2: The Gambler
    console.log('▶ Evaluating Scenario 2: High Risk Borrower (Gambling Detected)');
    try {
        const resultBad = await decisionEngine.evaluate(
            'GHA-BAD-GAMBLER-001',
            2000,
            30,
            5000, // High Income but...
            'INFORMAL'
        );
        printResult(resultBad);
    } catch (e) {
        console.error(e);
    }

    console.log('\n-----------------------------------\n');

    // Scenario 3: The Debt Stacker
    console.log('▶ Evaluating Scenario 3: Debt Stacking (Multiple Lenders)');
    try {
        const resultStack = await decisionEngine.evaluate(
            'GHA-STACK-001',
            2000,
            30,
            4000,
            'SME'
        );
        printResult(resultStack);
    } catch (e) {
        console.error(e);
    }
}

function printResult(res: any) {
    const isApproved = res.approved ? '✅ APPROVED' : '❌ REJECTED';
    console.log(`\nDecision: ${isApproved}`);
    console.log(`Risk Score: ${(100 - (res.risk.pd * 100)).toFixed(0)} (Grade: ${res.risk.grade || 'N/A'})`);
    console.log(`PD: ${(res.risk.pd * 100).toFixed(2)}%`);

    if (res.approved) {
        console.log(`Pricing: ${res.pricing.rate * 100}% Interest (Premium: ${res.pricing.premium} GHS)`);
        console.log(`Limit: ${res.pricing.limit} GHS`);
        if (res.pricing.breakdown) {
            console.log(`   > Tech Premium: ${res.pricing.breakdown.technicalPremium?.toFixed(2)}`);
            console.log(`   > Inflation Shield: ${res.pricing.breakdown.inflationAdjustment?.toFixed(2)}`);
        }
    } else {
        console.log(`Reasons:`);
        res.reasonCodes.forEach((r: string) => console.log(`   - ${r}`));
    }
}

runDemo();
