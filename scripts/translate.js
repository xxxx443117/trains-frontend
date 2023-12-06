import fs from "fs";
import fetch from "node-fetch";
import md5 from "md5";
import path from "path";

import { APP_ID, APP_SECRET, vueFilePath } from "./config.pri.js";

async function getToken() {
  const response = await fetch(
    `https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=${APP_ID}&client_secret=${APP_SECRET}`
  );
  const data = await response.json();
  return data.access_token;
}

// console.log(path, __dirname, __filename);

async function translateText(text, sourceLang, targetLang) {
  // if (1) {
  //   return {
  //     src: "水龙头_余额_铸造_铸造_铸造_铸造_铸造成功",
  //     dst: "Faucet_ Balance_ Casting_ Casting_ Casting_ Casting_ Successfully cast"
  //   };
  // }
  //   Step1. 拼接字符串1：
  // 拼接appid=2015063000000001+q=apple+salt=1435660288+密钥=12345678得到字符串1：“2015063000000001apple143566028812345678”
  // Step2. 计算签名：（对字符串1做MD5加密）
  // sign=MD5(2015063000000001apple143566028812345678)，得到sign=f89f9594663708c1605f3d736d01d2d4
  const salt = Math.floor(Math.random() * 1e10).toString();
  const appid = APP_ID + text + salt + APP_SECRET;
  const sign = md5(appid);

  console.log(text);
  try {
    const response = await fetch(
      `https://fanyi-api.baidu.com/api/trans/vip/translate?q=${text}&from=${sourceLang}&to=${targetLang}&appid=${APP_ID}&salt=${salt}&sign=${sign}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const data = await response.json();
    console.log(data);
    return data.trans_result[0];
  } catch (error) {
    console.error(error);
  }
}

function extractChinese(text) {
  const chineseRegex = /[\u4e00-\u9fa5]+/g;
  const chineseMatches = text.match(chineseRegex);

  if (chineseMatches) {
    return chineseMatches;
  } else {
    return [];
  }
}

function extractChineseAndReplace(text, item, key) {
  let newText = text;

  const isTem = checkTemplate(newText, item);
  const isScr = checkScript(newText, item);
  const isMark = checkMark(newText, item, isTem);

  console.log(isMark, item);
  if (isMark) {
    const _key = Math.floor(Math.random() * 0xffff_ffff).toString();
    newText = newText.replace(item, _key);
    return {
      data: newText,
      key: _key
    };
  }

  if (isTem) {
    newText = newText.replace(item, `{{ t('${key}') }}`);
  } else if (isScr) {
    newText = newText.replace(`"${item}"`, `t('${key}')`);
    newText = newText.replace(`'${item}'`, `t('${key}')`);
  }
  return {
    data: newText
  };
}

async function detectAndTranslateChineseInVueFile(filePath) {
  const _data = fs.readFileSync(filePath);
  let data = _data.toString();
  const chineseCharacters = extractChinese(data);
  console.log("Chinese characters found in the Vue file:\n", chineseCharacters.join("_"));

  if (chineseCharacters.length) {
    try {
      const translation = await translateText(chineseCharacters.join("_"), "zh", "en");
      console.log("Translation to English:\n", translation.src, translation.dst);

      const parseRes = parseText({
        zh: translation.src,
        en: translation.dst
      });

      // res,
      // textArrKeys: textArrKeys,
      // textArrMap
      if (parseRes) {
        const ignoreKeys = {};
        parseRes.textArrKeys.forEach((key, index) => {
          // data = data.replace(parseRes.zh[key], key);
          const dataReplace = extractChineseAndReplace(data, parseRes.textArrMap.zh[index], key);
          if (dataReplace.key) {
            ignoreKeys[dataReplace.key] = parseRes.textArrMap.zh[index];
          }
          data = dataReplace.data;
        });

        console.log(ignoreKeys);
        Object.keys(ignoreKeys).forEach(key => {
          data = data.replace(key, ignoreKeys[key]);
        });
        fs.writeFileSync(filePath, data);
        Object.keys(parseRes.res).forEach(key => {
          saveFile(`./lang/${key}.json`, parseRes.res[key]);
          // fs.writeFileSync(`./lang/${key}.json`, JSON.stringify(parseRes[key]));
        });
      }
      // TODO: replace
    } catch (error) {
      console.error("Translation error:", error);
    }
  }
}

// detectAndTranslateChineseInVueFile("../src/views/faucet-smart.vue");

function parseText(texts) {
  const textArrMap = {};
  let textArrKeys = [];
  Object.keys(texts).forEach((key, index) => {
    textArrMap[key] = `${texts[key]}`.split("_").map(item => item.replace(/^\s/, ""));
  });
  if (textArrMap.en) {
    textArrKeys = textArrMap.en.map(item => {
      return item.replace(/\s/g, "_");
    });
  }

  if (textArrKeys.length) {
    const res = {};

    Object.keys(textArrMap).forEach(key => {
      textArrMap[key].forEach((item, index) => {
        if (res[key]) {
          res[key][textArrKeys[index]] = item;
        } else {
          res[key] = {
            [textArrKeys[index]]: item
          };
        }
      });
    });

    return {
      res,
      textArrKeys,
      textArrMap
    };
    // Object.keys(res).forEach(key => {
    //   fs.writeFileSync(`./${key}.json`, JSON.stringify(res[key]));
    // });
  }
}

const testPromise = path => {
  return new Promise(res => {
    setTimeout(async () => {
      console.log("fetch", path);
      await detectAndTranslateChineseInVueFile(path);
      res();
    }, 2000);
  });
};

const excludeFile = [];

function readFiles(dir) {
  if (excludeFile.includes(dir)) return;
  //  TODO: 排除文件

  const res = fs.readdirSync(dir, {
    withFileTypes: true
  });

  const paths = [];
  res?.forEach(item => {
    if (excludeFile.includes(item.name)) return;

    if (item.isFile()) {
      if (/.vue$/.test(item.name)) {
        paths.push(`${dir}/${item.name}`);
        // await detectAndTranslateChineseInVueFile(`${dir}/${item.name}`);
      }
    } else if (item.isDirectory()) {
      paths.push(...readFiles(`${dir}/${item.name}`));
    }
  });
  return paths;
}

async function main() {
  // fs.rmdirSync(path.join("./", "./lang"));

  // fs.mkdirSync(path.join("./", "./lang"));

  const files = readFiles(vueFilePath);

  const fetchs = files.map(item => () => testPromise(item));

  for await (const iterator of fetchs) {
    console.log(iterator);
    await iterator();
  }
  console.log(fetchs);
}
main();

function saveFile(path, data) {
  let oldData = {};
  try {
    const res = fs.readFileSync(path);
    oldData = JSON.parse(res);
  } catch (error) {}
  fs.writeFileSync(
    path,
    JSON.stringify({
      ...oldData,
      ...data
    })
  );
  // console.log(res);
}

// 检测是否是Template 里面的字符串
function checkTemplate(data = "", str = "") {
  // 开始index 结束Index
  const startIndex = data.indexOf("<template>");
  const endIndex = data.indexOf("</template>");
  const index = data.indexOf(str);

  return index > startIndex && index < endIndex;
}

// 检测是否是Template 里面的字符串
function checkScript(data = "", str = "") {
  // 开始index 结束Index
  const startIndex = data.indexOf("<script");
  const endIndex = data.indexOf("</script>");
  const index = data.indexOf(str);

  return index > startIndex && index < endIndex;
}

// 判断是否是注释
function checkMark(data = "", str = "", isTemp) {
  const line = data.split(/[\n\r]/);

  for (const key of line) {
    if (key.includes(str)) {
      const indexOf = key.indexOf(isTemp ? "<!--" : "//");
      const index = key.indexOf(str);
      if (indexOf !== -1 && index > indexOf) return true;
    }
  }
  return false;
  // const reg = //
}
