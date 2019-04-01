# substr

将emoji表情或者字符串当一个字符处理，解决emoji等特殊字符在字符串裁剪出现乱码的问题，解决emoji字符截取不完整的问题。


## Installation

```
npm i substr -S
```

## Usage

```
import substr, {str2Array} from 'substr';
```



## methods

### substr(< String > str, < Number > start, [ Number ] end,[ Object ] option)
#### option参数

- options.hasEmoji: 是否包含emoji文本（如[微笑]）字符串，默认`false`
- options.emojiMaxLength: emoji字符串的最大长度，如果传了emojiData，则忽略该数值
- options.emojiData: emoji的数据，默认`[]`，不传的话会自动将`options.emojiMaxLength `长度以下的字符串当做emoji；

#### demo
- substr('👩‍👩‍👦family', 0, 1)  ==> 👩‍👩‍👦
- substr('[微笑]', 0, 1, {hasEmoji: true, emojiMaxLength: 4})  ==> [微笑]


### str2Array(< String > str, [ Object ] options)
- str2Array('👩‍👩‍👦abc') => ['👩‍👩‍👦', 'a', 'b', 'c'] 
- str2Array('百度[微笑]', 0, 1, {hasEmoji: true, emojiMaxLength: 4})  ==> ['百', '度', '[微笑]']




