export default function YellowDice({dieOne, animation}) {

    return(

        <div>
            <div className={dieOne === 5 ? animation ? "dice first six shake" : "dice first six" : "opacity"}>
                <span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
            <div className={dieOne === 4 ? animation ? "dice first five shake" : "dice first five" : "opacity"}>
                <span></span><span></span><span></span><span></span><span></span>
            </div>
            <div className={dieOne === 3 ? animation ? "dice first four shake" : "dice first four" : "opacity"}>
                <span></span><span></span><span></span><span></span>
            </div>
            <div className={dieOne === 2 ? animation ? "dice first three shake" : "dice first three" : "opacity"}>
                <span></span><span></span><span></span>
            </div>
            <div className={dieOne === 1 ? animation ? "dice first two shake" : "dice first two" : "opacity"}>
                <span></span><span></span>
            </div>
            <div className={dieOne === 0 ? animation ? "dice first one shake" : "dice first one" : "opacity"}>
                <span></span>
            </div>
        </div>

    )

}