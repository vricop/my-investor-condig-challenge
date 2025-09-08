/**
 * Return all parameters that are strings as single string separated with
 * spaces. Any other value will be ignored.
 *
 * **Note**: This util is a simplified version of the famous `classNames`.
 * Source: https://www.npmjs.com/package/classnames
 */
export function classNames(...args: any[]) {
  return (
    args
      .filter((item) => typeof item === "string")
      .join(" ")
      .trim() || undefined
  );
}
