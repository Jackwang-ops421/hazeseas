import { visit } from "unist-util-visit";

/**
 * Remark plugin: converts raw <br> to <br /> in ALL nodes
 * so they comply with MDX JSX, including inside GFM table cells.
 */
export function remarkBr() {
  return (tree) => {
    visit(tree, "html", (node) => {
      node.value = node.value.replace(/<br>/gi, "<br />");
    });
    visit(tree, "text", (node) => {
      if (/<br>/i.test(node.value)) {
        node.type = "html";
        node.value = node.value.replace(/<br>/gi, "<br />");
      }
    });
  };
}
