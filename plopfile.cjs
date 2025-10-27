//plopfile.cfg
const { execSync } = require('child_process');

module.exports = function (plop) {
  plop.setGenerator('view', {
    description: 'Generate a Vue view and its test',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'View name (e.g. HomeView)',
      },
    ],
    actions: function (data) {
      const viewPath = `src/views/${plop.getHelper('pascalCase')(data.name)}.vue`;
      const testPath = `tests/unit/${plop.getHelper('pascalCase')(data.name)}.spec.ts`;

      return [
        {
          type: 'add',
          path: viewPath,
          templateFile: 'plop-templates/view.vue.hbs',
        },
        {
          type: 'add',
          path: testPath,
          templateFile: 'plop-templates/view.spec.hbs',
        },
        function () {
          try {
            execSync(`git add "${viewPath}" "${testPath}"`);
            return '✔️ Files staged with git';
          } catch (err) {
            throw new Error(`Git add failed: ${err.message}`);
          }
        },
      ];
    },
  });
};
