
/**
 * 単純な文字列のパーサを生成する
 *
 * @param {String} str
 * @return {Function} parser
 */
token = (str) => {
    const len = str.length;

    return (target, position) => {
      if (target.substr(position, len) === str) {
        return [true, str, position + len];
      } else {
        return [false, null, position];
      }
    };
  };

  /**
   * パーサを受け取って、そのパーサの解釈できる文字列を
   * 繰り返した文字列を解釈できるパーサを生成する
   *
   * @param {Function} parser
   * @return {Function}
   */
   many = (parser) => {
    return (target, position) =>{
      const result = [];

      for (;;) {
        const parsed = parser(target, position);
        // 受け取ったパーサが成功したら
        if (parsed[0]) {
          result.push(parsed[1]); // 結果を格納して
          position = parsed[2]; // 読み取り位置を更新する
        } else {
          break;
        }
      }

      return [true, result, position];
    };
  };

  /**
   * @param {Array} parsers... パーサの配列
   * @return {Function}
   */
   choice = (...theArgs) => {
    const parsers = theArgs;

    return (target, position) => {
      const success = true;

      for (let i = 0; i < parsers.length; i++) {
        let parsed = parsers[i](target, position);
        // パース成功したら結果をそのまま帰す
        if (parsed[0]) {
          return parsed;
        }
      }

      return [false, null, position];
    };
  };

  /**
   * @param {Array} parsers... 結合するパーサの配列
   * @return {Function} パーサ
   */
   seq = (...theArgs) => {
    let parsers = theArgs;

    return (target, position) => {
      let result = [];
      for (let i = 0; i < parsers.length; i++) {
        let parsed = parsers[i](target, position);

        if (parsed[0]) {
          result.push(parsed[1]);
          position = parsed[2];
        } else {
          // 一つでも失敗を返せば、このパーサ自体が失敗を返す
          return parsed;
        }
      }
      return [true, result, position];
    };
  };

  /**
   * 正規表現を元のパーサを生成する
   *
   * @param {RegExp} regexp
   * @return {Function}
   */
   regex = (regexp) => {
    regexp = new RegExp(
        '^(?:' + regexp.source + ')',
        regexp.ignoreCase ? 'i' : ''
    );

    return (target, position) => {
      regexp.lastIndex = 0;
      const regexResult = regexp.exec(target.slice(position));

      if (regexResult) {
        position += regexResult[0].length;
        return [true, regexResult[0], position];
      } else {
        return [false, null, position];
      }
    };
  };

  /**
   * @param {String} str
   * @param {Boolean} [inverse]
   * @return {Function}
   */
   char = (str, inverse) => {
    if (arguments.length < 2) {
      inverse = false;
    }

    let dict = {};
    for (let i = 0; i < str.length; i++) {
      dict[str[i]] = str[i];
    }

    return (target, position) => {
      const char = target.substr(position, 1);
      const isMatch = !!dict[char];
      if (inverse ? !isMatch : isMatch) {
        return [true, char, position + 1];
      } else {
        return [false, null, position];
      }
    };
  };

  /**
   * @param {Function} fn
   * @return {Function}
   */
   lazy = (fn) => {
    let parser = null;
    return (target, position) => {
      if (!parser) {
        parser = fn();
      }

      return parser(target, position);
    };
  };

  /**
   * @param {Function} parser
   * @return {Function}
   */
   option = (parser) =>{
    return (target, position) => {
      let result = parser(target, position);
      if (result[0]) {
        return result;
      } else {
        return [true, null, position];
      }
    };
  };

  /**
   * @param {Function} parser
   * @param {Function} fn
   * @return {Function}
   */
   map = (parser, fn) => {
    return (target, position) => {
      let result = parser(target, position);
      if (result[0]) {
        return [result[0], fn(result[1]), result[2]];
      } else {
        return result;
      }
    };
  };

  /**
   * @param {Function} parser
   * @param {Function} fn
   * @return {Function}
   */
   filter = (parser, fn) => {
    return (target, position) => {
      let result = parser(target, position);
      if (result[0]) {
        return [fn(result[1]), result[1], result[2]];
      } else {
        return result;
      }
    };
  };

  module.exports = {
    token: token,
    many: many,
    choice: choice,
    seq: seq,
    regex: regex,
    lazy: lazy,
    char: char,
    option: option,
    map: map,
    filter: filter,
  };
