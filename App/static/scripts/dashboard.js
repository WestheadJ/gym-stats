let week;
let weekChart

function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}



window.onload = () => {
    var date = formatDate(date)
    document.getElementById("week-selector").value = date
    fetch(`http://127.0.0.1:6001/get/bodyweight/week?date=${document.getElementById("week-selector").value}`).then(res => res.json()).then(json => {
        let data = []

        let labels = ['Mon', "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        json[0].forEach(item => {
            data.push(item[1])
        })

        let minValueWeight = Math.min(...data)
        let maxValueWeight = Math.max(...data)

        var canvas = document.getElementById('bodyweightChart-week');
        var ctx = canvas.getContext('2d')
        weekChart = new Chart(ctx, {
            "data": {
                "labels": labels,
                "datasets": [{
                    "data": data,
                    "fill": false,
                    "label": "Bodyweight(week)",
                    "borderWidth": 1,
                    borderColor: 'rgb(75, 192, 192)',
                    "backgroundColor": 'rgb(75, 192, 192)'
                }]
            },
            "type": "line",
            "options": {
                responsive: true, maintainAspectRatio: true,
                scales: { y: { type: 'linear', min: Math.round(minValueWeight - 1), max: Math.round(maxValueWeight + 1), ticks: { stepSize: 1 } } },
                "title": { "text": "Line Chart", "display": true }
            }
        });


        document.getElementById("start-date").innerText = json[1]
        document.getElementById("end-date").innerText = json[2]


    })

    fetch("http://127.0.0.1:6001/get/bodyweight/year").then(res => res.json()).then(json => {
        let data = []
        let labels = []
        json.forEach(item => {

            labels.push(item[0])
            data.push(item[1])
        })

        let minValueWeight = Math.min(...data)
        let maxValueWeight = Math.max(...data)
        let minValueDate = labels[data.indexOf(minValueWeight)]
        let maxValueDate = labels[data.indexOf(maxValueWeight)]

        var canvas = document.getElementById('bodyweightChart-year');
        var ctx = canvas.getContext('2d')
        new Chart(ctx, {
            "data": {
                "labels": labels, "datasets": [
                    {
                        "data": data, "fill": false,
                        "label": "Bodyweight(year)",
                        "borderWidth": 1, borderColor:
                            'rgb(135,204,118)',
                        "backgroundColor": 'rgb(135,204,118)'
                    }
                ]
            },
            "type": "line",
            "options": {
                responsive: true, maintainAspectRatio: true,
                scales: { y: { type: 'linear', min: Math.round(minValueWeight - 1), max: Math.round(maxValueWeight + 1), ticks: { stepSize: 5 } } },
                "title": { "text": "Line Chart", "display": true }, plugins: {
                    annotation: {
                        annotations: {
                            minLine: {
                                type: 'line',
                                yMin: minValueWeight,
                                yMax: minValueWeight,
                                borderColor: 'rgb(118,211,19)',
                                borderWidth: 2, label: {
                                    content: `Lowest Weight: ${minValueWeight} at ${minValueDate}`,
                                    font: 14,
                                    display: true,
                                    yAdjust: 12,
                                    backgroundColor: 'rgb(118,211,19)',
                                    color: 'black'
                                }
                            }, maxLine: {
                                type: 'line',
                                yMin: maxValueWeight,
                                yMax: maxValueWeight,
                                borderColor: 'rgb(155,45,51)',
                                borderWidth: 2, label: {
                                    content: `Highest Weight: ${maxValueWeight} at ${maxValueDate}`,
                                    font: 14,
                                    display: true,
                                    yAdjust: -12,
                                    backgroundColor: 'rgb(155,45,51)',
                                    color: 'black'
                                }

                            }
                        }
                    }
                }
            }

        });

    })

    function isPositive(num) {
        return (num > 0);
    }

    fetch('http://127.0.0.1:6001/get/percentage').then(res => res.json()).then(res => {
        const yesterday = res[1][1]
        const today = res[0][1]

        const difference = yesterday - today
        const percentage = document.getElementById("percentage")

        if (isPositive(difference) || difference === 0) {
            percentage.innerText = `%${((difference / yesterday) * 100).toFixed(2)}`
            percentage.style.color = "red"

        }

        else {
            percentage.innerText = `%${((difference / yesterday) * 100).toFixed(2)}`
            percentage.style.color = "green"

        }

    })


}

function getWeightFromWeek() {
    console.log(weekChart.data.datasets[0].data)
    date = document.getElementById("week-selector").value

    fetch(`http://127.0.0.1:6001/get/bodyweight/week?date=${date}`).then(res => res.json()).then(json => {
        let data = []


        json[0].forEach(item => {
            // labels.push(item[0])
            data.push(item[1])
        })


        let minValueWeight = Math.min(...data)
        let maxValueWeight = Math.max(...data)

        weekChart.data.datasets[0].data = data
        weekChart.options.scales.y.min = Math.round(minValueWeight) - 1
        weekChart.options.scales.y.max = Math.round(maxValueWeight) + 1

        weekChart.update()

        document.getElementById("start-date").innerText = json[1]
        document.getElementById("end-date").innerText = json[2]
    })

}