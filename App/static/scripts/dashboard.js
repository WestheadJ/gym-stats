let week;

window.onload = () => {

    fetch("http://127.0.0.1:6001/get/bodyweight/week").then(res => res.json()).then(json => {
        let data = []
        let labels = ['Mon', "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ]
        json.forEach(item => {
            // labels.push(item[0])
            data.push(item[1])
        })

        var canvas = document.getElementById('bodyweightChart-week');
        var ctx = canvas.getContext('2d')
        new Chart(ctx, {
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
                responsive: true,maintainAspectRatio: false,
                scales: {y: {type: 'linear', suggestedMin: 65, max: 100, ticks: {stepSize: 5}}},
                "title": {"text": "Line Chart", "display": true}

            }
        });
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
                responsive: true,maintainAspectRatio: false,
                scales: {y: {type: 'linear', suggestedMin: 70, max: 100, ticks: {stepSize: 5}}},
                "title": {"text": "Line Chart", "display": true},plugins: {
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
                }}

        });

    })

    fetch('http://127.0.0.1:6001/get/exercise/all').then(res=>res.json()).then(res=>{
        res.forEach(item=>{
            console.log(item)
        })
    })
}