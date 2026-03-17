import { type TransformOptions, transformAsync } from "@babel/core";
import type { SourceMap } from "rolldown";
import swebJSXBabelPlugin from "sweb-jsx";
import type { Plugin } from "vite";

function plugin(): Plugin {
  let workingDirectory = process.cwd();

  return {
    name: "sweb",
    enforce: "pre",

    async transform(sourceCode, rawFilePath) {
      const filePath = rawFilePath.replace(/\?.*$/, "");

      if (!/\.[mc]?[tj]sx$/i.test(filePath)) {
        return null;
      }

      const plugins: NonNullable<NonNullable<TransformOptions["parserOpts"]>["plugins"]> = [
        "jsx",
        "typescript",
      ];

      const transformOptions: TransformOptions = {
        root: workingDirectory,
        filename: filePath,
        sourceFileName: filePath,
        presets: [
          [
            {
              plugins: [[swebJSXBabelPlugin]],
            },
          ],
        ],
        sourceMaps: true,
        parserOpts: {
          plugins,
        },
      };

      const babelTransformResult = await transformAsync(sourceCode, transformOptions);

      if (babelTransformResult?.code) {
        return {
          code: babelTransformResult.code,
          map: (babelTransformResult.map ?? null) as SourceMap | null,
        };
      }

      return null;
    },
  };
}

export default plugin;
