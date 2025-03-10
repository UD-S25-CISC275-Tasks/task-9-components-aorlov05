import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function Counter(): React.JSX.Element {
    const [value, setValue] = useState<number>(0);

    const add = (): void => {
        setValue(value + 1);
    };

    return (
        <span>
            <Button onClick={add}>Add One</Button>
            to {value}.
        </span>
    );
}