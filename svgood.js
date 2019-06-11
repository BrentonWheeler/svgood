var fs = require('fs');
if(process.env.ICON_SOURCE){
	var dir = process.env.ICON_DESTINATION || process.env.ICON_SOURCE + '../new-icons';
} else {
	throw new Error("Please specify an ICON_SOURCE directory location from which to source .svg's")
}

function tryMakeDirRecursively(attempt){
	const tempDir = dir + (attempt ? '-' + attempt : '');
	if (!fs.existsSync(tempDir)){
		dir = tempDir;
		fs.mkdirSync(tempDir);
	} else {
		tryMakeDirRecursively(attempt + 1)
	}
}

function removeUnwantedContent(fileName, content){
	// Regexing
	const shapeRegex = /<.*id="path-1".*>/
	const defsRegex = /<defs((.|\n)*)<\/defs>/
	const gRegex = /<g((.|\n)*)<\/g>\n/

	const pathMatch = content.match(shapeRegex);
	const defsMatch = content.match(defsRegex);
	if (pathMatch && defsMatch) {
		const gMatch = content.match(gRegex);
		if (gMatch) {
			content = content.replace(gMatch[0], '');
			content = content.replace(defsMatch[0], pathMatch[0]);
		}
	}


	// Creating a new svg with resulting content
	fs.appendFile('./' + dir + '/' + fileName, content, function(err){
		if(err){throw(err)}
	});
}

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
			if(filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2) === 'svg'){
				fs.readFile(dirname + filename, 'utf-8', function(err, content) {
					if (err) {
						onError(err);
						return;
					}
					onFileContent(filename, content);
				});
			}
		});
  });
}

tryMakeDirRecursively(0);
if(process.env.ICON_SOURCE){
	readFiles(process.env.ICON_SOURCE, removeUnwantedContent, console.log);
} else {
	throw new Error("Please specify an ICON_SOURCE directory location from which to source .svg's")
}
