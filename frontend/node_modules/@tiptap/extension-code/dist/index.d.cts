import { InputRuleMatch, Mark, PasteRuleMatch } from "@tiptap/core";
//#region src/code.d.ts
export interface CodeOptions {
  /**
   * The HTML attributes applied to the code element.
   * @default {}
   * @example { class: 'foo' }
   */
  HTMLAttributes: Record<string, any>;
}
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    code: {
      /**
       * Set a code mark
       */
      setCode: () => ReturnType;
      /**
       * Toggle inline code
       */
      toggleCode: () => ReturnType;
      /**
       * Unset a code mark
       */
      unsetCode: () => ReturnType;
    };
  }
}
/**
 * The regular expression used for the inline code input rule.
 * @deprecated The extension now uses a function-based finder internally.
 * This regex is kept for backward compatibility.
 */
export declare const inputRegex: RegExp;
/**
 * The regular expression used for the inline code paste rule.
 * @deprecated The extension now uses a function-based finder internally.
 * This regex is kept for backward compatibility.
 */
export declare const pasteRegex: RegExp;
/**
 * A function-based finder for the inline code input rule.
 * Used internally by the extension to ensure the preceding character
 * is not consumed as part of the match, preventing it from being deleted.
 */
export declare const inputRegexMatch: (text: string) => InputRuleMatch | null;
/**
 * A function-based finder for the inline code paste rule.
 * Used internally by the extension to avoid consuming the preceding
 * character as part of the match.
 */
export declare const pasteRegexMatch: (text: string) => PasteRuleMatch[];
/**
 * This extension allows you to mark text as inline code.
 * @see https://tiptap.dev/api/marks/code
 */
export declare const Code: Mark<CodeOptions, any>;
//#endregion
export { Code as default };
//# sourceMappingURL=index.d.cts.map