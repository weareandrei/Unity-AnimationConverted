import React from 'react'
import ReactDropzone from 'react-dropzone'
import PropTypes from "prop-types";

class Dropzone extends React.Component {

    static propTypes = {
        onDropAction: PropTypes.func.isRequired
    }

    state = {
        files: [],
    }

    render() {
        const files = this.state.files.map((file) => (
            <li key={file.name}>
                {file.name} - {file.size} bytes
            </li>
        ))

        return (
            <ReactDropzone onDrop={this.onDrop} accept={['.psd', '.psb']}>
                {({ getRootProps, getInputProps }) => (
                    <section className="container">
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        <aside>
                            <h4>Files</h4>
                            <ul>{files}</ul>
                        </aside>
                    </section>
                )}
            </ReactDropzone>
        )
    }

    onDrop = (files) => {
        this.setState({ files })
        this.props.onDropAction(files)
    }
}

export default Dropzone
