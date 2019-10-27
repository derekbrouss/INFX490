(function () {
    var myConnector = tableau.makeConnector();

    
    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "resultTime",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "result",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "earthquakeFeed",
            alias: "Earthquakes with magnitude greater than 4.5 in the last seven days",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://test1-sta-api.learnlafayette.com/SensorThingsService/v1.0/Datastreams('61dd65cc-f8a6-11e8-9ee4-1b01d90d7e82')/Observations", function(resp) {
            var test = resp.value,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = test.length; i < len; i++) {
                tableData.push({
                    "resultTime": test[i].resultTime,
                    "result": test[i].result,
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "USGS Earthquake Feed";
        tableau.submit();
    });
});