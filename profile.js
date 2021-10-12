let formEle=document.getElementById("mainForm")
let numbersEle=document.getElementById("numbers");
let charsEle=document.getElementById("characters");
let capsEle=document.getElementById("caps");
let lengthEle=document.getElementById("length");
let btnEle=document.getElementById("submitBtn");
let outputEle=document.getElementById("output");
let errorEle=document.getElementById("errorId");

let formDetails={
  "num":true,
  "char":true,
  "caps":true,
  "len":14
}

function displayPassword(reqData){
  console.log((reqData.data))
  let dat=reqData.data
  for (let each of dat){
   if (each==="&"){
     dat=dat.replace("&","#")
     console.log(dat)
   }
  }
  let pass=new Typed("#output",{
    strings:[dat],
    loop:false,
    cursorChar:"",
    typeSpeed:10,
    backSpeed:20
  })
}

numbersEle.addEventListener("change",function(event){
  if (numbersEle.checked===true){
    formDetails.num=true
     
    outputEle.textContent=""
    getPassword(formDetails)
  }
  else if(numbersEle.checked===false){
    formDetails.num=""
 
    outputEle.textContent=""
    getPassword(formDetails)
  }
})

charsEle.addEventListener("change",function(){
  if(charsEle.checked===true){
    formDetails.char=true
    outputEle.textContent=""
    getPassword(formDetails)
  }
  else if(charsEle.checked===false){
    formDetails.char=""
 
    outputEle.textContent=""
    getPassword(formDetails)
  }
})

capsEle.addEventListener("change",function(){
  if (capsEle.checked===true){
    formDetails.caps=true
    outputEle.textContent=""
    getPassword(formDetails)
  }else if(capsEle.checked===false){
    formDetails.caps="" 
    outputEle.textContent=""
    getPassword(formDetails)
  }
})


function getPassword(formDetails){
   
  let url="https://passwordinator.herokuapp.com/generate?num="+formDetails.num+"&char="+formDetails.char+"&caps="+formDetails.caps+"&len="+formDetails.len;
 console.log(url)
  fetch(url)
  .then(function(response){
    return response.json()
  })
  .then(function(reqData){
    displayPassword(reqData)
  })
  
}

getPassword(formDetails)

lengthEle.addEventListener("blur",function(event){
  if (event.target.value>40){
          errorEle.classList.remove("d-none")
  }else{

    errorEle.classList.add("d-none")
    formDetails.len=parseInt(event.target.value)
  }

})


formEle.addEventListener("submit",function(event){
event.preventDefault()
outputEle.textContent=""
getPassword(formDetails)
})


