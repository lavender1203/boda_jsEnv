// XPathExpression对象

XPathExpression = function XPathExpression() {
  let arg = arguments[0];
  if (arg != 'bobo' && (this instanceof XPathExpression)) {
    return bodavm.toolsFunc.throwError("TypeError", "Illegal constructor");
  }
  ;
  bodavm.toolsFunc.symbolProperty(this);
  if (arg != 'bobo') {
    console.log_copy('XPathExpression 实例化对象 --->', JSON.stringify_bo(arguments, function (k, v) {
      if (v == window) {
        return 'window';
      } else {
        return v;
      }
    }));
  }
  ;
};
bodavm.toolsFunc.safeProto(XPathExpression, "XPathExpression");
bodavm.toolsFunc.defineProperty(XPathExpression.prototype, "evaluate", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: function evaluate() {
    return bodavm.toolsFunc.dispatch(this, XPathExpression.prototype, "XPathExpression", "evaluate", arguments);
  }
});