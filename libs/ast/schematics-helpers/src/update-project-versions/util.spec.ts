import { ProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { prizmAstUpdateProjectVersions } from './util';

jest.mock('@nrwl/devkit', () => ({
  ...jest.requireActual('@nrwl/devkit'),
  updateJson: jest.fn((tree, path, callback) => {
    const data = JSON.parse(tree.read(path).toString());
    const updatedData = callback(data);
    tree.write(path, JSON.stringify(updatedData));
  }),
}));

describe('prizmAstUpdateProjectVersions', () => {
  let tree: Tree;
  let projects: ProjectConfiguration[];

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    tree.write('/projects/project1/package.json', JSON.stringify({ version: '1.0.0' }));
    tree.write('/projects/project2/package.json', JSON.stringify({ version: '2.0.0' }));

    projects = [
      { root: '/projects/project1' } as ProjectConfiguration,
      { root: '/projects/project2' } as ProjectConfiguration,
    ];
  });

  it('should update version in package.json for each project', () => {
    const newVersion = '3.0.0';
    prizmAstUpdateProjectVersions(tree, projects, newVersion);

    projects.forEach(project => {
      const packageJsonPath = `${project.root}/package.json`;
      const packageJson = JSON.parse(tree.read(packageJsonPath).toString());
      expect(packageJson.version).toBe(newVersion);
    });
  });
});
