export default function Dice({diceRecord, setView, isBasic}) {

    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>点数</th>
                        <th>次数</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        diceRecord.map((data, index) => {
                            return (
                                <tr key={index * 397}>
                                    <td>{index + 2}</td>
                                    <td className="times">{data}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <button onClick={() => isBasic ? setView('main') : setView('knight')} className='buttons'>返回</button>
        </div>
    )

}