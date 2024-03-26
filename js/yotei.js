let apikey = "777f6852-3b04-4db6-9fc3-e15e814b5fbf";
select();

function select () {
    let url = "https://db.monaca.education/select?apikey=" + apikey;
    console.log(url);
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(db) {
            console.log(db);
            let moneyRecord = document.getElementById("moneyRecord");
            for (let i = 0; i < db.records.length; i++) {
                // DOM準備
                let tr = document.createElement("tr");
                let id = document.createElement("th");
                let jusin = document.createElement("td");
                let byouin = document.createElement("td");
                let memo = document.createElement("td");
                // DOMに値を格納
                id.innerHTML = db.records[i].id;
                jusin.innerHTML = db.records[i].text0;
                byouin.innerHTML = db.records[i].text1;
                memo.innerHTML = db.records[i].text2;
                // 構築したDOM要素を表に追加
                tr.appendChild(id);
                tr.appendChild(jusin);
                tr.appendChild(byouin);
                tr.appendChild(memo);
                moneyRecord.appendChild(tr);
            }
            // 集計
            let incomeTotal = 0;
            let outgoTotal  = 0;
            for (let i = 0; i < db.records.length; i++) {
                if(db.records[i].int1 == 1) {
                    incomeTotal += db.records[i].int0;
                } else if (db.records[i].int1 == -1) {
                    outgoTotal += db.records[i].int0;
                } else {
                    // 不明な記録は無視
                }
            }
            document.getElementById("incomeTotal").innerHTML = incomeTotal;
            document.getElementById("outgoTotal").innerHTML  = outgoTotal;
            document.getElementById("money").innerHTML       = incomeTotal - outgoTotal;
    });
}

function insert (){
    // フォームの値を取得
    let form = document.getElementById("insertForm");
    let jusin = form.jusin.value;
    let byouin = form.byouin.value;
    let memo = form.memo.value;

    // DBに登録
    let url = "https://db.monaca.education/insert?apikey=" + apikey;
    url += "&text0=" + jusin + "&text1=" + byouin + "&text2=" + memo;
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            console.log(result);
            location.reload();
    });
}

function update() {
    // フォームの値を取得
    let form = document.getElementById("updateForm");
    let id = form.id.value;
    let jusin = form.jusin.value;
    let byouin = form.byouin.value;
    let memo = form.memo.value;

    // DB問い合わせ
    let url = "https://db.monaca.education/update?apikey=" + apikey;
    url += "&idIn=" + id;
    url += "&text0=" + jusin + "&text1=" + byouin + "&text2=" + memo;
    console.log(url);
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            location.reload();
    });
}

function deleteDB() {
    // フォームの値を取得
    let form = document.getElementById("deleteForm");
    let id = form.id.value;

    // DB問い合わせ
    let url = "https://db.monaca.education/delete?apikey=" + apikey;
    url += "&idIn=" + id;
    console.log(url);
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            console.log(result);
            location.reload();
    });
}