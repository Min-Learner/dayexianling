export default function Player({diceData, setView, isBasic}) {

    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>次数</th>
                        <th>点数</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        diceData.map((data, index) => {
                            return (
                                <tr key={index * 7}>
                                    <td>{index + 1}</td>
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