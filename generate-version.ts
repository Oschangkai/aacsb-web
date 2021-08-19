const file = require('fs');

const targetPath = './src/app/shared/components/app-version/app-version.component.html';
const envConfigFile = `<span style="color: rgb(236, 236, 236); font-size: 12px; cursor: default;">
  ${process.env.version}
</span>
`;

// tslint:disable-next-line:only-arrow-functions typedef
file.writeFile(targetPath, envConfigFile, function(err: any) {
  if (err) {
    throw console.error(err);
  }
});
