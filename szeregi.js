const INPUT_WRAPPER = document.getElementById("input-wrapper");
const INPUT_ITEM = document.getElementById("input-template");
INPUT_ITEM.parentElement.removeChild(INPUT_ITEM);
INPUT_ITEM.removeAttribute("id");

const RESULT_WRAPPER = document.getElementById("result-wrapper");
const RESULT_ITEM = document.getElementById("result-template");
RESULT_ITEM.parentElement.removeChild(RESULT_ITEM);
RESULT_ITEM.removeAttribute("id");

const PARAMS_INPUT = document.getElementById("param-no");
const PARAMS_BTN = document.getElementById("param-btn");
const PRIME_PARAMS = [];

const GENERATE_INPUT = document.getElementById("generate-no");
const GENERATE_BTN = document.getElementById("generate-btn");


function setupInputs(n){
    while(PRIME_PARAMS.length>0){
        INPUT_WRAPPER.removeChild(PRIME_PARAMS.pop())
    }
    for(let i=0;i<n;i++){
        let el = INPUT_ITEM.cloneNode(true);

        el.querySelector("label").innerText=`n${i}`

        PRIME_PARAMS.push(el);
        INPUT_WRAPPER.appendChild(el);
    }
}
function loadPrimeParams(){
     return PRIME_PARAMS.reduce((a,el)=>{
        a.push(Number(el.querySelector("#param").value));
        return a;
    },[])
}
function buildResults(generator){
    while(RESULT_WRAPPER.lastElementChild)
        RESULT_WRAPPER.removeChild(RESULT_WRAPPER.lastElementChild)
    while(true){
        let an = generator.next();
        if(an.done) break
        el = RESULT_ITEM.cloneNode(true);
        el.querySelector("#index").innerText = an.value.index;
        el.querySelector("#value").innerText = an.value.value;
        RESULT_WRAPPER.appendChild(el);
    }
}

PARAMS_BTN.addEventListener("click",function(){
    let n = PARAMS_INPUT.value;
    setupInputs(n);
})
GENERATE_BTN.addEventListener("click",function(){
    let limit = GENERATE_INPUT.value;
    let prime_params = loadPrimeParams();
    let generator = LucasGenerator(prime_params,limit);
    buildResults(generator);
})


function* LucasGenerator(first_params,limit=10,a=[]){
    a=first_params.slice(0);
    var s=first_params.length;
    var i=0;
    while(i<limit){
        let v=a[i];
        if(v==null){
            v=0;
            for(let j=-s;j<0;j++){
                v+=a[i+j];
            }
            a[i]=v;
        }
        i++;
        yield {value:v, index:i};
    }
}