function hasKey(value, key) {
    if (value.MetaData !== undefined)
        for (var i = 0; i < value.MetaData.length; i++)
            if (value.MetaData[i].Codigo == key)
                return true
    return false
}



var YEAR = 2019;
var CCAAS_SELECTED = [];
var CHARTS = [];

function getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

var CCAA = {
    "Cataluña/Catalunya": {
        names: ["Cataluña/Catalunya", "Cataluña", "Catalunya"],
        color: getRandomRgb(),
    },
    "Castilla y León": {
        names: ["Castilla y León", "Castilla y Leon"],
        color: getRandomRgb(),
    },
    "Aragón": {
        names: ["Aragón", "Aragon"],
        color: getRandomRgb(),
    },
    "Castilla-La Mancha": {
        names: ["Castilla-La Mancha", "Castilla la Mancha", "Castilla - La Mancha"],
        color: getRandomRgb(),
    },
    "Andalucía": {
        names: ["Andalucía", "Andalucia"],
        color: getRandomRgb(),
    },
    "Comunitat Valenciana": {
        names: ["Comunitat Valenciana"],
        color: getRandomRgb(),
    },
    "Illes Balears": {
        names: ["Baleares", "Illes Balears", "Balears, Illes", "Balears"],
        color: getRandomRgb(),
    },
    "Principado de Asturias": {
        names: ["Principado de Asturias", "Asturias", "Asturias, Principado de"],
        color: getRandomRgb(),
    },
    "País Vasco/Euskadi": {
        names: ["Euskadi", "País Vasco"],
        color: getRandomRgb(),
    },
    "Comunidad Foral de Navarra": {
        names: ["Navarra",  "Navarra, Comunidad Foral de"],
        color: getRandomRgb(),
    },
    "Comunidad de Madrid": {
        names: ["Madrid", "Madrid, Comunidad de"],
        color: getRandomRgb(),
    },
    "Extremadura": {
        names: ["Extremadura"],
        color: getRandomRgb(),
    },
    "La Rioja": {
        names: ["La Rioja",  "Rioja, La", "Rioja"],
        color: getRandomRgb(),
    },
    "Galicia": {
        names: ["Galicia"],
        color: getRandomRgb(),
    },
    "Región de Murcia": {
        names: ["Región de Murcia", "Murcia, Región de", "Murcia"],
        color: getRandomRgb(),
    },
    "Ciudad Autónoma de Ceuta": {
        names: ["Ciudad Autónoma de Ceuta", "Ceuta"],
        color: getRandomRgb(),
    },
    "Ciudad Autónoma de Melilla": {
        names: ["Ciudad Autónoma de Melilla", "Melilla"],
        color: getRandomRgb(),
    },
    "Canarias": {
        names: ["Canarias"],
        color: getRandomRgb(),
    },
    "Cantabria": {
        names: [ "Cantabria"],
        color: getRandomRgb(),
    }
}

var GetRegion = function (label) {
    for (var key of Object.keys(CCAA)) {
        var region = CCAA[key];
        if (region.names.map(o=> o.toLocaleLowerCase()).indexOf(label.toLocaleLowerCase()) !== -1)
            return {originalName: key, ...region}
    }
    console.error(label);
    return undefined;
}

function GetAutonomousRegions() {
    return new Promise((resolve, reject) => {
        fetch('https://unpkg.com/es-atlas/es/municipalities.json').then((r) => r.json()).then((us) => {
            const nation = ChartGeo.topojson.feature(us, us.objects.border).features[0];
            const autonomous_regions = ChartGeo.topojson.feature(us, us.objects.autonomous_regions).features;
            resolve({nation:nation, autonomous_regions: autonomous_regions})
        }).catch(reject);
    }
    );

}

function CreateDataChart(features, values) {

}

function CreateMapChart(containerID, datasets, labels) {
    var ctx = document.getElementById(containerID).getContext("2d");

    CHARTS.push(new Chart(ctx, {
        type: 'choropleth',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            plugins: {
                legend: {
                    display: true
                },
            },
            scales: {
                xy: {
                    projection: 'equalEarth',
                },
            },
        }
    }));

}

function GetIPV() {
    return new Promise((resolve, reject) => {
        fetch('IPV.json').then((response) => {
            response.json().then((values) => {
                values = values.filter(o => o.Nombre.indexOf("Total Nacional") === -1 && o.Nombre.indexOf("Variación anual") === -1);
                var general = values.filter(o => o.Nombre.indexOf("General") !== -1);
                var viviendaNueva = values.filter(o => o.Nombre.indexOf("Vivienda nueva") !== -1);
                var viviendaSegundaMano = values.filter(o => o.Nombre.indexOf("Vivienda segunda mano") !== -1);
                resolve({general: general, nueva: viviendaNueva, segunda: viviendaSegundaMano});
            }).catch(reject)

        }).catch(reject);
    })
};

function GetJson(url) {
    return new Promise((resolve, reject)=> {
        fetch(url).then(response => response.json().then(resolve).catch(reject)).catch(reject)
    })
}

function GetContaminacion(){
    return new Promise((resolve, reject) => {
        GetJson("contaminacion.json").then(values=> {
            values = values.filter(o => o.Nombre.indexOf("Total Nacional") === -1);
            resolve(values)
        }).catch(reject)
    })
}
function GetSalarios(){
    return new Promise((resolve, reject) => {
        GetJson("salarios.json").then(values=> {
            values.splice(0,1);
            resolve(values.map(o=> {return {...o, Nombre: o.Nombre.replace("Jornada a tiempo completo. ","")}}))
        }).catch(reject)
    })
}
function GetCriminalidad(){
    return new Promise((resolve, reject) => {
        GetJson("criminalidad.json").then(values=> {
            values = values.filter(o => o.Nombre.indexOf("Total Nacional") === -1);
            resolve(values)
        }).catch(reject)
    })
}

function GetDesigualdad(){
    return new Promise((resolve, reject) => {
        GetJson("desigualdad.json").then(values=> {
            
            values = values.filter(o => o.Nombre.indexOf("Total Nacional") === -1);
            resolve(values);

        }).catch(reject)
    })
}

function GetHomicidios(){
    return new Promise((resolve, reject) => {
        GetJson("homicidios.json").then(values=> {
            
            values = values.filter(o => o.Nombre.indexOf("Total Nacional") === -1);
            resolve(values)
        }).catch(reject)
    })
}

function GetContaminacion(){
    return new Promise((resolve,reject)=> {
        fetch('contaminacion.json').then(response => {
            response.json().then((values)=>{
                values = values.filter(o => o.Nombre.indexOf("Total Nacional") === -1 && o.Nombre.indexOf("Variación anual") === -1);
                resolve(values);
            })
            .catch(reject)
        }).catch(reject)
    })
}

function GetComparativaYear(datos, separator, year){
    if (separator === undefined)
        separator = "."

    return datos.map(o => {
        var regionName = o.Nombre.split(separator)[0];
        var region = GetRegion(regionName);
        return {
            label: regionName,
            axis: 'y',
            data: o.Data.filter(o=> o.NombrePeriodo? o.NombrePeriodo == year: o.Anyo == year).map(c => c.Valor).reverse(),
            borderColor: region.color,
            backgroundColor: region.color
        }
    })
}


function GetComparativaDataset(datos, separator){
    if (separator === undefined)
        separator = "."

    return datos.map(o => {
        var regionName = o.Nombre.split(separator)[0];
        var region = GetRegion(regionName);

        return {
            hidden:  (CCAAS_SELECTED.length > 0  && CCAAS_SELECTED.length != 19 && CCAAS_SELECTED.indexOf(region.originalName) === -1)  ,
            label: regionName,
            axis: 'y',
            data: o.Data.map(c => c.Valor).reverse(),
            borderColor: region.color,
            backgroundColor: region.color
        }
    })
}

function CreateChartComparativa(years, datasets, ctx, bar){
    CHARTS.push(new Chart(ctx, {
        type: bar ? 'bar': 'line',
        data: {
            labels: years,
            datasets: datasets,
        },
        options: {
            scales: {
                y: {
                    
                }
            }
        }
    }));
}

function LoadHistoricoHomicidios(values) {
    
    var years = values[0].Data.map(o => o.NombrePeriodo).reverse();
    
    var ctx = document.getElementById("historicoHomicidios").getContext("2d");

    var ctx2 = document.getElementById("historicoHomicidiosYear").getContext("2d");

    CreateChartComparativa(years, GetComparativaDataset(values, ","), ctx);
    
    CreateChartComparativa([YEAR], GetComparativaYear(values, ",", YEAR), ctx2, true);

}

function LoadDesigualdad(values) {
    var years = values[0].Data.map(o => o.NombrePeriodo).reverse();
    
    var ctx = document.getElementById("historicoDesigualdad").getContext("2d");
    var ctx2 = document.getElementById("historicoDesigualdadYear").getContext("2d");

    CreateChartComparativa(years, GetComparativaDataset(values, ","), ctx);
    
    CreateChartComparativa([YEAR], GetComparativaYear(values, ",", YEAR), ctx2, true);

}
function LoadHistoricoCriminalidad(values) {
    
    var years = values[0].Data.map(o => o.NombrePeriodo).reverse();
    
    var ctx = document.getElementById("historicoCriminalidad").getContext("2d");
    
    var ctx2 = document.getElementById("historicoCriminalidadYear").getContext("2d");
    CreateChartComparativa(years, GetComparativaDataset(values, ","), ctx);
    
    CreateChartComparativa([YEAR], GetComparativaYear(values, ",", YEAR), ctx2, true);

}

function LoadHistoricoContaminacion(values) {
    
    var years = values[0].Data.map(o => o.NombrePeriodo).reverse();
    
    var ctx = document.getElementById("comparativaContaminacion").getContext("2d");
    var ctx2 = document.getElementById("comparativaContaminacion2019").getContext("2d");

    CreateChartComparativa(years, GetComparativaDataset(values), ctx);

    CreateChartComparativa([YEAR], GetComparativaYear(values, undefined, YEAR), ctx2, true);

}
function LoadComparativa(general, nueva, segundaMano) {
    var years = general[0].Data.map(o => o.Fecha.split("-")[0]).reverse();


    var ctxgeneral = document.getElementById("comparativaIPVGeneral").getContext("2d");
    var ctxNueva = document.getElementById("comparativaIPVNueva").getContext("2d");
    var ctxSegundaMano = document.getElementById("comparativaIPVSegunda").getContext("2d");

    CreateChartComparativa(years, GetComparativaDataset(general), ctxgeneral);
    CreateChartComparativa(years, GetComparativaDataset(nueva), ctxNueva);
    CreateChartComparativa(years, GetComparativaDataset(segundaMano), ctxSegundaMano);

}

function LoadHistoricoSalarios(values){
    
    var years = values[0].Data.map(o => o.Anyo).reverse();

    var ctx = document.getElementById("comparativaSalarios").getContext("2d");
    var ctx2 = document.getElementById("comparativaSalariosYear").getContext("2d");
    CreateChartComparativa(years, GetComparativaDataset(values), ctx);

    CreateChartComparativa([YEAR], GetComparativaYear(values, undefined, YEAR), ctx2, true);
}

function createDataFeature(o, ccaa) {
    var region = GetRegion(o.Nombre)
    var features = ccaa.filter(o=> o.properties.name === region.originalName);
    if (features.length != 1)
        console.error(region, features)
    return {
        feature: features[0],
        value: o.Data.reverse()[0].Valor
    }
}

function LoadMapa(valuesDesigualdad, valuesHomicidios, valuesCriminalidad, nation, ccaa) {
    
    var dataH = valuesHomicidios.map(o=> 
        {   
            o.Nombre = o.Nombre.split(",")[0];
            return createDataFeature(o, ccaa);
        });
        
        var dataC = valuesCriminalidad.map(o=> 
            {   
                o.Nombre = o.Nombre.split(",")[0];
                return createDataFeature(o, ccaa);
            });
    var dataD = valuesDesigualdad.map(o=> createDataFeature(o, ccaa));

    var labelsD = dataD.map(o=> o.feature.properties.name);

    var datasets = [{
        label: "Desigualdad",
        outline: nation,
        data: dataD,
    },
    {
        label: "Homicidios",
        outline: nation,
        data: dataH,  
    },
    {
        label: "Criminalidad",
        outline: nation,
        data: dataC,
    }]

    CreateMapChart("mapaDesigualdad", datasets, labelsD)
}

function loadData() {
    
    for (var chart of CHARTS){

        chart.destroy();
    }
    
    CHARTS = [];

    GetAutonomousRegions().then((geo_data) => {
        GetIPV().then((data) => {
            LoadComparativa(data.general, data.nueva, data.segunda);
            LoadMekko(data.nueva, data.segunda);    
        }).catch(console.error);
        GetContaminacion().then(LoadHistoricoContaminacion).catch(console.error);
        GetDesigualdad().then(LoadDesigualdad);
        GetCriminalidad().then(LoadHistoricoCriminalidad);
        GetHomicidios().then(LoadHistoricoHomicidios);
        GetDesigualdad().then(
            (valuesDes) => {
                GetHomicidios().then((valuesHomicidios) => {
                    GetCriminalidad().then((valuesCriminalidad) => {
                        LoadMapa(valuesDes, valuesHomicidios, valuesCriminalidad, geo_data.nation, geo_data.autonomous_regions)
                    })
                })
            })
        GetSalarios().then(LoadHistoricoSalarios).catch(console.error)

    }).catch(console.error);
}

function LoadMekko(nueva, segundaMano) {
    var dtNueva = GetComparativaYear(nueva, ".", YEAR);
    var dtSegunda = GetComparativaYear(segundaMano, ".", YEAR);
    var dt = CreateMekkoData(dtNueva,  dtSegunda);

    CreateMekko(dt);
}

function CreateMekkoData(nueva, segundaMano){
    return {
        title: 'IPV por CCAA',
        header:  [''].concat(Object.keys(CCAA)),
        rows: [
            ['IPV nueva'].concat(nueva.map(o=> o.data[0])),
            ['IPV segunda mano'].concat(segundaMano.map(o=> o.data[0])),
        ]
    };

}

function CreateMekko(myData) {
    // create a mekko (marimekko) chart
    var chart = anychart.mekko();
    // set the chart data
    chart.data(myData);
    // enable the chart legend
    chart.legend(true);
    // set the chart container id
    chart.container('IPVMekko');
    // draw the resulting marimekko chart
    chart.draw();
}

document.addEventListener('DOMContentLoaded', function () {
    CCAAS_SELECTED = Object.keys(CCAA);

    var ccaaSelect = document.getElementById("ccaaSelect");

    for (var key of Object.keys(CCAA))
        ccaaSelect.appendChild(new Option(key, key, true));

    ccaaSelect.addEventListener("change", function(evt){
        var selectedValues = Array.from(evt.originalTarget.children).filter(o=> o.selected).map(o=> o.value)
        if (selectedValues.length > 0)
        {
            CCAAS_SELECTED = selectedValues;   
        } else {
            CCAAS_SELECTED = Object.keys(CCAA);
        }
        loadData();
    });

    document.getElementById("yearSelect")
        .addEventListener("change", function (evt) {
            var value = evt.originalTarget.selectedOptions[0].value;
            YEAR = value;
            loadData();
        });
    

        document.getElementById("wheel").addEventListener("click", ()=> $('#exampleModal').modal('show'))
        
        document.getElementById("filterClose").addEventListener("click", ()=> $('#exampleModal').modal('hide'))
        
    loadData();

}, false);

