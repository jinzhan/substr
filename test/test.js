/**
 * @file 截取指定长度的字符串，将emoji和自定义的ubb表情识别为1个字符
 * @author jinzhan <jinzhan@baidu.com>
 */

import assert from 'assert';
import substr, {str2Array} from '../src/index.js';

describe('substr', function() {
    describe('#substr()', function() {
        it('能正确的裁剪字符串', function() {
            assert.equal(substr('[百度][微笑]family', 1, 1), '百');
        });

        it('能正确的裁剪emoji字符串', function() {
            assert.equal(substr('[百度][微笑]family', 1, 1, {
                hasEmoji: true,
                emojiData: [
                    '[百度]'
                ]
            }), '[');
        });

        it('能正确的裁剪emoji字符串', function() {
            assert.equal(substr('[百度][微笑]family', 1, 1, {
                hasEmoji: true,
                emojiMaxLenth: 8,
            }), '[微笑]');
        });

        it('能正确的裁剪表情', function() {
            assert.equal(substr('👩‍👩‍👦[百度][微笑]family', 0, 1), '👩‍👩‍👦');
        });

        it('能将表情识别为一个字符', function() {
            assert.equal(substr('👩‍👩‍👦[百度][微笑]family', 1, 1), '[');
        });
    });

    describe('#str2Array()', function() {

        it('默认忽略emoji', function() {
            assert.equal(str2Array('👩‍👩‍👦[百度][微笑]a').length, 10);
        });

        it('支持识别emoji', function() {
            assert.equal(str2Array('👩‍👩‍👦[百度][微笑]a', {
                hasEmoji: true,
                emojiMaxLenth: 8,
            }).length, 4);
        });

        it('支持自定义emoji', function() {
            assert.equal(str2Array('👩‍👩‍👦[百度][微笑]a', {
                hasEmoji: true,
                emojiData: [
                    '[百度]'
                ]
            }).length, 7);
        });

        it('支持纯emoji', function() {
            assert.equal(str2Array('[百度][微笑]a', {
                hasEmoji: true,
                emojiData: [
                    '[百度]'
                ]
            }).length, 6);
        });
    });
});
