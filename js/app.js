document.querySelectorAll(".check")
.forEach(c=>c.addEventListener("change",calculate));

document.getElementById("discount").addEventListener("input",calculate);
document.getElementById("salonFee").addEventListener("input",calculate);

function addExtra(){

    let div=document.createElement("div");
    div.className="extra-item";

    div.innerHTML=`
        <input type="text" placeholder="مثلاً ناخن شکسته">
        <input type="number" placeholder="مبلغ" class="extraPrice">
        <button onclick="this.parentElement.remove();calculate()">حذف</button>
    `;

    document.getElementById("extraCosts").appendChild(div);

    div.querySelector(".extraPrice")
        .addEventListener("input",calculate);
}

function calculate(){

    let total=0;

    document.querySelectorAll(".check:checked")
        .forEach(el=> total+=Number(el.value));

    document.querySelectorAll(".extraPrice")
        .forEach(el=> total+=Number(el.value||0));

    total+=Number(document.getElementById("salonFee").value||0);

    let discount=Number(document.getElementById("discount").value||0);
    total -= total*discount/100;

    document.getElementById("finalPrice").innerText=
        total.toLocaleString();
}

function resetInvoice(){

    document.querySelectorAll("input").forEach(i=>{
        if(i.type==="checkbox") i.checked=false;
        else i.value="";
    });

    document.getElementById("extraCosts").innerHTML="";
    calculate();
}
