import fs from "fs"
import ZipLocal from "zip-local";

export const writeScormFile=async(req,res)=>{
    const {type,content}=req.body;

    let directory="./templates/scorm_course/";

    switch (type) {
        case "main": 
            directory+="shared/main.html";
            break;
        case "manifest":
            directory+="imsmanifest.xml";
        break;
    }

    fs.writeFile(directory, content, (err) => {if (err) throw err;});
}

export const writeXApiFile=async(req,res)=>{
    const {type,content}=req.body;
    console.log("a")
}

export const buidScormZip=async(scormZipName)=>{
    const scormFolderDirectory="./templates/scorm_course";
    ZipLocal.sync.zip(scormFolderDirectory).compress().save(scormZipName);
}

export const downloadScormZip=async(res,zipPath)=>{
    res.download(zipPath);
}

export const generateScormZip=async(req,res)=>{
    const zipName="scorm_course.zip";
    const zipPath=`./${zipName}`;

    await buidScormZip(zipName)
    await downloadScormZip(res,zipPath);
}



