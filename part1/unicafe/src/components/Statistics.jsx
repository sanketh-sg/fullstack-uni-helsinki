/* eslint-disable react/prop-types */

import StatisticsLine from "./StatisticsLine";

const Statistics = ({good,neutral,bad,all}) => {
    
    if (all === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        );
    }
    return (
        <div>

            <StatisticsLine text="Good" value={good} />
            <StatisticsLine text="Neutral" value={neutral} />
            <StatisticsLine text="Bad" value={bad} />
            <StatisticsLine text="All" value={all} />
            <StatisticsLine text="Average" value={(good - bad) / all} />
            <StatisticsLine text="Positive" value={(good / all) * 100} />
        </div>
    );
}

export default Statistics;
