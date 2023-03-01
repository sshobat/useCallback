import React from "react";

const Title = () => {

    console.log("Rendering Title")

    return (
        <h2>
            useCallback hook example
        </h2>
    );
}

// export default Title;
export default React.memo(Title);