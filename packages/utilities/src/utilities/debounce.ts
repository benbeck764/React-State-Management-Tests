type DebounceFunction = (...args: any[]) => unknown;

type DebounceOptions = {
  /**
   * If `true`, will fire on the leading edge of the `delay`.
   * - Default: `true`
   */
  leading?: boolean;
  /**
   * If `true`, will fire on the trailing edge of the `delay`.
   * - Default: `false`
   */
  trailing?: boolean;
};

/**
 * Creates an returns a new debounced version of `func` which will postpone its
 * execution until after `delay` milliseconds have elapsed since the last time it was invoked.
 *
 * @param func The function to debounce.
 * @param {number} delay The number of milliseconds to delay.
 * @param {DebounceOptions} options Options for controlling the debounce behavior.
 * @returns {(...args: Parameters<T>) => ReturnType<T> | undefined} A debounced version of the input function.
 */
export const debounce = <T extends DebounceFunction>(
  func: (...args: Parameters<T>) => ReturnType<T>,
  delay: number | undefined = 200,
  options?: DebounceOptions
): ((...args: Parameters<T>) => ReturnType<T> | undefined) => {
  const { leading = true, trailing = false } = options ?? {};

  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastCallArgs: Parameters<T> | null = null;
  let lastResult: ReturnType<T> | undefined = undefined;
  let lastCallTime: number | null = null;

  const invokeFunc = (): ReturnType<T> | undefined => {
    const args = lastCallArgs;

    lastCallArgs = null;
    if (args) lastResult = func(...args);

    return lastResult;
  };

  const leadingEdge = (): ReturnType<T> | undefined => {
    timeoutId = setTimeout(timerExpired, delay);
    return leading ? invokeFunc() : lastResult;
  };

  const trailingEdge = (): ReturnType<T> | undefined => {
    timeoutId = null;
    if (trailing && lastCallArgs) return invokeFunc();

    lastCallArgs = null;
    return lastResult;
  };

  const remainingWait = (time: number): number => {
    const timeSinceLastCall = time - (lastCallTime ?? 0);
    return delay - timeSinceLastCall;
  };

  const shouldInvoke = (time: number): boolean => {
    if (!lastCallTime) return true;

    const timeSinceLastCall = time - lastCallTime;
    return timeSinceLastCall >= delay || timeSinceLastCall < 0;
  };

  const timerExpired = (): ReturnType<T> | undefined => {
    const time = Date.now();
    if (shouldInvoke(time)) return trailingEdge();

    timeoutId = setTimeout(timerExpired, remainingWait(time));
  };

  return (...args: Parameters<T>): ReturnType<T> | undefined => {
    const now = Date.now();
    const invoking = shouldInvoke(now);

    lastCallArgs = args;
    lastCallTime = now;

    if (invoking && timeoutId === null) return leadingEdge();

    if (timeoutId === null) timeoutId = setTimeout(timerExpired, delay);

    return lastResult;
  };
};
