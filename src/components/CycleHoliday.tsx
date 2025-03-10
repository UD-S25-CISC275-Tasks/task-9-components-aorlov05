import React, { useState } from "react";
import { Button } from "react-bootstrap";

type Holiday = "🎄" | "🐰" | "🎃" | "🍀" | "💝";

const ALPHABETICAL_TRANSITIONS: Record<Holiday, Holiday> = {
    "🎄": "🐰",
    "🐰": "🎃",
    "🎃": "🍀",
    "🍀": "💝",
    "💝": "🎄"
};

const CHRONOLOGICAL_TRANSITIONS: Record<Holiday, Holiday> = {
    "💝": "🍀",
    "🍀": "🐰",
    "🐰": "🎃",
    "🎃": "🎄",
    "🎄": "💝"
};

export function CycleHoliday(): React.JSX.Element {
    const [holiday, setHoliday] = useState<Holiday>("🎄");

    return (
        <div>
            <div>Holiday: {holiday}</div>
            <Button
                onClick={() => {
                    setHoliday(ALPHABETICAL_TRANSITIONS[holiday]);
                }}
            >
                Advance By Alphabet
            </Button>
            <Button
                onClick={() => {
                    setHoliday(CHRONOLOGICAL_TRANSITIONS[holiday]);
                }}
            >
                Advance By Year
            </Button>
        </div>
    );
}