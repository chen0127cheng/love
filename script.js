let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

const params = new URLSearchParams(window.location.search);
// let username = params.get("name");
let username = "小雨宝宝";

// 限制用户名长度，避免页面样式崩坏
const maxLength = 20;
const safeUsername = username ? username.substring(0, maxLength) : "???";
console.log(safeUsername);

// 防止 `null` 变成 `"null"`
if (username) {
  questionText.innerText = questionText.innerText + safeUsername;
}
console.log(questionText.textContent);

let clickCount = 0; // 记录点击 No 的次数
let noAudio = null; // 保存 No 按钮点击时的音乐
let yesAudio = new Audio("./bgm/恋爱频率.mp3"); // 替换为你的Yes按钮音乐路径

const noTexts = [
  "？你认真的吗…",
  "要不再想想？",
  "不许选这个！ ",
  "我会很伤心…",
  "不行:(",
];

// No 按钮点击事件
noButton.addEventListener("click", function () {
  document.querySelector("body").style.backgroundColor = "#6784b1";
  document.querySelector("h1").style.color = "white";
  clickCount++;

  // 让 Yes 变大，每次放大 2 倍
  let yesSize = 1 + clickCount * 1.2;
  yesButton.style.transform = `scale(${yesSize})`;

  // 挤压 No 按钮，每次右移 50px
  let noOffset = clickCount * 50;
  noButton.style.transform = `translateX(${noOffset}px)`;

  // 让图片和文字往上移动
  let moveUp = clickCount * 25;
  mainImage.style.transform = `translateY(-${moveUp}px)`;
  questionText.style.transform = `translateY(-${moveUp}px)`;

  // No 文案变化（前 5 次变化）
  if (clickCount <= 5) {
    noButton.innerText = noTexts[clickCount - 1];
  }

  // 图片变化（前 5 次变化）
  if (clickCount === 1) mainImage.src = "images/shocked.png"; // 震惊
  if (clickCount === 2) mainImage.src = "images/think.png"; // 思考
  if (clickCount === 3) mainImage.src = "images/angry.png"; // 生气
  if (clickCount === 4) mainImage.src = "images/crying.png"; // 哭
  if (clickCount >= 5) mainImage.src = "images/crying.png"; // 之后一直是哭

  // 如果没有开始播放音乐，则播放 No 音乐并设置为循环
  if (!noAudio) {
    noAudio = new Audio("./bgm/红豆方大同.mp3"); // 替换为你的No按钮音乐路径
    noAudio.loop = true; // 设置为循环播放
    noAudio.play();
  }
});

// Yes 按钮点击后，进入表白成功页面
const loveTest = `!!!喜欢你!! ( >᎑<)♡︎ᐝ  ${
  username ? `${safeUsername}  ♡︎ᐝ(>᎑< )` : ""
}`;

yesButton.addEventListener("click", function () {
  // 停止 No 音乐的播放
  if (noAudio) {
    noAudio.pause();
    noAudio.currentTime = 0; // 将播放位置重置为 0
  }

  // 播放 Yes 音乐并设置为循环
  yesAudio.loop = true;
  yesAudio.play();
  // 先创建基础 HTML 结构
  document.body.innerHTML = `
  <div class="yes-screen" style="z-index: 1; position: relative;">
    <h1 class="yes-text" style="z-index: 2; color: rgb(24, 24, 24);"></h1>
    <img src="images/hug.png" alt="拥抱" class="yes-image" style="z-index: 2;">
    <video
      id="loveVideo"
      width="100%"
      height="100%"
      style="
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.5;
        z-index: -1;
      "
      autoplay
      loop
    >
      <source
        src="./images/爱心粒子上升--Overlays_爱给网_aigei_com.mp4"
        type="video/mp4"
      />
      您的浏览器不支持播放此视频。
    </video>
  </div>
`;

  // 确保用户名安全地插入
  document.querySelector(".yes-text").innerText = loveTest;

  // 禁止滚动，保持页面美观
  // document.body.style.overflow = "hidden";
});
