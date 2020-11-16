var sin;
var cos;
var source;
function initGraph(){
    source = new EventSource("http://vmzakova.fei.stuba.sk/sse/sse.php");
    var graf = document.getElementById('graf');
    
    sin = {
        x: [0], 
        y: [0],
        name:"Sin function"
        
    };
    cos = {
        x: [0], 
        y: [1],
        name:"Cos function",
        line:{color:"orange"}
    };
    


    Plotly.newPlot( graf, [sin,cos],{yaxis: {fixedrange: true}, xaxis : {fixedrange: true}},{displayModeBar: false});
   
    
    if(typeof(EventSource) !== "undefined"){
        source.onmessage = function(event) {
            var data = JSON.parse(event.data);        
            Plotly.extendTraces( graf, {x:[[data.x],[data.x]],y: [[data.y1*document.getElementById("myRange").value], [data.y2*document.getElementById("myRange").value]] },[0,1]);        
        };
    }
    else{
        document.getElementById("result").innerHTML="Sorry, you have bad browser";
    }



    
    customElements.define('my-component', template);

    
}

class template extends HTMLElement{
    constructor(){
        super();
        const template = document.querySelector('template');
        const clone = document.importNode(template.content,true);     
        this.appendChild(clone);
    }

    connectedCallback() {   
        
    }
}



function checkSin(){
    var sinFunction = document.getElementById("sin");
    if(sinFunction.checked){
        Plotly.restyle(graf,{"visible":true},[0]);
    }
    else
        Plotly.restyle(graf,{"visible":false},[0]);
}

function checkCos(){
    var cosFunction = document.getElementById("cos");
    if(cosFunction.checked){
        Plotly.restyle(graf,{"visible":true},[1]);
    }
    else
        Plotly.restyle(graf,{"visible":false},[1]);

        
}

function endGraph(){
    var layout = {
        xaxis:{fixedrange:false},
        yaxis:{fixedrange:false}
    };
    Plotly.relayout(graf,layout);
        
    source.close();
}

function showSlider(){
    if(document.getElementById("slide").checked){
        document.getElementById("myRange").style.display="block";
    }
    else
        document.getElementById("myRange").style.display="none";
}

function showTxt(){
    if(document.getElementById("txt").checked){
        document.getElementById("numb").style.display="block";
    }
    else
        document.getElementById("numb").style.display="none";
}


function sliderValue(){
    document.getElementById("numb").value = document.getElementById("myRange").value;
    document.getElementById("slidval").innerHTML = document.getElementById("myRange").value;
}
function txtValue(){
    document.getElementById("myRange").value = document.getElementById("numb").value;
    document.getElementById("slidval").innerHTML = document.getElementById("myRange").value;
}
