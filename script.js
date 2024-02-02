const fairytaleArray = ["カレーライス", "オムライス", "ラーメン", "おにぎり", "イギリス", "イタリア", "スペイン", "ロシア", "ドイツ", "オーストラリア", "カナダ", "パンダ", "コアラ", "キリン", "くじら", "きつねうどん", "たぬきうどん", "イクラ丼", "ハンバーガー", "カレーパン", "月見うどん", "ピザ", "ステーキ", "フランクフルト", "ハンバーグ", "グラタン", "とんかつ", "コロッケ", "じゃがバター", "ミートボール", "ビーフシチュー", "サラダ", "コーンスープ", "ショートケーキ", "チョコレート", "ブルーベリー", "アップルパイ", "ばなな", "コーヒーゼリー"];
let targetFairytale = "";

function startGame() {
    targetFairytale = fairytaleArray[Math.floor(Math.random() * fairytaleArray.length)];
    document.getElementById("question").innerText = "中国語に翻訳した結果:";
    document.getElementById("answer").value = "";
    document.getElementById("result").innerText = "";
    translateAndShow(targetFairytale);
}

function translateAndShow(fairytaleName) {
    const targetLanguage = "zh";
    deeplTranslate(fairytaleName, targetLanguage, (translation) => {
        document.getElementById("question").innerText = `中国語に翻訳した結果: ${translation}`;
        targetFairytale = fairytaleName;
    });
}



function deeplTranslate(text, targetLanguage, callback) {
    const apiKey = 'a3133ca8-4219-58b7-cda8-440a86a05d87:fx'; // Deepl APIキーをセット

    // Deepl APIのエンドポイント
    const apiUrl = 'https://api-free.deepl.com/v2/translate';

    // リクエストデータの準備
    const requestData = {
        auth_key: apiKey,
        text: text,
        target_lang: targetLanguage,
    };

    // HTTP POSTリクエスト
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(requestData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.translations && data.translations.length > 0) {
            const translation = data.translations[0].text;
            callback(translation);
        } else {
            console.error('Error translating text.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
    const correctAnswer = targetFairytale.trim().toLowerCase();

    if (userAnswer === correctAnswer) {
        document.getElementById("result").innerText = "正解！ おめでとう！！";
    } else {
        document.getElementById("result").innerText = "I不正解。もう一度！";
    }
}
