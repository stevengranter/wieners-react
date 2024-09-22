import { useEffect } from "react";

export default function CharacterPortrait({ character, dialogText }) {
    // const [character, setCharacter] = useState(null);

    useEffect(() => {
        const response = async () => await fetch("file:///src/game/data.json");
        console.log(response);
    });

    return (
        <>
            <h1>CharacterPortrait.tsx</h1>
            {character ? character : "No character prop"}
            {dialogText ? dialogText : "No dialotText prop"}
        </>
    );
}
