/**
 * 截取指定长度的字符串
 *
 * @params {string} str 目标字符串
 * @params {number} length 欲截取的字符串长度
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
const reUnicode = new RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');


const hasUnicode = val => reHasUnicode.test(val);

const unicodeToArray = val => val.match(reUnicode) || [];

const asciiToArray = val => val.split('');

const toArray = val => hasUnicode(val) ? unicodeToArray(val) : asciiToArray(val);

const substr = (str, start, length) => toArray(str).splice(start, length).join('');

export default substr;