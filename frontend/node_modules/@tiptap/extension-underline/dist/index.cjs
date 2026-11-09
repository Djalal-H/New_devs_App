Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let _tiptap_core = require("@tiptap/core");
//#region src/underline.ts
/**
* This extension allows you to create underline text.
* @see https://www.tiptap.dev/api/marks/underline
*/
const Underline = _tiptap_core.Mark.create({
	name: "underline",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	parseHTML() {
		return [{ tag: "u" }, {
			style: "text-decoration",
			consuming: false,
			getAttrs: (style) => style.includes("underline") ? {} : false
		}];
	},
	renderHTML({ HTMLAttributes }) {
		return [
			"u",
			(0, _tiptap_core.mergeAttributes)(this.options.HTMLAttributes, HTMLAttributes),
			0
		];
	},
	parseMarkdown(token, helpers) {
		return helpers.applyMark(this.name || "underline", helpers.parseInline(token.tokens || []));
	},
	renderMarkdown(node, helpers) {
		return `<u>${helpers.renderChildren(node)}</u>`;
	},
	markdownTokenizer: {
		name: "underline",
		level: "inline",
		start(src) {
			return src.toLowerCase().indexOf("<u>");
		},
		tokenize(src, _tokens, lexer) {
			if (!/^<u>/i.test(src)) return;
			const delimiters = /\\[\s\S]|`+|<\/u>/gi;
			delimiters.lastIndex = 3;
			let match = delimiters.exec(src);
			while (match) {
				if (match[0].startsWith("`")) {
					const codeSpan = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/.exec(src.slice(match.index));
					if (codeSpan) delimiters.lastIndex = match.index + codeSpan[0].length;
				} else if (!match[0].startsWith("\\")) {
					const text = src.slice(3, match.index);
					if (!text) return;
					return {
						type: "underline",
						raw: src.slice(0, delimiters.lastIndex),
						text,
						tokens: lexer.inlineTokens(text)
					};
				}
				match = delimiters.exec(src);
			}
		}
	},
	addCommands() {
		return {
			setUnderline: () => ({ commands }) => {
				return commands.setMark(this.name);
			},
			toggleUnderline: () => ({ commands }) => {
				return commands.toggleMark(this.name);
			},
			unsetUnderline: () => ({ commands }) => {
				return commands.unsetMark(this.name);
			}
		};
	},
	addKeyboardShortcuts() {
		return {
			"Mod-u": () => this.editor.commands.toggleUnderline(),
			"Mod-U": () => this.editor.commands.toggleUnderline()
		};
	}
});
//#endregion
//#region src/index.ts
var src_default = Underline;
//#endregion
exports.Underline = Underline;
exports.default = src_default;

//# sourceMappingURL=index.cjs.map