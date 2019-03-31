# substr

解决emoji等特殊字符在字符串裁剪出现乱码的问题，解决emoji字符截取不完整的问题。


## substr

- substr('👩‍👩‍👦family', 0, 1)  ==> 👩‍👩‍👦
- substr('[微笑]', 0, 1, {hasEmoji: true, emojiMaxLength: 4})  ==> [微笑]


## toArray
- toArray('👩‍👩‍👦abc') => ['👩‍👩‍👦', 'a', 'b', 'c'] 
- toArray('百度[微笑]', 0, 1, {hasEmoji: true, emojiMaxLength: 4})  ==> ['百', '度', '[微笑]']




