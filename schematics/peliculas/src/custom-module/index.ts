import { 
  Rule, 
  SchematicContext, 
  Tree, 
  /* url, 
  apply, 
  template, 
  move, 
  mergeWith,  */
  chain, 
  externalSchematic, 
  SchematicsException,/* ,
  MergeStrategy,
  branchAndMerge 
  branchAndMerge,
  MergeStrategy */
  } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
// import { strings } from '@angular-devkit/core';
// import { parseName } from '@schematics/angular/utility/parse-name';
// import { buildDefaultPath } from '@schematics/angular/utility/project';

export interface Schema {
  name: string,
  module: string,
  project?: string
}

export function customModule(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspaceConfigBuffer = tree.read("angular.json");

    if ( !workspaceConfigBuffer ) {
      throw new SchematicsException("Not an Angular CLI workspace.");
    }

    console.log(' ------- custom module executed ------ ');

    /* const workspaceConfig = JSON.parse(workspaceConfigBuffer.toString());
    const projectName = _options.project || workspaceConfig.defaultProject;
    const project = workspaceConfig.projects[projectName];
    const defaultProjectPath = buildDefaultPath(project);
    const parsedPath = parseName(defaultProjectPath, _options.name);
    const { name } = parsedPath; */
    /* const sourceTemplate = url('./files'); */

    /* console.log(' name' );
    console.log(name); */

    /* const sourceParametizedTemplate = apply(sourceTemplate, [
      template({
        ...strings,
        ..._options,
        name
      }),
      move('/src/app/' + _options.name)
    ]); */

    return chain([

      externalSchematic('@schematics/angular', 'module', {
        name: strings.dasherize(_options.name),
        routing: true,
        module: 'app'
      }),

      /* branchAndMerge(chain([
        mergeWith(sourceParametizedTemplate, MergeStrategy.Overwrite)
      ]), MergeStrategy.Overwrite) */

    ]);


  };
}
