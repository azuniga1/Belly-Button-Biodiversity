
function buildChart(testID) {
d3.json("data/samples.json").then(function(data){
    var sample_values = data.samples[0].sample_values.slice(0, 10).reverse()
    console.log(sample_values)

    var otu_ids = data.samples[0].otu_ids.slice(0, 10).reverse()
    console.log(otu_ids)

    var otu_lables = data.samples[0].otu_labels.slice(0, 10).reverse()
    console.log(otu_lables)


    var lables = otu_ids.map(otuID => `OTU ${otuID} `)
    console.log(lables);

    var trace1 = {
        y: lables,
        x: sample_values,
        type: "bar",
        orientation:'h'
    };

    var data = [trace1];

    Plotly.newPlot("bar", data);

    var trace2 = {
        x: otu_ids,
        y: sample_values,
        text: otu_lables,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Viridis"

        }

    };

    var data2 = [trace2]

    Plotly.newPlot("bubble", data2);

});

};


function buildMetadat(testID) {
d3.json("data/samples.json").then(function(data){
    var metaData = data.metadata[0]
    console.log(metaData)
    var data = d3.select("#sample-metadata")
    data.html("")
    Object.entries(metaData).forEach(([key, value]) => {
        data.append("h6").text(`${key}: ${value}`)
    });
});

}

function init() {
    var dropdownMenu = d3.select("#selDataset");

    d3.json("data/samples.json").then(function(data) {
        var testId = data.names;
        console.log(testId);

        testId.forEach((id) => {
            dropdownMenu
            .append("option").text(id).property("value", id)
        });

        var firstID = testId[0];
        buildChart(firstID);
        buildMetadat(firstID);
    })
}

function optionChanged(newID) {
    buildChart(newID)
    buildMetadat(newID)

}

init();


