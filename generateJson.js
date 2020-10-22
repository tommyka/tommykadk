var fs = require('fs');

const findfolders = (folder) => {
    const folderList = fs.readdirSync(folder).map(f => `${folder}/${f}`).filter(f => fs.lstatSync(f).isDirectory());

    return folderList.map(generateProject);
}

const generateProject = (path) => {
    const fileList = fs.readdirSync(path);
    const jsonFile = fileList.find(f => /\.json/.exec(f));

    if(!jsonFile) {
        console.log('file missing for', path);
        return;
    }

    const data = JSON.parse(fs.readFileSync(`${path}/${jsonFile}`));
    const imageFile = jsonFile.replace('.json', '.jpg');
    const gallery = fileList.filter(f => f != jsonFile && f != imageFile);
    data.id = data.title.toLowerCase().replace(/\s/g, '-').replace(/å/, 'aa');
    data.image = webPath(path, imageFile);

    const existingGallery = data.gallery ? data.gallery : [];

    data.gallery = [...existingGallery, ...gallery.map(i => webPath(path,i))];

    return data;
}

const webPath = (path, file) => path.replace('./', '') + '/' + file;

const projectData = findfolders('./content');
const dataAsJson = JSON.stringify(projectData);

fs.writeFileSync('./content/data.json', dataAsJson);