/* eslint-disable react/prop-types */

const StatisticsLine = ({text,value}) => {
    if(text === "Average" || text === "Positive") {
        return (
            <table>
                <tbody>
                    <tr>
                        <td>{text}</td>
                        <td>{value.toFixed(1)}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
    return (
        <table>
            <tbody>
                <tr>
                    <td>{text}</td>
                    <td>{value}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default StatisticsLine;
