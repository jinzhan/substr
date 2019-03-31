/**
 * 截取指定长度的字符串
 *  refer: https://github.com/qlover/loadsh/blob/39a75c454047c51c328e608756d535791e6cdd88/loadsh-4.17.5/loadsh-4.17.5.js
 * **/

const rsAstralRange = '\\ud800-\\udfff';
const rsZWJ = '\\u200d';
const rsVarRange = '\\ufe0e\\ufe0f';
const rsComboMarksRange = '\\u0300-\\u036f';
const reComboHalfMarksRange = '\\ufe20-\\ufe2f';
const rsComboSymbolsRange = '\\u20d0-\\u20ff';
const rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
const reHasUnicode = new RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');
const rsFitz = '\\ud83c[\\udffb-\\udfff]';
const rsOptVar = '[' + rsVarRange + ']?';
const rsCombo = '[' + rsComboRange + ']';
const rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
const reOptMod = rsModifier + '?';
const rsAstral = '[' + rsAstralRange + ']';
const rsNonAstral = '[^' + rsAstralRange + ']';
const rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
const rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
const rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
const rsSeq = rsOptVar + reOptMod + rsOptJoin;
const rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
const rsUnicode = rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq;
const reUnicode = new RegExp(rsUnicode, 'g');
const hasUnicode = val => reHasUnicode.test(val);
const unicodeToArray = val => val.match(reUnicode) || [];
const asciiToArray = val => val.split('');

/*
* 将字符转换为数组，方便进行截取
*
* emoji表情case示例：
* ["[滑稽]", "[捂脸]", "[赞同]", "[大笑]", "[左捂脸]", ...]
*
* @param {string}   val: 目标字符串
* @param {Object}   option 可选配置项
* @param {boolean}  option.hasEmoji 是否包含hasEmoji，默认:false
* @param {number}   option.emojiMaxLenth 单个emoji文本的最大长度，默认：8
* @param {Array}    option.emojiData emoji的详细信息，如果存在，则忽略emojiMaxLenth
* */
export const toArray = (val, option = {hasEmoji: false, emojiMaxLenth: 8, emojiData: []}) => {
    if (!option.hasEmoji) {
        return hasUnicode(val) ? unicodeToArray(val) : asciiToArray(val);
    }

    const rsEmoji = (option => {
        return option.emojiData && option.emojiData.length ? option.emojiData
            .map(item => item.replace('[', '\\[').replace(']', '\\]'))
            .join('|') : '\\[.{1,' + (option.emojiMaxLenth - 2 ) + '}\\]';
    })(option);

    const reUbb = hasUnicode(val) ? new RegExp(rsEmoji + '|' + rsUnicode, 'g') : new RegExp(rsEmoji, 'g');
    return val.match(reUbb) || [];
};

/**
 *
 * 字符串裁剪，为了能更方便使用，采用打散运算符
 *
 * @params {string} str 目标字符串
 * @params {number} start 欲截取的字符串
 * @params {number} option.length 欲截取的字符串长度，可选
 * @params {Object} option.opt    可选的配置项
 * */
const substr = (str, start, ...option) => {
    const hasLength = typeof option[0] === 'number';
    const data = hasLength ? toArray(str, option[1]) : toArray(str, option[0]);
    const ret = hasLength ? data.splice(start, option[0]) : data.splice(start);
    return ret.join('');
};

export default substr;