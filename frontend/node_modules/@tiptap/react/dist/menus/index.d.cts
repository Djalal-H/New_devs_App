import { BubbleMenuPluginProps } from "@tiptap/extension-bubble-menu";
import React from "react";
import { FloatingMenuPluginProps } from "@tiptap/extension-floating-menu";
//#region src/menus/BubbleMenu.d.ts
type Optional$1<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type BubbleMenuProps = Optional$1<Omit<Optional$1<BubbleMenuPluginProps, 'pluginKey'>, 'element'>, 'editor'> & React.HTMLAttributes<HTMLDivElement>;
export declare const BubbleMenu: React.ForwardRefExoticComponent<Pick<Partial<Omit<Optional$1<BubbleMenuPluginProps, "pluginKey">, "element">>, "editor"> & Omit<Omit<Optional$1<BubbleMenuPluginProps, "pluginKey">, "element">, "editor"> & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/menus/FloatingMenu.d.ts
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type FloatingMenuProps = Omit<Optional<FloatingMenuPluginProps, 'pluginKey'>, 'element' | 'editor'> & {
  editor: FloatingMenuPluginProps['editor'] | null;
  options?: FloatingMenuPluginProps['options'];
} & React.HTMLAttributes<HTMLDivElement>;
export declare const FloatingMenu: React.ForwardRefExoticComponent<Omit<Optional<FloatingMenuPluginProps, "pluginKey">, "editor" | "element"> & {
  editor: FloatingMenuPluginProps["editor"] | null;
  options?: FloatingMenuPluginProps["options"];
} & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
//#endregion
export {};
//# sourceMappingURL=index.d.cts.map