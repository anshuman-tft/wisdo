// Taken from:
// https://github.com/Abazhenov/express-async-handler (https://www.npmjs.com/package/express-async-handler)
// based on https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
export default (fn: any) =>
  function asyncUtilWrap(...args: any) {
    const fnReturn = fn(...args);
    const next = args[args.length - 1];
    return Promise.resolve(fnReturn).catch(next);
  };
