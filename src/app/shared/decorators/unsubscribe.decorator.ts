export function Unsubscribe(exclusions = []) {
  return function (constructor) {
    const onDestroy = constructor.prototype.ngOnDestroy;
    constructor.prototype.ngOnDestroy = function () {
      Object.keys(this)
        .filter((key) =>
          !exclusions.includes(key)
          && !!this[key]
          && typeof this[key].unsubscribe === 'function')
        .forEach((key) => {
          this[key].unsubscribe();
        });

      if (!!onDestroy && typeof onDestroy === 'function') {
        onDestroy.apply(this, arguments);
      }
    };
  };
}
