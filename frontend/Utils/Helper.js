class Helper {
    static trim(s, c){
      if (c === "]") c = "\\]";
      if (c === "\\") c = "\\\\";
      return s.replace(new RegExp("^[" + c + "]+|[" + c + "]+$", "g"), "");
    }

    static trimLeft(s, c){
      if (c === "]") c = "\\]";
      if (c === "\\") c = "\\\\";
      return s.replace(new RegExp("^[" + c + "]+"), "");
    }

    static trimRight(s, c){
      if (c === "]") c = "\\]";
      if (c === "\\") c = "\\\\";
      return s.replace(new RegExp("[" + c + "]+$"), "");
    }
}

export default Helper;
