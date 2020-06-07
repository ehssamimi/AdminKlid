 import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
 import Dropzone from 'react-dropzone'


 const AddDropZone = (props) => {
     const onDrop = useCallback(acceptedFiles => {
         // Do something with the files
     }, [])
     const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

     return (


     <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
         {({getRootProps, getInputProps}) => (
             <section>
                 <div {...getRootProps()}>
                     <input {...getInputProps()} />
                     <p>Drag 'n' drop some files here, or click to select files</p>
                 </div>
             </section>
         )}
     </Dropzone>
     )
 };

 export default AddDropZone;

 {/*<div {...getRootProps()}>*/}
 {/*<input {...getInputProps()} />*/}
 {/*{*/}
 {/*isDragActive ?*/}
 {/*<p>Drop the files here ...</p> :*/}
 {/*<p>Drag 'n' drop some files here, or click to select files</p>*/}
 {/*}*/}
 {/*</div>*/}