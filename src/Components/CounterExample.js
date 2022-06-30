import React, { useState } from "react";

function CounterExample(){
    const [count, setCount] = useState(0)

    console.log(useState(10))

    return(
        <div>
            <h1>
                {count}
            </h1>
            <button onClick={() => setCount(count + 1)}>plus</button>
            
        </div>
    )
}

export default CounterExample;