export const debounce = (func, delay, immediate) => {
  let timerId;
  return (...args) => {
    // eslint-disable-next-line no-invalid-this
    const boundFunc = func.bind(this, ...args);
    clearTimeout(timerId);
    if (immediate && !timerId) {
      boundFunc();
    }
    const calleeFunc = immediate
      ? () => {
          timerId = null;
        }
      : boundFunc;
    timerId = setTimeout(calleeFunc, delay);
  };
};

export const focusable = (element, canReceiveFocus) => {
  canReceiveFocus ? element.removeAttribute('tabindex') : element.setAttribute('tabindex', '-1');
};
