const file = require('fs');

const revisionDate = require('child_process')
  .execSync("echo $(git show -s --date=format:'%Y%m%d-%H%M' --format=%cd)")
  .toString().trim();
const commitHash = require('child_process')
  .execSync('echo $(git rev-parse --short HEAD)')
  .toString().trim();

const targetPath = './src/app/shared/components/app-version/app-version.component.html';
const envConfigFile = `<span style="color: rgb(236, 236, 236); font-size: 12px; cursor: default;">
  ${revisionDate}-${commitHash}
</span>
`;

// tslint:disable-next-line:only-arrow-functions typedef
file.writeFile(targetPath, envConfigFile, function(err: any) {
  if (err) {
    throw console.error(err);
  }
});
