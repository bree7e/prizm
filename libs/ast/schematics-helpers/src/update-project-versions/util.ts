import { formatFiles, ProjectConfiguration, readJson, Tree, updateJson } from '@nrwl/devkit';
import { prizmSemVerParse, prizmSemVerStringify, prizmSemVerUpdate } from '@prizm-ui/ast';

/**
 * Обновляет версию пакета в package.json для списка проектов.
 *
 * @param {Tree} tree - Представление файловой системы проекта.
 * @param {ProjectConfiguration[]} projects - Массив объектов конфигурации проектов.
 * @param {string} newVersion - Новая версия пакета.
 * @param {string} currentVersion - Установить версию для изменения вместо версии из package.json
 * @return {any[]} - Возвращает пустой массив.
 */
export function prizmAstUpdateProjectVersions(
  tree: Tree,
  projects: ProjectConfiguration[],
  newVersion: string,
  currentVersion?: string
): Promise<void> {
  // Проходим по списку проектов
  projects.forEach(project => {
    // Формируем путь до файла package.json каждого проекта
    const path = [project.root, 'package.json'].join('/');

    // Читаем содержимое файла package.json
    // Обновляем поле version в считанном package.json
    // Обновляем файл package.json новыми данными
    updateJson(tree, path, packageJson => {
      // Обновляем поле version в считанном package.json
      const command = prizmSemVerParse(newVersion, true);
      const versionObject = prizmSemVerUpdate(
        prizmSemVerParse(currentVersion ?? packageJson.version),
        command
      );
      packageJson.version = prizmSemVerStringify(versionObject);
      return packageJson;
    });
  });

  // Форматируем файлы в дереве для обеспечения соблюдения стиля кодирования
  return formatFiles(tree);
}
