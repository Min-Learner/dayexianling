import { useRouter } from 'next/router'

export default function Dice({diceRecord, isBasic}) {

    const router = useRouter()

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
            <button onClick={() => isBasic ? router.push('/Main') : router.push('/Knight')} className='buttons'>返回</button>
        </div>
    )

}