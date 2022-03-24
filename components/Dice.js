export default function Dice({diceRecord, setView}) {

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
                                    <td key={index + 1000}>{index + 2}</td>
                                    <td className="times" key={index + 200}>{data}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <button onClick={() => setView('main')} className='buttons'>返回</button>
        </div>
    )

}