import { Mark, markInputRule, markPasteRule, mergeAttributes } from "@tiptap/core";
//#region src/code.ts
/**
* The regular expression used for the inline code input rule.
* @deprecated The extension now uses a function-based finder internally.
* This regex is kept for backward compatibility.
*/
const inputRegex = /(^|[^`])`([^`]+)`(?!`)$/;
/**
* The regular expression used for the inline code paste rule.
* @deprecated The extension now uses a function-based finder internally.
* This regex is kept for backward compatibility.
*/
const pasteRegex = /(^|[^`])`([^`]+)`(?!`)/g;
/**
* A function-based finder for the inline code input rule.
* Used internally by the extension to ensure the preceding character
* is not consumed as part of the match, preventing it from being deleted.
*/
const inputRegexMatch = (text) => {
	const match = /`([^`]+)`(?!`)$/.exec(text);
	if (!match) return null;
	if (match.index > 0 && text[match.index - 1] === "`") return null;
	return {
		index: match.index,
		text: match[0],
		replaceWith: match[1]
	};
};
/**
* A function-based finder for the inline code paste rule.
* Used internally by the extension to avoid consuming the preceding
* character as part of the match.
*/
const pasteRegexMatch = (text) => {
	const regex = /`([^`]+)`(?!`)/g;
	const matches = [];
	let match;
	while ((match = regex.exec(text)) !== null) {
		if (match.index > 0 && text[match.index - 1] === "`") continue;
		matches.push({
			index: match.index,
			text: match[0],
			replaceWith: match[1]
		});
	}
	return matches;
};
function shortestUnusedBacktickRun(text) {
	const runs = new Set((text.match(/`+/g) || []).map((run) => run.length));
	let length = 1;
	while (runs.has(length)) length += 1;
	return length;
}
/**
* This extension allows you to mark text as inline code.
* @see https://tiptap.dev/api/marks/code
*/
const Code = Mark.create({
	name: "code",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	excludes: "_",
	code: true,
	exitable: true,
	parseHTML() {
		return [{ tag: "code" }];
	},
	renderHTML({ HTMLAttributes }) {
		return [
			"code",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			0
		];
	},
	markdownTokenName: "codespan",
	parseMarkdown: (token, helpers) => {
		return helpers.applyMark("code", [{
			type: "text",
			text: token.text || ""
		}]);
	},
	renderMarkdown: (node, h, context) => {
		var _context$meta;
		if (!node.content) return "";
		const markText = typeof (context === null || context === void 0 || (_context$meta = context.meta) === null || _context$meta === void 0 ? void 0 : _context$meta.markText) === "string" ? context.meta.markText : "";
		const fence = "`".repeat(shortestUnusedBacktickRun(markText));
		const padding = markText.startsWith("`") || markText.endsWith("`") ? " " : "";
		return `${fence}${padding}${h.renderChildren(node.content)}${padding}${fence}`;
	},
	addCommands() {
		return {
			setCode: () => ({ commands }) => {
				return commands.setMark(this.name);
			},
			toggleCode: () => ({ commands }) => {
				return commands.toggleMark(this.name);
			},
			unsetCode: () => ({ commands }) => {
				return commands.unsetMark(this.name);
			}
		};
	},
	addKeyboardShortcuts() {
		return { "Mod-e": () => this.editor.commands.toggleCode() };
	},
	addInputRules() {
		return [markInputRule({
			find: inputRegexMatch,
			type: this.type
		})];
	},
	addPasteRules() {
		return [markPasteRule({
			find: pasteRegexMatch,
			type: this.type
		})];
	}
});
//#endregion
//#region src/index.ts
var src_default = Code;
//#endregion
export { Code, src_default as default, inputRegex, inputRegexMatch, pasteRegex, pasteRegexMatch };

//# sourceMappingURL=index.js.map