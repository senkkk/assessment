'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
 function removeAllChildren(element) {
    while (element.firstChild) {
      // 子どもの要素があるかぎり削除
      element.removeChild(element.firstChild);
    }
  }

//このように記述することを「無名関数」と呼ぶ。
//onclickプロパティに設定することで、ボタンクリック時に関数が呼び出されるようにする。
assessmentButton.onclick = function(){
    const userName = userNameInput.value;
    if (userName.length === 0)
    {
        alert('名前が入力されてませんよ！');
        return;
    }

    //前回の診断結果があれば削除する
    removeAllChildren(resultDivided);

    //診断結果表示エリアの作成
    const header = document.createElement('h3');
    header.innerText = '診断結果の発表';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //ツイートエリアの作成
    removeAllChildren(tweetDivided);

    //リンク要素を作成する
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='+ encodeURIComponent('あなたのいいところ')+'&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    //Twitter社のJavascriptを読み込むことでボタン表示を反映する
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
    
    console.log(userName);
};

userNameInput.onkeydown = function(event){
    if (event.key === 'Enter')
    {
        assessmentButton.onclick();
    }
};

const answers = [
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName){
    //全文字のコード番号を取得して足し合わせる
    let sumOfCharCode = 0;
    for (let i=0; i < userName.length; i++)
    {
        sumOfCharCode += userName.charCodeAt(i);
    }

    //文字コード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replaceAll('{userName}', userName);

    return result;
}

//動作確認
console.log(assessment('太郎'));
console.log(assessment('次郎'));
console.log(assessment('太郎'));

//テスト(NGの事例)
console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。次郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
)

//テスト(同じ名前なら同じ結果になる)
console.assert(
    assessment('こんにちは！！') === assessment('こんにちは！！'),
    '同じ名前なら同じ結果になる、が正しくありません。'
)

