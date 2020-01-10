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
  externalSchematic, 
  SchematicsException,/* ,
  MergeStrategy,
  branchAndMerge  */
  branchAndMerge,
  MergeStrategy
  } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

export interface Schema {
  name: string,
  module: string,
  project?: string
}

export function customService(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspaceConfigBuffer = tree.read("angular.json");

    if ( !workspaceConfigBuffer ) {
      throw new SchematicsException("Not an Angular CLI workspace.");
    }

    console.log(' ------- custom service executed ------ ');

    const sourceTemplate = url('./files');

    const sourceParametizedTemplate = apply(sourceTemplate, [
      template({
        ...strings,
        ..._options
      }),
      move('/src/app/' + _options.module + '/shared')
    ]);

    return chain([

      externalSchematic('@schematics/angular', 'service', {
        name: _options.module + '/shared/' + _options.name,
        skipTests: true
      }),

      branchAndMerge(chain([
        mergeWith(sourceParametizedTemplate, MergeStrategy.Overwrite)
      ]), MergeStrategy.Overwrite)

    ]);


  };
}
