import React from 'react';

import { removeCircle, cloudUpload } from 'ionicons/icons'

import './FileUpload.scss'

import {
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItemDivider,
  IonSlide,
  IonSlides,
  IonText,
  IonCol,
  IonRow,
  IonImg,
  IonIcon
} from "@ionic/react";

import CropModal from './CropModal'
import {AutoCropper} from './ImageCropper'

type SelectedImage = {
  identifier: string,
  selectImagePath: string,
  croppedImagePath: string,
  quantity: number
}
type State = {
  isCropModalVisible: boolean,
  imageSourceForCrop: string,
  selectedImageIdentifier: string
}

export class FileUploadContent extends React.Component<{
  activePhotos: SelectedImage[],
  uploadPhoto: (identifier: string, path: string ) => void,
  removePhoto: (identifier: string, path: string ) => void,
  updateFromCrop: (img: any, id: string ) => void
}, State> {
    constructor(props: any) {
      super(props);
  
      this.state = {
        isCropModalVisible: false,
        imageSourceForCrop: '',
        selectedImageIdentifier: ''
      }
  }

  handleOnImageChange = (file: any) =>
  {
    let imgAsUrl = URL.createObjectURL(file.target.files[0]);
    this.props.uploadPhoto(`${this.props.activePhotos.length + 1}`, imgAsUrl);
    
  }

  showCropModal = (image: SelectedImage) =>{
    this.setState({
      isCropModalVisible: true,
      imageSourceForCrop: image.selectImagePath,
      selectedImageIdentifier: image.identifier
    })
  }

  closeCropModal = (returnedImage: any) =>{
    this.setState({
      isCropModalVisible: false
    })
  }

  updateFromCropModal = (img: any, identifier: string) =>{
    this.props.updateFromCrop(img, identifier);
  }

  DisplayCroppedImage(photo:any)
  {
    this.state = {
      isCropModalVisible: true,
      imageSourceForCrop: photo.selectImagePath,
      selectedImageIdentifier: photo.identifier
    }
    return <img id={`image${photo.identifier}`} src={photo.croppedImagePath}></img>
  }

  DisplayUploadedPhotos(){
    let windowWidth = window.innerWidth;
    return this.props.activePhotos.map(photo =>
      <div className="class" key={photo.identifier}>
        <IonCard key={photo.identifier}>
        <IonCardHeader>
          <IonButton onClick={() => this.props.removePhoto(photo.identifier, photo.selectImagePath)}>
              <IonIcon src={removeCircle}></IonIcon>
          </IonButton>
        </IonCardHeader>
        <IonCardContent>
        <img id={`image${photo.identifier}`} src={photo.croppedImagePath}></img>
          <IonRow>
            {/* <IonButton onClick={() => this.props.removePhoto(photo.identifier, photo.selectImagePath)}>
            <IonIcon src={removeCircle}></IonIcon>
            </IonButton> */}
            <IonButton onClick={() => this.showCropModal(photo)}>
              Crop & Resize
            </IonButton>
          </IonRow>
        </IonCardContent>
        </IonCard>
      </div>)
  }

  render() {
    return(
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    Pick Photos
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <CropModal 
                updateFromCrop={this.updateFromCropModal} 
                imgIdentifier={this.state.selectedImageIdentifier}
                isVisible={this.state.isCropModalVisible} 
                imageSource={this.state.imageSourceForCrop} 
                closeModal={this.closeCropModal} >
              </CropModal>
            <IonItemDivider>
              <IonRow>
                  Number of Photos: {this.props.activePhotos.length} 
              </IonRow>
            </IonItemDivider>
              {this.DisplayUploadedPhotos()}
              <IonCard className="addCard">
                <IonCardContent>
                <div className='button'>
                  <label htmlFor='single'>
                    <IonIcon src={cloudUpload} size="large" ></IonIcon>
                  </label>
                  <input type='file' id='single' onChange={this.handleOnImageChange} /> 
                </div>
                </IonCardContent>
              </IonCard>
            </IonCardContent>
        </IonCard>
    )
 }
}

export default FileUploadContent
