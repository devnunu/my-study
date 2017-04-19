var data = {
    labels: [
        "1", "2", "3", "4", "5"
    ],
    datasets: [
        {
            label: 'Your Score',
            data: [
                0, 0, 0, 0, 0
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }
    ]
};

var options = {
    animation: {
        animateScale: true
    },
    responsive: false,
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true
                }
            }
        ]
    }
};

var ctx = document.getElementById("myChart").getContext('2d');
var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
});

var button = document.getElementById("sendAjax")

button.addEventListener("click", function() {
    sendAjax('http://localhost:3000/');
})

function sendAjax(url) {
    var oReq = new XMLHttpRequest();

    oReq.open('POST', url);
    oReq.setRequestHeader('Content-Type', "application/json") // json 형태로 보낸다
    oReq.send();

    oReq.addEventListener('load', function() {
        var result = JSON.parse(oReq.responseText);
        var score = result.score;
        var comp_data = data.datasets[0].data;

        for (var i = 0; i < comp_data.length; i++) {
            comp_data[i] = score[i];
        }

        data.datasets[0].data = comp_data;
        myBarChart.update();
    })
}
