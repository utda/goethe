import { deflate } from './rawdeflate.js'
import { inflate } from './rawinflate.js'

const compress = (val) => {
    val = encodeURIComponent(val); // UTF16 → UTF8
    val = deflate(val); // 圧縮 RawDeflate
    val = btoa(val); // base64エンコード
    return val
  };

const restore = (val) => {
    val = atob(val); // base64デコード
    val = inflate(val); // 復号
    val = decodeURIComponent(val); // UTF8 → UTF16
    return val
  };

export { compress, restore };