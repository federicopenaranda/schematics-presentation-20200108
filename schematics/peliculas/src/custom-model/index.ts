import {
  Rule,
  SchematicContext,
  Tree,
  url,
  apply,
  template,
  move,
  mergeWith,
  chain,
  SchematicsException,
  branchAndMerge,
  MergeStrategy
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

export interface Schema {
  name: string,
  module: string,
  project?: string,
  fields: string
}

export function customModel(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspaceConfigBuffer = tree.read("angular.json");

    if (!workspaceConfigBuffer) {
      throw new SchematicsException("Not an Angular CLI workspace.");
    }

    console.log(' ------- custom model executed ------ ');

    let fields2 = [];
    let fff = _options.fields.split('+');

    let obj;
    let str;

    for ( let i=0; i<fff.length; i++ ) {
      obj = { name: '', type: '' };
      str = fff[i].split(',');
      obj.name = str[0];
      obj.type = str[1];
      fields2.push(obj);
    }

    const sourceTemplate = url('./files');

    const sourceParametizedTemplate = apply(sourceTemplate, [
      template({
        ...strings,
        ..._options,
        fields2
      }),
      move('/src/app/' + _options.module + '/shared')
    ]);

    return chain([

      branchAndMerge(chain([
        mergeWith(sourceParametizedTemplate, MergeStrategy.Overwrite)
      ]), MergeStrategy.Overwrite)

    ]);


  };
}
