const fs = require('fs/promises')

const myFileWriter = async (fileName, fileContent) => {
	try{
		await fs.writeFile(fileName,fileContent)
	}
	catch(err){
		console.log("unable to write file",err)
	}
}

const myFileReader = async (fileName) => {
	try{
		const data = await fs.readFile(fileName,{encoding:'utf-8'})
		console.log(data)
	}
	catch(err){
		console.log("unable to read file",err)
	}
}


const myFileUpdater = async (fileName, fileContent) => {
	try{
		await fs.appendFile(fileName,fileContent,{encoding:'utf-8'})
	}
	catch(err){
		console.log("unable to append data to file",err)
	}
}

const myFileDeleter = async (fileName) => {
	try{
		await fs.unlink(fileName)
	}
	catch(err){
		console.log("unable to delete given file",err)
	}
}

// myFileWriter("testfile","Hello")
// myFileReader("testfile")
// myFileUpdater("testfile"," World")
myFileDeleter("testfile")



module.exports = { myFileWriter, myFileUpdater, myFileReader, myFileDeleter }