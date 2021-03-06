"use strict"
const tokenAddress = "0x0E8Dc82eafe2ba99D5140a3462e2e046eE4Ea63E";
const wbnb = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
const treasuryAddress = '0xf45f6971cD9eD5AB3cEA83604f80B5527Eaae9d5';
const pairAddress = '0x6Ed8eA2d49C99d445635e05A100804FAb3307fd0';

const apiKey = "NIRJMYPQHC9S5KA57GFWK4Z86H27CMDN57";
const apiKey2 ="Z5ICY43DWRMVB12642VWQDVVF5IP36FFR6"
const decimals = 18;


const options= { style: 'currency', currency: 'USD' };
const numberFormat = new Intl.NumberFormat('en-US', options);


let reqHeader = new Headers();
// reqHeader.append('Content-Type', 'application/javascript');
// reqHeader.append('Allow-Control-Allow-Origin', '*');

let initObject = {
    method: 'GET',
    headers: reqHeader,
};

Promise.all([
        fetch("https://api.pancakeswap.info/api/v2/tokens/" + tokenAddress, initObject),
        fetch("https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress="+ wbnb + "&address=" + pairAddress +"&tag=latest&apikey="+ apiKey, initObject),
        fetch("https://api.bscscan.com/api?module=account&action=balance&address=" + treasuryAddress +"&tag=latest&apikey="+ apiKey, initObject),
        fetch("https://api.pancakeswap.info/api/v2/tokens/" + wbnb, initObject),
        fetch("https://api.bscscan.com/api?module=stats&action=tokenCsupply&contractaddress=" + tokenAddress + "&apikey" + apiKey2, initObject)

    ]).then( function (responses) {
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }).then( function (data){
        
        let price = data[0].data.price;
        let pairBalance = data[1].result;
        let treasury = data[2].result;
        let bnbPrice = data[3].data.price;
        let supply = data[4].result;

        console.log(bnbPrice);
        console.log(supply);
        console.log(price);
        console.log(pairBalance);
        console.log(treasury);

        
       
        document.getElementById("treasury").innerHTML = numberFormat.format(((treasury / Math.pow(10, decimals)) * bnbPrice).toFixed(2));
            document.getElementById("pool").innerHTML = "$" + ((pairBalance / Math.pow(10, decimals)) * bnbPrice).toFixed(2);
            document.getElementById("dropbtn").innerHTML = "SOS " + "$" + Number(price).toFixed(3);
            document.getElementById("price").innerHTML = "$" + Number(price).toFixed(3);
            document.getElementById("price2").innerHTML = "$" + Number(price).toFixed(3);
            document.getElementById("price3").innerHTML = "$" + Number(price).toFixed(3);

            document.getElementById("input_price").innerHTML = "$" + Number(price).toFixed(3);

            document.getElementById("totalsupply").innerHTML = ((supply) / Math.pow(10, decimals)).toFixed(0);
            document.getElementById("circulatingsupply").innerHTML = ((supply) / Math.pow(10, decimals)).toFixed(0);
            document.getElementById("marketcap").innerHTML = numberFormat.format(((price * ((supply) / Math.pow(10, decimals))).toFixed(0)));
    });
