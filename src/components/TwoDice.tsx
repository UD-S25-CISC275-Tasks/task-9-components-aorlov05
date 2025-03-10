import React, { useState } from "react";
import { Button } from "react-bootstrap";

/**
 * Here is a helper function you *must* use to "roll" your die.
 * The function uses the builtin `random` function of the `Math`
 * module (which returns a random decimal between 0 up until 1) in order
 * to produce a random integer between 1 and 6 (inclusive).
 */
export function d6(): number {
    return 1 + Math.floor(Math.random() * 6);
}

export function TwoDice(): React.JSX.Element {
    const [diceOne, setDiceOne] = useState<number>(1);
    const [diceTwo, setDiceTwo] = useState<number>(2);
    const snakeEyes: boolean = diceOne === 1 && diceTwo === 1;
    const sameRoll: boolean = !snakeEyes && diceOne === diceTwo;

    return (
        <div>
            <span data-testid="left-die">{diceOne}</span>
            <Button
                onClick={() => {
                    setDiceOne(d6());
                }}
            >
                Roll Left
            </Button>
            <Button
                onClick={() => {
                    setDiceTwo(d6());
                }}
            >
                Roll Right
            </Button>
            <span data-testid="right-die">{diceTwo}</span>
            {snakeEyes && <div>Lose</div>}
            {sameRoll && <div>Win</div>}
        </div>
    );
}