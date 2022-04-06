export default function RedDice({dieTwo, animation}) {

    return(

        <div>
            <div className={dieTwo === 5 ? animation ? "dice second six shake" : "dice second six" : "opacity"}>
                <span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
            <div className={dieTwo === 4 ? animation ? "dice second five shake" : "dice second five" : "opacity"}>
                <span></span><span></span><span></span><span></span><span></span>
            </div>
            <div className={dieTwo === 3 ? animation ? "dice second four shake" : "dice second four" : "opacity"}>
                <span></span><span></span><span></span><span></span>
            </div>
            <div className={dieTwo === 2 ? animation ? "dice second three shake" : "dice second three" : "opacity"}>
                <span></span><span></span><span></span>
            </div>
            <div className={dieTwo === 1 ? animation ? "dice second two shake" : "dice second two" : "opacity"}>
                <span></span><span></span>
            </div>
            <div className={dieTwo === 0 ? animation ? "dice second one shake" : "dice second one" : "opacity"}>
                <span></span>
            </div>
        </div>

    )

}